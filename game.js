/**
 * Defines the available button colors in the Simon game.
 * @type {string[]}
 */
var buttonColors = ["red", "blue", "green", "yellow"];

/**
 * Stores the sequence of colors in the current game pattern.
 * @type {string[]}
 */
var gamePattern = [];

/**
 * Stores the sequence of colors clicked by the user.
 * @type {string[]}
 */
var userClickedPattern = [];

/**
 * Indicates whether the game has started or not.
 * @type {boolean}
 */
var started = false;

/**
 * Represents the current level of the game.
 * @type {number}
 */
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/**
 * Listens for the first keypress event to start the game. When a key is pressed, it updates the level title, calls the `nextSequence()` function to start the game, and sets the `started` flag to true.
 */
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/**
 * Handles the user's click on a button in the Simon game.
 *
 * When the user clicks on a button, this function:
 * 1. Stores the color of the clicked button in the `userClickedPattern` array.
 * 2. Plays the sound associated with the clicked button.
 * 3. Animates the clicked button.
 * 4. Calls the `checkAnswer()` function, passing the current length of the `userClickedPattern` array.
 */
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

/**
 * Checks the user's current answer against the game pattern.
 *
 * This function is called after the user clicks a button. It compares the user's
 * clicked pattern to the current game pattern. If the user's answer is correct,
 * it waits 1 second and then calls the `nextSequence()` function to generate
 * the next round of the game. If the user's answer is incorrect, it plays the
 * "wrong" sound, adds the "game-over" class to the body, updates the level
 * title, waits 200ms, removes the "game-over" class, and calls the `startOver()`
 * function to reset the game.
 *
 * @param {number} currentLevel - The current level of the game, based on the
 * length of the `userClickedPattern` array.
 */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


/**
 * Generates the next sequence of colors in the game and updates the game state.
 *
 * This function is called when the user correctly completes the current sequence.
 * It performs the following actions:
 * 1. Resets the `userClickedPattern` array to an empty array.
 * 2. Increments the `level` variable, which represents the current level of the game.
 * 3. Updates the `level-title` element to display the current level.
 * 4. Selects a random color from the `buttonColors` array and adds it to the `gamePattern` array.
 * 5. Plays an animation and sound for the randomly chosen color.
 */
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

/**
 * Animates the press of a color button in the Simon game.
 *
 * This function is used to visually indicate when a color button is pressed by the user.
 * It adds the "pressed" class to the button element for 100 milliseconds, which applies
 * a visual effect to the button, and then removes the class to return the button to its
 * normal state.
 *
 * @param {string} currentColor - The color of the button that was pressed.
 */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/**
 * Plays an audio file corresponding to the provided name.
 *
 * This function is used to play a sound effect in the Simon game. It creates a new
 * Audio object with the file path "sounds/{name}.mp3" and calls the play() method
 * to start playing the audio.
 *
 * @param {string} name - The name of the sound effect to play, without the ".mp3" extension.
 */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * Resets the game state to the initial conditions.
 *
 * This function is used to reset the game when the player wants to start over. It sets the
 * `level` variable to 0, clears the `gamePattern` array, and sets the `started` flag to
 * `false` to indicate that the game has not yet begun.
 */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
