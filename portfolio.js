/* ==============================
   PORTFOLIO.JS — Anantha Hariharan V
   ============================== */

// ── THEME TOGGLE ──────────────────────────────────────
const toggle = document.getElementById('toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

// ── NAVBAR SCROLL EFFECT ──────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 30);
  lastScroll = scrollY;
});

// ── HAMBURGER MENU ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── CUSTOM CURSOR ─────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .form-input, .form-textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ───────────────────────────────
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));

// ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    const offset = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── ACTIVE NAV LINK HIGHLIGHTING ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));

// ── CONTACT FORM SUBMISSION ────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

// ── TYPING EFFECT ON HOME TAG ──────────────────────────
const homeTag = document.querySelector('.home-tag');
if (homeTag) {
  const text = 'Frontend Developer';
  homeTag.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      homeTag.textContent += text[i++];
      setTimeout(typeChar,60);
    }
  }
  // Start after a short delay
  setTimeout(typeChar, 400);
}

// ── STAGGER HOME REVEALS ON LOAD ──────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.home .reveal').forEach(el => {
    el.classList.add('visible');
  });
});

// ── PARALLAX GRID OVERLAY ──────────────────────────────
const gridOverlay = document.querySelector('.home-grid-overlay');
if (gridOverlay) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    gridOverlay.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}


// ── CONFETTI ───────────────────────────────────────────
const confettiCanvas = document.getElementById('confetti');
const cctx = confettiCanvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let pieces = [], confettiRunning = false;

function sizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
sizeConfetti();
window.addEventListener('resize', sizeConfetti);

function launchConfetti(x = window.innerWidth / 2, y = window.innerHeight / 3, count = 140) {
  if (reduceMotion) return;
  const colors = ['#61a0ba', '#b58cff', '#ff6b9d', '#ffd166', '#4ade80', '#ffffff'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    pieces.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 5,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 18,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0
    });
  }
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(stepConfetti); }
}

function stepConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  pieces = pieces.filter(p => p.life < 220 && p.y < confettiCanvas.height + 40);
  pieces.forEach(p => {
    p.vy += 0.22; p.vx *= 0.99;
    p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot * Math.PI / 180);
    cctx.globalAlpha = Math.max(0, 1 - p.life / 220);
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  });
  if (pieces.length) requestAnimationFrame(stepConfetti);
  else { confettiRunning = false; cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); }
}

// Welcome burst on load
window.addEventListener('load', () => setTimeout(() => launchConfetti(window.innerWidth / 2, window.innerHeight / 2.5, 120), 1400));

// Burst from clicked buttons
document.querySelectorAll('.btn').forEach(b => {
  b.addEventListener('click', e => launchConfetti(e.clientX, e.clientY, 60));
});

// Celebrate button
const partyBtn = document.getElementById('partyBtn');
if (partyBtn) partyBtn.addEventListener('click', () => {
  launchConfetti(window.innerWidth * 0.25, window.innerHeight * 0.6, 100);
  launchConfetti(window.innerWidth * 0.75, window.innerHeight * 0.6, 100);
});

// Burst when contact message "sends"
if (contactForm) contactForm.addEventListener('submit', () => setTimeout(() => launchConfetti(), 1250));

// ── ROADMAP: reveal items, fill line, confetti at the goal ──
const roadItems = document.querySelectorAll('.road-item');
const roadmap = document.getElementById('roadmap');
const roadFill = document.getElementById('roadFill');
let goalCelebrated = false;

const roadObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    if (entry.target.classList.contains('goal') && !goalCelebrated) {
      goalCelebrated = true;
      setTimeout(() => launchConfetti(window.innerWidth / 2, window.innerHeight * 0.55, 110), 500);
    }
  });
}, { threshold: 0.35 });
roadItems.forEach(el => roadObserver.observe(el));

function updateRoadFill() {
  if (!roadmap || !roadFill) return;
  const r = roadmap.getBoundingClientRect();
  const progress = (window.innerHeight * 0.6 - r.top) / r.height;
  roadFill.style.height = Math.max(0, Math.min(1, progress)) * 100 + '%';
}
window.addEventListener('scroll', updateRoadFill, { passive: true });
updateRoadFill();

// ── COUNT-UP STATS ─────────────────────────────────────
const statNums = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = +el.dataset.count, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    if (reduceMotion) el.textContent = target; else requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
statNums.forEach(el => countObserver.observe(el));

// ── 3D TILT ON PROJECT CARDS ───────────────────────────
if (window.innerWidth > 768 && !reduceMotion) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ── CONFETTI ON AVATAR CLICK ───────────────────────────
const avatarEl = document.querySelector('.avatar-wrapper');
if (avatarEl) avatarEl.addEventListener('click', e => launchConfetti(e.clientX, e.clientY, 90));