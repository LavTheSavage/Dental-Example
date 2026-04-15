/* main.js — Lumière Dental */

// ─── SKELETON LOADER ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const sk = document.getElementById('skeleton-overlay');
    if (sk) sk.classList.add('hidden');
  }, 800);
});

// ─── NAV SCROLL ───────────────────────────────────────────────────────────
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ─── BURGER MENU ──────────────────────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ─── COUNTER ANIMATION ────────────────────────────────────────────────────
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCount(e.target); counterObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ─── GALLERY FILTERS ──────────────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => { item.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ─── CONTACT FORM → EMAIL ─────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = document.getElementById('fname')?.value || '';
    const phone   = document.getElementById('fphone')?.value || '';
    const email   = document.getElementById('femail')?.value || '';
    const service = document.getElementById('fservice')?.value || '';
    const date    = document.getElementById('fdate')?.value || '';
    const message = document.getElementById('fmessage')?.value || '';
    const subject = encodeURIComponent(`Appointment Request — ${name}`);
    const body = encodeURIComponent(
`New Appointment Request from Lumière Dental Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           ${name}
Phone:          ${phone}
Email:          ${email}
Service:        ${service}
Preferred Date: ${date}

Message / Notes:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent via Lumière Dental Website
`);
    window.location.href = `mailto:hello@lumiere.dental?subject=${subject}&body=${body}`;
  });
}

// ─── SMOOTH CURSOR GLOW (desktop only) ───────────────────────────────────
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%; pointer-events: none; z-index: 0;
    background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.4s ease, top 0.4s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ─── PAGE TRANSITION ──────────────────────────────────────────────────────
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('http')) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      setTimeout(() => { window.location.href = href; }, 300);
    });
  }
});
window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.4s ease';
});