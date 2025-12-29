const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

const openBtn = document.getElementById("openSettings");
const closeBtn = document.getElementById("closeSettings");
const settings = document.getElementById("settings");
const overlay = document.getElementById("overlay");

function openSettings() {
  settings.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeSettings() {
  settings.classList.add("hidden");
  overlay.classList.add("hidden");
}

openBtn.addEventListener("click", openSettings);
closeBtn.addEventListener("click", closeSettings);
overlay.addEventListener("click", closeSettings);
