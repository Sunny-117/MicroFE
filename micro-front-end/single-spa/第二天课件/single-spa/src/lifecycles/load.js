import { LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED } from "../applications/app.helpers";

function flattenFnArray(fns) {
    fns = Array.isArray(fns) ? fns : [fns];
    // 通过promise链来链式调用  多个方法组合成一个方法
    return (props) => fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());
}


export async function toLoadPromise(app) {
    if (app.loadPromise) {
        return app.loadPromise; // 缓存机制，防止多次调用loadApp
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