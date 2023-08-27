const StartQuiz = document.querySelector('.StartQuiz');
const timer = 90; 
const timerID; 


const Questions = [
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
        question: "Commonly used data types DO Not include:The condition if an if / else statement is enclosed with_____________.",
        Options: ["Strings","Booleans","Alerts","Numbers"]

    },
    {
        number: 3,
        question: "Arrays in JavaScript can be used to store_____________.",
        Options: ["Number and strings","Other arrays","Booleans","All the above"]

    },
    {
        number: 4,
        question: "String values must be enclosed within __________ when being assinged to variables.",
        Options: ["Commas","Curly brackets","Quotes","Parenthsis"]

    },
    {
        number: 5,
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        Options: ["JavaScript","Terminal/Bash","For loops","Console.log"]

    },
];

StartQuiz.addEventListener("Click", quizQuestions);
