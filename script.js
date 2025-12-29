let balance = 0;
let perClick = 1;

let upgradeBonus = 0.5;
let upgradeCost = 10;

const balanceEl = document.getElementById("balance");
const clickBtn = document.getElementById("clickBtn");
const upgradeBtn = document.getElementById("upgradeBtn");
const upgradeText = document.getElementById("upgradeText");
const upgradeCostEl = document.getElementById("upgradeCost");

const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettings = document.getElementById("closeSettings");

function updateUI() {
  balanceEl.textContent = balance.toFixed(1);
  upgradeText.textContent = `+${upgradeBonus}c за клик`;
  upgradeCostEl.textContent = `${upgradeCost}c`;
}

clickBtn.onclick = () => {
  balance += perClick;
  updateUI();
};

upgradeBtn.onclick = () => {
  if (balance >= upgradeCost) {
    balance -= upgradeCost;
    perClick += upgradeBonus;
    upgradeCost *= 2;
    updateUI();
  }
};

settingsBtn.onclick = () => {
  settings.classList.remove("hidden");
};

closeSettings.onclick = () => {
  settings.classList.add("hidden");
};

updateUI();
