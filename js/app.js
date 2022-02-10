/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const phrase1 = new Phrase("Like a Jew");
const phrase2 = new Phrase("Living is Loving");
const phrase3 = new Phrase("Living Like a Pimp");
const phrase4 = new Phrase("You Only Live Once");
const phrase5 = new Phrase("Eren Jeager");
const totalPhrases = [phrase1, phrase2, phrase3, phrase4, phrase5];

const game = new Game(totalPhrases);

const startButton = document.getElementById("btn__reset");

startButton.addEventListener("click", (e) => {
  game.startGame();
});

const keyboard = document.querySelector("#qwerty");

keyboard.addEventListener("click", (e) => {
  const keys = document.querySelectorAll(".key");
  for (let i = 0; i < keys.length; i++) {
    if (e.target.textContent === keys[i].textContent)
      game.handleInteraction(e.target);
  }
});
