var startButton = document.getElementById('start');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer-btn');
var nextButton = document.getElementById('next');
var timerEl = document.getElementById('timer');
var resultsEl =document.getElementById('results');


var roundTime = 30;
var quizTimer;
let shuffleQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
startTimer();
startButton.classList.add('hide')
shuffleQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerEl.classList.remove('hide')
setNextQuestion()
}

function startTimer(){
    quizTimer =setInterval(){

    }
}
    






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
    nextButton.classList.add('hide')
    while(answerEl.firstChild) {
        answerEl.removeChild
        (answerEl.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentQuestionIndex +1){
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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
 }
]