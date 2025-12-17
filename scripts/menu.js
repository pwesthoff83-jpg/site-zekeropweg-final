document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const close = document.querySelector(".close-menu");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!toggle || !close || !menu || !overlay) return;

  toggle.addEventListener("click", () => {
    menu.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
  });

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  close.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});
