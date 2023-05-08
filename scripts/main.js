const dealerHandArray = [];
const playerHandArray = [];
const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

// Make the deck
for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});

// remove a random element from an array -----------------------------------------------------------------------------------------------------------------------
function removeRandom() {
  const random = Math.floor(Math.random() * deck.length);
  const removedCard = deck.splice(random, 1)[0];
  console.log(removedCard);
  return removedCard;
}

// shuffle function -----------------------------------------------------------------------------------------------------------------------
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// calculate points function -----------------------------------------------------------------------------------------------------------------------

function calculatePoints(array) {
  let totalPlayerPoints = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].pointValue === "jack") {
      array[i].pointValue = 10;
    } else if (array[i].pointValue === "queen") {
      array[i].pointValue = 10;
    } else if (array[i].pointValue === "king") {
      array[i].pointValue = 10;
    } else if (array[i].pointValue === "ace") {
      if (totalPlayerPoints <= 10) {
        array[i].pointValue = 11;
      } else {
        array[i].pointValue = 1;
      }
    }

    totalPlayerPoints += array[i].pointValue;
  }
  return totalPlayerPoints;
}

// Deal opening hands -----------------------------------------------------------------------------------------------------------------------

function getCardImage(card) {
  let newCard = document.createElement("img");
  newCard.src = `images/${card.rank}_of_${card.suit}.png`;
  return newCard;
}

const dealButton = document.querySelector("#deal-button");

dealButton.addEventListener("click", dealPlayerCards);

const playerPointDisplay = document.querySelector("#player-points");

function dealPlayerCards() {
  if (messagesDisplay.innerText === "You win.") {
    returnToDeck(playerHandArray, deck);
  } else if (messagesDisplay.innerText === "BUST 😩") {
    returnToDeck(playerHandArray, deck);
  } else if (messagesDisplay.innerText === "You lose.") {
    returnToDeck(playerHandArray, deck);
  } else {
    for (let i = 0; i < 2; i++) {
      const random = Math.floor(Math.random() * deck.length);
      const removedCard = deck.splice(random, 1)[0];
      console.log(removedCard);

      console.log(playerHandArray);

      playerHandArray.push(removedCard);

      getCardImage(removedCard);
      playerHand.append(getCardImage(removedCard));
    }
    console.log(calculatePoints(playerHandArray));

    playerPointDisplay.innerText = calculatePoints(playerHandArray);
  }
}
//  pointDisplay.append(calculatePoints(dealerHandArray));

dealButton.addEventListener("click", dealDealerCards);

const dealerPointDisplay = document.querySelector("#dealer-points");

function dealDealerCards() {
  if (messagesDisplay.innerText === "You win.") {
    returnToDeck(dealerHandArray, deck);
    messagesDisplay.innerText = "";
  } else if (messagesDisplay.innerText === "BUST 😩") {
    returnToDeck(dealerHandArray, deck);
    messagesDisplay.innerText = "";
  } else if (messagesDisplay.innerText === "You lose.") {
    returnToDeck(dealerHandArray, deck);
    messagesDisplay.innerText = "";
  } else {
    for (let i = 0; i < 2; i++) {
      const random = Math.floor(Math.random() * deck.length);
      const removedCard = deck.splice(random, 1)[0];
      console.log(removedCard);

      console.log(dealerHandArray);

      dealerHandArray.push(removedCard);

      getCardImage(removedCard);
      dealerHand.append(getCardImage(removedCard));
    }
    console.log(calculatePoints(dealerHandArray));

    dealerPointDisplay.innerText = calculatePoints(dealerHandArray);

    document.querySelector("#deal-button").disabled = true;
  }
}

// Hit me -----------------------------------------------------------------------------------------------------------------------

const hitButton = document.querySelector("#hit-button");

hitButton.addEventListener("click", hitMe);
function hitMe() {
  const random = Math.floor(Math.random() * deck.length);
  const removedCard = deck.splice(random, 1)[0];
  console.log(removedCard);

  console.log(playerHandArray);

  playerHandArray.push(removedCard);

  getCardImage(removedCard);
  playerHand.append(getCardImage(removedCard));
  playerPointDisplay.innerText = calculatePoints(playerHandArray);

  playerBustCheck(playerHandArray);

  if (calculatePoints(playerHandArray) > 21) {
    document.querySelector("#hit-button").disabled = true;
  } else {
    document.querySelector("#hit-button").disabled = false;
  }
}

// BUST function

const messagesDisplay = document.querySelector("#messages");

function playerBustCheck(array) {
  if (calculatePoints(array) > 21) {
    messagesDisplay.innerText = "BUST 😩";

    document.querySelector("#deal-button").disabled = false;
    document.querySelector("#stand-button").disabled = true;
  } else {
    messagesDisplay.innerText = "";
  }
}

function dealerBustCheck(array) {
  if (calculatePoints(array) > 21) {
    messagesDisplay.innerText = "DEALER BUST 😩";
  } else {
    messagesDisplay.innerText = "";
  }
}

// STAND

const standButton = document.querySelector("#stand-button");

standButton.addEventListener("click", stand);

function stand() {
  do {
    const random = Math.floor(Math.random() * deck.length);
    const removedCard = deck.splice(random, 1)[0];
    console.log(removedCard);

    console.log(dealerHandArray);

    dealerHandArray.push(removedCard);

    getCardImage(removedCard);
    dealerHand.append(getCardImage(removedCard));
  } while (calculatePoints(dealerHandArray) < 17);
  dealerPointDisplay.innerText = calculatePoints(dealerHandArray);

  if (calculatePoints(dealerHandArray) > 21) {
    messagesDisplay.innerText = "You win.";
    document.querySelector("#deal-button").disabled = false;
  } else if (calculatePoints(dealerHandArray) <= 21) {
    if (calculatePoints(dealerHandArray) > calculatePoints(playerHandArray)) {
      messagesDisplay.innerText = "You lose.";
      document.querySelector("#deal-button").disabled = false;
    } else {
      messagesDisplay.innerText = "You win.";
      document.querySelector("#deal-button").disabled = false;
    }
  }
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
}

function returnToDeck(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    array2.push(array1[i]);
  }
  for (let i = 0; i < array1.length; i) {
    array1.pop(array1[i]);
  }
}
