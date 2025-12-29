let data = JSON.parse(localStorage.getItem("catboom")) || {
  nickname: "",
  balance: 0,
  perClick: 1,
  perSecond: 0.5,
  clickLevel: 0,
  idleLevel: 0,
  cats: [0, 0, 0],
  factoryLimit: 5,
  factoryPrice: 500
};

const catsData = [
  { click: 1, idle: 0.5, base: 100 },
  { click: 5, idle: 2, base: 1000 },
  { click: 10, idle: 5, base: 10000 }
];

function save() {
  localStorage.setItem("catboom", JSON.stringify(data));
}

function startGame() {
  const nick = document.getElementById("nicknameInput").value;
  if (!nick) return;
  data.nickname = nick;
  save();
  init();
}

function init() {
  if (!data.nickname) return;
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("nickname").innerText = data.nickname;
  updateUI();
}

function updateUI() {
  document.getElementById("balance").innerText = data.balance.toFixed(1);
  document.getElementById("perClick").innerText = data.perClick;
  document.getElementById("perSecond").innerText = data.perSecond;
  document.getElementById("clickPrice").innerText = 10 * Math.pow(2, data.clickLevel);
  document.getElementById("idlePrice").innerText = 15 * Math.pow(2, data.idleLevel);
  document.getElementById("factoryCats").innerText = data.factoryCats || 0;
  document.getElementById("factoryLimit").innerText = data.factoryLimit;
  document.getElementById("factoryPrice").innerText = data.factoryPrice;
}

function clickCat() {
  data.balance += data.perClick;
  save();
  updateUI();
}

function buyClick() {
  let price = 10 * Math.pow(2, data.clickLevel);
  if (data.balance < price) return;
  data.balance -= price;
  data.perClick += 0.5;
  data.clickLevel++;
  save();
}

function buyIdle() {
  let price = 15 * Math.pow(2, data.idleLevel);
  if (data.balance < price) return;
  data.balance -= price;
  data.perSecond += 0.25;
  data.idleLevel++;
  save();
}

function buyCat(i) {
  let price = catsData[i].base * Math.pow(2, data.cats[i]);
  if (data.balance < price) return;
  if (data.cats.reduce((a,b)=>a+b,0) >= data.factoryLimit) return;
  data.balance -= price;
  data.cats[i]++;
  data.perClick += catsData[i].click;
  data.perSecond += catsData[i].idle;
  save();
}

function upgradeFactory() {
  if (balance >= factoryPrice) {
    balance -= factoryPrice;
    factoryLimit += 5;
    factoryPrice *= 2;

    updateUI();
  }
}
}

function openTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

setInterval(() => {
  data.balance += data.perSecond;
  save();
  updateUI();
}, 1000);

init();
