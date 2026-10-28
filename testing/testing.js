const img = document.getElementById("outside-img");
const audio = document.getElementById("outside-audio");

img.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
});