const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

const quoteText = document.querySelector('#js-quote-text');
const answerText = document.querySelector('#js-answer-text');

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

let currentAnswer = "";

newQuoteButton.addEventListener('click', getQuote);

answerButton.addEventListener('click', function (){
    answerText.textContent = currentAnswer;
});

function getQuote() {
    console.log("Button clicked!");

    fetch(endpoint)
       .then(response => {
        if (!response.ok) {
        throw Error("Error fetching data");
       }
       return response.json();
})

.then(data => {
    console.log(data);

    currentAnswer = data.answer;

    displayQuote(data.question);

    answerText.textContent = "";
})

.catch(error => {
    console.error(error);
    alert("Failed to fetch trivia. Try again!");
});

}

function displayQuote(quote) {
    quoteText.textContent = quote;
}

getQuote();