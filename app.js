let start = document.querySelector(".overlay-text")


start.addEventListener("click", () => {
    start.classList.remove("visible")
    var sound = new Pizzicato.Sound({ 
        source: 'file',
        options: { path: ['assets/File0120.mp3' ] }
    }, function() {
        console.log('sound file loaded!');
        sound.play()
    });
    var game = new Pizzicato.Sound({ 
        source: 'file',
        options: { path: ['assets/10CrystalScar.mp3' ] }
    }, function() {
        console.log('game sound file loaded!');
        game.play()
    });
    // sound.play();
    // game.play();
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
        var click = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: ['assets/075_item_sightward_lux_obd_01.mp3' ] }
        }, function() {
            console.log('click sound file loaded!');
            click.play()
        });
        hasFlippedCard= true;
        firstCard = this;    
        
    
        return;

    }
        // second click
        var click = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: ['assets/075_item_sightward_lux_obd_01.mp3' ] }
        }, function() {
            console.log('click sound file loaded!');
            click.play()
        });
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
    var match = new Pizzicato.Sound({ 
        source: 'file',
        options: { path: ['assets/034_item_leviathan_buff_1.wav' ] }
    }, function() {
        console.log('matched cards sound file loaded!');
        match.play()
    });
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




