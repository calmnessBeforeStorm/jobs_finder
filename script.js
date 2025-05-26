const questions = [
    {
        question: "Вы чувствуете себя энергичнее после общения с другими людьми?",
        answers: [
            { text: "Да", type: "экстраверт" },
            { text: "Нет", type: "интроверт" }
        ]
    },
    {
        question: "Вам комфортно проводить время в одиночестве?",
        answers: [
            { text: "Да", type: "интроверт" },
            { text: "Нет", type: "экстраверт" }
        ]
    },
    {
        question: "Вы предпочитаете думать прежде, чем говорить?",
        answers: [
            { text: "Да", type: "интроверт" },
            { text: "Нет", type: "экстраверт" }
        ]
    },
    {
        question: "Вы любите быть в центре внимания?",
        answers: [
            { text: "Да", type: "экстраверт" },
            { text: "Нет", type: "интроверт" }
        ]
    },
    {
        question: "Вы быстрее заряжаетесь энергией наедине или с другими?",
        answers: [
            { text: "Наедине", type: "интроверт" },
            { text: "С другими", type: "экстраверт" }
        ]
    },
    {
        question: "Вы предпочитаете работать в команде или самостоятельно?",
        answers: [
            { text: "Самостоятельно", type: "интроверт" },
            { text: "В команде", type: "экстраверт" }
        ]
    },
    {
        question: "Вы часто обдумываете ситуацию прежде чем действовать?",
        answers: [
            { text: "Да", type: "интроверт" },
            { text: "Нет", type: "экстраверт" }
        ]
    },
    {
        question: "Вы чувствуете себя некомфортно в больших компаниях?",
        answers: [
            { text: "Да", type: "интроверт" },
            { text: "Нет", type: "экстраверт" }
        ]
    },
    {
        question: "Вы любите насыщенные выходные с друзьями?",
        answers: [
            { text: "Да", type: "экстраверт" },
            { text: "Нет", type: "интроверт" }
        ]
    },
    {
        question: "После долгого дня вы предпочли бы:",
        answers: [
            { text: "Побыть в тишине и отдохнуть", type: "интроверт" },
            { text: "Встретиться с друзьями", type: "экстраверт" }
        ]
    }
];

const muteBtn = document.getElementById("mute-btn");

function updateMuteButton() {
    muteBtn.textContent = music.muted ? "🔇" : "🔊";
}

muteBtn.addEventListener("click", () => {
    music.muted = !music.muted;
    localStorage.setItem("isMuted", music.muted);
    updateMuteButton();
});



let currentQuestion = parseInt(localStorage.getItem('currentQuestion') || '0');
let scores = JSON.parse(localStorage.getItem('scores')) || { интроверт: 0, экстраверт: 0 };
let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

const questionContainer = document.getElementById("question-container");
const resultDiv = document.getElementById("result");
const animeGif = document.getElementById("anime-gif");
const progressBar = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");


const dancingGirlGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RLJxQtX8Hs7XytaoyX/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mJIa7rg9VPEhzU1dyQ/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HZboJ5Pkti9k4/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NmRBAYeblCnf9MHBX8/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11lxCeKo6cHkJy/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10YWqUivkQPeeJWD3u/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FtemFyd3ZwZm80bHM5Z2IxZW41cDNveDExMmF1aG9pNnI0NGs5MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JPBRglxTOL1NtkDKJp/giphy.gif",
    "https://media.giphy.com/media/FGPbhxVgMh3rO/giphy.gif?cid=ecf05e47zgeo0gtcm03ecyurkehot8pct925y05wgdylzwn7&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/13mmPbESdtOFC8/giphy.gif?cid=ecf05e47zgeo0gtcm03ecyurkehot8pct925y05wgdylzwn7&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/k7J8aS3xpmhpK/giphy.gif?cid=ecf05e47zgeo0gtcm03ecyurkehot8pct925y05wgdylzwn7&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/a6pzK009rlCak/giphy.gif?cid=ecf05e47zgeo0gtcm03ecyurkehot8pct925y05wgdylzwn7&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXQzMm1vejl4M2RobnU0b3ltMTc4ZHhraTYyYjJjZjg5OWIwOHNkMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/maZHPccdCgVEI/giphy.gif"
];

const narutoGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGRpeDlxdzVxZ3pqMmN0cXg3c3AzOHZ3MXJ2amtjMzcxYWdtMm41aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8MyXEVgue4ucw/giphy.gif";
const kanekiGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWoxMDdmaDNlZXd4aHkyYWJoa3A0dXFqcHNqNTYzOWRrb3ZsZWJuaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8lYUxeF0X2jxpt1ijq/giphy.gif";


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(dancingGirlGifs);

function showQuestion() {
    const q = questions[currentQuestion];
    questionContainer.innerHTML = `<p>${q.question}</p>`;

    // Показываем гифку без повторений
    if (currentQuestion < dancingGirlGifs.length) {
        animeGif.src = dancingGirlGifs[currentQuestion];
    }

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => handleAnswer(answer.type);
        questionContainer.appendChild(btn);
    });
}

preloadGifs([...dancingGirlGifs, narutoGif, kanekiGif]);

function preloadGifs(gifs) {
    gifs.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function saveProgress() {
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionContainer.innerHTML = `<p>${q.question}</p>`;
    progressBar.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;

    animeGif.src = dancingGirlGifs[currentQuestion % dancingGirlGifs.length];

    if (q.scale) {
        const scaleContainer = document.createElement("div");
        scaleContainer.className = "scale-input";
        for (let i = 1; i <= 5; i++) {
            const input = document.createElement("input");
            input.type = "button";
            input.value = i;
            input.onclick = () => handleAnswer(q.type, i);
            scaleContainer.appendChild(input);
        }
        questionContainer.appendChild(scaleContainer);
    } else {
        q.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.textContent = answer.text;
            btn.onclick = () => handleAnswer(answer.type);
            questionContainer.appendChild(btn);
        });
    }

    backBtn.classList.toggle("hidden", currentQuestion === 0);
    nextBtn.classList.add("hidden");
    saveProgress();
}

function handleAnswer(type, scaleValue = null) {
    if (scaleValue) {
        scores[type] += scaleValue > 3 ? 1 : 0;
        userAnswers[currentQuestion] = { type, scaleValue };
    } else {
        scores[type]++;
        userAnswers[currentQuestion] = { type };
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
    saveProgress();
}

backBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
};

function showResult() {
    // Показываем результат
    questionContainer.classList.add("hidden");
    animeGif.classList.remove("hidden");
    resultDiv.classList.remove("hidden");

    const isIntrovert = scores["интроверт"] > scores["экстраверт"];
    animeGif.src = isIntrovert ? kanekiGif : narutoGif;

    const resultText = isIntrovert
        ? "Вы интроверт — предпочитаете уединение и спокойствие."
        : "Вы экстраверт — получаете энергию от общения и активности.";

    resultDiv.innerHTML = `<h2>${resultText}</h2>`;

    // Сброс данных
    localStorage.clear();
    currentQuestion = 0;
    scores = { интроверт: 0, экстраверт: 0 };
    userAnswers = [];

    // ⏳ Через паузу сбрасываем всё и начинаем заново
    setTimeout(() => {
        resultDiv.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();
    }, 5000); // 5 секунд показа результата
}


// Получаем элемент <audio>
const music = document.getElementById("bg-music");

// Состояние из localStorage
const savedMute = localStorage.getItem("isMuted");
if (savedMute !== null) {
    music.muted = savedMute === "true";
}

// Обновляем иконку звука
function updateMuteButton() {
    const muteBtn = document.getElementById("mute-btn");
    muteBtn.textContent = music.muted ? "🔇" : "🔊";
}

// Обработчик кнопки звука
document.getElementById("mute-btn").addEventListener("click", () => {
    music.muted = !music.muted;
    localStorage.setItem("isMuted", music.muted);
    updateMuteButton();
});

// Запуск воспроизведения после взаимодействия пользователя
document.addEventListener("DOMContentLoaded", () => {
    updateMuteButton();
    setTimeout(() => {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.warn("Фоновая музыка заблокирована браузером до взаимодействия.");
            });
        }
    }, 100);
});


showQuestion();