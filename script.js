/* ============================================
   Vidit Prabhu — Portfolio Scripts
   ============================================ */

// ========== Custom cursor ==========
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const spotlight = document.getElementById('spotlight');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  spotlight.style.left = mouseX + 'px';
  spotlight.style.top = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('[data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    ring.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    ring.classList.remove('hover');
  });
});

// ========== Typewriter ==========
const phrases = [
  "training models at 2am",
  "exploring AI, ML & software",
  "turning data into insights",
  "pandas import pandas as pd",
  "currently learning deep RL",
  "fueled by chai and curiosity"
];
const tw = document.getElementById('typewriter');
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    tw.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    tw.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 30 : 70);
}
type();

// ========== Live clock + dynamic greeting ==========
function updateTime() {
  const now = new Date();
  const opts = { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  document.getElementById('live-time').textContent = now.toLocaleTimeString('en-US', opts) + ' EST';

  // Dynamic greeting based on local hour
  const hour = parseInt(now.toLocaleString('en-US', { timeZone: 'America/New_York', hour: '2-digit', hour12: false }));
  const greetEl = document.getElementById('greeting');
  let greet = 'Hello';
  if (hour >= 5 && hour < 12) greet = 'Good morning';
  else if (hour >= 12 && hour < 17) greet = 'Good afternoon';
  else if (hour >= 17 && hour < 21) greet = 'Good evening';
  else greet = 'Working late?';
  greetEl.textContent = greet;
}
updateTime();
setInterval(updateTime, 1000);

// ========== Scroll progress bar ==========
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
});

// ========== Reveal on scroll ==========
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ========== Nav active section ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => navObs.observe(s));

// ========== Project expand ==========
document.querySelectorAll('.project').forEach(p => {
  p.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    p.classList.toggle('expanded');
  });
});

// ========== Konami code easter egg ==========
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === konami[konamiIdx].toLowerCase()) {
    konamiIdx++;
    if (konamiIdx === konami.length) {
      document.body.classList.toggle('rainbow-mode');
      const hint = document.getElementById('konami-hint');
      hint.classList.add('visible');
      setTimeout(() => hint.classList.remove('visible'), 3000);
      konamiIdx = 0;
    }
  } else {
    konamiIdx = 0;
  }
});

// ========== Console message ==========
console.log('%c👋 hey there, dev friend', 'color: #7cf0a0; font-size: 18px; font-weight: bold;');
console.log('%cpoking around the source? nice.', 'color: #9097a1; font-size: 13px;');
console.log('%ctry the konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #636973; font-size: 12px;');
