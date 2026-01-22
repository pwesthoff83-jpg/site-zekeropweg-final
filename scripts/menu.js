document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

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
    closeBtn?.addEventListener("click", closeMenu);
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

 

