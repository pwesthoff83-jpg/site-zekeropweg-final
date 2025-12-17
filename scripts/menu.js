document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.querySelector(".close-menu");

  if (!toggle || !menu || !overlay || !closeBtn) return;

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});
