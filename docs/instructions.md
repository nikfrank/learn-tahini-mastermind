## branch
# init

## instructions

Here, we will use Dan Abramov's [create-react-app](https://www.npmjs.com/package/create-react-app) to start a ReactJS application. From the [command line](http://lmgtfy.com/?q=open+command+line):

If chrome gives you problems with https security, [click here to pull up the chrome localhost security flag](chrome://flags/#allow-insecure-localhost) set it to enable insecure resources from localhost (to allow your app to load).

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
./src/App.js
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
./src/Game.js
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

I've used some Unicode triangles here as text in my buttons, just for fun!

You might want to put icons or SVGs there instead.

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

### Redux

[Here](http://redux.js.org/docs/basics/Reducers.html) is the Redux docs page about reducers.

In short, Redux keeps our application's state for us - and makes sure all changes to it are easy to reason about.


#### State

The state is just a single object which holds all the values for everything in our app that might ever change. Some apps use a POJO as a state object, our app uses an immutable object. Both are allowed, so for this blurb I'll write POJOs, as it's pretty easy to imagine them as immutable.

Dan Abramov (author of Redux, and good fellow) opines that the state should be organized like a database, with different fields on the top level state each valued a single type of entity - and relationships indicated by index-pointer.

```
const flatStateExample = {
  devs: [
    { id: 12114, name: 'nik frank', locale: 'en-CA' },
    { id: 74107, name: 'nox freebird', locale: 'en-UK' },
  ],
  
  apps: [
    { id: 13, name: 'Spaghetti Timer', owner: 12114 },
    { id: 512, name: 'Bike Keeper', owner: 12114 },
    { id: 801, name: 'Tea of the Day', owner: 74107 },
  ],
};
```


In some cases though it can be easier to keep some of the data nested for faster access.

Here's the same data presented in a nested format.


```
const nestedStateExample = {
  apps: [
    { id: 13, name: 'Spaghetti Timer',
      owner: { id: 12114, name: 'nik frank', locale: 'en-CA' },
    },
    { id: 512, name: 'Bike Keeper',
      owner: { id: 12114, name: 'nik frank', locale: 'en-CA' },
    },
    { id: 801, name: 'Tea of the Day',
      owner: { id: 74107, name: 'nox freebird', locale: 'en-UK' },
    },
  ],
};
```

but, as you can see, this can lead to duplication, which can lead to other problems (inconsistencies usually) if we aren't careful.

For what we're learning right now, we can do what Dan would do. Also, you'll see things done Dan's way more often in the industry.

We saw earlier how to set our initial state with tahini, and how to read it in ```render()```


#### Reducers

These are the functions we use to mutate our state. They are the ONLY way the state EVER changes! EVER! ... NO OTHER WAY!

--> They are the answer to the questions "how did that change?" and "how do I get that to change?"

Because reducers are the only way the state can change, it makes it easy to reason about bugs (eg. why is there an extra item in this list? hmm... let's check that the reducer is filtering them correctly)


The technical definition is: A reducer is a function who takes the current state and the action object, then returns the next state of our application.

We hand the new state to Redux and leave him in charge of keeping track of it and triggering the render flow (front end changes) - all we have to do in this function is describe how to mutate the state.

Reducers look like this: (state, action)=> nuState

The way I like to understand reducers is "it's like this now (state), something is happening (action); so then it's gonna end up like this (nuState). 

We will have a couple reducers for each component, maybe more, maybe less.

We'll cover actions in the next section - all they are is a POJO with a certain format.

---


The reducer we need here is one that changes one of the dots up or down based on the data we send via the action's ```.payload```

In the ```.payload```, we'll send a ```.dotIndex``` to tell our reducer which dot we're changing and a ```.diff``` to explain which direction (up/dn) we're changing it (+1 / -1)


the state is an immutable object (as mentioned in step-1-1), so to calculate a new state, we'll use the [updateIn function](https://facebook.github.io/immutable-js/docs/#/Map/updateIn) to get the old value of the dot, then increment it or decrement it ( ```+ action.payload.diff``` )

then we'll make sure it's in our range of allowed dot values 0 to 5 by doing ```+ 6```, then later ```% 6``` 

the ```updateIn``` function returns a new immutable object withe new value set within it.

(we never changed the state, we made a new one and gave it to Redux to keep track of)



## code
./src/Game.js
```js
// ...
  static get reducer(){
    return {
      changeGuessDot: (state, action)=>
        state.updateIn(['guess', action.payload.dotIndex], dot=>
          (dot + 6 + action.payload.diff) % 6 ),
    };
  }
//...
```




### solution-step
ACTIONS
## instructions

The action object represents the "whatever we're doing right now" which is usually handling some event from a user, or sometimes getting data from a server. The important two fields on an action object are:

- type: this is a string which tells Redux which Reducer function to use; usually the name will have a verb and a noun like: 'toggleItem', 'dealCards', 'setCurrentUser'

- payload: this is the value or values we'll need to compute the change. The payload will have all of the "variables" we need, ie: if the type is 'setPassword', the payload will usually be something like ```{ password: 'youllneverguessthis' }``` 

The two actions we define here both lead to the same REDUCER - 'changeGuessDot', sending it a +1 diff or a -1 diff based on whether we pressed the up button or the down button.

Both ActionCreator functions return an action with a ```.dotIndex``` and ```.diff``` value inside the ```.payload``` which describes which dot we want to change.

Together, tahini, Redux, and React will take these functions we write and turn them into the function we bind to the actual DOM element which triggers the changes and downstream rendering (and also do that binding). That is to say, we don't have to worry about anything beyond writing a function who returns the Action we want to get to the Reducer to be able to compute the next state with.

I'm using a new shortcut notation for POJOs from ES6, ```{ dotIndex }``` is really ```{ dotIndex: dotIndex }```

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

ACTION is something to do

REDUCER is how to do it

next we'll cover how to use our actions and reducers by binding them to JSX elements

### solution-step
Action Creator functions
## instructions

ActionCreators are functions we bind to our Elements for users to trigger with events like

- ```onClick``` to trigger an action like ```{ type: 'selectItem', payload: itemIndex }```
- ```onSwipeLeft``` for an action like ```{ type: 'rejectOption', payload: optionId }```


Here, we bind the ActionCreator functions for changing a dot up or down to each button.

We're using the [fat arrow](http://wesbos.com/arrow-functions/) notation from ES6 to pass the correct dotIndex value to the function, so each button will trigger changes to the correct dot. (remember that all the JSX inside of the ```.map``` function is repeated for every dot in guess)

Your guessmaker should work now! The next two topics are extra coding tactics, which (like Zelda side quests) will make you stronger, but don't really drive the plot forward :D


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

### solution-step
Destructuring the payload
## instructions

Usually in reducers, I'm using a new feature of JavaScript ES6 called DESTRUCTURING. [here's a link to some docs about it](http://www.jstips.co/en/javascript/use-destructuring-in-function-parameters/) - the point is we can take the part of an input parameter we're interested in right into a variable without wasting lines of code. Here, we care about action.payload, but nothing else from the action.

We can rewrite our reducer with less code to do the same thing (REFACTOR) as follows.

The second param to the reducer is still the action, we just automatically pull out the payload!


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
Debugging reducers
## instructions

Often, we don't know what's going on. So it's nice to get a ```console.log``` statement in so we can figure it out

With reducers, I usually use a cheeky JS tactic to sneak one in without changing the outcome or needing to switch my one line fat arrow function ```(state, action)=> nuState``` to a bodied function ```(state, action)=> { console.log(state.toJS(), action); return nuState; }```

The ```console.log``` always returns ```undefined```, so we get our values logged, then the || or operator will evaluate to the original expression on his right side (on the next line here).

Nifty trick eh?

## code
./src/Game.js
```js
// ...
  static get reducer(){
    return {
      changeGuessDot: (state, { payload: { dotIndex, diff } })=>
        console.log(state.toJS(), dotIndex, diff) ||
        state.updateIn(['guess', dotIndex], dot=>
          (dot + 6 + diff) % 6 ),
    };
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
npm i -D enzyme
```








## branch
# step-2-1 Our first test - set up

## instructions

So first we'll need to mount our Game component with an initial state


## code
./src/Game.test.js
```js
//...

it('renders the current guess', () => {
  const state = fromJS({
    guess: [ 2, 3, 4, 5 ]
  });

  const p = mount(<Game subState={state}/>);
});

//...
```

### solution-step
Check results
## instructions

Now our test mounts the component, we should actually check that it renders correctly

Here we'll use ```enzyme```'s ```.find``` function - which allows us to select sub-elements with a CSS selector.

Then for each dot in the state, we will check that the rendered dot div has the correct className rendered.

```expect``` is a function ```jest``` gives us which let's us fail the test if two values don't match

[Read their docs](https://facebook.github.io/jest/docs/en/getting-started.html) to learn about it!

## code
./src/Game.test.js
```js
//...

it('renders the current guess', () => {
  const state = fromJS({
    guess: [ 2, 3, 4, 5 ]
  });

  const p = mount(<Game subState={state}/>);

  const dots = p.find('.guess-dot');
  
  state.get('guess').forEach( (dot, i)=>
    expect( dots.at(i).hasClass('dot-'+dot) ).toEqual(true)
  );
});

//...
```

### solution-step
Running the test
## instructions

We have an npm script to run the tests for us - pretty easy

## code
bash
```bash
npm run test
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







