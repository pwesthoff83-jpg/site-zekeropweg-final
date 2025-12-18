document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobileMenu");
  const close = document.querySelector(".close-menu");
  const overlay = document.getElementById("menuOverlay");

  if (!toggle || !menu || !close || !overlay) return;

  toggle.addEventListener("click", () => {
    menu.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
  });

  const closeMenu = () => {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  close.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenu = document.querySelector('.close-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
});

closeMenu.addEventListener('click', closeNav);
menuOverlay.addEventListener('click', closeNav);

function closeNav() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('active');
}
