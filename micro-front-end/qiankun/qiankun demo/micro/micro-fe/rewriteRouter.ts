import handleRouter from "./handleRouter";
let preRoute: string | null = null;
let nextRoute: string | null = null;

export const getPreRoute = () => preRoute;
export const getNextRoute = () => nextRoute;

export default function () {
  // 监视hash ->  window.onhashchange

  /**
   * 情况1
   */
  // 监视history 
  // 1. (go,back,forward) window.onpopstate
  // 2. (pushState,replaceState) 需要重写函数
  window.addEventListener("popstate", () => {
    // popstate触发的时候路由已经完成导航了
    // console.log(window.location.pathname)// 是导航之后的pathname，拿不到之前的，所以需要在上面维护两个：getPreRoute、getNextRoute
    preRoute = nextRoute  // 之前的
    nextRoute = window.location.pathname  // 最新的
    handleRouter()
  });

  /**
   * 情况2
   */
  const rawPushState = window.history.pushState;// 备份
  window.history.pushState = (...args) => {
    preRoute = window.location.pathname;
    rawPushState.apply(window.history, args);
    console.log('监视到 pushState 变化')
    nextRoute = window.location.pathname;
    handleRouter();
  };
  /**
   * 情况3
   */

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    rawReplaceState.apply(window.history, args);
    handleRouter()
  };
}
