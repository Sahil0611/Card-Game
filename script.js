const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]; //an array of number representing pair of card values.
let flippedCards = []; //stores the currently flipped card
let matchedCards = []; //store the matched cards.
let canFlip = true; //flag to control if card can be flipped.

function createCard(number) {
  const card = document.createElement("div");
  card.classList.add("card"); //add the card class to the element.
  card.dataset.number = number; //set the data attributr number to store the card values.
  card.textContent = "???";
  card.addEventListener("click", flipCard);//call flipcard when clicked.
  return card;
}

function flipCard(){
  if (
    !canFlip ||
    flippedCards.length >= 2 ||
    this.classList.contains("flipped") ||
    matchedCards.includes(this)
  ) {
    return;
  } //check the condition to prevent flipping,
  //(a):if flipping is not allowed (b):if two card is already flipped.(c):if the card is already flipped.(d):if the card is already matched.
  this.classList.add("flipped"); //add the flipped class to the card.
  this.textContent = this.dataset.number; ////reveals the card no.
  flippedCards.push(this); //add to the fkipped card array

  // counter == 2
  if (flippedCards.length === 2) {
    //call check match if two card flipped.
    checkMatch();

  }
}



function checkMatch() {
  canFlip = false; //disable card flipping while checking.
  setTimeout(() => {
    const [card1, card2] = flippedCards; //destructure flippedcards to get the two flipped card.
    if (card1.dataset.number === card2.dataset.number) {
      matchedCards.push(card1, card2); //add the matching card to matched card.
      if (matchedCards.length === numbers.length) {
        alert("Congratulations! You won!");
      }
    } else {
      card1.classList.remove("flipped"); //remove the flipped class from the first card.
      card2.classList.remove("flipped"); //form the second class also.
      card1.textContent = "???";
      card2.textContent = "???";
    }
    flippedCards = []; //resets flipped card array
    canFlip = true; //re-enable card flipping
  }, 1000);
}

function initGame() {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.innerHTML = ""; // Clear the game board
  numbers.sort(() => Math.random() - 0.5);
  numbers.forEach((number) => {
    const card = createCard(number);
    gameBoard.appendChild(card);
  });
}

function resetGame() {
  flippedCards = [];
  matchedCards = [];
  canFlip = true;
  initGame();
}

document.getElementById("reset-button").addEventListener("click", resetGame);

initGame();
