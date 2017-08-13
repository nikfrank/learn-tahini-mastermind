## branch
# init

## instructions

Here, we will use Dan Abramov's [create-react-app](https://www.npmjs.com/package/create-react-app) to start a ReactJS application. From the command line:

## code
bash
```bash
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

## branch
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


## branch
# step-0-1 tahini boilderplate

## instructions

Now we'll apply Tahini to our view component

and put the actions, reducer, namespace and initState


## code
./src/Component.js
```js
class App extends Component {
  render(){
    // ...
  } 
}

```

### solution-step

## instructions

these static getters will house our business logic

## code
./src/App.js
```js
import { fromJS } from 'immutable';

class App extends Component {
  static get namespace(){
    return 'mastermind-game';
  }

  static get actions(){
    return {};
  }

  static get reducer(){
    return {};
  }

  static get initState(){
    return fromJS({});
  }

  render(){
    // ...
  } 
}
```

### solution-step

## instructions

we'll also need immutable (facebook's data lib)

## code
bash
```bash
yarn add immutable
```
