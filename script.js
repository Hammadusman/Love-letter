// STARS
function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      animation-duration:${2 + Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(s);
  }
}
createStars();

// PARTICLES
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['rgba(200,168,233,0.6)','rgba(240,160,200,0.5)','rgba(255,255,255,0.4)','rgba(180,140,220,0.5)'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${8 + Math.random()*12}s;
      animation-delay:${Math.random()*10}s;
      box-shadow: 0 0 ${size*3}px ${colors[Math.floor(Math.random()*colors.length)]};
    `;
    container.appendChild(p);
  }
}
createParticles();

// FLOATING HEARTS on letter screen
function spawnHeart(container) {
  const h = document.createElement('div');
  h.className = 'float-heart';
  h.textContent = ['💜','🤍','♡','✦','✧'][Math.floor(Math.random()*5)];
  h.style.cssText = `
    left:${Math.random()*100}%;
    bottom:${Math.random()*20}%;
    font-size:${0.7 + Math.random()*0.8}rem;
    animation-duration:${3 + Math.random()*3}s;
    animation-delay:${Math.random()*2}s;
  `;
  container.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}

// SCREEN MANAGEMENT
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('slide-up');
  });
  const target = document.getElementById(id);
  target.classList.remove('hidden', 'slide-up');
}

function transitionScreens(from, to, effect='fade') {
  const fromEl = document.getElementById(from);
  const toEl = document.getElementById(to);
  if (effect === 'up') {
    fromEl.classList.add('slide-up');
  } else {
    fromEl.classList.add('hidden');
  }
  setTimeout(() => {
    fromEl.style.display = 'none';
    toEl.classList.remove('hidden', 'slide-up');
    toEl.style.display = '';
  }, 800);
}

// LOADING
window.addEventListener('load', () => {
  setTimeout(() => {
    transitionScreens('loading-screen', 'lock-screen');
    document.getElementById('lock-screen').style.display = '';
  }, 2800);
});

// LOCK SCREEN
const lockInput = document.getElementById('lock-input');
const errorMsg = document.getElementById('error-msg');
const unlockBtn = document.getElementById('unlock-btn');
const CORRECT_CODE = '063019';

function tryUnlock() {
  const val = lockInput.value.trim();
  if (val === CORRECT_CODE) {
    lockInput.style.borderColor = 'rgba(200,168,233,0.8)';
    unlockBtn.textContent = '💜 Opening...';
    setTimeout(() => {
      transitionScreens('lock-screen', 'envelope-screen', 'up');
    }, 600);
  } else {
    lockInput.classList.add('shake');
    errorMsg.classList.add('show');
    lockInput.value = '';
    setTimeout(() => {
      lockInput.classList.remove('shake');
    }, 600);
  }
}

unlockBtn.addEventListener('click', tryUnlock);
lockInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
lockInput.addEventListener('input', () => { errorMsg.classList.remove('show'); });



// ENVELOPE
const envelopeWrap = document.getElementById('envelope-wrap');
let envelopeOpened = false;
envelopeWrap.addEventListener('click', () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelopeWrap.classList.add('opening');

  setTimeout(() => {
    transitionScreens('envelope-screen', 'letter-screen');
    startLetterAnimations();
    startFloatingHearts();
  }, 900);
});

// LETTER ANIMATIONS
function startLetterAnimations() {
  // Typing effect for title
  const title = "My Favorite Person";
  const titleEl = document.getElementById('typed-title');
  const typeCursor = document.getElementById('type-cursor');
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < title.length) {
      titleEl.textContent += title[i];
      i++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => typeCursor.style.display = 'none', 1200);
      document.getElementById('title-underline').classList.add('expanded');
    }
  }, 80);

  // Stagger paragraphs
  const elements = [
    { id: 'salutation', delay: 2000 },
    { id: 'p1', delay: 2400 },
    { id: 'p2', delay: 3200 },
    { id: 'divider1', delay: 3900 },
    { id: 'p3', delay: 4500 },
    // { id: 'p4', delay: 5300 },
    { id: 'hearts-row', delay: 5300 },
    // { id: 'p5', delay: 6600 },
    // { id: 'p6', delay: 7300 },
    { id: 'divider2', delay: 6000 },
    { id: 'signature', delay: 7500 },
    { id: 'letter-date', delay: 400 },
  ];
  elements.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.style.opacity = '0';
        el.style.animation = `fadeUp 0.9s cubic-bezier(0.23,1,0.32,1) forwards`;
      }
    }, delay);
  });
}

function startFloatingHearts() {
  const letterScreen = document.getElementById('letter-screen');
  setInterval(() => spawnHeart(letterScreen), 2000);
}


