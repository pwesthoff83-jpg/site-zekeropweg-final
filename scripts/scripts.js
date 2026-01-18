/* ============================================================
   ZEKEROPWEG – CORE JS (definitief)
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
   FOOTER MAIL HIGHLIGHT
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname.toLowerCase();

  let activeService = "info";   // default

  if (path.includes("aankoopadvies")) {
    activeService = "advies";
  }

  if (path.includes("ev-accucheck")) {
    activeService = "accu";
  }

  if (path.includes("bezwaar")) {
    activeService = "bezwaar";
  }

  if (
    path.endsWith("index.html") ||
    path.endsWith("/") ||
    path.includes("over") ||
    path.includes("contact")
  ) {
    activeService = "info";
  }

  document.querySelectorAll("[data-service]").forEach(el => {
    if (el.dataset.service === activeService) {
      el.classList.add("footer-accent");
    } else {
      el.classList.remove("footer-accent");
    }
  });

});

/* =========================
   PAGE ROUTING PROTECTION
   (laat intake.html toe)
========================= */
const allowedPages = [
  "index","home","aankoopadvies","ev-accucheck","ev-accucheck-zakelijk",
  "bezwaarservice","intake","contact","over"
];

const currentPage = (location.pathname.split("/").pop() || "").toLowerCase();
if (!allowedPages.some(p => currentPage.includes(p))) {
  location.href = "contact.html";
}

/* =========================
   INTAKE ADDON LOGICA
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const pakketSelect = document.querySelector('select[name="Pakket"]');
  const accuAddon = document.getElementById("accuAddon");
  if (!pakketSelect || !accuAddon) return;

  function updateAddon() {
    const val = pakketSelect.value.toLowerCase();
    accuAddon.style.display = (val.includes("premium") || val.includes("full")) ? "block" : "none";
  }

  const params = new URLSearchParams(window.location.search);
  const preset = params.get("pakket");
  if (preset) {
    [...pakketSelect.options].forEach(o => {
      if (o.text.toLowerCase().includes(preset.toLowerCase())) o.selected = true;
    });
  }

  pakketSelect.addEventListener("change", updateAddon);
  updateAddon();
});

/* =========================
   EV / HYBRIDE REMINDER
========================= */
const advertentieInput = document.querySelector('input[name="Advertentie"]');
const evNotice = document.getElementById("evNotice");
const evAnchor = document.getElementById("evAnchor");

function checkEV() {
  if (!advertentieInput) return;
  const link = advertentieInput.value.toLowerCase();
  const isEV = /ev|hybride|electric|plug-in|tesla|ioniq|niro|leaf|e-tron|polestar|id\./.test(link);
  const accuCheck = document.querySelector('input[name="AccuCheck"]');
  const hasAccu = accuCheck && accuCheck.checked;

  evNotice && (evNotice.style.display = isEV && !hasAccu ? "block" : "none");
  evAnchor && (evAnchor.style.display = isEV && !hasAccu ? "block" : "none");
}

advertentieInput && advertentieInput.addEventListener("input", checkEV);
document.querySelector('input[name="AccuCheck"]')?.addEventListener("change", checkEV);








