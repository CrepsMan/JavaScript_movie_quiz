document.addEventListener('DOMContentLoaded', function () {
    const correctAnswers = {
        Q1: "Dumbledoor",
        Q2: "Christopher Nolan",
        Q3: "Michael Corleone",
        Q4: "Nemo",
        Q5: "Gal Gadot",
        Q6: "Star Wars",
        Q7: "Titanic",
        Q8: "Iron man",
        Q9: "pirates of the caribbean",
        Q10: "Lord of the Rings"
    };

    let currentQuestionIndex = 0;
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    const questions = document.querySelectorAll(".question");
    const nextBtn = document.getElementById("nextBtn");
    const scoreDisplay = document.getElementById("score");
    const progressBar = document.getElementById("progress-bar");
    const progressContainer = document.getElementById("progress-bar-container");

    questions[currentQuestionIndex].classList.add("active");

    questions.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const input = form.querySelector("input[type=text]");
            const questionId = form.id;
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = correctAnswers[questionId].toLowerCase();

            if (userAnswer === correctAnswer) {
                score++;
                updateProgressBar(true);
            } else {
                updateProgressBar(false);
            }

            form.querySelector("button[type=submit]").disabled = true;
            nextBtn.disabled = false;
        });
    });

    nextBtn.addEventListener("click", () => {
        questions[currentQuestionIndex].classList.remove("active");

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            questions[currentQuestionIndex].classList.add("active");
            nextBtn.disabled = true;
        } else {
            nextBtn.style.display = "none";
            displayResults();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !nextBtn.disabled) {
            nextBtn.click();
        }
    });

    function updateProgressBar(isCorrect) {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        if (isCorrect) {
            progressBar.style.width = `${progress}%`;
            progressBar.classList.add("correct");
        }
    }

    function displayResults() {
        const resultsDiv = document.getElementById("results");
        resultsDiv.textContent = `Quiz Completed! Your score: ${score}/${totalQuestions}`;
        scoreDisplay.textContent = `Your score: ${score}`;
        progressWrapper.style.display = "none";

    }
});
