import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


let instance = null
function render(props) {
	const { container } = props;
	instance = ReactDOM.createRoot(container ? container.querySelector('#root') : document.querySelector('#root'));
	instance.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
}


if (!window.__POWERED_BY_QIANKUN__) {
	render({});
}

export async function bootstrap() {
	console.log('[react16] react app bootstraped');
}

export async function mount(props) {
	console.log('[react16] props from main framework', props);
	render(props);
}

export async function unmount(props) {
	const { container } = props;
	instance.unmount(container ? container.querySelector('#root') : document.querySelector('#root'));
}