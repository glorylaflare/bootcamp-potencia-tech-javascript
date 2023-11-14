/*
O que fazer?
1. Mudar temática do jogo (Feito!)
2. Criar um sistema de vidas para o jogo (Feito!)
3. Acelerar a velocidade do tempo de exibição da imagem (Feito!)
4. Adicionar tela de game over (Feito!)
5. Dividir a pontuação por rodadas (Feito!)
6. Adicionar animações 
*/

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifeCounter: document.querySelector("#life"),
        character: document.querySelector(".menu-lives h2 img"),
        gameOverScreen: document.querySelector(".game-over"),
    },
    values: {
        pontuacao: [],
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
    const pontuacaoFinal = state.values.pontuacao.reduce((acumulador, value) => acumulador + value, 0);

    const gameOver = `
    <h2>GAME OVER!</h2>
    <p>Resultado final...</p>
    <ol>
        <li>1ºRodada: ${state.values.pontuacao[0]}pts</li>
        <li>2ºRodada: ${state.values.pontuacao[1]}pts</li>
        <li>3ºRodada: ${state.values.pontuacao[2]}pts</li>
    </ol>
    <h3>Pontuação total: ${pontuacaoFinal}pts</h3>
    `
    state.view.gameOverScreen.innerHTML = gameOver; 
    state.view.gameOverScreen.style.display = "block";
    state.values.pontuacao = [];
}

function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = `${state.values.currentTime}s`;

    if(state.values.currentTime <= 0) {
        if(state.values.life > 0) {
            state.values.pontuacao.push(state.values.result);
            state.values.result = 0;
            state.values.life--;
            state.view.character.style.opacity = ".5"
            state.view.lifeCounter.textContent = `x${state.values.life}`
            playSound("loss-life");
            state.values.currentTime = 20;
        };
        if(state.values.life < 1) {
            GameOver();
        };
    } else {
        state.view.character.style.opacity = "1";
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