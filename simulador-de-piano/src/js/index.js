const pianoKeys = document.querySelectorAll(".piano-teclas .teclas");
const volumeInput = document.getElementById("volume-range");
const keysToggle = document.getElementById("teclas-toggle");
let audio = new Audio();

function playSound(key) {
    audio.src = `src/sounds/${key}.wav`
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    const speakers = document.querySelectorAll(".speaker");
    speakers.forEach((e) => {
        e.classList.add("amplify");
    });

    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
        speakers.forEach((e) => {
            e.classList.remove("amplify");
        });
    }, 100);
};

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playSound(key.dataset.key));
});

document.addEventListener("keydown", (e) => {
    pianoKeys.forEach((key) => {
        if(e.key === key.dataset.key) {
            playSound(e.key);
        };
    });
});

volumeInput.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

keysToggle.addEventListener("click", () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"))
});