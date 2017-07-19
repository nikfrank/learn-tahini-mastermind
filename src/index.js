import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { bootApp } from 'tahini';

const TahiniApp = bootApp().getDevice(App);

ReactDOM.render(
  <TahiniApp />,
  document.getElementById('root'));
registerServiceWorker();
