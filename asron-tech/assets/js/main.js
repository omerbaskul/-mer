document.addEventListener('DOMContentLoaded', () => {
  const mobileToggleButton = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (mobileToggleButton && mobileMenu) {
    mobileToggleButton.addEventListener('click', () => {
      const isOpen = mobileMenu.getAttribute('data-open') === 'true';
      mobileMenu.style.display = isOpen ? 'none' : 'block';
      mobileMenu.setAttribute('data-open', isOpen ? 'false' : 'true');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const countElements = document.querySelectorAll('[data-count-to]');
  countElements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-count-to') || '0');
    const durationMs = parseInt(el.getAttribute('data-count-duration') || '1400', 10);
    let start = null;

    const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const current = target * (0.5 - Math.cos(progress * Math.PI) / 2); // ease-in-out
      el.textContent = formatter.format(current);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const px = (x * 100).toFixed(2);
      const py = (y * 100).toFixed(2);
      hero.style.setProperty('--mx', px + '%');
      hero.style.setProperty('--my', py + '%');
    });
  }
});