# init

## instructions

Here, we will use Dan Abramov's [create-react-app](https://www.npmjs.com/package/create-react-app) to start a ReactJS application. From the command line:

## code
bash
```js
# install create-react-app globally
sudo npm i -g create-react-app

# go to our code directory
cd ~/code

# init a create-react-app
create-react-app mastermind

# ... wait for create-react-app to work ...

# cd into the new app
cd mastermind

# run the starting point
npm start
```


# step-0-0 adding tahini

## instructions

Tahini is a wonderful framework for using React and Redux together easily

We'll start in ```./src/index.js```


## code
./src/index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

### solution-step

## instructions

There's a lot of magic in these three lines of code.

## code
./src/index.js
```js
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
```


