# Web Development Certificate Capstone: Whack-a-Mole!

A local game development studio has decided to create a new game that's based on Whack-A-Mole. If you've ever been to an arcade, you have probably seen or played Whack-A-Mole. It's a game in which a player uses a mallet to hit toy moles, which appear at random, back into their holes.

The game designers have asked you to come up with a computer version of this game. They have provided some source code, but it still needs to be completed. You are encouraged to come up with an original visual design for this game or even change the theme. The game designers expect you to use the JavaScript, HTML, and CSS skills that you've learned in this program to give the game a unique feel.

![whackamole](https://github.com/gabrielsanchez/erddiagram/blob/main/whackamole.gif?raw=true)

## Steps to complete

To complete this project, you must do the following:

- Write code that passes all of the requirements in the project rubric, and submit your GitHub link to the Thinkful team.

Go ahead and get started by following the installation steps below. You'll submit your project to the Thinkful team when you are finished.

# Installation

1. Fork and clone this repository.
2. Navigate to the project's folder.
3. Run `npm install` to install.
4. To run the unit tests, run `npm test`.

# Existing files

|Folder/file path	|Description|
|------|-----|
| `index.html` |	The HTML document that holds the game structure. You will need to modify this file so that the tests pass. |
| `src/styles.css` |	The CSS file that holds the styling of the game. You don't need to modify this file for the tests to pass, but you may want to make optional changes to the file to change the appearance.|
| `src/index.js` | The JS file that holds the functionality of the game. You will need to change this file for the tests to pass. |
| `test/solution.test.js` | This file holds the unit tests of the game.|

# User stories

The user stories presented below are short descriptions of the features told from the perspective of the game designer. Your work should meet the functionality as described in the *acceptance criteria* of each user story.

Each of the user stories is listed below. The user stories are to be implemented in the order in which they are listed. Find the *TODO* comments in the code and create the necessary functionality. Try to implement the functionality by yourself, and check the hints and REPLs provided if you get stuck.

## US-01 - Basic game structure

The game needs to have the basic structure for it to function. The game will need a name, some basic board controls such as a start button, a score, and a timer display. The game needs nine holes and moles defined.

#### 1. Add a title to the game, surrounded by `h1` tags.

You need to name your game. The default is `whack-a-mole`, but you can choose another name depending on the theme that you want to set for the game. Some variations could be `whack-a-virus`, `catch-a-cat`, or something else. Surround your title in `h1` tags. Besides naming your game, you will also need to assign an `id` attribute to the `h1` tag and set the `id` attribute's value to a string of `"title"` for the test to pass. It should look something like this:

```html
<h1 id="title"> My game!! </h1>
```

#### 2. Add nine holes and moles to the grid in `index.html`

The `index.html` file  has only two holes defined. The game should have up to nine holes defined. Add the missing holes and moles to the HTML file.

```html
    <div class="grid">
      <div id="hole0" class="hole">
        <div id="mole0" class="mole"></div>
      </div>
      <div id="hole1" class="hole">
        <div id="mole1" class="mole"></div>
      </div>
      
      <!-- TODO: Add the missing holes and moles to the grid -->

```

#### 3. Define a `start` button in `index.html`

The game needs a `start` button so that a player can start playing the game. Use a `button` tag with `start` set as the `id`.

```html
<button id="start">start</button>
```

#### 4. Use `querySelector()` or `querySelectorAll()` to access the elements in `index.js`

Great! You have defined most of the HTML structure! Now you need to make sure that you can access the elements in JavaScript. Go to `src/index.js` and take some time to analyze the query selectors. You should see something like this:

```js
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score; // Use querySelector() to get the score element
const timerDisplay; // use querySelector() to get the timer element.
```

Use `querySelector()` to get the missing `score` and `timer` elements.

**Hint:** Review the _Selecting elements on the DOM_ lesson from the _JavaScript and the DOM_ module if you don't remember how to use query selectors. You can also consult the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

#### Acceptance criteria

1. The title is surrounded by `h1` tags and has `title` set as `id`.
1. Nine holes and moles are declared in the HTML file as `div` elements.
1. A `start` button is defined in the HTML file.
1. The missing query selectors for the score and timer were added in the `index.js` file.

## US-02 - Basic game functionality: Randomness

Good job! You have the HTML of your game all set up. Now, it's time to implement some of the game functionality in JavaScript. The moles (or other chosen entity) need to appear and disappear randomly.

#### 1. `randomInteger(min, max)`

The function takes two values as parameters to limit the range of the number to be generated. For example, calling `randomInteger(0,10)` will return a random integer between 0 and 10. Calling `randomInteger(10,200)` will return a random integer between 10 and 200.

Study [this example](https://replit.com/@thinkful/randomInteger#index.js) and implement the `randomInteger(min, max)` function in `index.js`. 
 
_**Note:** This function is already implemented for you. You only need to study the REPL and use the code provided._

#### 2. `setDelay(difficulty)`
Implement the `setDelay(difficulty)` function. The moles need to appear and disappear at a certain interval of time.  The function takes a `difficulty` parameter that can have three values: `easy`, `normal`, or `hard`. If difficulty is `easy`, then the function returns a time delay of 1,500 milliseconds (or 1.5 seconds). If the difficulty is set to `normal`, it should return 1,000. If difficulty is set to `hard`, it should return a `randomInteger` between 600 and 1,200.

```js
setDelay("easy") //> Returns 1500
setDelay("normal") //> Returns 1000
setDelay("hard") //> Returns 856 (returns a random number between 600 and 1200).
```
**Hint:** Study the _Control flow_ lesson if you need to review `if`/`else` statements.

#### 3. `chooseHole(holes)`
 Implement the `chooseHole(holes)` function. This function should select a random hole from the list of holes that you defined. When you call the function, you should make sure that it doesn't return the last hole.
 
 ```js
 const holes = document.querySelectorAll('.hole');
 chooseHole(holes) //> Returns one of the 9 holes that you defined
 ```
 
 Feel free to use the following pseudocode as a guide for your implementation.
 
 ```
 function chooseHole(holes){
   // 1. Generate a random integer from 0 to 8 and assign it to an index variable.
   // 2. Get a random hole with the random index (e.g., const hole = holes[index]).
   // 3. if hole === lastHole, then call chooseHole(holes) again because you don't want to return the same hole.
   // 4. if hole is not the same as the lastHole, then keep track of it (lastHole = hole) and return the hole.
 }
 ```

**Hint:**  If you get stuck, study [this REPL](https://replit.com/@thinkful/chooseHole#script.js).

#### Acceptance criteria

1. The `randomInteger()` function works as expected.
2. The `setDelay()` function returns the correct values when a difficulty is set.
3. The `chooseHole()` function returns a random hole as specified in the pseudocode above.


## US-03 - Game flow

In the previous user story, you implemented some of the basic functions necessary for the game to work correctly. Congrats! You are making good progress!

In this user story, you are going to implement the game flow so that a player can start a game and the moles hide and appear randomly using the functions that you created in the previous story.

#### 1. `toggleVisibility(hole)`

In the *Selecting elements on the DOM* lesson in the _JavaScript and the DOM_ module, you learned about the `classList()` method. Take some time to review the [classList MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) before you proceed with implementing this function. Previously, you used `classList.add()` and `classList.remove()` to add and remove classes to HTML elements. In this case, you are asked to use `classList.toggle()` so that it adds or removes the `show` class. In the `styles.css` file, notice how the `show` class is used so that the mole class appears in the respective hole:

```
function toggleVisibility(hole){
  // TODO: Add hole.classList.toggle() so that it adds or removes the show class.
  
  return hole
}
```

**Hint:**  If you get stuck, study the  [classList MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) and see how `classList.toggle()` is used in [ this REPL](https://replit.com/@thinkful/chooseHole#script.js).

#### 2. `showAndHide(hole)`

The purpose of this function is to show and hide the mole given a delay time and the hole where the mole is hidden. You'll need to call the `toggleVisibility()` function that you just created. First, call the function so that it adds the `show` class. Then, inside the `setTimeout()`, the `toggleVisibility()` function will also need to be called so that it removes the `show` class. You will also need to set the delay that is given as a parameter. 

```js
function showAndHide(hole, delay){
  // TODO: Call the toggleVisibility() function so that it adds the show class.
  
  const timeoutID = setTimeout(() => {
    // TODO: Call the toggleVisibility() function so that it removes the show class when the timer times out.
    
    gameOver();
  }, 0); // TODO: Change the setTimeout() delay to the one provided as a parameter
  return timeoutID;
}
```

**Hint:** Study [this REPL](https://replit.com/@thinkful/showAndHide#script.js) if you get stuck. The REPL has a very similar example that implements the mechanism that you want to implement here. Recall that `setTimeout()` is explained in the _JavaScript and the DOM: Events_ lesson. You can also consult the [`setTimeout()` MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

#### 3. `showUp()`

This function simply calls the `showAndHide()` function with a specific delay and hole. The function needs to call `setDelay()` and `chooseHole()` to call `showAndHide(hole, delay)`.

```js
function showUp() {
  let delay = 0; // TODO: call setDelay()
  const hole = 0; // TODO: call chooseHole()
  return showAndHide(hole, delay);
}
```

**Hint:** Study [this REPL](https://replit.com/@thinkful/showAndHide#script.js) if you get stuck. The REPL has a very similar example that implements the mechanism that you want to implement here.

#### 4. `gameOver()`

The purpose of this function is simply to determine if the game should continue or stop. The game continues if there is still time (`if(time > 0)`). If there is still time, then `showUp()` needs to be called again so that it sets a different delay and a different hole. If there is no more time, then it should call the `stopGame()` function. The function also needs to return the `timeoutId` if the game continues or the string `"game stopped"` if the game is over. You don't need to worry about the time right now. The time will be addressed in US-05.

```js
function gameOver() {
  // if time > 0:
  //   timeoutId = showUp()
  //   return timeoutId
  // else
  //   gameStopped = stopGame()
  //   return gameStopped
}
```
**Hint:** Study [this REPL](https://replit.com/@thinkful/showAndHide#script.js) if you get stuck. The REPL has a very similar example that implements the mechanism that you want to implement here.

#### 5. `startGame()`

This is the function that starts the game when the `start` button is clicked.

```js
function startGame(){
  // setDuration(10);
  // showUp();
  // return "game started";
}
```
_**Note:** This function is provided to you. You only need to uncomment the code inside the function._

#### Acceptance criteria

1. The `toggleVisibility()` function works as expected and uses `hole.classList.toggle()` to add or remove the `show` class.
2. The `showAndHide()` calls `toggleVisibility()` to show or hide a mole after a delay of time using the `setTimeout()` function provided.
3. The `showUp()` function calls `setDelay()`  and `chooseHole()` to set a delay and hole used to call `showAndHide()`.
4. The `gameOver()` function works as described in the pseudocode provided.
5. The `startGame()` function works as expected.


## US-04: Whack!

The moles now show and hide, but nothing happens when a user clicks on them. In this user story, you are tasked to implement the functions that handle the clicking events and scoring.

#### 1. `updateScore()`

This function increments the `points` global variable and updates the scoreboard.  Use the `points` global variable that is already defined and increment it by 1. After the `points` variable is incremented, proceed by updating the scoreboard that you defined in the `index.html` file. To update the scoreboard, you can use `score.textContent = points;`. Use the comments in the following function as a guide for your implementation.

```js
function updateScore() {
  // Increment the points global variable by 1 point
  // Update score.textContent with points.
  // Return points;
}

```

#### 2. `clearScore()`

This function is similar to `updateScore()`, but instead of incrementing the scoreboard, it resets it to 0. This is necessary if the game finishes and the player wants to play again.

```js
function clearScore() {
  // set the points global variable to 0
  // update score.textContent 
  // return points;
}
```

#### 3. `whack(event)`

This is an event handler that simply calls the `updateScore()` function to increment the score if a mole has been clicked by the player.

```js
function whack(event) {
  // call updateScore();
  // return points;
}
```
**Hint:** Try to implement the solution by yourself and then look at the suggested function implementation in this [REPL](https://replit.com/@thinkful/addEventListeners#script.js). If you don't remember event handlers, you can review the _Event listeners_ lesson from the _JavaScript and the DOM_ module.

#### 4. `setEventListeners(moles)`

You defined an event handler in the previous step. Now, it's time to set the event listeners so that the event handler gets called when a player clicks on a mole.

```js
function setEventListeners(){
  // forEach mole add the whack event handler when a player clicks on the mole.
  // return moles;
}

```
**Hint:** Try to implement the solution by yourself and then look at the suggested implementation for this function in this [REPL](https://replit.com/@thinkful/addEventListeners#script.js). If you don't remember event listeners, you can review the _Event listeners_ lesson from the _JavaScript and the DOM_ module.

#### Acceptance criteria

1. The score points increment by 1, and the scoreboard is updated when `updateScore()` is called.
2. The `clearScore()` function sets the points to 0, and the scoreboard is updated accordingly.
3. `setEventListeners(moles)` adds a click event listener to each of the moles.
4. `whack(event)` calls `updateScore()` when a player clicks on a mole. 

## US-05: Timer

The game needs a timer that informs the player how many seconds they have left. You'll need to use `setInterval()` to create a timer. If you need to, go back and review the `setInterval()` function in the _JavaScript and the DOM: Events_ lesson.  You may also use the functions provided in [this REPL](https://replit.com/@thinkful/timer#script.js).

#### 1. `startTimer()`

Implement the `startTimer()` function in the game. 

```js
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}
```

_**Note:** This is the same function that's provided in [this REPL](https://replit.com/@thinkful/timer#script.js)._

#### 2. `updateTimer()`

Implement the `updateTimer()` function in the game:

```js
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}
```
_**Note:** This is the same function that's provided in  [this REPL](https://replit.com/@thinkful/timer#script.js)._

#### Acceptance criteria

1. `startTimer()` and `updateTimer()` work as expected.
2. The timer displays in the game.


## US-06: Originality

Good job making it this far! You have a functional game, and it's time to add some uniqueness and originality to make it your own. Read the following suggestions and implement whatever you want. There are no unit tests for this user story, but originality will be considered in the rubric.

#### 1. Change the look of the game.
The game looks great, but it looks similar to the games of some  other students in the program. Hack the `styles.css` file and make some changes to make your game look unique. You can change the background, the sprites, the fonts, and the general appearance of the game. Why not use zombies or monsters instead of moles? Study  and experiment with `styles.css` and see what you can come up with.

#### 2. Audio FX and music
A game without sound FX and music can be pretty boring. Here is a [REPL](https://replit.com/@thinkful/audiofx-and-music#script.js) with an example of how to add audio to your game. Feel free to use your own audio files.

#### 3. Additional features
You can add additional features to your game. Here are some examples: adding more user controls to control difficulty, adding a sprite that takes off points if it gets hit, or adding additional animations.

#### Acceptance criteria

1. There are no unit tests for this user story, but originality and creativity will be considered in the rubric. Consider implementing at least one of the suggested options listed above.

## US-07: Deploying to GitHub

You made it! You finished the first version of your game. Now, it's time to show it to the world so that your friends and potential employers can look at your work. Follow the instructions in the *Git and GitHub* module to deploy your game so that it becomes part of your portfolio.

#### Acceptance criteria

1. The project is deployed to GitHub.


# Success criteria

Functionality:
- The sprites appear and disappear randomly, and the score is incremented when a player clicks on the sprite.
- The game includes a timer that tells the player how many seconds they have left.
- The game is deployed to GitHub.
- The game presents some aspects of originality and creativity, as specified in US-06.

General code organization:
- Minimal code duplication
- Comments are used to describe the functions.


# Tips

- Start by completing the required HTML elements and then proceed to work on the JavaScript functions. It's recommended that you leave any CSS changes for last. Follow the order of the user stories.
- If you are stuck, take a careful look at the provided resources. If you are still stuck, ask a friend or a mentor for help.
- Read the user stories and tests carefully.
