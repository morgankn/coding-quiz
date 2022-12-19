var startButton = document.getElementById('start');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer-btn');
var nextButton = document.getElementById('next');
var timerEl = document.getElementById('timer');
var resultsEl =document.getElementById('results');
var scoreEl = document.getElementById('score');
var inputEl = document.getElementById('username');

var score = 0;
var roundTime = 30;
var quizTimer;
let shuffleQuestions, currentQuestionIndex
var correct_answers = 5;


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
roundTime = 30;
startTimer();
score = 0;
startButton.classList.add('hide')
shuffleQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerEl.classList.remove('hide')
setNextQuestion()
}

function startTimer(){
    timerEl.textContent = roundTime;
    quizTimer =setInterval(function(){
    roundTime--;
    timerEl.textContent = roundTime;
    if(roundTime <= 0){
        gameOver();
    }
    },1000)
}

function incrementScore(number){
    score +=number;
    scoreEl.innerText = score;
    }
   
    
function gameOver(){
    clearInterval(quizTimer);
    resultsEl.classList.remove('hide')
    inputEl.classList.remove('hide')
    resultsEl.addEventListener('click', addScore)
    localStorage.getItem('score')

    // display input and button for input give onclick that saves the score to local storage 
    // Make a button that lets you view high score 
} 
 function addScore(event){
    var previousScore = JSON.parse(localStorage.getItem("score")) || []
      var recentScore = {
      user: inputEl.value,
      score: score
     }
     previousScore.push(recentScore)
    localStorage.setItem("score", JSON.stringify(previousScore))
     console.log("this saves the game");
 }
        
//    var recentScore = localStorage.getItem('score');
//    console.log("this saves the game");

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}
function showQuestion(question) {
    questionEl.innerText =question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if(answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerEl.appendChild(button)
})
}

function resetState() {
    clearStatusClass(document.body)
    inputEl.classList.add('hide')
    nextButton.classList.add('hide')
    resultsEl.classList.add('hide')
    
    while(answerEl.firstChild) {
        answerEl.removeChild
        (answerEl.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    console.log(correct)
    if(!correct) {
        roundTime -= 5;
        timerEl.textContent = roundTime;
    } else {
        incrementScore(correct_answers);
    }
    setStatusClass(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentQuestionIndex +1){
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        gameOver();
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }  
}
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions = [
    {
     question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
            {text: '<script>', correct: true},
            {text: '<js>', correct:false},
            {text: '<java>', correct:false},
            {text: '<p>', correct:false},
        ]
    },
    {
    question: 'JavaScript is a ___ -side programming language.',
    answers: [
        {text: 'client', correct: false},
        {text: 'server', correct:false},
        {text: 'both', correct:true},
        {text: 'none', correct:false},
    ]
},
    {question: 'What is a useful tool for debugging in Javascript?',
    answers: [
    {text: 'Check the CSS', correct: false},
    {text: 'Run a function', correct:false},
    {text: 'Push to Git Hub', correct:false},
    {text: 'console.log', correct:true},
    ]
 },  {question: 'How do you write "Hello World" in an alert box?',
 answers: [
 {text: 'msgBox("Hello World")', correct: false},
 {text: 'alertBox("Hello World")', correct:false},
 {text: 'msg("Hello World")', correct:false},
 {text: 'alert("Hello World")', correct:true},
 ]
}
]