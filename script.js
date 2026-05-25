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