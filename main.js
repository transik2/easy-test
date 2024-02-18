let startBtn = document.querySelector("#start-btn");
let main = document.querySelector("main");
let correctAnswersOutput = document.querySelector("#correct-answers");
let wrongAnswersOutput = document.querySelector("#wrong-answers");
let timerOutput = document.querySelector("#timer");
let correctAnswers = 0;
let wrongAnswers = 0;
let baseTimer = 20;
let timer = baseTimer;
let operators = ["+", "*", "-","/"];
let isAnswered = false;
let correctAnswer;

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

startBtn.onclick = start;

function start() {
    setTimer();
    createQuestion();
}
function createQuestion() {
    let number_1 = getRandom(1, 100);
    let number_2 = getRandom(1, 100);
    let operator = operators[getRandom(0,3)];
    let operation = `${number_1} ${operator} ${number_2}`;
    correctAnswer = eval(operation);
    let answers = [];
    for (let i = 0; i < 5; i++) {
        answers.push(getRandom(-100, 300));
        if ( operator == "/") {
            answers[i] += Math.random().toFixed(1);
        }
    }
    if (operator == "/") {
        answers[getRandom(0,4)] = correctAnswer.toFixed(1);;
    }
    else {
        answers[getRandom(0,4)] = correctAnswer;
    }
    main.innerHTML = `
        <p id="question">${operation} =</p>
        <div id="buttons">
            <button onclick="checkAnswer(event)" class="var-btn">${answers[0]}</button>
            <button onclick="checkAnswer(event)" class="var-btn">${answers[1]}</button>
            <button onclick="checkAnswer(event)" class="var-btn">${answers[2]}</button>
            <button onclick="checkAnswer(event)" class="var-btn">${answers[3]}</button>
            <button onclick="checkAnswer(event)" class="var-btn">${answers[4]}</button>
        </div>
        <button id="next-btn" disabled onclick="next()">Дальше</button>
    `
}

function showResults() {
    main.innerHTML = `
    <h2> Ваш результат: </h2>
    <p>${correctAnswers} правильных ответов из ${correctAnswers + wrongAnswers}</p>
    <button onclick="start()">Начать заново</button>
    ` 
    timer = baseTimer;
    timerOutput.innerHTML = `00:${timer}`;
    correctAnswers = 0;
    correctAnswersOutput.innerHTML = `Правильно: ${correctAnswers}`;
    wrongAnswers = 0;
    wrongAnswersOutput.innerHTML = `Ошибок: ${wrongAnswers}`;

}

function setTimer() {
    let interval = setInterval(function() {
        timer--;
        if(timer == 0) 
            clearInterval(interval);
        if (timer < 10)
            timerOutput.innerHTML = `00:0${timer}`;
        else 
            timerOutput.innerHTML = `00:${timer}`;
    }, 1000) 
}

function checkAnswer(event) {
    if (!isAnswered) {
        let btn = event.target;
        if (btn.innerHTML == correctAnswer) {
            btn.classList.add("correct");
            correctAnswers++;
            correctAnswersOutput.innerHTML = `Правильно: ${correctAnswers}`;
        }
        else {
            btn.classList.add("wrong");
            wrongAnswers++;
            wrongAnswersOutput.innerHTML = `Ошибок: ${wrongAnswers}`;
        }
        document.querySelector("#next-btn").removeAttribute("disabled");
        isAnswered = true;
    }
}


function next() {
    isAnswered = false;
    if (timer == 0)
        showResults();
    else
        createQuestion();
}

