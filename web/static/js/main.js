// ═══════════════════════════════════
// main.js — инициализация, общие утилиты
// ═══════════════════════════════════

// Кастомный курсор
const cur = document.getElementById('cur');
if (cur) {
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .i-ring, .svc, .rv-card, .wf, .info-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('h'));
    el.addEventListener('mouseleave', () => cur.classList.remove('h'));
  });
}

// Nav: цвет меняется по секции
const navEl = document.querySelector('nav');
if (navEl) {
  const allThemes = ['bark', 'teal', 'gold', 'forest', 'spring', 'summer', 'autumn', 'winter'];
  const seasonThemeMap = ['spring', 'summer', 'autumn', 'winter'];

  function setNavTheme(theme) {
    navEl.classList.toggle('scrolled', theme !== '');
    allThemes.forEach(t => navEl.classList.remove('nav-' + t));
    if (theme) navEl.classList.add('nav-' + theme);
  }

  // Экспортируем для seasons.js
  window._setNavTheme = setNavTheme;

  function onScroll() {
    const scrollY = window.scrollY;
    const mid = scrollY + 80;

    // Проверяем сезоны — находим какой wrap сейчас занимает верх экрана
    const seasonWraps = document.querySelectorAll('[data-season-wrap]');
    if (seasonWraps.length) {
      const seasonsEl = document.getElementById('seasonsScroll');
      if (seasonsEl) {
        const rect = seasonsEl.getBoundingClientRect();
        if (rect.top < 80 && rect.bottom > 80) {
          // Находим текущий сезон по позиции оберток
          for (let i = seasonWraps.length - 1; i >= 0; i--) {
            const wr = seasonWraps[i].getBoundingClientRect();
            if (wr.top <= 0) {
              setNavTheme(seasonThemeMap[i]);
              return;
            }
          }
          setNavTheme('spring');
          return;
        }
      }
    }

    // Остальные секции — снизу вверх
    const sections = [
      { id: 'contact',  theme: 'forest' },
      { id: 'reviews',  theme: 'gold'   },
      { id: 'services', theme: 'teal'   },
      { id: 'about',    theme: 'bark'   },
      { id: 'hero',     theme: ''       },
    ];
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= mid) {
        setNavTheme(s.theme);
        return;
      }
    }
    setNavTheme('');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Прогресс-бар при скролле
const progFill = document.getElementById('prog');
if (progFill) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    progFill.style.width = pct + '%';
  }, { passive: true });
}

// Кнопка «наверх»
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Диаграмма колец
const ringData = [
  { icon: '❤️', title: 'Призвание',  desc: 'Любовь к детям — основа всего' },
  { icon: '🌱', title: 'Связь',       desc: 'Доверие с ребёнком и родителями' },
  { icon: '✦',  title: 'Результат',   desc: 'Рост оценок уже за 2–3 недели' },
  { icon: '📚', title: 'Предметы',    desc: 'Русский, математика, чтение, подготовка к школе' },
  { icon: '🎮', title: 'Методика',    desc: 'Учёба через игру и интересы ребёнка' },
  { icon: '🤝', title: 'Подход',      desc: 'Индивидуальная программа, без давления' },
  { icon: '🎓', title: 'Опыт',        desc: 'Многолетняя практика, сотни учеников' },
];
const radii = [34, 64, 97, 130, 163, 196, 228];

const rings   = document.querySelectorAll('.i-ring');
const info    = document.getElementById('ringInfo');
const hlRing  = document.getElementById('hlRing');
const diagram = document.getElementById('ringDiagram');

if (rings.length && info && hlRing && diagram) {
  rings.forEach(ring => {
    ring.addEventListener('mouseenter', function(e) {
      const idx = +this.dataset.ring;
      const d = ringData[idx];
      document.getElementById('riIcon').textContent  = d.icon;
      document.getElementById('riTitle').textContent = d.title;
      document.getElementById('riDesc').textContent  = d.desc;
      info.classList.add('show');
      hlRing.setAttribute('r', radii[idx]);
      hlRing.style.opacity = '1';
      this.style.filter = 'brightness(1.07)';
      posInfo(e);
    });
    ring.addEventListener('mousemove', posInfo);
    ring.addEventListener('mouseleave', function() {
      info.classList.remove('show');
      hlRing.style.opacity = '0';
      this.style.filter = '';
    });
  });

  function posInfo(e) {
    const r = diagram.getBoundingClientRect();
    let l = e.clientX - r.left + 16;
    let t = e.clientY - r.top  - 60;
    if (l + 190 > r.width) l = e.clientX - r.left - 206;
    if (t < 0)             t = e.clientY - r.top  + 16;
    info.style.left = l + 'px';
    info.style.top  = t + 'px';
  }
}
