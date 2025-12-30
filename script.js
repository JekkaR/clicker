const tg = window.Telegram.WebApp;
tg.expand();

// ДАННЫЕ
let coins = Number(localStorage.getItem("coins")) || 0;
let perClick = Number(localStorage.getItem("perClick")) || 1;
let energy = Number(localStorage.getItem("energy")) || 100;
let upgradeCost = Number(localStorage.getItem("upgradeCost")) || 10;

// OFFLINE ДОХОД
const lastTime = Number(localStorage.getItem("lastTime")) || Date.now();
const now = Date.now();
const seconds = Math.floor((now - lastTime) / 1000);
coins += seconds * 0.3;

// UI
updateUI();

// КЛИК
function clickCoin() {
  if (energy <= 0) return;

  coins += perClick;
  energy--;

  save();
  updateUI();
}

// ПРОКАЧКА
function upgradeClick() {
  if (coins < upgradeCost) return;

  coins -= upgradeCost;
  perClick++;
  upgradeCost = Math.floor(upgradeCost * 1.8);

  save();
  updateUI();
}

// СОХРАНЕНИЕ
function save() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("perClick", perClick);
  localStorage.setItem("energy", energy);
  localStorage.setItem("upgradeCost", upgradeCost);
  localStorage.setItem("lastTime", Date.now());
}

// UI ОБНОВЛЕНИЕ
function updateUI() {
  document.getElementById("coins").innerText = Math.floor(coins);
  document.getElementById("energy").innerText = energy;
  document.querySelector(".upgrade").innerText =
    `➕ Улучшить клик (${upgradeCost})`;
}

// ВОССТАНОВЛЕНИЕ ЭНЕРГИИ
setInterval(() => {
  if (energy < 100) {
    energy++;
    save();
    updateUI();
  }
}, 3000);
