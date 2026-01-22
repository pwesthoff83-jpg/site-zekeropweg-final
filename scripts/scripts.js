/* ============================================================
   ZEKEROPWEG – CORE JS (FINAL, SINGLE SOURCE)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     CURRENT PAGE
  ====================================================== */

  let page = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  if (!page || page === "/") {
    page = "index.html";
  }


  /* ======================================================
     HEADER NAV ACTIVE
  ====================================================== */

  const navMap = {
    "index.html": "index.html",

    "aankoopadvies.html": "aankoopadvies.html",

    "ev-accucheck.html": "ev-accucheck.html",
    "ev-accucheck-zakelijk.html": "ev-accucheck.html",

    "bezwaarservice.html": "bezwaarservice.html",

    "contact.html": "contact.html",
    "over.html": "over.html"
  };

  const activeNav = navMap[page];

  document.querySelectorAll(".zop-nav a").forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === activeNav) {
      link.classList.add("active");
    }

  });


  /* ======================================================
     FOOTER MAIL ACTIVE
  ====================================================== */

  const mailMap = {
    "index.html": "info",

    "aankoopadvies.html": "advies",

    "ev-accucheck.html": "accu",
    "ev-accucheck-zakelijk.html": "accu",

    "bezwaarservice.html": "bezwaar",

    "contact.html": "info",
    "over.html": "info"
  };

  const activeMail = mailMap[page] || "info";

  document.querySelectorAll("footer [data-service]").forEach(el => {
    el.classList.remove("footer-accent");
  });

  const mail = document.querySelector(
    `footer [data-service="${activeMail}"]`
  );

  if (mail) {
    mail.classList.add("footer-accent");
  }


  /* ======================================================
     INTAKE ADDON
  ====================================================== */

  const pakket = document.querySelector('select[name="Pakket"]');
  const addon = document.getElementById("accuAddon");

  if (pakket && addon) {

    function update() {
      const v = pakket.value.toLowerCase();

      addon.style.display =
        (v.includes("premium") || v.includes("full"))
          ? "block"
          : "none";
    }

    pakket.addEventListener("change", update);
    update();
  }


  /* ======================================================
     EV REMINDER
  ====================================================== */

  const advert = document.querySelector('input[name="Advertentie"]');
  const notice = document.getElementById("evNotice");
  const anchor = document.getElementById("evAnchor");

  function checkEV() {

    if (!advert) return;

    const v = advert.value.toLowerCase();

    const isEV =
      /ev|hybride|electric|plug-in|tesla|ioniq|niro|leaf|e-tron|polestar|id\./
        .test(v);

    const acc = document.querySelector('input[name="AccuCheck"]');
    const has = acc && acc.checked;

    if (notice) {
      notice.style.display = (isEV && !has) ? "block" : "none";
    }

    if (anchor) {
      anchor.style.display = (isEV && !has) ? "block" : "none";
    }
  }

  advert && advert.addEventListener("input", checkEV);
  document
    .querySelector('input[name="AccuCheck"]')
    ?.addEventListener("change", checkEV);

});


