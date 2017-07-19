import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

import { bootApp } from 'tahini';

const TahiniGame = bootApp().getDevice(Game, [], Game.initState);

ReactDOM.render(
  <TahiniGame />,
  document.getElementById('root'));
registerServiceWorker();
