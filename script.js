// Daftar pertanyaan kuis
const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Apa fungsi CSS dalam website?",
        answers: [
            "Menyimpan database",
            "Mengatur tampilan website",
            "Menghapus website",
            "Membuat komputer"
        ],
        correct: 1
    },
    {
        question: "Apa fungsi JavaScript?",
        answers: [
            "Mengatur interaksi website",
            "Mengganti perangkat komputer",
            "Membuat kabel internet",
            "Menghapus browser"
        ],
        correct: 0
    },
    {
        question: "Apa aplikasi yang digunakan untuk coding?",
        answers: [
            "Microsoft Paint",
            "Kalkulator",
            "Visual Studio Code",
            "Pemutar musik"
        ],
        correct: 2
    },
    {
        question: "Apa fungsi tag <h1> dalam HTML?",
        answers: [
            "Membuat gambar",
            "Membuat judul utama",
            "Membuat tabel",
            "Membuat tombol"
        ],
        correct: 1
    }
];

// Mengambil elemen HTML
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

// Variabel kuis
let currentQuestion = 0;
let score = 0;
let answered = false;

// Memulai kuis
startButton.addEventListener("click", function() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

// Menampilkan pertanyaan
function showQuestion() {
    answered = false;

    nextButton.classList.add("hidden");
    answerButtons.innerHTML = "";

    const question = questions[currentQuestion];

    questionNumber.textContent =
        "Pertanyaan " + (currentQuestion + 1) +
        " dari " + questions.length;

    scoreDisplay.textContent = "Skor: " + score;

    questionText.textContent = question.question;

    progressBar.style.width =
        (currentQuestion / questions.length * 100) + "%";

    question.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.textContent =
            String.fromCharCode(65 + index) + ". " + answer;

        button.classList.add("answer-btn");

        button.addEventListener("click", function() {
            checkAnswer(index, button);
        });

        answerButtons.appendChild(button);
    });
}

// Memeriksa jawaban
function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;

    if (selected === correctAnswer) {
        score += 20;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");

        answerButtons.children[correctAnswer]
            .classList.add("correct");
    }

    // Menonaktifkan semua tombol jawaban
    Array.from(answerButtons.children).forEach(function(button) {
        button.disabled = true;
    });

    scoreDisplay.textContent = "Skor: " + score;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Lihat Hasil"
        : "Pertanyaan Berikutnya";

    nextButton.classList.remove("hidden");
}

// Berpindah ke pertanyaan berikutnya
nextButton.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Menampilkan hasil akhir
function showResult() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    progressBar.style.width = "100%";

    finalScore.textContent = score + " / 100";

    if (score >= 80) {
        resultMessage.textContent =
            "Hebat! Pengetahuanmu sangat baik!";
    } else if (score >= 60) {
        resultMessage.textContent =
            "Bagus! Terus tingkatkan belajarmu!";
    } else {
        resultMessage.textContent =
            "Jangan menyerah! Ayo belajar lagi!";
    }
}

// Mengulang kuis
restartButton.addEventListener("click", function() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
