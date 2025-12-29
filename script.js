let balance = 0;
let perClick = 1;

let upgradeCost = 10;
let upgradeBonus = 0.5;

const balanceEl = document.getElementById("balance");
const perClickEl = document.getElementById("perClick");
const clickBtn = document.getElementById("clickBtn");

const upgradeBtn = document.getElementById("upgradeBtn");
const upgradeInfo = document.getElementById("upgradeInfo");

const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettings = document.getElementById("closeSettings");

function updateUI() {
  balanceEl.textContent = balance.toFixed(1) + " c";
  perClickEl.textContent = "+" + perClick.toFixed(1) + " c за клик";
  upgradeBtn.textContent = "Купить за " + upgradeCost + " c";
  upgradeInfo.textContent = "+" + upgradeBonus + " c";
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
