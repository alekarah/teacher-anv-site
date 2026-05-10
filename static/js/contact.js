// ═══════════════════════════════════
// contact.js — плавный скролл к секции
// ═══════════════════════════════════

document.querySelectorAll('a[href="#contact"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});
