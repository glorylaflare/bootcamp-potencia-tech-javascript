/*
O que fazer?
1. Mudar temática do jogo (Feito!)
2. Criar um sistema de vidas para o jogo (Feito!)
3. Acelerar a velocidade do tempo de exibição da imagem (Feito!)
*/

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifeCounter: document.querySelector("#life"),
        character: document.querySelector(".menu-lives h2 img"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 20,
        life: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 800),
        countdownTimerId: setInterval(countdown, 1000),
    },
};

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.wav`);
    audio.volume = 0.3;
    audio.play();
}

function GameOver() {
    clearInterval(state.actions.countdownTimerId);
    clearInterval(state.actions.timerId);
    playSound("game-over");
    alert("Game Over! O seu resultado foi: " + state.values.result + " pontos!");
}

function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = `${state.values.currentTime}s`;

    if(state.values.currentTime <= 0) {
        if(state.values.life <= 0) {
            GameOver();
        } else {
            state.values.life--;
            state.view.lifeCounter.textContent = `x${state.values.life}`
            playSound("loss-life");
            state.values.currentTime = 20;
        };
    };
};

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let enemySquare = state.view.squares[randomNumber];
    enemySquare.classList.add("enemy");
    state.values.hitPosition = enemySquare.id;
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if(square.id === state.values.hitPosition) {
                playSound("hit");
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            };
        });
    });
};

function main() {
    addListenerHitBox();
};

main();