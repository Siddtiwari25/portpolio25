const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// cache section positions once
const sectionData = [...sections].map(sec => ({
    el: sec,
    top: sec.offsetTop - 120,
    bottom: sec.offsetTop + sec.offsetHeight
}));

window.addEventListener('scroll', () => {
    const y = window.scrollY;

    header.classList.toggle('sticky', y > 100);

    sectionData.forEach(({ el, top, bottom }) => {
        if (y >= top && y < bottom) {
            const id = el.id;
            navLinks.forEach(a => a.classList.remove('active'));
            document
              .querySelector(`header nav a[href*="${id}"]`)
              ?.classList.add('active');
            el.classList.add('show-animate');
        }
    });
}, { passive: true });

document
  .getElementById('contact-form')
  ?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      e.target.reset();
  });
