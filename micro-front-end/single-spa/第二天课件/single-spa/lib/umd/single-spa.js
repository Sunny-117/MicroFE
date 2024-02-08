(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

   // 描述应用的整个状态
   const NOT_LOADED = 'NOT_LOADED';// 应用初始状态
   const LOADING_SOURCE_CODE ='LOADING_SOURCE_CODE'; // 加载资源
   const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED'; // 还没有调用bootstrap方法
   const BOOTSTRAPPING = 'BOOTSTRAPPING'; // 启动中
   const NOT_MOUNTED = 'NOT_MOUNTED';// 没有调用mount方法
   const MOUNTING = 'MOUNTING'; // 正在挂载中
   const MOUNTED = 'MOUNTED'; // 挂载完毕
   const UNMOUNTING = 'UNMOUNTING'; // 解除挂载
   // 当前这个应用是否要被激活
   function shouldBeActive(app){ //如果返回true 那么应用应该就开始初始化等一系列操作
      return app.activeWhen(window.location)
   }

   let started = false;
   function start(){
       // 需要挂载应用
       started = true;
       reroute(); // 除了去加载应用还需要去挂载应用
   }

   function flattenFnArray(fns) {
       fns = Array.isArray(fns) ? fns : [fns];
       // 通过promise链来链式调用  多个方法组合成一个方法
       return (props) => fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());
   }


   async function toLoadPromise(app) {
       if (app.loadPromise) {
           return app.loadPromise; //缓存机制
       }
       return (app.loadPromise = Promise.resolve().then(async () => {
           app.status = LOADING_SOURCE_CODE;
           let { bootstrap, mount, unmount } = await app.loadApp(app.customProps);
           app.status = NOT_BOOTSTRAPPED; // 没有调用bootstrap方法
           // 我希望将多个promise组合在一起 compose
           app.bootstrap = flattenFnArray(bootstrap);
           app.mount = flattenFnArray(mount);
           app.unmount = flattenFnArray(unmount);
           delete app.loadPromise;
           return app;
       }))
   }

   async function toUnmountPromise(app) {
       // 当前应用没有被挂载直接什么都不做了
       if (app.status != MOUNTED) {
           return app;
       }
       app.status = UNMOUNTING;
       await app.unmount(app.customProps);
       app.status = NOT_MOUNTED;
       return app;
   }

   async function toBootstrapPromise(app) {
       if(app.status !== NOT_BOOTSTRAPPED){
           return app;
       }
       app.status = BOOTSTRAPPING;
       await app.bootstrap(app.customProps);
       app.status = NOT_MOUNTED;
       return app;
   }

   async function toMountPromise(app){
       if(app.status !== NOT_MOUNTED){
           return app;
       }
       app.status = MOUNTING;
       await app.mount(app.customProps);
       app.status = MOUNTED;
       return app;
   }

   // hashchange   popstate

   const routingEventsListeningTo = ['hashchange', 'popstate'];

   function urlReroute() {
       reroute(); // 会根据路径重新加载不同的应用
   }
   const capturedEventListeners = { // 后续挂载的事件先暂存起来
       hashchange: [],
       popstate: [] // 当应用切换完成后可以调用
   };

   // 我们处理应用加载的逻辑是在最前面
   window.addEventListener('hashchange', urlReroute);
   window.addEventListener('popstate', urlReroute);
   const originalAddEventListener = window.addEventListener;
   const originalRemoveEventListener = window.removeEventListener;
   window.addEventListener = function(eventName, fn) {
       if (routingEventsListeningTo.indexOf(eventName) >= 0 && !capturedEventListeners[eventName].some(listener => listener == fn)) {
           capturedEventListeners[eventName].push(fn);
           return;
       }
       return originalAddEventListener.apply(this, arguments)
   };
   window.removeEventListener = function(eventName, fn) {
       if (routingEventsListeningTo.indexOf(eventName) >= 0) {
           capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(l => l !== fn);
           return;
       }
       return originalRemoveEventListener.apply(this, arguments)
   };

   // 如果是hash路由 hash变化时可以切换 
   // 浏览器路由，浏览器路由是h5api的 如果切换时不会触发popstate

   function patchedUpdateState(updateState,methodName){
       return function(){
           const urlBefore = window.location.href;
           updateState.apply(this,arguments); // 调用切换方法
           const urlAfter = window.location.href;

           if(urlBefore !== urlAfter){
               // 重新加载应用 传入事件源
               urlReroute(new PopStateEvent('popstate'));
           }
       }
   }


   window.history.pushState = patchedUpdateState(window.history.pushState);
   window.history.replaceState = patchedUpdateState(window.history.replaceState);

   // 用户可能还会绑定自己的路由事件 vue


   // 当我们应用切换后，还需要处理原来的方法，需要在应用切换后在执行

   // 核心应用处理方法
   function reroute() {
       //  需要获取要加载的应用
       //  需要获取要被挂载的应用
       //  哪些应用需要被卸载
       const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges();
       // start方法调用时是同步的，但是加载流程是异步饿
       if (started) {
           // app装载
           return performAppChanges();
       } else {
           // 注册应用时 需要预先加载
           return loadApps();
       }
       async function loadApps() { // 预加载应用
           let apps = await Promise.all(appsToLoad.map(toLoadPromise)); // 就是获取到bootstrap,mount和unmount方法放到app上
          
       }
       async function performAppChanges() { // 根据路径来装载应用
           // 先卸载不需要的应用 
           let unmountPromises = appsToUnmount.map(toUnmountPromise); // 需要去卸载的app
           // 去加载需要的应用

           // 这个应用可能需要加载 但是路径不匹配  加载app1 的时候，这个时候切换到了app2
           appsToLoad.map(async (app)=>{ // 将需要求加载的应用拿到 => 加载 => 启动 => 挂载
               app = await toLoadPromise(app); 
               app = await toBootstrapPromise(app);
               return toMountPromise(app);
           });
           appsToMount.map(async (app)=>{
               app = await toBootstrapPromise(app);
               return toMountPromise(app);
           });
       }   
   }

   // 这个流程是用于初始化操作的，我们还需要 当路径切换时重新加载应用
   // 重写路由相关的方法

   /**
    * 
    * @param {*} appName  应用名字
    * @param {*} loadApp  加载的应用
    * @param {*} activeWhen  当激活时会调用 loadApp
    * @param {*} customProps 自定义属性
    */
   const apps = []; // 用来存放所有的应用
   // 维护应用所有的状态 状态机
   function registerApplication(appName, loadApp, activeWhen, customProps) {
       apps.push({ // 这里就将应用注册好了
           name: appName,
           loadApp,
           activeWhen,
           customProps,
           status: NOT_LOADED
       });
       reroute(); // 加载应用
   }
   function getAppChanges(){
       const appsToUnmount = []; // 要卸载的app
       const appsToLoad = []; // 要加载的app
       const appsToMount = []; // 需要挂载的
       apps.forEach(app=>{
           // 需不需要被加载
           const appSholdBeActive = shouldBeActive(app);
           switch (app.status) { // toLoad
               case NOT_LOADED: 
               case LOADING_SOURCE_CODE:
                   if(appSholdBeActive){// 做判断了
                       appsToLoad.push(app);
                   }
                   break
               case NOT_BOOTSTRAPPED: // toMount
               case BOOTSTRAPPING:
               case NOT_MOUNTED:
                   if(appSholdBeActive){
                       appsToMount.push(app);
                   }
                   break;
               case MOUNTED:  // unmount
                   if(!appSholdBeActive){
                       appsToUnmount.push(app);
                   }
           }
       });
       return {appsToUnmount,appsToLoad,appsToMount}
   }

   exports.registerApplication = registerApplication;
   exports.start = start;

   Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.js.map
