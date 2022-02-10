/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

"use strict";

class Phrase {
  constructor(phrase) {
    this._phrase = phrase.toLowerCase();
  }

  addPhraseToDisplay() {
    const phraseDisplay = document.querySelector("div ul");
    function createLI(letter) {
      const li = document.createElement("li");
      if (letter !== " ") {
        li.classList.add("hide", "letter", letter);
        li.textContent = letter;
      } else {
        li.classList.add("hide", "space");
        li.textContent = letter;
      }
      return li;
    }
    for (let i = 0; i < this._phrase.length; i++) {
      phraseDisplay.appendChild(createLI(this._phrase[i]));
    }
  }

  checkLetter(letter) {
    if (this._phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  showMatchedLetter(letter) {
    const phraseLetters = document.querySelectorAll(".letter");
    if (this.checkLetter(letter)) {
      const matchingLetters = [...phraseLetters].filter(
        (phraseLet) => phraseLet.textContent === letter
      );
      matchingLetters.forEach((match) => {
        match.classList.remove("hide");
        match.classList.add("show");
      });
    }
  }
}
