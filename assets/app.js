// Мобильное модальное меню
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const openBtn = document.getElementById('openMobileMenu');
  const closeBtn = mobileMenu?.querySelector('.mobile-modal-close');

  if (openBtn && mobileMenu && closeBtn) {
    openBtn.addEventListener('click', () => {
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // Закрытие sticky-панели (если есть)
  const stickyClose = document.querySelector('[data-sticky-close]');
  const stickyCta = document.querySelector('.stickyCta');
  if (stickyClose && stickyCta) {
    stickyClose.addEventListener('click', () => {
      stickyCta.style.display = 'none';
    });
  }
});
