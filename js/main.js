/* Tema escuro & claro */
const htmlEl = document.documentElement;
const ghStats = document.getElementById('ghStats');
const ghLangs = document.getElementById('ghLangs');

function setTheme(t) {
  htmlEl.setAttribute('data-theme', t);
  if (t === 'dark') {
    ghStats.src = 'https://github-readme-stats.vercel.app/api?username=LucasDomingoscode&show_icons=true&theme=transparent&hide_border=true&title_color=bf3b2c&icon_color=bf3b2c&text_color=8c8480&bg_color=181616';
    ghLangs.src = 'https://github-readme-stats.vercel.app/api/top-langs/?username=LucasDomingoscode&layout=compact&theme=transparent&hide_border=true&title_color=bf3b2c&text_color=8c8480&bg_color=181616';
  } else {
    ghStats.src = 'https://github-readme-stats.vercel.app/api?username=LucasDomingoscode&show_icons=true&theme=transparent&hide_border=true&title_color=a02820&icon_color=a02820&text_color=5a5148&bg_color=edeae6';
    ghLangs.src = 'https://github-readme-stats.vercel.app/api/top-langs/?username=LucasDomingoscode&layout=compact&theme=transparent&hide_border=true&title_color=a02820&text_color=5a5148&bg_color=edeae6';
  }
  localStorage.setItem('ldc-theme', t);
}
function toggleTheme() { setTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
document.getElementById('themeBtn').addEventListener('click', toggleTheme);
document.getElementById('mobTheme').addEventListener('click', toggleTheme);
const saved = localStorage.getItem('ldc-theme');
if (saved) setTheme(saved);

/* Menu do celular */
const mobNav = document.getElementById('mobNav');
document.getElementById('mobHam').addEventListener('click', () => mobNav.classList.toggle('open'));
mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobNav.classList.remove('open')));

/* Entrada ao rolar pag */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.s-link[data-section]');
const scrollObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => scrollObs.observe(s));

/* Animação mostrar */
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 70);
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* Habilidades */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting)
      entry.target.querySelectorAll('.sk-row[data-pct]').forEach((r, i) =>
        setTimeout(() => r.querySelector('.sk-fill').style.width = r.dataset.pct + '%', i * 90));
  });
}, { threshold: 0.2 });
const sl = document.getElementById('skillsList');
if (sl) barObs.observe(sl);

/* Contadores */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + '+';
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(update);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      cntObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#sobre').forEach(s => cntObs.observe(s));

/* Barra de progresso */
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? window.scrollY / total : 0;
  scrollBar.style.transform = `scaleX(${progress})`;
}, { passive: true });
