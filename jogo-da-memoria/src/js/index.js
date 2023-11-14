const endGame = document.querySelector(".end-game");
const emojis = [
    "🦁",
    "🦁",
    "🐯",
    "🐯",
    "🦝",
    "🦝",
    "🐷",
    "🐷",
    "🐻",
    "🐻",
    "🐶",
    "🐶",
    "🦊",
    "🦊",
    "🐸",
    "🐸",
    "🐵",
    "🐵",
    "🐮",
    "🐮",
];
let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > .5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.onclick = handleClick;
    box.innerHTML = shuffleEmojis[i];
    document.querySelector(".game").appendChild(box);
};

function handleClick() {
    if(openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
};

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        endGame.style.display = "block";
        const winScreen = `
        <h2>PARABÉNS!</h2>
        <p>🎉Você venceu!🎉</p>
        <p>Seu tempo total foi de <b>${document.querySelector('#countdown').textContent}</b></p>
        `
        endGame.innerHTML = winScreen;
    };
};

function timer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (++timer < 0) {
            timer = duration;
        }
    }, 1000);
};

window.onload = () => {
    duration = 0;
    display = document.querySelector('#countdown'); 
    timer(duration, display);
};