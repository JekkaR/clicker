let score = 0;

const tg = window.Telegram.WebApp;
tg.expand();

const scoreEl = document.getElementById("score");
const clickBtn = document.getElementById("clickBtn");
const settings = document.getElementById("settings");

settingsBtn.onclick = () => settings.classList.remove("hidden");
close.onclick = () => settings.classList.add("hidden");

clickBtn.onclick = () => {
  score++;
  scoreEl.innerText = score;

  if (sound.checked) {
    new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg").play();
  }

  if (vibration.checked && navigator.vibrate) {
    navigator.vibrate(20);
  }
};

document.querySelectorAll("input").forEach(input => {
  input.onchange = () => {
    localStorage.setItem(input.id, input.checked);
    if (input.id === "dark") {
      document.body.classList.toggle("dark", input.checked);
    }
  };

  input.checked = localStorage.getItem(input.id) === "true";
});

document.body.classList.toggle("dark", dark.checked);