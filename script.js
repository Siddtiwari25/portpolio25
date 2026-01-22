document.addEventListener("DOMContentLoaded", () => {

  AOS.init({
    duration: 1000,
    once: true
  });

  // Typing effect
  const textArray = ["Web Developer", "Frontend Developer", "UI Designer"];
  let index = 0, charIndex = 0;
  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    if (!typingElement) return;
    if (charIndex < textArray[index].length) {
      typingElement.textContent += textArray[index].charAt(charIndex++);
      setTimeout(typeEffect, 100);
    } else {
      setTimeout(eraseEffect, 1500);
    }
  }

  function eraseEffect() {
    if (charIndex > 0) {
      typingElement.textContent = textArray[index].substring(0, --charIndex);
      setTimeout(eraseEffect, 60);
    } else {
      index = (index + 1) % textArray.length;
      setTimeout(typeEffect, 500);
    }
  }

  typeEffect();

  // Mobile menu toggle
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  menuIcon.onclick = () => {
    navbar.classList.toggle("active");
  };
});
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
if (!window.emailjs) {
  console.error("EmailJS not loaded");
}
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      document.getElementById("scroll-progress").style.width =
        (scrollTop / height) * 100 + "%";

      ticking = false;
    });
    ticking = true;
  }
});

