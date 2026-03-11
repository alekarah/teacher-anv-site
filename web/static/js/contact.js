// ═══════════════════════════════════
// contact.js — модалка и форма
// ═══════════════════════════════════

const overlay = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('modalClose');

function openModal() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (openBtn) openBtn.addEventListener('click', openModal);

// Все ссылки с href="#contact" — сначала скролл к секции, потом модалка
document.querySelectorAll('a[href="#contact"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(openModal, 600);
    } else {
      openModal();
    }
  });
});
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// Форма
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-btn');
    btn.disabled = true;
    btn.textContent = 'Отправляем...';

    const data = {
      name:    this.querySelector('[name="name"]').value,
      phone:   this.querySelector('[name="phone"]').value,
      child:   this.querySelector('[name="child"]').value,
      grade:   this.querySelector('[name="grade"]').value,
      message: this.querySelector('[name="message"]').value,
    };

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        btn.textContent = '✅ Заявка отправлена! Скоро свяжусь';
      } else {
        btn.textContent = '❌ Ошибка — попробуйте ещё раз';
        btn.disabled = false;
      }
    } catch {
      // Заглушка: сервер ещё не готов
      btn.textContent = '✅ Заявка принята! (демо)';
    }
  });
}
