import('./bootstrap');
import App from './App'

import React from 'react'
import ReactDOM from 'react-dom/client'

import './dlsToken.less';

ReactDOM.createRoot(document.getElementById('app')).render(<App />, document.querySelector('#app'))