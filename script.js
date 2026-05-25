const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('nav-open');
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('nav-open');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const allSections = [
  document.getElementById('hero'),
  document.getElementById('about'),
  document.getElementById('projects'),
  document.getElementById('contact'),
];

const allNavLinks = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  const scrollY = window.scrollY + 120;
  let activeIndex = 0;

  allSections.forEach((sec, i) => {
    if (!sec) return;
    if (sec.offsetTop <= scrollY) activeIndex = i;
  });

  allNavLinks.forEach(a => a.classList.remove('active'));

  const hrefs = ['#', '#about', '#projects', '#contact'];
  const targetHref = hrefs[activeIndex];

  allNavLinks.forEach(a => {
    if (a.getAttribute('href') === targetHref) a.classList.add('active');
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();
(function () {
  const track = document.getElementById('projTrack');
  const dots  = document.querySelectorAll('.proj-dot');
  const prev  = document.getElementById('projPrev');
  const next  = document.getElementById('projNext');
  if (!track) return;

  const slides = track.querySelectorAll('.proj-slide');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    prev.disabled = false;
    next.disabled = false;
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(+dot.dataset.index));
  });

  let startX = 0, isDragging = false;
  const outer = track.parentElement;

  outer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  outer.addEventListener('touchend', e => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    isDragging = false;
  }, { passive: true });

  outer.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
  });
  outer.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    isDragging = false;
  });
  outer.addEventListener('mouseleave', () => { isDragging = false; });
})();

