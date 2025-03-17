const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        choices: ["Java", "Python", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for Gold?",
        choices: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the largest organ in the human body?",
        choices: ["Heart", "Brain", "Liver", "Skin"],
        correct: 3
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        choices: ["Brazil", "Australia", "Indonesia", "Thailand"],
        correct: 1
    },
    {
        question: "What is the square root of 144?",
        choices: ["10", "12", "14", "16"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedChoice = -1;
let userAnswers = [];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    
    choicesEl.innerHTML = "";
    question.choices.forEach((choice, index) => {
        const button = document.createElement("div");
        button.className = "choice";
        button.textContent = choice;
        button.addEventListener("click", () => selectChoice(index));
        choicesEl.appendChild(button);
    });
}

function selectChoice(index) {
    selectedChoice = index;
    document.querySelectorAll(".choice").forEach((choice, idx) => {
        choice.classList.toggle("selected", idx === index);
    });
}

function showResults() {
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    scoreEl.textContent = `${score} out of ${quizData.length}`;

    const reviewEl = document.getElementById("answer-review");
    reviewEl.innerHTML = "";

    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement("div");
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        const questionText = document.createElement("p");
        questionText.className = "question-text";
        questionText.textContent = `Question ${index + 1}: ${question.question}`;
        
        const answerText = document.createElement("p");
        if (isCorrect) {
            answerText.innerHTML = `Your answer: <span class="correct-answer">${question.choices[userAnswer]}</span> ✓`;
        } else {
            answerText.innerHTML = `Your answer: <span class="wrong-answer">${question.choices[userAnswer]}</span> ✗<br>` +
                                 `Correct answer: <span class="correct-answer">${question.choices[question.correct]}</span>`;
        }
        
        reviewItem.appendChild(questionText);
        reviewItem.appendChild(answerText);
        reviewEl.appendChild(reviewItem);
    });
}

submitBtn.addEventListener("click", () => {
    if (selectedChoice === -1) {
        alert("Please select an answer!");
        return;
    }

    userAnswers.push(selectedChoice);

    if (selectedChoice === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    selectedChoice = -1;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    selectedChoice = -1;
    userAnswers = [];
    quizEl.style.display = "block";
    resultsEl.style.display = "none";
    loadQuestion();
});

// Start the quiz
loadQuestion();
