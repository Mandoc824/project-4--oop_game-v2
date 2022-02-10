/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

"use strict";

//this phrases below will be used in the game class
//each phrase instantiates the phrase class
const phrase1 = new Phrase("Over the Horizon");
const phrase2 = new Phrase("Living is Loving");
const phrase3 = new Phrase("I Trust In God");
const phrase4 = new Phrase("You Only Live Once");
const phrase5 = new Phrase("Eren Jaeger");
const totalPhrases = [phrase1, phrase2, phrase3, phrase4, phrase5];

//the game class is instantiated here with the phrases above
const game = new Game(totalPhrases);

//this is the start button that will commence the game
const startButton = document.getElementById("btn__reset");

//an event listener is added to the startbutton taht will check to see if the game is in its initial state
//if the game is in its initital state, the game startGame method will be invoked
// if the game is in its lose state or win state, the game resetGame method will be invoked
startButton.addEventListener("click", (e) => {
  const overlay = e.target.parentElement;
  if (overlay.classList.contains("start")) {
    game.startGame();
  } else {
    game.resetGame();
  }
});

//seleting the onscreen keyboard from the dom
const keyboard = document.querySelector("#qwerty");

//adding an event listener on click for on screen keyboard using event delegation
//the game handleInteraction is invoked on each key in the onscreen keyboard
keyboard.addEventListener("click", (e) => {
  const keys = document.querySelectorAll(".key");
  for (let i = 0; i < keys.length; i++) {
    if (e.target.textContent === keys[i].textContent)
      game.handleInteraction(e.target);
  }
});
