/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor(phrases) {
    this._missed = 0;
    this._phrases = phrases;
    this._activePhrase = null;
  }

  startGame() {
    const overlay = (document.getElementById("overlay").style.display = "none");
    this._activePhrase = this.getRandomPhrase();
    this._activePhrase.addPhraseToDisplay();
  }

  getRandomPhrase() {
    const randomPhrase = Math.trunc(Math.random() * this._phrases.length);
    return this._phrases[randomPhrase];
  }

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

  removeLife() {
    const lives = document.querySelectorAll(".tries img");
    lives[this._missed].src = "images/lostHeart.png";
    this._missed += 1;
    if (this._missed === 5) {
      this.gameOver(false);
    }
  }

  gameOver(gameWon) {
    const overlay = document.getElementById("overlay");
    const gameOverMessage = document.getElementById("game-over-message");
    if (gameWon) {
      overlay.classList.remove("start");
      overlay.classList.add("win");
      gameOverMessage.innerHTML = `<p>Congratulations, You Guessed the Word!!!!<p>
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

  handleInteraction(button) {
    button.disabled = true;
    if (!this._activePhrase._phrase.includes(button.textContent)) {
      button.classList.add("wrong");
      this.removeLife();
    } else {
      button.classList.add("chosen");
      this._activePhrase.showMatchedLetter(button.textContent);
      this.checkForWin();
      console.log(this.checkForWin());
      if (this.checkForWin()) {
        this.gameOver(this.checkForWin);
      }
    }
  }
}
