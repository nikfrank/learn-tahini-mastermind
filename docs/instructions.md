## branch
# init

## instructions

Here, we will use Dan Abramov's [create-react-app](https://www.npmjs.com/package/create-react-app) to start a ReactJS application. From the [command line](http://lmgtfy.com/?q=open+command+line):

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
# step-0-1 tahini boilerplate

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
boilerplate static getters
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
add immutableJS
## instructions

we'll also need immutable (facebook's data lib)

## code
bash
```bash
yarn add immutable
```










## branch
# step-1-0 starting our Game

## instructions

We'll do a quick alpha refactor (renaming) to get our heads around what we're doing

Everywhere in the app we have App let's replace it with Game


## code
./src/App.js -> ./src/Game.js

```js
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './Game.css';

class Game extends Component {
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
  
  render() {
    return (
      <div className="Game">
        <div className="Game-header">
          <h2>Mastermind Game</h2>
        </div>
        <div>
          Here will go the game nu.
        </div>
      </div>
    );
  }
}

export default Game;
```

### solution-step
Other files
## instructions

Also ```./App.css -> ./Game.css```

and ```./App.test.js -> ./Game.test.js```

as well as their contents

plus ```./index.js``` 

Pretty easy stuff here

## code
./index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

import { bootApp } from 'tahini';

const TahiniGame = bootApp().getDevice(Game);

ReactDOM.render(
  <TahiniGame />,
  document.getElementById('root')
);
registerServiceWorker();
```








## branch
# step-1-1 initial state code

## instructions

React is all about rendering the state. So the first thing we need to do is initialize a state (then we can render it!)


Here, tahini reads the initState we set on our Component class - all we have to do is pass back the immutable object we want to start from from our static getter.

In mastermind, we can represent the various colours in the code the player will try to guess by each a number.

We'll need a place to store the code and the guess.

## code
./src/index.js
```js
//...

  static get initState(){
    return fromJS({
      code: [ 0, 2, 1, 3 ],
      guess: [ 0, 0, 0, 0 ],
    });
  }

//...
```

### solution-step
What About a Random Code?
## instructions

You'll notice of course that our game is now always played against the same code.

This is the easiest way to develop the game (because it is pure behaviour) - later we'll replace this with an impure code generator (random is a form of impurity)




## branch
# step-1-2 Rendering the Guess

## instructions

Now that we have a guess (think "current guess") in our state, we can render it for the player to see.

What we'll do here is map each value in the gues to a div with a className based on the value.

If you're unfamiliar with looping components in React [here](https://facebook.github.io/react/docs/lists-and-keys.html) is facebook's docs about how to do it

If you're unfamiliar with props and breakouts in JSX [here](https://facebook.github.io/react/docs/jsx-in-depth.html#props-in-jsx) is facebook's docs about JSX - the section Props in JSX will explain what we're doing here with key and className


for now we'll also render out the number (so we have something to see), as our CSS classes are doing nothing yet


## code
./src/Game.js
```js
//...
  render() {
    const guess = this.props.subState.get('guess');
    
    return (
      <div className="Game">
        <div className="Game-header">
          <h2>Mastermind Game</h2>
        </div>
        
        <div className="Game-board">
          <div className="Game-guess-row">
            {
              guess.map( (dot, i)=> (
                <div key={i+''+dot} className={`guess-dot dot-${dot}`}>
                  {dot}
                </div>
              ) )
            }
          </div>
        </div>
      </div>
    );
  }
//...
```








## branch
# step-1-3 Rendering Guess Dots

## instructions

In the last branch, we rendered a different className onto each div in our guess loop based on the value of the dot.

That's great, because now we can style the divs to look like a dot of some colour. 

The row div will need to be css flex [read more here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), and we will use a CSS border trick to draw corloured circles!


## code
./src/Game.css
```css
/* ... */

.Game-guess-row {
  display: flex;
  justify-content: space-around;
}

.guess-dot {
  border-radius: 50%;
  height: 0;
  width: 0;
}

.dot-0 {
  border: 15px solid red;
}

.dot-1 {
  border: 15px solid orange;
}

.dot-2 {
  border: 15px solid yellow;
}

.dot-3 {
  border: 15px solid green;
}

.dot-4 {
  border: 15px solid blue;
}

.dot-5 {
  border: 15px solid purple;
}

```

### solution-step
Get rid of the number
## instructions

Now that our dots are nice and colourful, we can get rid of the numbers from before

## code
./src/Game.js
```js
//...
      {
        guess.map( (dot, i)=> (
           <div key={i+''+dot} className={`guess-dot dot-${dot}`}></div>
        ) )
      }
//...
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```








## branch
# step-1-0 starting redux

## instructions

some markdown here


## code
./src/filename.js
```js
```

### solution-step
Step Header
## instructions

some markdown

## code
bash
```bash
```







