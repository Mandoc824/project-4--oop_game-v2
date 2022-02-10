/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

"use strict";

//phrase class
class Phrase {
  constructor(phrase) {
    this._phrase = phrase.toLowerCase();
  }
  //this method will add the phrase to display
  //each letter is created as an HTML list item and pushed into the unorderlist in the phrase div
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

  //this will check if a button clicked on the keyword is in the phrase
  checkLetter(letter) {
    if (this._phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  //this will show the  matched letter by invoking the checkletter method and checking if the letter is in the phrase
  //if the input is in the phrase, the letter is shown
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
