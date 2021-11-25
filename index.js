// ===== Buttons ===== //
const startBtn = document.getElementById('start');
const exitBtn = document.getElementById('exit');
const continueBtn = document.getElementById('continue');
const nextBtn = document.getElementById('next');
const replyBtn = document.getElementById('reply');
const quitBtn = document.getElementById('quit');

// ===== Boxes ===== //
const rulesBox = document.querySelector('.rules');
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.result_box');

// ===== Global variables ===== //
let que_count = 0;
let score = 0;
let counter, counterLine;
let timeValue = 15, widthValue = 0;

// Time and timeline selectors
const time = document.getElementById('time');
const timeText = document.getElementById('time-text');
const timeLine = document.getElementById('time-line');

// ===== Icons ===== //
const correctIcon = '<i class="far fa-check-circle"></i>';
const incorrectIcon = '<i class="far fa-times-circle"></i>';

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    rulesBox.classList.remove('hidden');
});

exitBtn.addEventListener('click', () => {
    rulesBox.classList.add('hidden');
    startBtn.classList.remove('hidden');
});

continueBtn.addEventListener('click', () => {
    rulesBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
});

nextBtn.addEventListener('click', () => {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
        queCounter(que_count + 1);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.classList.add('hidden');
        timeText.textContent = 'Time Left';
        if(que_count === questions.length - 1)
            nextBtn.textContent = 'Finish';
    } else {
        showResultBox();
    }
});

replyBtn.addEventListener('click', () => {
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    que_count = 0;
    score = 0;
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
    nextBtn.classList.add('hidden');
    nextBtn.textContent = 'Next Que';
    timeText.textContent = 'Time Left';
});

quitBtn.addEventListener('click', () => {
    window.location.reload();
});

function showQuestions(index) {
    const quizBody = document.querySelector('.quiz_box-body');

    quizBody.innerHTML = `
        <h1 class="question">${questions[index].numb}. ${questions[index].question}</h1>
        <ul class="option-list">
            <li class="option"><p class="question-text">${questions[index].options[0]}</p></li>
            <li class="option"><p class="question-test">${questions[index].options[1]}</p></li>
            <li class="option"><p class="question-test">${questions[index].options[2]}</p></li>
            <li class="option"><p class="question-text">${questions[index].options[3]}</p></li>
        </ul>
    `;

    const option = document.querySelectorAll('li.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    const optionList = document.querySelector('.option-list');
    const allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        answer.innerHTML += correctIcon;
        score++;
    } else {
        answer.classList.add('incorrect');
        answer.innerHTML += incorrectIcon;

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAnswer) {
                optionList.children[i].classList.add('correct');
                optionList.children[i].innerHTML += correctIcon;
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.remove('hidden');
}

function showResultBox() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    let scoreTag = '';
    if (score > questions.length - 2) {
        scoreTag = `<p>and congrats 🎉, You got <span>${score}</span> out of <span>${questions.length}</span></p>`;
    } else if (score > 1) {
        scoreTag = `<p>and nice 😎, You got <span>${score}</span> out of <span>${questions.length}</span></p>`;
    } else {
        scoreTag = `<p>and sorry 😐, You got only <span>${score}</span> out of <span>${questions.length}</span></p>`;
    }
    document.querySelector('.result_box-text').innerHTML = scoreTag;
    scoreTag = ''
}

function startTimer(count) {
    counter = setInterval(timer, 1000);

    function timer() {
        count--;
        time.textContent = count > 9 ? count : '0' + count;
        if (count <= 0) {
            clearInterval(counter);
            timeText.textContent = 'Time Off';

            let correctAnswer = questions[que_count].answer;
            const optionList = document.querySelector('.option-list');
            const allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent === correctAnswer) {
                    optionList.children[i].classList.add('correct');
                    optionList.children[i].innerHTML += correctIcon;
                }
            }

            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add('disabled');
            }
            nextBtn.classList.remove('hidden');
        }
    }
}

function startTimerLine(count) {
    counterLine = setInterval(timer, 15);

    function timer() {
        count += 0.1;
        timeLine.style.width = count + '%';
        if (count >= 100) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let queCounter = document.querySelector('.question-counter');
    queCounter.innerHTML = `<span>${index}</span> of <span>${questions.length}</span> Questions`;
}