// array of objects to represent quiz models:
const questions = [
    {
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: "O(log n)"
    },
    {
        question: "Which data structure follows the Last In, First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: "Stack"
    },
    {
        question: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
        options: ["Merge sort", "Quick sort", "Bubble sort", "Insertion sort"],
        correctAnswer: "Bubble sort"
    },
    {
        question: "What is the primary advantage of using a linked list over an array?",
        options: ["Constant-time random access", "Dynamic size", "Memory efficiency", "Cache locality"],
        correctAnswer: "Dynamic size"
    },
    {
        question: "Which data structure is suitable for implementing a priority queue?",
        options: ["Linked list", "Stack", "Queue", "Heap"],
        correctAnswer: "Heap"
    },
    
];

// keep track of current question and user score
let currentQuestion = 0;
let userScore = 0;

// DOM elements to interact with HTML
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
const resultsSection = document.getElementById("resultsSection");
const userScoreElement = document.getElementById("userScore");
const correctAnswersList = document.getElementById("correctAnswersList");

function showQuestion() {
    const currentQ = questions[currentQuestion]; // get current question object
    questionElement.textContent = currentQ.question; // set current question text

    // clear previous answers
    answersElement.innerHTML = "";

    // populate buttons for answer options
    currentQ.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.addEventListener("click", () => handleAnswerClick(option, event));
        answersElement.appendChild(button);
    });

    // show/hide navigation buttons based on the current question
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = currentQuestion === questions.length - 1;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showResults() {
    resultsSection.classList.remove("hidden");
    userScoreElement.textContent = `${userScore}/${questions.length}`;

    // display user's selected answers and correct answers
    questions.forEach((q, index) => {
        const li = document.createElement("li");
        const userAnswer = localStorage.getItem(`userAnswer${index}`);
        const userAnswerText = userAnswer ? `Your answer: ${capitalizeFirstLetter(userAnswer)}` : "Not answered";
        li.textContent = `Q${index + 1}: ${userAnswerText}, Correct answer: ${capitalizeFirstLetter(q.correctAnswer)}`;
        correctAnswersList.appendChild(li);
    });
}


function updateScore() {
    const currentQ = questions[currentQuestion];
    const selectedAnswer = document.querySelector('#answers button.selected');

    if (selectedAnswer) {
        // need to remove whitespace and lowercase
        const cleanedSelectedAnswer = selectedAnswer.textContent.trim().toLowerCase();
        const cleanedCorrectAnswer = currentQ.correctAnswer.trim().toLowerCase();

        localStorage.setItem(`userAnswer${currentQuestion}`, cleanedSelectedAnswer);

        // check if the cleaned selected answer is correct and update the score
        if (cleanedSelectedAnswer === cleanedCorrectAnswer) {
            userScore++;
        }
    }
}

function handleAnswerClick(selectedAnswer, event) {
    // remove the 'selected' class from all buttons
    const buttons = document.querySelectorAll('#answers button');
    buttons.forEach(button => button.classList.remove('selected'));

    // add the 'selected' class to the clicked button
    event.target.classList.add('selected');

    // store the selected answer in local storage
    localStorage.setItem(`userAnswer${currentQuestion}`, selectedAnswer);
}

function goToNextQuestion() {
    updateScore();

    // check if a button is selected
    const selectedAnswer = document.querySelector('#answers button.selected');
    if (!selectedAnswer) {
        alert("Please select an answer before moving to the next question.");
        return; // don't go to the next question if no answer is selected
    }

    currentQuestion++;
    showQuestion();
}


function goToPrevQuestion() {
    updateScore();
    currentQuestion--;
    showQuestion();
}

function submitQuiz() {
    updateScore();
    showResults();
}

prevButton.addEventListener("click", goToPrevQuestion);
nextButton.addEventListener("click", goToNextQuestion);
submitButton.addEventListener("click", submitQuiz);

showQuestion(); // show first question when page loads
