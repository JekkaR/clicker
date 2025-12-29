const STORAGE_KEY = "catboom_save";

let game = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  nickname: "",
  balance: 0,
  perClick: 1,
  perSecond: 0.5,
  clickLevel: 0,
  idleLevel: 0,
  cats: [0, 0, 0],
  factoryLimit: 5,
  factoryPrice: 500,
  lastOnline: Date.now()
};

const catsData = [
  { name: "Бедолага", click: 1, idle: 0.5, basePrice: 100 },
  { name: "Обычный", click: 5, idle: 2, basePrice: 1000 },
  { name: "Бизнесмен", click: 10, idle: 5, basePrice: 10000 }
];

function save() {
  game.lastOnline = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
}

function startGame() {
  const nick = document.getElementById("nicknameInput").value.trim();
  if (!nick) return alert("Введите ник");
  game.nickname = nick;
  save();
  initGame();
}

function initGame() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("nickname").innerText = game.nickname;
  calcOfflineIncome();
  updateUI();
}

function calcOfflineIncome() {
  const diff = Math.floor((Date.now() - game.lastOnline) / 1000);
  const capped = Math.min(diff, 6 * 3600);
  game.balance += capped * game.perSecond;
  save();
}

function updateUI() {
  document.getElementById("balance").innerText = game.balance.toFixed(1);
  document.getElementById("perClick").innerText = game.perClick;
  document.getElementById("perSecond").innerText = game.perSecond;

  document.getElementById("clickPrice").innerText = 10 * 2 ** game.clickLevel;
  document.getElementById("idlePrice").innerText = 15 * 2 ** game.idleLevel;

  document.getElementById("factoryCats").innerText = game.cats.reduce((a,b)=>a+b,0);
  document.getElementById("factoryLimit").innerText = game.factoryLimit;
  document.getElementById("factoryPrice").innerText = game.factoryPrice;
  document.getElementById("factoryIncome").innerText = game.perSecond.toFixed(1);

  renderCats();
}

function renderCats() {
  const list = document.getElementById("catsList");
  list.innerHTML = "";
  catsData.forEach((cat, i) => {
    const price = cat.basePrice * 2 ** game.cats[i];
    list.innerHTML += `
      <div>
        <b>${cat.name}</b><br>
        👆 +${cat.click} | 💤 +${cat.idle}<br>
        Куплено: ${game.cats[i]}<br>
        <button onclick="buyCat(${i})">Купить (${price}k)</button>
      </div>
    `;
  });
}

function clickCat() {
  game.balance += game.perClick;
  save();
  updateUI();
}

function buyClick() {
  const price = 10 * 2 ** game.clickLevel;
  if (game.balance < price) return;
  game.balance -= price;
  game.perClick += 0.5;
  game.clickLevel++;
  save();
}

function buyIdle() {
  const price = 15 * 2 ** game.idleLevel;
  if (game.balance < price) return;
  game.balance -= price;
  game.perSecond += 0.25;
  game.idleLevel++;
  save();
}

function buyCat(i) {
  const totalCats = game.cats.reduce((a,b)=>a+b,0);
  if (totalCats >= game.factoryLimit) return alert("Завод переполнен");
  const price = catsData[i].basePrice * 2 ** game.cats[i];
  if (game.balance < price) return;
  game.balance -= price;
  game.cats[i]++;
  game.perClick += catsData[i].click;
  game.perSecond += catsData[i].idle;
  save();
}

function upgradeFactory() {
  if (game.balance < game.factoryPrice) return;
  game.balance -= game.factoryPrice;
  game.factoryLimit += 5;
  game.factoryPrice *= 2;
  save();
}

document.getElementById("playBtn").onclick = startGame;
document.getElementById("clickBtn").onclick = clickCat;
document.getElementById("buyClickBtn").onclick = buyClick;
document.getElementById("buyIdleBtn").onclick = buyIdle;
document.getElementById("upgradeFactoryBtn").onclick = upgradeFactory;

document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
  };
});

setInterval(() => {
  game.balance += game.perSecond;
  save();
  updateUI();
}, 1000);

if (game.nickname) initGame();
