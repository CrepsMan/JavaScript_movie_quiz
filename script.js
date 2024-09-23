document.addEventListener('DOMContentLoaded', function () {
    const correctAnswers = {
        Q1: "Dumbledore",
        Q2: "Christopher Nolan",
        Q3: "Michael Corleone",
        Q4: "Finding Nemo",
        Q5: "Gal Gadot",
        Q6: "Star Wars",
        Q7: "Titanic",
        Q8: "Tony Stark",
        Q9: "Pirates of the Caribbean",
        Q10: "Lord of the Rings"
    };

    let currentQuestionIndex = 0;
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    const questions = document.querySelectorAll(".question");
    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.getElementById("progress-bar");
    const questionCounter = document.getElementById("questionCounter");
    const resultsDiv = document.getElementById("results");
    const restartBtn = document.getElementById("restart");
    const resultsMessage = document.getElementById("resultsMessage");

    // Hide restart button initially
    restartBtn.style.display = "none";
    resultsDiv.style.visibility = "hidden";  // Hide the results initially

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
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
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

    restartBtn.addEventListener("click", restartQuiz);

    function updateProgressBar(isCorrect) {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        if (isCorrect) {
            progressBar.style.width = `${score * 10}%`;
        }
    }

    function displayResults() {
        resultsMessage.textContent = `Quiz Completed! Your score: ${score}/${totalQuestions}`;
        resultsDiv.style.visibility = "visible";

        // Show restart button
        restartBtn.style.display = "block";
    }

    function restartQuiz() {//resets/restarts quiz

        currentQuestionIndex = 0;
        score = 0;

        resultsDiv.style.visibility = "hidden";
        restartBtn.style.display = "none";
        nextBtn.style.display = "block";

        progressBar.style.width = '0%';

        questions.forEach((form) => {
            form.querySelector("input[type=text]").value = "";
            form.querySelector('button[type="submit"]').disabled = false;
            form.classList.remove("active"); 
        });

        questions[0].classList.add("active");
        questionCounter.textContent = `Question 1 of ${totalQuestions}`;
        nextBtn.disabled = true;
    }
    
});
