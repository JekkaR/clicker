let balance = 0;
let perClick = 1;
let upgradePrice = 10;

function startGame() {
  const nick = document.getElementById('nickname').value;
  if (!nick) return alert('Введи ник');

  localStorage.setItem('nick', nick);
  document.getElementById('login').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
}

function clickCat() {
  balance += perClick;
  updateUI();
}

function buyUpgrade() {
  if (balance >= upgradePrice) {
    balance -= upgradePrice;
    perClick += 0.5;
    upgradePrice *= 2;
    updateUI();
  } else {
    alert('Мало k 😿');
  }
}

function updateUI() {
  document.getElementById('balance').innerText = balance.toFixed(1);
  document.getElementById('perClick').innerText = perClick;
  document.getElementById('upgradePrice').innerText = upgradePrice;
}

function openTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
}

function resetGame() {
  if (confirm('Точно сбросить?')) {
    balance = 0;
    perClick = 1;
    upgradePrice = 10;
    updateUI();
  }
}
