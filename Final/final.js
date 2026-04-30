const targetDisplay = document.querySelector(".target");
const currentDisplay = document.querySelector(".current");


const dealButton = document.querySelector(".deal");
const lockButton = document.querySelector(".lock");

const input = document.querySelector(".targetInput");
const setButton = document.querySelector(".setTarget");

const flipInner = document.querySelector(".flip-card-inner");
const cardValue = document.querySelector(".card-value");

let busy = false;


function random(min, max){
    return Math.floor(Math.random()*(max-min+1))+ min;

}

class VolumeGamble {
    constructor(){
        this.current = 0;
        this.target = 0;
    }

    dealCard(){
        let difference = Math.abs(this.target- this.current);
        let change;

        if (difference >10){
            change = random(-5,10);
        }
        else{
            change = random(-2,2);
        }

        if (change === 0){
            change=-1;
        }

        this.current += change;

        if (this.current <0) this.current = 0;
        if (this.current >100) this.current = 100;
        return change;
    }
}

const game = new VolumeGamble();

currentDisplay.textContent = game.current;

setButton.addEventListener("click",()=>{
    let value = Number(input.value);

    if (value < 0 || value > 100 || isNaN(value))
    {
        alert("Enter a number between 0 and 100");
        return;
    }

    game.target= value;
    targetDisplay.textContent = game.target;

    game.current = 0;
    currentDisplay.textContent = game.current;
    document.querySelector(".card-value").textContent="0";
    lockButton.disabled= true;
})

let flipped = false;

dealButton.addEventListener("click", () => {

    if (busy) return;
    busy = true;

    
    if (!flipInner.classList.contains("flipped")) {

        flipInner.classList.add("flipped");

        setTimeout(() => {
            const change = game.dealCard();

            cardValue.textContent = change;
            currentDisplay.textContent = game.current;

            if (game.current === game.target) {
                lockButton.disabled = false;
            }

            busy = false;
        }, 400);

        return;
    }

    flipInner.classList.remove("flipped");
    busy = false;
});



lockButton.addEventListener("click", () => {
    cardValue.textContent = "locked";
    dealButton.disabled = true;
});