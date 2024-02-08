import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';

// 判断当前页面使用singleSpa应用,不是就渲染
if (!window.singleSpaNavigate) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    domElementGetter: () => document.getElementById('react-app') // 指定要挂载到哪个dom元素上面
});

export const bootstrap = [
    reactLifecycles.bootstrap,
];

export const mount = [
    reactLifecycles.mount,
];

export const unmount = [
    reactLifecycles.unmount,
];
