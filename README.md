This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# mastermind with tahini

the goal here is to write the mastermind game through redux, using tahini to keep everything sorted lexically

also, this will be an opportunity to feature:

- random as a networkHandler !!
- undo perhaps
- remote control perhaps

## ci cd goals:

tahini should enforce 100% coverage on itself and all of its canon apps

only withis will it be worthy of adoption.



## Lesson listing, with instructions

init

- install create react app


0-0

- add tahini


0-1


- tahini boilerplate



---


1-0

- rename to Game



1-1

- init-state


1-2

- initState into tahini HOC, render initState



1-3

- render CSS colours as dots



1-4

- up and down buttons



1-5

- redux (A, d, R) for button changing guess



---


2-0

- add enzyme and jest test boilerplate



2-1

- test that dots render with correct classes



2-2

- test that action creators are bound as expected



2-3

- full tahini test
- mount with tahini HOC
- simulate user interactions
- expect against redux store



2-4

- simulate guessing
- failing test for guess



2-5

- make the guess test pass



3-0

- failing test for a scoring function



3-1

- test runner for black dot cases



3-2

- install immutable to scoring fn
- pass scoring test for black dots only



3-3

- test cases for all black and white dot combos



3-4

- scoring algorithm and fix to one of the cases



3-5

- failing user flow test
- for guessing -> (score + render)



3-6

- reducer for guessing
- render for guesses and their scores
- style for render
- update user flow test with more specifics



3-7

- deploy script
- codeGen as prop fn for purity in testability



3-8

- styling guesses



3-9

- hard html-css iphone 4s fix
- user flow test for entire game