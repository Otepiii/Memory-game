// api example of champion square assets
// http://ddragon.leagueoflegends.com/cdn/10.14.1/img/champion/Aatrox.png


const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard

function flipCard(){
    this.classList.add("flip");

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard= true;
        firstCard = this;    
    } else {
        // second click
        hasFlippedCard = false;
        secondCard=this;

        // do cards match?
        if (firstCard.dataset.framework === secondCard.dataset.framework)  {
            
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard)
        } else {
            setTimeout(() => {
// not a match
firstCard.classList.remove("flip");
secondCard.classList.remove("flip");
}, 1500)
            }   
    }
}

cards.forEach(card => card.addEventListener("click", flipCard))