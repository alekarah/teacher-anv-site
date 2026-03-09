// ═══════════════════════════════════
// contact.js — форма обратной связи
// ═══════════════════════════════════

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
