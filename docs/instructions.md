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

Let's download it

## code
bash
```bash
yarn add tahini

# or if you don't have yarn
npm i -S tahini
```


### solution-step
The App Component
## instructions

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
Putting Tahini on the App Component
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


A very important thing to learn here is fromJS :: which is a frunctino we import from the 'immutable' npm module (courtesy facebook).

- normal Plain Ol Javascript Objects (POJOs) are "mutable", ie we can change them whenever we want. This is great, because we're free to do anything, but it's not great, because it makes it hard to know when things change.

- [immutableJS](https://facebook.github.io/immutable-js/docs/#/) lets us make objects that cant change. When we want to change something, we'll make an entirely new object to replace it with. This is the way of "pure functional programming", as pposed to "side effect programming".

- fromJS is a function, which takes a mutable POJO, and returns to us an immutable version thereof. Calling it looks like ```const immutableObject = fromJS( { key: 'value' }  );```


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
# step-1-4 buttons for guessing

## instructions

Now that we can display the guess with nicely coloured dots, we're going to need to allow the user to change her guess!

Let's make some stylish buttons for the player to press


## code
./src/Game.css
```css
/* ... */

.guess-dot {
  border-radius: 50%;
  height: 0;
  width: 0;

  margin: auto;
}

/* ... */

.guess-col button {
  border-radius: 25%;
  border: 2px outset grey;
  background-color: white;

  margin: 3px;
}

.guess-col button:active i {
  display: inline-block;
  transform: translate( 0.75px, 0.75px );
}

.guess-col button:active {
  border-style: inset;
}

.guess-col button:focus {
  outline: none;
}
```

### solution-step
Aaaaaaand the JSX
## instructions

Besides for styling the buttons, we should make them no?

I've used some Unicode triangles here, just for fun

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
                <div className="guess-col">
                  <button> <i>▲</i> </button>
                  <div key={i+''+dot} className={`guess-dot dot-${dot}`}></div>
                  <button> <i>▼</i> </button>
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
# step-1-5 Actions and Reducers (the REDUX way)

## instructions

### Reducers

These are the functions we use to mutate our state. They are the ONLY way the state EVER changes! EVER! ... NO OTHER WAY!

--> They are the answer to the questions "how did that change?" and "how do I get that to change?"

[here](http://redux.js.org/docs/basics/Reducers.html) is the Redux docs about reducers. Dan Abramov (author of Redux, and good fellow) opines that the state should be treated like a database. I disagree withim on this in some cases, but for what we're learning right now, we can do what Dan would do.

The technical definition is: A reducer is a function who takes the current state and the action object, then returns the next state of our application. We leave it up to Redux to actually change the state and trigger the render flow (front end changes) - all we have to do in this function is describe how to mutate the state. (we'll cover actions in the next section)

Reducers look like this: (state, action)=> nuState;

The way I like to understand reducers is "it's like this (state), something is happening (action); so then it ended up like this (nuState). 

We will have a couple reducers for each component, maybe more, maybe less.

---


The reducer we need here is one that changes one of the dots up or down based on the data we send via the payload

In the payload, we'll send a ```dotIndex``` to tell our reducer which dot we're changing and a ```diff``` to explain which direction (up/dn) we're changing it (+1 / -1)


I'm using a new feature of JavaScript ES6 called DESTRUCTURING. [here's a link to some docs about it](http://www.jstips.co/en/javascript/use-destructuring-in-function-parameters/) - the point is we can take the part of an input parameter we're interested in right into a variable without wasting lines of code. Here, we care about action.payload, but nothing else from the action.


the state is an immutable object (as mentioned in step-1-1), so to calculate an new state, we'll use the [updateIn function](https://facebook.github.io/immutable-js/docs/#/Map/updateIn) to get the old value of the dot, then increment it or decrement it ( + payload.diff ) then make sure it's in our range of allowed dots values [ 0-5 ] ( by doing +6, then later %6 ) then return a new state withe new value set within it.



## code
./src/Game.js
```js
// ...
  static get reducer(){
    return {
      changeGuessDot: (state, { payload })=>
        state.updateIn(['guess', payload.dotIndex], dot=>
          (dot + 6 + payload.diff) % 6 ),
    };
  }
//...
```




### solution-step
ACTIONS
## instructions

### Actions

The action object represents the "whatever we're doing right now" which is usually handling some event from a user, or sometimes getting data from a server. The important two fields on an action object are:

- type: this is a string which tells Redux which Reducer function to use; usually the name will have a verb and a noun like: 'toggleItem', 'dealCards', 'setCurrentUser'

- payload: this is the value or values we'll need to compute the change. The payload will have all of the "variables" we need, ie: if the type is 'setPassword', the payload will usually be something like ```{ password: 'youllneverguessthis' }``` 

The two actions we define here both call the same REDUCER - 'changeGuessDot', sending it a +1 diff or a -1 diff based on whether we pressed the up button or the down button.

Both ActionCreator functions make an action with a ```dotIndex``` value which describes which dot we want to change.

## code
./src/Game.js
```js
//...
  static get actions(){
    return {
      incGuessDot: (dotIndex) => ({
        type: 'changeGuessDot',
        payload: { dotIndex, diff: 1 },
      }),
      
      decGuessDot: (dotIndex) => ({
        type: 'changeGuessDot',
        payload: { dotIndex, diff: -1 },
      }),
    };
  }
//...
```




### solution-step
Key Point - REDUCERs and ACTIONs
## instructions

Once you're comfortable with REDUCERs and ACTIONS, you'll be able to do just about whatever you want in your application.

ACTION is doing something

REDUCER is how to do it

ActionCreator is a function we bind to our Elements for users to trigger with events like "onClick" for selecting something or "onSwipeLeft" for rejecting someone.


### solution-step
Action Creator functions
## instructions

Here, we bind the ActionCreator function to the buttons.

We're using the [fat arrow](http://wesbos.com/arrow-functions/) notation from ES6 to pass the correct dotIndex value to the function


## code
./src/Game.js
```js
//...
{
  guess.map( (dot, i)=> (
    <div className="guess-col" key={i}>
      <button onClick={()=> this.props.incGuessDot(i)}>
        <i>▲</i>
      </button>
      <div key={i+''+dot} className={`guess-dot dot-${dot}`}></div>
      <button onClick={()=> this.props.decGuessDot(i)}>
        <i>▼</i>
      </button>
    </div>
  ) )
}
//...
```


## branch
# step-2-0 starting testing with enzyme

## instructions

This is a Test Driven Development course, so we'd better get to the meat of what is testing and how to do it.

### What is a test?

A test is some code that runs your program code for some input cases, then checks that the output is correct for each.

### How do we do it?

In our case, we will be using enzyme to simulate mounting a component (the props we pass in are our inputs for the test), the output we'll test is the rendered elements.

Later we'll also pass mock functions in place of the action creator function props, we will simulate user behaviour (clicking or typing), and check that the action creator functions are called withe correct values.

Later still we'll mount a tahini-wrapped component, simulate user behaviour, then check that the component's redux state has undergone the mutations we expect.


### huh?

ok - all we're doing right now is importing our dependencies and making some boilerplate test cases to fill in later

```it``` is a function we get from ```jest``` which allows us to name a test, and define a function which when run tests our code.

We'll be filling these in over the next couple sections.


## code
./src/Game.test.js
```js
import React from 'react';
import Game from './Game';

import { mount } from 'enzyme';
import { fromJS } from 'immutable';

it('renders the current guess', () => {

});


it('provides up and down buttons for each dot', () => {
  
});


it('user can set code to what he wants', () => {
  
});
```

### solution-step
Installing enzyme
## instructions

as always, we'll need to install our dependencies from bash

## code
bash
```bash
yarn add enzyme

# or with npm
npm i -S enzyme
```








## branch
# step-2-1 Our first test

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







