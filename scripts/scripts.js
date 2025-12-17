/* ============================================================
   ZEKEROPWEG – Core interacties
   Mobile menu • stabiel • gedeeld
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeBtn = document.querySelector(".close-menu");

  function openMenu() {
    if (!mobileMenu || !menuOverlay) return;
    mobileMenu.classList.add("open");
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!mobileMenu || !menuOverlay) return;
    mobileMenu.classList.remove("open");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

});



