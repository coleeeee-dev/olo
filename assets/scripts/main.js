document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.main-nav a');
    const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));
  
    // scroll suave y update active
    links.forEach((link, i) => {
      link.addEventListener('click', e => {
        e.preventDefault();
        sections[i].scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    window.addEventListener('scroll', () => {
      const pos = window.scrollY + window.innerHeight/4;
      sections.forEach((sec, i) => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
          links.forEach(l => l.classList.remove('active'));
          links[i].classList.add('active');
        }
      });
    });
  
    // Notificación al enviar el formulario de contacto
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // Aquí podrías enviar por AJAX… pero por ahora:
      // 1) Mostrar toast
      const toast = document.createElement('div');
      toast.textContent = '¡Mensaje enviado! Nos pondremos en contacto pronto.';
      toast.style.position = 'fixed';
      toast.style.bottom = '1rem';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = 'var(--color-primary)';
      toast.style.color = '#fff';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '4px';
      toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
  
      // 2) Reset del formulario
      contactForm.reset();
    });
  }
  
  });
  