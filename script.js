document.addEventListener('DOMContentLoaded', function () {
    const correctAnswers = {
        //core answers
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
    const questionCounter = document.getElementById("questionCounter");

    questions[currentQuestionIndex].classList.add("active");
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

    // Add event listener to all forms to handle the submission
    questions.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const input = form.querySelector("input[type=text]");
            const questionId = form.id;
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = correctAnswers[questionId].toLowerCase();

            // Disable submit button for this question
            form.querySelector('button[type="submit"]').disabled = true;

            // Check if the answer is correct
            if (userAnswer === correctAnswer) {
                score++;
                updateProgressBar(true);
            } else {
                updateProgressBar(false);
            }

            nextBtn.disabled = false;
            nextBtn.focus();
        });
    });

    nextBtn.addEventListener("click", () => {
        // Hide the current question
        questions[currentQuestionIndex].classList.remove("active");

        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            // Show the next question and update the question number
            questions[currentQuestionIndex].classList.add("active");
            questionIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
            nextBtn.disabled = true;

            // Clear the input field and focus on it
            const nextInput = questions[currentQuestionIndex].querySelector("input[type=text]");
            nextInput.value = "";
            nextInput.focus();
        } else {
            // All questions completed
            nextBtn.style.display = "none";
            displayResults();
        }
    });

    function updateProgressBar(isCorrect) {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        if (isCorrect) {
            progressBar.style.width = `${progress}%`;
        }
    }

    function displayResults() {
        const resultsDiv = document.getElementById("results");
        resultsDiv.textContent = `Quiz Completed! Your score: ${score}/${totalQuestions}`;
        scoreDisplay.textContent = `Your score: ${score}`;
    }
});
