const state = {
    score: {
        playerScore: 0,
        cpuScore: 0,
        scoreBox: document.getElementById("score-points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        cpu: document.getElementById("cpu-field-card"),
    },
    playerSides: {
        player: "player-cards",
        player_box: document.querySelector("#player-cards"),
        cpu: "cpu-cards",
        cpu_box: document.querySelector("#cpu-cards"),
    },
    button: document.getElementById("next-duel"),
};

const pathImages = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img_url: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img_url: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img_url: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1],
    },
];

async function getRandomCardId() {
    const randIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randIndex].id; 
};

async function createCardImage(cardId, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", cardId);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player){ 
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(cardId);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    };

    return cardImage;
};

async function setCardsField(cardId) {
    await removeAllCardsImages();
    let cpuCardId = await getRandomCardId();
    state.fieldCards.player.style.display = "block";
    state.fieldCards.cpu.style.display = "block";

    await hiddenCardDetails();

    state.fieldCards.player.src = cardData[cardId].img_url;
    state.fieldCards.cpu.src = cardData[cpuCardId].img_url;

    let duelResults = await checkDuelResults(cardId, cpuCardId);

    await updateScore();
    await drawButton(duelResults);
};

async function hiddenCardDetails() {
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.avatar.src = "";
};

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.cpuScore}`
};

async function drawButton(text) {
    state.button.innerText = text.toUpperCase();
    state.button.style.display = "block";
};

async function checkDuelResults(playerCardId, cpuCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if(playerCard.winOf.includes(cpuCardId)) {
        duelResults = "Win";
        state.score.playerScore++;
    };

    if(playerCard.loseOf.includes(cpuCardId)) {
        duelResults = "Lose";
        state.score.cpuScore++;
    };
    
    await playAudio(duelResults);
    return duelResults;
};

async function removeAllCardsImages() {
    let { cpu_box, player_box } = state.playerSides;
    let imgElements = cpu_box.querySelectorAll("img");
    imgElements.forEach((img) => {
        img.remove()
    });

    imgElements = player_box.querySelectorAll("img");
    imgElements.forEach((img) => {
        img.remove()
    });
};

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img_url;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = `Attribute : ${cardData[index].type}`;
};

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    };
};

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.cpu.style.display = "none";

    init();
};

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch {}
};

function init() {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.cpu.style.display = "none";

    drawCards(5, state.playerSides.player);
    drawCards(5, state.playerSides.cpu);

    const bgm = document.getElementById("bgm");
    bgm.play();
};

init();