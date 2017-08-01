import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

import { bootApp } from 'tahini';

const TahiniGame = bootApp().getDevice(Game, [], Game.initState);

const randomCode = ()=> [ 1, 2, 3, 4 ].map( o=> Math.floor( Math.random()*6 ) );

ReactDOM.render(
  <TahiniGame randomCodeGenerator={randomCode} />,
  document.getElementById('root'));
registerServiceWorker();
