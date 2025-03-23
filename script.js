const questions = {
    math: [
        { question: "5 + 3 = ?", options: ["6", "8", "9", "7"], answer: "8" },
        { question: "10 - 4 = ?", options: ["6", "5", "7", "4"], answer: "6" }
    ],
    science: [
        { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
        { question: "H2O is the chemical formula for what?", options: ["Oxygen", "Water", "Hydrogen", "Helium"], answer: "Water" }
    ],
    history: [
        { question: "Who discovered America?", options: ["Columbus", "Newton", "Einstein", "Galileo"], answer: "Columbus" },
        { question: "Who was the first US president?", options: ["Lincoln", "Washington", "Obama", "Jefferson"], answer: "Washington" }
    ]
};

let currentCategory, currentQuestionIndex = 0, score = 0, timer;
const timeLeft = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options");
const scoreDisplay = document.getElementById("score");
const categorySelect = document.getElementById("category-selection");
const resultContainer = document.getElementById("result");
const themeToggle = document.getElementById("toggle-theme");

function startQuiz() {
    currentCategory = document.getElementById("category").value;
    currentQuestionIndex = 0;
    score = 0;
    categorySelect.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden"); // Hide result when starting a new quiz
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions[currentCategory].length) {
        endQuiz();
        return;
    }
    let q = questions[currentCategory][currentQuestionIndex];
    questionContainer.innerText = q.question;
    optionsContainer.innerHTML = "";
    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
    resetTimer();
}

function checkAnswer(selected) {
    if (selected === questions[currentCategory][currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function resetTimer() {
    clearInterval(timer); // Stop previous timer
    let time = 30;
    timeLeft.innerText = time;
    progressBar.style.width = "100%";

    timer = setInterval(() => {
        time--;
        timeLeft.innerText = time;
        progressBar.style.width = (time / 30) * 100 + "%";

        if (time <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer); // ✅ Stop Timer on Quiz Completion
    quizContainer.innerHTML = ""; // ✅ Remove question content
    quizContainer.innerHTML = `
        <h2>🎉 Congratulations! 🎉</h2>
        <p>Your score: <strong>${score}/${questions[currentCategory].length}</strong></p>
        <button id="restart-btn" onclick="restartQuiz()">Restart Quiz</button>
    `;
}


function restartQuiz() {
    location.reload();
}

startBtn.onclick = startQuiz;
themeToggle.onclick = () => document.body.classList.toggle("dark-mode");
