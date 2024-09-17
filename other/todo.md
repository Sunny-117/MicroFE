
主应用和子应用登陆问题
微前端已经是一个非常成熟的领域了，但开发者不管采用哪个现有方案，在适配成本、样式隔离、运行性能、页面白屏、子应用通信、子应用保活、多应用激活、vite 框架支持、应用共享等用户核心诉求都或存在问题，或无法提供支持。本文提供一种基于 iframe 的全新微前端方案，完善的解决了这些核心诉求。
微前端介绍_哔哩哔哩_bilibili
无界-预加载 + 底层原理 + 浏览器FPS帧率_哔哩哔哩_bilibili
https://juejin.cn/post/7212603829572911159
https://github.com/message163/wujie-demo
https://github.com/Tencent/wujie/blob/master/packages/wujie-vue3/index.js
https://github.com/message163/mmp
https://zhuanlan.zhihu.com/p/422460780
https://juejin.cn/post/6938975818659921957
这个跟react 的 fiber 的有什么关系?
因为react也有该机制 但是react并没有用 requestidlecallback，说是这个东西经过测试可能会超过16ms，超过16ms绘制就会看起来很卡 所以react16是用的 requestAnimationFrame + postMessage 实现的那为什么不用setTimeOut setTimeOut 及时为0 也会有一个最小毫秒延迟4ms，所以是用了postMessage，react18又换成了MessageChannel 实现了队列方式去执行任务。
链接：https://juejin.cn/post/7212603829572911159
# Micro-Frontends

https://gitee.com/Janlaywss/vue-single-spa/wikis/Single-Spa%20+%20Vue%20Cli%20%E5%BE%AE%E5%89%8D%E7%AB%AF%E8%90%BD%E5%9C%B0%E6%8C%87%E5%8D%97%20(%E9%A1%B9%E7%9B%AE%E9%9A%94%E7%A6%BB%E8%BF%9C%E7%A8%8B%E5%8A%A0%E8%BD%BD%EF%BC%8C%E8%87%AA%E5%8A%A8%E5%BC%95%E5%85%A5)

https://github.com/YataoZhang/my-single-spa/issues/4

https://github.com/empjs/emp


https://github.com/jackenl/blog/issues/2
https://github.com/wjfstruggle/zhufeng_web
https://github.com/sunshinechina/Front-end-Advancement/blob/f3d8242a8036f530bfad3b3ec9afe3d1dc54d30f/README.md
https://segmentfault.com/a/1190000022275991

single-spa: 没有处理css，js隔离问题，仅实现了路由劫持和资源下载

文字教程

https://github.com/YataoZhang/my-single-spa/issues/4

微前端实战

https://gitee.com/Janlaywss/vue-single-spa/wikis/Single-Spa%20+%20Vue%20Cli%20%E5%BE%AE%E5%89%8D%E7%AB%AF%E8%90%BD%E5%9C%B0%E6%8C%87%E5%8D%97%20(%E9%A1%B9%E7%9B%AE%E9%9A%94%E7%A6%BB%E8%BF%9C%E7%A8%8B%E5%8A%A0%E8%BD%BD%EF%BC%8C%E8%87%AA%E5%8A%A8%E5%BC%95%E5%85%A5)

