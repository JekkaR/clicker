// ===== STATE =====
let state = {
  nickname: '',
  balance: 0,
  perClick: 1,
  passive: 0,
  tab: 'main'
};

// ===== ELEMENTS =====
const loginScreen = document.getElementById('login');
const gameScreen = document.getElementById('game');
const playBtn = document.getElementById('playBtn');
const nicknameInput = document.getElementById('nickname');

const balanceEl = document.getElementById('balance');
const perClickEl = document.getElementById('perClick');
const passiveEl = document.getElementById('passive');

const clickBtn = document.getElementById('clickBtn');

// ===== LOAD / SAVE =====
function saveGame() {
  localStorage.setItem('catboom_save', JSON.stringify(state));
}

function loadGame() {
  const save = localStorage.getItem('catboom_save');
  if (save) {
    state = JSON.parse(save);
    return true;
  }
  return false;
}

// ===== UI =====
function updateUI() {
  balanceEl.textContent = state.balance.toFixed(1);
  perClickEl.textContent = state.perClick.toFixed(1);
  passiveEl.textContent = state.passive.toFixed(1);
}

// ===== LOGIN =====
playBtn.addEventListener('click', () => {
  const nick = nicknameInput.value.trim();
  if (!nick) return alert('Введи ник');

  state.nickname = nick;

  loginScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  saveGame();
  updateUI();
});

// ===== AUTO LOGIN =====
if (loadGame()) {
  loginScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  updateUI();
}

// ===== CLICK =====
clickBtn.addEventListener('click', () => {
  state.balance += state.perClick;
  updateUI();
  saveGame();
});

// ===== PASSIVE INCOME =====
setInterval(() => {
  state.balance += state.passive;
  updateUI();
  saveGame();
}, 1000);

// ===== TABS =====
document.querySelectorAll('.nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');

    state.tab = tab;
    saveGame();
  });
});
