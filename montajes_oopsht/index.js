const questions = {
    mechanical: [
        { question: "Unit of force", answer: "newton", clue: "Named after a famous scientist." },
        { question: "Energy cannot be created or destroyed (Law)", answer: "conservation", clue: "First law of thermodynamics." },
        { question: "Formula for stress", answer: "force/area", clue: "Think of pressure." },
        { question: "Hardest natural substance", answer: "diamond", clue: "Used in cutting tools." },
        { question: "Study of motion", answer: "kinematics", clue: "Starts with 'k' and ends with 's'." },
    ],
    electrical: [
        { question: "Unit of electric current", answer: "ampere", clue: "Starts with 'A'." },
        { question: "Stores electrical energy", answer: "capacitor", clue: "Starts with 'C'." },
        { question: "Ohm's law formula", answer: "v=ir", clue: "Basic law in electronics." },
        { question: "Resistance of a superconductor", answer: "zero", clue: "It's less than one." },
        { question: "AC stands for", answer: "alternating current", clue: "Not direct current." },
    ],
    industrial: [
        { question: "Kaizen meaning", answer: "improvement", clue: "Japanese term." },
        { question: "ERP full form", answer: "resource planning", clue: "Manages business processes." },
        { question: "Six Sigma", answer: "quality", clue: "Improves quality." },
        { question: "Gantt chart use", answer: "scheduling", clue: "Planning and tracking." },
        { question: "JIT stands for", answer: "just in time", clue: "Increases efficiency." },
    ],
    computer: [
        { question: "CPU stands for", answer: "processor", clue: "Brain of the computer." },
        { question: "RAM stands for", answer: "memory", clue: "Type of computer memory." },
        { question: "HTML stands for", answer: "markup", clue: "Language for creating web pages." },
        { question: "Finding software errors", answer: "debugging", clue: "Involves bugs." },
        { question: "Primary web development language", answer: "javascript", clue: "Alongside HTML and CSS." },
    ],
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswer = "";

function startGame(genre) {
    currentQuestions = questions[genre];
    currentQuestionIndex = 0;
    score = 0;
    userAnswer = "";
    document.getElementById('genre-selection').style.display = 'none';
    document.getElementById('trivia-container').style.display = 'block';
    displayQuestion();
}

function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function displayQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        const scrambledWord = scrambleWord(currentQuestion.answer.replace(/ /g, ""));
        document.getElementById('question').innerText = currentQuestion.question;
        document.getElementById('clue').innerText = "Clue: " + currentQuestion.clue;
        document.getElementById('letters-container').innerHTML = scrambledWord.split('').map(letter => `<span class="letter" onclick="selectLetter('${letter}')">${letter}</span>`).join('');
        document.getElementById('user-answer').innerText = '';
        document.getElementById('feedback').innerText = '';
        userAnswer = "";
    } else {
        endGame();
    }
}

function selectLetter(letter) {
    userAnswer += letter;
    document.getElementById('user-answer').innerText = userAnswer;
}

function submitAnswer() {
    const correctAnswer = currentQuestions[currentQuestionIndex].answer.toLowerCase().replace(/ /g, "");
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('feedback').innerText = 'Correct!';
    } else {
        document.getElementById('feedback').innerText = `Incorrect! The correct answer was "${currentQuestions[currentQuestionIndex].answer}".`;
    }
    currentQuestionIndex++;
    setTimeout(displayQuestion, 2000);
}

function endGame() {
    document.getElementById('trivia-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('score').innerText = `You scored ${score} out of ${currentQuestions.length}`;
}

function restartGame() {
    document.getElementById('score-container').style.display = 'none';
    document.getElementById('genre-selection').style.display = 'block';
}
