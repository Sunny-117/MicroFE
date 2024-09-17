
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