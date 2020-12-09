var finish = new Audio();
finish.src = "assets/File0114.mp3"
let start = document.querySelector(".overlay-text")

const ctx =  new (window.AudioContext || window.webkitAudioContext)();



start.addEventListener("click", () => {
    start.classList.remove("visible")
    var audio = new Audio();
audio.src = "assets/File0120.mp3";
var game = new Audio();
game.src = "assets/10CrystalScar.mp3"

const audioElement = ctx.createMediaElementSource(audio);
audioElement.connect(ctx.destination)
const gameElement = ctx.createMediaElementSource(game);
gameElement.connect(ctx.destination)
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
        var clickysound = new Audio();
clickysound.src = "assets/075_item_sightward_lux_obd_01.mp3"

const clickyElement = ctx.createMediaElementSource(clickysound);
clickyElement.connect(ctx.destination)
        clickysound.play()
        hasFlippedCard= true;
        firstCard = this;    
        
    
        return;

    }
        // second click
        var clickysound = new Audio();
clickysound.src = "assets/075_item_sightward_lux_obd_01.mp3"
        clickysound.play()

        const clickyElement = ctx.createMediaElementSource(clickysound);
clickyElement.connect(ctx.destination)
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
    var match = new Audio();
match.src = "assets/034_item_leviathan_buff_1.wav"

const matchElement = ctx.createMediaElementSource(match);
matchElement.connect(ctx.destination)
    match.play()
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    

    resetBoard();
}

function unflipCards() {
    lockboard = true;

    setTimeout(() => {
        // not a match
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        
        resetBoard();
        }, 1600)
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




