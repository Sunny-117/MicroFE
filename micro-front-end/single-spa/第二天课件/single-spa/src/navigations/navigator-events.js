// hashchange   popstate

import { reroute } from "./reroute";

export const routingEventsListeningTo = ['hashchange', 'popstate'];

function urlReroute() {
    reroute([], arguments); // 会根据路径重新加载不同的应用
}
const capturedEventListeners = { // 后续挂载的事件暂存起来
    hashchange: [],
    popstate: [] // 当应用切换完成后可以调用
}

// 我们处理应用加载的逻辑是在最前面
window.addEventListener('hashchange', urlReroute);
window.addEventListener('popstate', urlReroute);
// 重写addEventListener和removeEventListener
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;
window.addEventListener = function (eventName, fn) {
    // 是不是routingEventsListeningTo里面的 && 有没有被捕获过
    if (routingEventsListeningTo.indexOf(eventName) >= 0 && !capturedEventListeners[eventName].some(listener => listener == fn)) {
        capturedEventListeners[eventName].push(fn);
        return;
    }
    // 如果不是routingEventsListeningTo里面的话，就还是调用原始的addEventListener
    return originalAddEventListener.apply(this, arguments)
}
window.removeEventListener = function (eventName, fn) {
    if (routingEventsListeningTo.indexOf(eventName) >= 0) {
        capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(l => l !== fn);
        return;
    }
    return originalRemoveEventListener.apply(this, arguments)
}

// 如果是hash路由 hash变化时可以切换 
// 浏览器路由，浏览器路由是h5api的 如果切换时不会触发popstate

function patchedUpdateState(updateState, methodName) {
    return function () {
        const urlBefore = window.location.href;
        updateState.apply(this, arguments); // 调用切换方法
        const urlAfter = window.location.href;

        if (urlBefore !== urlAfter) {
            // 重新加载应用 传入事件源
            urlReroute(new PopStateEvent('popstate'));
            // new PopStateEvent 构建一个PopStateEvent事件
        }
    }
}


// 重写pushState和replaceState
window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState');
window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState');

// 用户可能还会绑定自己的路由事件 vue


// 当我们应用切换后，还需要处理原来的方法，需要在应用切换后在执行