// ═══════════════════════════════════
// seasons.js — sticky-панели сезонов, частицы, навигация
// ═══════════════════════════════════

// Навигация точками
const panels = document.querySelectorAll('[data-season-panel]');
const snDots  = document.querySelectorAll('.sn-dot');

const seasonThemeMap = ['spring', 'summer', 'autumn', 'winter'];
const allNavThemes = ['bark', 'teal', 'gold', 'forest', 'spring', 'summer', 'autumn', 'winter'];

// Навигация точками через IntersectionObserver
panels.forEach((panel, i) => {
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      snDots.forEach((d, j) => d.classList.toggle('active', i === j));
    }
  }, { threshold: .5 });
  io.observe(panel);
});

snDots.forEach(dot => {
  dot.addEventListener('click', () => {
    panels[+dot.dataset.s]?.closest('[data-season-wrap]')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Частицы
function makeParticles(id, symbols, count) {
  const container = document.getElementById(id);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = [
      `left: ${Math.random() * 100}%`,
      `font-size: ${10 + Math.random() * 16}px`,
      `animation-duration: ${6 + Math.random() * 12}s`,
      `animation-delay: ${-Math.random() * 14}s`,
    ].join('; ');
    container.appendChild(el);
  }
}

makeParticles('pSpring', ['🌸','🌷','✿','·','°','❀'], 18);
makeParticles('pSummer', ['🍃','🌿','✦','·','🌱'],     14);
makeParticles('pAutumn', ['🍂','🍁','🍃','◦','·'],     20);
makeParticles('pWinter', ['❄','✦','·','❅','°'],        22);
