document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     1. MOBILE MENU LOGICA (BESTAAND – BLIJFT)
  ========================================= */

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (toggle && menu && overlay) {

    const closeBtn = menu.querySelector(".close-menu");

    const openMenu = () => {
      menu.classList.add("open");
      overlay.classList.add("active");
      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      menu.classList.remove("open");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", openMenu);
    overlay.addEventListener("click", closeMenu);

    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }
  }



 

