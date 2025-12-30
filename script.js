const tg = window.Telegram.WebApp;
tg.expand();

let coins = +localStorage.getItem("coins") || 0;
let perClick = +localStorage.getItem("perClick") || 1;
let energy = +localStorage.getItem("energy") || 100;
let upgradeCost = +localStorage.getItem("upgradeCost") || 50;

const modal = document.getElementById("modal");

// OFFLINE
let last = +localStorage.getItem("last") || Date.now();
let now = Date.now();
coins += Math.floor((now - last) / 1000) * 0.2;

updateUI();
save();

function clickCoin() {
  if (energy <= 0) return;
  coins += perClick;
  energy--;
  save();
  updateUI();
}

function upgradeClick() {
  if (coins < upgradeCost) return;
  coins -= upgradeCost;
  perClick++;
  upgradeCost = Math.floor(upgradeCost * 1.7);
  save();
  updateUI();
}

// 🏪 МАГАЗИН
function openShop() {
  modal.innerHTML = `
    <div class="modal-box">
      <h2>🏪 Магазин</h2>
      <button onclick="buyAuto()">🤖 Авто доход (200)</button>
      <button onclick="closeModal()">Закрыть</button>
    </div>`;
  modal.style.display = "flex";
}

function buyAuto() {
  if (coins >= 200) {
    coins -= 200;
    setInterval(() => {
      coins += 1;
      updateUI();
      save();
    }, 3000);
    closeModal();
  }
}

// 🎯 МИССИИ
function openMissions() {
  modal.innerHTML = `
    <div class="modal-box">
      <h2>🎯 Миссия</h2>
      <p>Сделай 50 кликов</p>
      <button onclick="completeMission()">Забрать +100</button>
      <button onclick="closeModal()">Закрыть</button>
    </div>`;
  modal.style.display = "flex";
}

function completeMission() {
  coins += 100;
  closeModal();
  save();
  updateUI();
}

// 🎮 МИНИ-ИГРА
function playMini() {
  modal.innerHTML = `
    <div class="modal-box">
      <h2>🎮 Угадай</h2>
      <button onclick="guess(1)">1</button>
      <button onclick="guess(2)">2</button>
      <button onclick="guess(3)">3</button>
      <button onclick="closeModal()">Выход</button>
    </div>`;
  modal.style.display = "flex";
}

function guess(n) {
  let win = Math.floor(Math.random() * 3) + 1;
  if (n === win) coins += 50;
  closeModal();
  save();
  updateUI();
}

// UI
function updateUI() {
  document.getElementById("coins").innerText = Math.floor(coins);
  document.getElementById("energy").innerText = energy;
  document.getElementById("upgradeCost").innerText = upgradeCost;
}

function save() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("perClick", perClick);
  localStorage.setItem("energy", energy);
  localStorage.setItem("upgradeCost", upgradeCost);
  localStorage.setItem("last", Date.now());
}

// энергия
setInterval(() => {
  if (energy < 100) {
    energy++;
    save();
    updateUI();
  }
}, 3000);

function closeModal() {
  modal.style.display = "none";
}
