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


  /* =========================================
     2. NAVIGATIE ACTIVE MARKER (BESTAAND)
  ========================================= */

  let current = window.location.pathname.split("/").pop();

  // Fallback als je op / zit
  if (!current) current = "index.html";

  document.querySelectorAll(".zop-nav a").forEach(link => {

    const href = link.getAttribute("href");

    // reset
    link.classList.remove("active");

    // alleen exacte match
    if (href === current) {
      link.classList.add("active");
    }

  });

document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname.toLowerCase();

  // Reset alle mails
  document.querySelectorAll("footer [data-service]").forEach(el => {
    el.classList.remove("active");
  });

  let service = "info"; // default

  if (path.includes("aankoopadvies")) {
    service = "advies";
  }

  if (path.includes("accucheck")) {
    service = "accu"; // pakt ook zakelijk
  }

  if (path.includes("bezwaar")) {
    service = "bezwaar";
  }

  const mail = document.querySelector(
    `footer [data-service="${service}"]`
  );

  if (mail) {
    mail.classList.add("active");
  }

});

 

