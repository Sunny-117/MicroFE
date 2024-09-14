import { getNextRoute, getPreRoute } from "./rewriteRouter";
import { getApps, SubApp } from "./";
import importHtml from "./importHtml";

// 处理路由变化
export default async function () {
  const apps = getApps();
  // 先卸载上一个应用
  const preApp = matchActiveApp(apps, getPreRoute() || "");

  if (preApp) {
    await unmount(preApp)
  }

  // 2:匹配子应用
  const activeApp = matchActiveApp(apps, getNextRoute() || "");
  if (!activeApp) {
    return;
  }

  // 3:加载子应用
  // 请求获取子应用资源
  const { template, execScript } = await importHtml(activeApp.entry);
  const container = document.querySelector(activeApp.container);
  if (container) {
    container.appendChild(template);
  }
  // 在执行之前，还需要挂载一个全局变量，让子应用的render不是自己执行，而是被我们的框架所调用，
  // 防止子应用直接render覆盖主应用
  (window as any).__POWERED_BY_QIANKUN__ = true;
  (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = activeApp.entry
  // 执行脚本，获取对应的生命周期钩子
  const appExports: any = await execScript();

  // 4:渲染子应用

  activeApp.mount = appExports.mount;
  activeApp.unmount = appExports.unmount;
  activeApp.bootstrap = appExports.bootstrap;

  await bootstrap(activeApp);
  await mount(activeApp);


  console.log(activeApp);
}

function matchActiveApp(apps: SubApp[], path?: string) {
  // 获取当前路由路径
  const activeApp = apps.find(item => path?.startsWith(item.activeRule));
  return activeApp;
}

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}

async function unmount(app) {
  app.unmount && (await app.unmount());
}
