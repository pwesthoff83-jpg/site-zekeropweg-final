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


  /* =========================================
     3. MAIL HIGHLIGHT PER PAGINA (NIEUW)
  ========================================= */

  const mailMap = {
    "aankoopadvies.html": "advies",
    "ev-accucheck.html": "accu",
    "bezwaarservice.html": "bezwaar",

    // fallback
    "default": "info"
  };

  const activeService = mailMap[current] || mailMap["default"];

  const mailLink = document.querySelector(
    `footer a[data-service="${activeService}"]`
  );

  if (mailLink) {
    mailLink.classList.add("footer-accent");
  }

});

document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname.toLowerCase();

  // Reset alle mails
  document.querySelectorAll("[data-service]").forEach(mail => {
    mail.classList.remove("active");
  });

  let activeService = "info"; // default

  if (path.includes("aankoopadvies")) {
    activeService = "advies";
  }

  if (path.includes("accucheck")) {
    activeService = "accu";
  }

  if (path.includes("bezwaar")) {
    activeService = "bezwaar";
  }

  // Activeer juiste mail
  const activeMail = document.querySelector(
    `[data-service="${activeService}"]`
  );

  if (activeMail) {
    activeMail.classList.add("active");
  }

});


