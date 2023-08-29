const startQuiz = document.querySelector('.StartQuiz');
const timer = 90; 
var timercountdown;
const timerIdEl = document.getElementById('Timer');
const nextBtnEl = document.getElementById("nextbtn");
const questionAnswersEl = document.getElementById("questionanswers");
const page1 = document.querySelector(".Page1");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const displayAnswer = document.querySelector('.displayanswer');
const viewHighScores = document.querySelector('.Viewhighscores'); //re-check this later
const initialSubmitBtn = document.querySelector('.initialsubmitbtn');
const clearBtn = document.querySelector('.clearbtn');
const initialSubmitEl = document.getElementById('initialssubmit'); 
const restartBtnEl = document.getElementById('restartbtn'); 
const yourScoreEl = document.getElementById('yourscore'); //re-check this later
var viewHighScoresOnPage = JSON.parse(localStorage.getItem("listhighscoreslocalstorage")) || []; //re-check this later
var questionSlides; 

//DONE - Timer 

function countDownFunction () {
    timer--;
    timerIdEl.textContent = "Time" + timer; 
    if (timer <= 0) {
        score();
    }
};

//DONE - sequence of events - click on StartQuizbtn event listener

startQuiz.addEventListener("Click", startQuestionSlides);
nextbtn.addEventListener("Click", () => {
    questionSlides++
    giveNextQuestion()
});

//DONE - To startQuestionSlides function

function startQuestionSlides () {
    timerCountDown = setInterval(countDownFunction, 1000);
    page1.classList.add("hidepage");
    questionSlides = questions
    questionAnswersEl.classList.remove("hidepage");

    countDownFunction();
    giveNextQuestion();
};

//DONE - To go to next question giveNextQuestion function 

function giveNextQuestion () {
    resetNextQuestion();
    showNextQuestion([questionSlides]);
};

//DONE - Start displaying questions showNextQuestion function

function showNextQuestion (questionDisplay) {
    questionEl.innerText = questionDisplay.question
    questionDisplay.answer.forEach(answer => {
        var button = document.createElement ("button")
        button.innerText = answer.text
        button.classList.add("answerbtn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answersEl.appendChild(button)
        
    });
};

//Done - resetNextQuestion function

function resetNextQuestion () {
    nextBtnEl.classList.add("hidepage")
    displayAnswer.classList.add("hidepage")
    while (answersEl.firstChild) {
        answersEl.removeChild
        (answersEl.firstChild)
    }
};

//DONE - function selectAnswer to check if answer is correct or wrong, display message to user

    // not using this as dont want to change colors with wrong answer 
    //Array.from(answersEl.children).forEach (button => {
    //    setStatusClass(button, button.dataset.correct)})
    //not using shuffled question option
    //not creating -  function setStatusClass to show correct answer by changing button color

function selectAnswer(e) {
    var selectedButton = e.target; 
    var correct = selectedButton.dataset.correct;
    displayAnswer.classList.remove("hidepage")
    if (correct) {
        displayAnswer.innerHTML = "That's correct!";
    }
    else {
        displayAnswer.innerHTML = "Incorrect answer!";
        if (timer <= 10) {
            timer = 0; 
        } else {
            timer -= 10; 
        }
    }
    
    if (questionSlides > 0) {
        nextBtnEl.classList.remove("higepage")
        displayAnswer.classList.remove("hidepage")}
    else {
        startQuiz.classList.remove("hidepage")
        score();
    }
};

//Done - function 'score' to compute score based on time left and display to the user

function score () {
    clearInterval(timercountdown); 
    timerIdEl.textContent = "Time:" + timer;
    setTimeout(function () {
        questionAnswersEl.classList.add("hidepage");
        document.getElementById("name&scorepage").classList.remove("higepage");
        document.getElementById("yourscore").textContent = "Your final score is" + timer;
    }, 2000)
}; 

//Done-function to get saved high scores from local storage 

var loadScores = function () {
    if (!savedScores) {
        return false;
    }
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initialssubmit").value;
    var newScore = {
        score: timer,
        initials: initials
    }

    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score=> {
        initialSubmitEl.innerText = score.initials
        yourScoreEl.innerText = score.score
    })
};

//Display high scores  - check code line 181 & 182 which is trying to hide and unhide sections 
//which is not applicable for my code as I have created a separate HTML page for high scores 

function displayHighScores (initials) {
    page1.classList.add("hidepage");
    questionAnswersEl.classList.add("hidepage"); 
    if (typeof initials == "string") {
        var score = {initials, timer}
        viewHighScoresOnPage.push(score)
    }

    //this function is not yet complete - refer to code line 192 onwards

}



//Questions at the bottom to avoid confusion 

const questions = [
    {
        number: 1,
        question: "The condition if an if / else statement is enclosed with_____________.",
        answers: [
            {Text: "Quotes", correct: false},
            {Text: "Curly Brackets", correct: true},
            {Text:"Parenthesis", correct: false},
            {Text: "Square Brackets", correct: false},
        ]

    },
    {
        number: 2,
        question: "Commonly used data types DO Not include:",
        answers: [
            {Text: "Strings", correct: false},
            {Text: "Booleans", correct: false},
            {Text:"Alerts", correct: true},
            {Text: "Numbers", correct: false},
        ]

    },
    {
        number: 3,
        question: "Arrays in JavaScript can be used to store_____________.",
        answers: [
            {Text: "Number and strings", correct: false},
            {Text: "Other arrays", correct: false},
            {Text:"Booleans", correct: false},
            {Text: "All the above", correct: true},
        ]

    },
    {
        number: 4,
        question: "String values must be enclosed within __________ when being assinged to variables.",
        answers: [
            {Text: "Commas", correct: false},
            {Text: "Curly brackets", correct: false},
            {Text:"Quotes", correct: true},
            {Text: "Parenthsis", correct: false},
        ]

    },
    {
        number: 5,
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        answers: [
            {Text: "JavaScript", correct: false},
            {Text: "Terminal/Bash", correct: false},
            {Text:"For loops", correct: false},
            {Text: "Console.log", correct: true},
        ]

    },
];
