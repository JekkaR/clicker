let state = {
  nickname: '',
  balance: 0,
  perClick: 1,
  passive: 0
};

const login = document.getElementById('login');
const game = document.getElementById('game');

const playBtn = document.getElementById('playBtn');
const nicknameInput = document.getElementById('nickname');

const balanceEl = document.getElementById('balance');
const perClickEl = document.getElementById('perClick');
const passiveEl = document.getElementById('passive');

const clickBtn = document.getElementById('clickBtn');

// SAVE / LOAD
function save() {
  localStorage.setItem('catboom', JSON.stringify(state));
}

function load() {
  const s = localStorage.getItem('catboom');
  if (s) state = JSON.parse(s);
}

// UI
function updateUI() {
  balanceEl.textContent = state.balance.toFixed(1);
  perClickEl.textContent = state.perClick;
  passiveEl.textContent = state.passive;
}

// LOGIN
playBtn.onclick = () => {
  if (!nicknameInput.value) return alert('Введи ник');
  state.nickname = nicknameInput.value;
  login.classList.add('hidden');
  game.classList.remove('hidden');
  save();
  updateUI();
};

// AUTO LOGIN
load();
if (state.nickname) {
  login.classList.add('hidden');
  game.classList.remove('hidden');
  updateUI();
}

// CLICK
clickBtn.onclick = () => {
  state.balance += state.perClick;
  updateUI();
  save();
};

// PASSIVE
setInterval(() => {
  state.balance += state.passive;
  updateUI();
  save();
}, 1000);

// TABS
document.querySelectorAll('.nav button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  };
});

// RESET
function resetGame() {
  localStorage.removeItem('catboom');
  location.reload();
}
