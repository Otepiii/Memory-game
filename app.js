// api example of champion square assets
// http://ddragon.leagueoflegends.com/cdn/10.14.1/img/champion/Aatrox.png

var audio = document.querySelector("#foobar")
var game = document.querySelector("#gamesound")
var clickysound = document.querySelector("#click")
var finish = document.querySelector("#finish")
var match = document.querySelector("#match")
let start = document.querySelector(".overlay-text")


start.addEventListener("click", () => {
    start.classList.remove("visible")
    audio.play();
    game.play();
})

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockboard = false; // variable to lock the cards if the clicked cards are not a match and renders the board not clickable for the time being
let firstCard, secondCard


function flipCard(){


    if (lockboard) return; //if lockboard is true this will return and not execute the rest of the function
    if ( this === firstCard) return; //this checks if the same card is clicked twice then it will return from the function

    this.classList.add("flip");

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard= true;
        firstCard = this;    
        clickysound.play()
    
        return;

    }
        // second click
        clickysound.play()
        hasFlippedCard = false;
        secondCard=this;

        checkForMatch();
}

function checkForMatch() {
    // clickysound.play()
    let isMatch = firstCard.dataset.framework === 
        secondCard.dataset.framework;
      
        isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    match.play()

    resetBoard();
}

function unflipCards() {
    lockboard = true;

    setTimeout(() => {
        // not a match
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        
        resetBoard();
        }, 1500)
}

function resetBoard() { // this resets the board , first and second card to false and null using es6 destructuring assignment
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {  // this functions shuffles the card randomly and sets their positions by order
    cards.forEach(card => { // foreach function makes the function go through each card
        let randomPos = Math.floor(Math.random() * 12);// math.floor rounds the number to a whole number //math.random generates a random number to multipy by 12
        card.style.order = randomPos; // this assigns the order position of each cards
    });
})(); // by wrapping the function in a parenthesis and then writing a open and closed parenthesis right after it
        // and makes it a IIFE (immediately invoked function expression) which means this function will be executed right after its definition


cards.forEach(card => card.addEventListener("click", flipCard));




