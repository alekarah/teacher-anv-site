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
  { icon: '❤️', title: 'Призвание',  desc: 'Люблю детей и профессию — это видно сразу' },
  { icon: '🌱', title: 'Связь',       desc: 'Строю отношения с ребёнком и родителями на доверии и открытости' },
  { icon: '✦',  title: 'Результат',   desc: 'Ученики занимают 1-е места на школьных марафонах и олимпиадах' },
  { icon: '📚', title: 'Предметы',    desc: 'Русский язык, математика, чтение, окружающий мир, подготовка к школе' },
  { icon: '🎮', title: 'Методика',    desc: 'Уроки-игры, проекты, эксперименты, групповая работа — учёба через интерес' },
  { icon: '🤝', title: 'Подход',      desc: 'Личностно-ориентированное обучение, работа в том числе с детьми с ОВЗ' },
  { icon: '🎓', title: 'Опыт',        desc: '14 лет в школе, диплом с отличием, Почётная грамота Департамента образования' },
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

// Лайтбокс с зумом
(function() {
  const lb       = document.getElementById('lightbox');
  const viewport = document.getElementById('lightboxViewport');
  const lbImg    = document.getElementById('lightboxImg');
  const lbClose  = document.getElementById('lightboxClose');
  const hint     = document.getElementById('lightboxHint');
  const btnIn    = document.getElementById('lightboxZoomIn');
  const btnOut   = document.getElementById('lightboxZoomOut');
  if (!lb) return;

  let scale = 1, fitScale = 1, ox = 0, oy = 0;
  let dragging = false, startX = 0, startY = 0, startOx = 0, startOy = 0;

  // Вычисляем fitScale: картинка вписывается в viewport
  function calcFitScale() {
    const iw = lbImg.naturalWidth;
    const ih = lbImg.naturalHeight;
    if (!iw || !ih) return 1;
    const vw = viewport.offsetWidth;
    const vh = viewport.offsetHeight;
    return Math.min(vw / iw, vh / ih);
  }

  // transform-origin: 0 0, поэтому при fit центрируем через ox/oy
  function fitOffset() {
    const iw = lbImg.naturalWidth;
    const ih = lbImg.naturalHeight;
    const vw = viewport.offsetWidth;
    const vh = viewport.offsetHeight;
    ox = (vw - iw * fitScale) / 2;
    oy = (vh - ih * fitScale) / 2;
  }

  function applyTransform(animate) {
    lbImg.style.transition = animate ? 'transform .2s ease-out' : 'none';
    lbImg.style.transform = `translate(${ox}px,${oy}px) scale(${scale})`;
  }

  function clampOffset() {
    const iw = lbImg.naturalWidth;
    const ih = lbImg.naturalHeight;
    const vw = viewport.offsetWidth;
    const vh = viewport.offsetHeight;
    const sw = iw * scale, sh = ih * scale;
    // transform-origin: 0 0, поэтому диапазон смещений:
    // если картинка меньше viewport — центрируем (одно значение)
    // если больше — можно двигать от 0 до (vw - sw)
    const minX = sw > vw ? vw - sw : (vw - sw) / 2;
    const maxX = sw > vw ? 0       : (vw - sw) / 2;
    const minY = sh > vh ? vh - sh : (vh - sh) / 2;
    const maxY = sh > vh ? 0       : (vh - sh) / 2;
    ox = Math.max(minX, Math.min(maxX, ox));
    oy = Math.max(minY, Math.min(maxY, oy));
  }

  function resetZoom(animate) {
    scale = fitScale;
    fitOffset();
    applyTransform(animate);
  }

  function zoomBy(delta, cx, cy) {
    const prev = scale;
    // минимум = fitScale (вписан), максимум = 1 (натуральный 1:1)
    const newScale = Math.max(fitScale, Math.min(1, scale + delta * fitScale));
    if (newScale === prev) return;
    const ratio = newScale / prev;
    // точка под курсором (относительно левого верхнего угла viewport)
    const pivotX = cx !== undefined ? cx : viewport.offsetWidth  / 2;
    const pivotY = cy !== undefined ? cy : viewport.offsetHeight / 2;
    ox = pivotX - (pivotX - ox) * ratio;
    oy = pivotY - (pivotY - oy) * ratio;
    scale = newScale;
    clampOffset();
    applyTransform(false);
  }

  // показать подсказку при открытии, скрыть через 3с
  let hintTimer;
  function showHint() {
    hint.classList.remove('hidden');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.add('hidden'), 3000);
  }

  function initFit() {
    fitScale = calcFitScale();
    scale = fitScale;
    fitOffset();
    applyTransform(false);
  }

  // Открыть
  document.addEventListener('click', e => {
    const img = e.target.closest('[data-lightbox]');
    if (!img || img.tagName !== 'IMG') return;
    lbImg.src = img.dataset.lightboxSrc || img.src;
    lbImg.alt = img.alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    // если картинка уже загружена (кэш) — сразу, иначе ждём onload
    if (lbImg.complete && lbImg.naturalWidth) {
      initFit();
    } else {
      lbImg.onload = () => { initFit(); lbImg.onload = null; };
    }
    showHint();
  });

  // Закрыть
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    resetZoom(false);
  }
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Кнопки +/−
  btnIn.addEventListener('click',  () => zoomBy(+1));
  btnOut.addEventListener('click', () => zoomBy(-1));

  // Колёсико
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = viewport.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    zoomBy(e.deltaY < 0 ? +1 : -1, cx, cy);
  }, { passive: false });

  // Двойной клик — сброс
  viewport.addEventListener('dblclick', () => resetZoom(true));

  // Перетаскивание мышью
  viewport.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    startOx = ox; startOy = oy;
    viewport.classList.add('dragging');
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    ox = startOx + (e.clientX - startX);
    oy = startOy + (e.clientY - startY);
    clampOffset();
    applyTransform(false);
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    viewport.classList.remove('dragging');
  });

  // Touch pinch & pan
  let touches = [], initDist = 0, initScale = 1, initMx = 0, initMy = 0, initOx = 0, initOy = 0;
  viewport.addEventListener('touchstart', e => {
    touches = Array.from(e.touches);
    if (touches.length === 2) {
      initDist  = Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY);
      initScale = scale;
      initMx = (touches[0].clientX + touches[1].clientX) / 2 - viewport.getBoundingClientRect().left - viewport.offsetWidth  / 2;
      initMy = (touches[0].clientY + touches[1].clientY) / 2 - viewport.getBoundingClientRect().top  - viewport.offsetHeight / 2;
      initOx = ox; initOy = oy;
    } else if (touches.length === 1) {
      startX = touches[0].clientX; startY = touches[0].clientY;
      startOx = ox; startOy = oy;
    }
    e.preventDefault();
  }, { passive: false });
  viewport.addEventListener('touchmove', e => {
    touches = Array.from(e.touches);
    if (touches.length === 2) {
      const dist = Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY);
      scale = Math.max(MIN, Math.min(MAX, initScale * dist / initDist));
      ox = initMx - (initMx - initOx) * (scale / initScale);
      oy = initMy - (initMy - initOy) * (scale / initScale);
      clampOffset();
      applyTransform(false);
    } else if (touches.length === 1) {
      ox = startOx + (touches[0].clientX - startX);
      oy = startOy + (touches[0].clientY - startY);
      clampOffset();
      applyTransform(false);
    }
    e.preventDefault();
  }, { passive: false });
  viewport.addEventListener('touchend', e => {
    touches = Array.from(e.touches);
    if (scale < MIN + 0.05) resetZoom(true);
  });
})();

// Карусель фото кабинета
(function() {
  const slides = document.querySelectorAll('#classroomCarousel .carousel-slide');
  const cap = document.getElementById('classroomCap');
  if (!slides.length) return;
  const captions = ['Мой кабинет · 1 сентября', 'Мой кабинет · 2 сентября'];
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    if (cap) cap.textContent = captions[current];
  }, 4000);
})();
