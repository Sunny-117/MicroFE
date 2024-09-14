function fetchResource(url) {
  return fetch(url).then(res => res.text());
}
// 乾坤用的是import-html-entry库，这里我手写这个库的核心api

export default async function (url) {
  // 请求子应用的资源：html，css，js
  // 客户端渲染需要执行js脚本生成内容
  // 而innerHTML中的script不会执行（出于安全考虑）
  // 所以要单独去请求资源，并且执行，不能直接innterHTML让浏览器渲染
  const html = await fetchResource(url);

  const template = document.createElement("div");
  template.innerHTML = html;

  // 所有的scripts
  const scripts = [...template.querySelectorAll("script")];

  // 获取所有的script
  function getExternalScripts() {
    return Promise.all(
      scripts.map(script => {
        const src = script.getAttribute("src");
        if (!src) {
          return Promise.resolve(script.innerHTML);
        } else {
          // 判断是否以http开头，否则就拼接上url（也就是子应用设置的entry）
          return fetchResource(src.startsWith("http") ? src : `${url}${src}`);
        }
      })
    );
  }

  // 执行script
  async function execScript() {
    const scripts = await getExternalScripts();

    // 手动构造CJS的环境，为了方便获取到子应用导出的生命周期
    const module = { exports: {} };
    const exports = module.exports;

    // 拿到子应用的生命周期钩子函数，手动调用
    scripts.forEach(code => eval(code));
    // console.log(window['app'])

    // umd内部会把导出的结果挂载到module.exports上
    // console.log(module.exports)
    return module.exports;
  }
  return {
    template,
    getExternalScripts,
    execScript,
  };
}
