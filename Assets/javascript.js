const startQuiz = document.querySelector('.StartQuizbtn');
var timer = 90; 
var countDown;
const timerIdEl = document.getElementById('Timer');
const nextBtnEl = document.getElementById("nextbtn");
const questionAnswersEl = document.getElementById("questionanswers");
const page1 = document.querySelector(".Page1");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const displayAnswer = document.querySelector('.displayanswer');
const viewHighScores = document.getElementById('highscores-link'); 
const initialSubmitBtn = document.querySelector('.initialsubmitbtn');
const clearBtn = document.getElementById('clearbtn');
const initialSubmitEl = document.getElementById('initialssubmit'); 
const restartBtnEl = document.getElementById('restartbtn'); 
const yourScoreEl = document.getElementById('yourscore'); 
var viewHighScoresOnPage = JSON.parse(localStorage.getItem("listhighscoreslocalstorage")) || []; 
var questionSlides; 

//DONE - Timer 

function countDownFunction () {
    timer--;
    timerIdEl.textContent = "Time " + timer; 
    if (timer <= 0) {
        score();
    }
};

//DONE - sequence of events - click on StartQuizbtn event listener

startQuiz.addEventListener("click", startQuestionSlides);
nextbtn.addEventListener("click", () => {
    questionSlides++
    giveNextQuestion()
});

//DONE - To startQuestionSlides function

function startQuestionSlides () {
    var countDown = setInterval(countDownFunction, 1000);
    page1.classList.add("hidepage");
    questionSlides = questions
    questionAnswersEl.classList.remove("hidepage");

    countDownFunction();
    giveNextQuestion();
};

//DONE - To go to next question giveNextQuestion function 

function giveNextQuestion () {
    resetNextQuestion();
    showNextQuestion(questions[questionSlides]); // Instead of [questionSlides], it should be questions[questionSlides] 
};

//DONE - Start displaying questions showNextQuestion function

function showNextQuestion (questionDisplay) {
    questionEl.innerText = questionDisplay.questions
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
        nextBtnEl.classList.remove("hidepage")
        displayAnswer.classList.remove("hidepage")}
    else {
        startQuiz.classList.remove("hidepage")
        score();
    }
};

//Done - function 'score' to compute score based on time left and display to the user

function score () {
    clearInterval(countDown); 
    timerIdEl.textContent = "Time:" + timer;
    setTimeout(function () {
        questionAnswersEl.classList.add("hidepage");
        document.getElementById("name&scorepage").classList.remove("hidepage");
        document.getElementById("yourscore").textContent = "Your final score is" + timer;
    }, 2000)
}; 

//Done-function to get saved high scores from local storage 

var loadScores = function () {
    if (!viewHighScoresOnPage) {
        return false;
    }
    viewHighScoresOnPage = JSON.parse(viewHighScoresOnPage);
    var initials = document.querySelector("#initialssubmit").value;
    var newScore = {
        score: timer,
        initials: initials
    }

    viewHighScoresOnPage.push(newScore);
    console.log(viewHighScoresOnPage)

    viewHighScoresOnPage.forEach(score=> {
        initialSubmitEl.innerText = score.initials
        yourScoreEl.innerText = score.score
    })
};

//Done - Display high scores 

function displayHighScores (initials) {
    document.getElementById('high-scores').classList.remove("hidepage")
    document.getElementById('name&scorepage').classList.add("hidepage");
    page1.classList.add("hidepage");
    questionAnswersEl.classList.add("hidepage"); 
    if (typeof initials == "string") {
        var score = {initials, timer}
        viewHighScoresOnPage.push(score)
    }

    var highScoreEL = document.querySelector('.listhighscoreslocalstorage');
    highScoreEL.innerHTML = "";
    for (i = 0; i < viewHighScoresOnPage.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("Class", "name-div");
        div1.innerText = viewHighScoresOnPage[i].initials; 
        var div2 = document.createElement("div");
        div2.setAttribute("Class", "score-div");
        div2.innerText = viewHighScoresOnPage.timer; 

        highScoreEL.appendChild(div1); 
        highScoreEL.appendChild(div2);
    }
    
    localStorage.setItem("viewHighScoresOnPage", JSON.stringify(viewHighScoresOnPage));

};

//Done - View high scores - I may not need this because I have already linked the page with a new HTML 

viewHighScores.addEventListener("click", displayHighScores); 

initialSubmitBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initialssubmit").value; 
    displayHighScores(initials); 
}); 

//Done - Restart page

restartBtnEl.addEventListener("click", function (event) {
    window.location.reload();
});

//Questions at the bottom to avoid confusion 
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    document.querySelector("listhighscoreslocalstorage").innerHTML = "";
});
