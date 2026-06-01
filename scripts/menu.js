document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

 const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".zop-nav");

  // Variant A: nieuwe pagina's met mobileMenu/overlay structuur
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
    closeBtn?.addEventListener("click", closeMenu);
  }

  // Variant B: pagina's zonder mobileMenu — toggle klapt .zop-nav open
  if (toggle && nav && !menu) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("open");
        document.querySelectorAll(".zop-dropdown.open").forEach(d => d.classList.remove("open"));
      }
    });
    document.querySelectorAll(".zop-dropdown").forEach(function (dropdown) {
      const label = dropdown.querySelector(".zop-drop-label");
      if (!label) return;
      label.addEventListener("click", function (e) {
        if (window.innerWidth >= 900) return;
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll(".zop-dropdown.open").forEach(function (d) {
          if (d !== dropdown) d.classList.remove("open");
        });
        dropdown.classList.toggle("open");
      });
    });
  }


  /* =========================
     PAGE ROUTER
  ========================= */

  let page = window.location.pathname.split("/").pop().toLowerCase();

  if (!page || page === "/") page = "index.html";


  /* =========================
     HEADER ACTIVE MAP
  ========================= */

  const navMap = {
    "index.html": "index.html",
    "aankoopadvies.html": "aankoopadvies.html",

    "ev-accucheck.html": "ev-accucheck.html",
    "ev-accucheck-zakelijk.html": "ev-accucheck.html",

    "bezwaarservice.html": "bezwaarservice.html",
    "over.html": "over.html",
    "contact.html": "contact.html"
  };


  const activeNav = navMap[page];


  document.querySelectorAll(".zop-nav a").forEach(link => {

    const href = link.getAttribute("href").toLowerCase();

    link.classList.remove("active");

    if (href === activeNav) {
      link.classList.add("active");
    }

  });


  /* =========================
     FOOTER MAIL MAP
  ========================= */

  const mailMap = {
    "index.html": "info",
    "contact.html": "info",
    "over.html": "info",

    "aankoopadvies.html": "advies",

    "ev-accucheck.html": "accu",
    "ev-accucheck-zakelijk.html": "accu",

    "bezwaarservice.html": "bezwaar"
  };


  const activeMail = mailMap[page] || "info";


  document.querySelectorAll("footer [data-service]").forEach(mail => {
    mail.classList.remove("footer-accent");
  });


  const mailLink = document.querySelector(
    `footer [data-service="${activeMail}"]`
  );

  mailLink?.classList.add("footer-accent");

});

 

