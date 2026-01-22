/* ============================================================
   ZEKEROPWEG – CORE JS (CLEAN & STABLE)
============================================================ */


/* =========================
   MOBILE MENU
========================= */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!menu || !overlay) return;

  menu.classList.add("open");
  overlay.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!menu || !overlay) return;

  menu.classList.remove("open");
  overlay.classList.remove("active");
  document.body.classList.remove("menu-open");
}


/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ACTIVE NAV (HEADER)
  ========================= */

  let current = window.location.pathname.split("/").pop().toLowerCase();

  if (!current || current === "/") {
    current = "index.html";
  }

  document.querySelectorAll(".zop-nav a").forEach(link => {

    const href = link.getAttribute("href").toLowerCase();

    // Reset
    link.classList.remove("active");

    // Home
    if (current.includes("index") && href.includes("index")) {
      link.classList.add("active");
    }

    // AccuCheck (particulier + zakelijk)
    else if (
      current.includes("accucheck") &&
      href.includes("ev-accucheck")
    ) {
      link.classList.add("active");
    }

    // Overige exact match
    else if (current === href) {
      link.classList.add("active");
    }

  });


  /* =========================
     FOOTER MAIL HIGHLIGHT
  ========================= */

  const mailMap = {
    "aankoopadvies.html": "advies",
    "ev-accucheck.html": "accu",
    "ev-accucheck-zakelijk.html": "accu",
    "bezwaarservice.html": "bezwaar",
    "contact.html": "info",
    "over.html": "info",
    "index.html": "info"
  };

  const activeService = mailMap[current] || "info";

  // Reset
  document.querySelectorAll("[data-service]").forEach(mail => {
    mail.classList.remove("footer-accent");
  });

  const mailLink = document.querySelector(
    `footer a[data-service="${activeService}"]`
  );

  if (mailLink) {
    mailLink.classList.add("footer-accent");
  }


  /* =========================
     PAGE ROUTING PROTECTION
  ========================= */

  const allowedPages = [
    "index",
    "home",
    "aankoopadvies",
    "ev-accucheck",
    "ev-accucheck-zakelijk",
    "bezwaarservice",
    "intake",
    "contact",
    "over"
  ];

  const currentPage =
    (window.location.pathname.split("/").pop() || "").toLowerCase();

  if (!allowedPages.some(p => currentPage.includes(p))) {
    window.location.href = "contact.html";
  }


  /* =========================
     INTAKE ADDON LOGICA
  ========================= */

  const pakketSelect = document.querySelector('select[name="Pakket"]');
  const accuAddon = document.getElementById("accuAddon");

  if (pakketSelect && accuAddon) {

    function updateAddon() {
      const val = pakketSelect.value.toLowerCase();

      accuAddon.style.display =
        (val.includes("premium") || val.includes("full"))
          ? "block"
          : "none";
    }

    const params = new URLSearchParams(window.location.search);
    const preset = params.get("pakket");

    if (preset) {
      [...pakketSelect.options].forEach(o => {
        if (o.text.toLowerCase().includes(preset.toLowerCase())) {
          o.selected = true;
        }
      });
    }

    pakketSelect.addEventListener("change", updateAddon);
    updateAddon();
  }


  /* =========================
     EV / HYBRIDE REMINDER
  ========================= */

  const advertentieInput =
    document.querySelector('input[name="Advertentie"]');

  const evNotice = document.getElementById("evNotice");
  const evAnchor = document.getElementById("evAnchor");

  function checkEV() {

    if (!advertentieInput) return;

    const link = advertentieInput.value.toLowerCase();

    const isEV =
      /ev|hybride|electric|plug-in|tesla|ioniq|niro|leaf|e-tron|polestar|id\./
        .test(link);

    const accuCheck =
      document.querySelector('input[name="AccuCheck"]');

    const hasAccu = accuCheck && accuCheck.checked;

    if (evNotice) {
      evNotice.style.display =
        (isEV && !hasAccu) ? "block" : "none";
    }

    if (evAnchor) {
      evAnchor.style.display =
        (isEV && !hasAccu) ? "block" : "none";
    }
  }

  if (advertentieInput) {
    advertentieInput.addEventListener("input", checkEV);
  }

  document
    .querySelector('input[name="AccuCheck"]')
    ?.addEventListener("change", checkEV);

});



