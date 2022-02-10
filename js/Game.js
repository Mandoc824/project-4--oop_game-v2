/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

"use strict";

//creates the game class
class Game {
  constructor(phrases) {
    this._missed = 0;
    this._phrases = phrases;
    this._activePhrase = null;
  }

  //this method starts the game
  //it invokes the getrandomphrase method and sets the random phrase to the _activePhrase property
  //it invokes the addPhraseToDisplay method aswell
  startGame() {
    const overlay = (document.getElementById("overlay").style.display = "none");
    this._activePhrase = this.getRandomPhrase();
    this._activePhrase.addPhraseToDisplay();
  }

  //this method gets a random number from 0 to the the length of the phrases property of this class
  //it then retrieves the phrase from the phrases property by passing the randomnumber to the phrases with bracket notation
  getRandomPhrase() {
    const randomPhrase = Math.trunc(Math.random() * this._phrases.length);
    return this._phrases[randomPhrase];
  }

  //this method checks to see if a game is win based on the show class of the letter in the phrase display
  //if the letter contains the show class, the loop continues, and if the letter contains the class hide, the loop stops and returns false
  checkForWin() {
    const phraseLetters = document.querySelectorAll(".letter");
    for (let i = 0; i < [...phraseLetters].length; i++) {
      if (phraseLetters[i].classList.contains("show")) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  //this method removes a life from the tries container at the bottom of the screen
  //it replaces a liveheart image with a lost heart image based on the missed property of this class
  removeLife() {
    const lives = document.querySelectorAll(".tries img");
    lives[this._missed].src = "images/lostHeart.png";
    this._missed += 1;
    if (this._missed === 5) {
      this.gameOver(false);
    }
  }

  //this method controls whether a game is won or lost
  //if a game is won, the overlay's class will be set to win and a message will display
  //if a game is lost, the overlay's class is set to lose and a message is displayed
  gameOver(gameWon) {
    const overlay = document.getElementById("overlay");
    const gameOverMessage = document.getElementById("game-over-message");
    if (gameWon) {
      overlay.classList.remove("start");
      overlay.classList.add("win");
      gameOverMessage.innerHTML = `<p>Congratulations, You Guessed the phrase!!!!<p>
      <p>It was "${this._activePhrase._phrase}"</p>
      `;
      overlay.style.display = "inherit";
    } else {
      overlay.classList.remove("start");
      overlay.classList.add("lose");
      gameOverMessage.innerHTML = `
      <p>You lost, Better luck next time :(.</p>
      <p>The phrase was "${this._activePhrase._phrase}"</p>
        `;
      overlay.style.display = "inherit";
    }
  }

  //this method handles the interactions of the button that is clicked
  //if the button clicked is not contained in the phrase, the button is disabled and given the class of 'wrong'. a life is lost as well
  //if the button clicked is contained in the phrase, the button will get a class of chosen and the word in the phrase will be unlocked
  //this will invoke the checkforwin method and evaluate the gameOver method based on the amount of letters shown
  handleInteraction(button) {
    button.disabled = true;
    if (!this._activePhrase._phrase.includes(button.textContent)) {
      button.classList.add("wrong");
      this.removeLife();
    } else {
      button.classList.add("chosen");
      this._activePhrase.showMatchedLetter(button.textContent);
      this.checkForWin();
      if (this.checkForWin()) {
        this.gameOver(this.checkForWin);
      }
    }
  }

  //this will reset the game to its original state
  //invokes the start game method as soon as everything is reset
  resetGame() {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    const phraseLetters = document.querySelectorAll("ul li");
    const keys = document.querySelectorAll(".key");
    const hearts = document.querySelectorAll(".tries img");
    hearts.forEach((heart) => (heart.src = "images/liveHeart.png"));
    this._missed = 0;
    phraseLetters.forEach((item) => item.remove());
    keys.forEach((key) => {
      key.disabled = false;
      if (key.classList.contains("wrong")) {
        key.classList.remove("wrong");
      } else {
        key.classList.remove("chosen");
      }
    });
    if (overlay.classList.contains("win")) {
      overlay.classList.remove("win");
      overlay.classList.add("start");
    } else {
      overlay.classList.remove("lose");
      overlay.classList.add("start");
    }
    this.startGame();
  }
}
