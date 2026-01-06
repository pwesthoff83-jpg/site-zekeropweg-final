/* ============================================================
   ZEKEROPWEG – CORE JS
   Mobile menu + intake + context footer (stabiel)
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
   CONTEXT FOOTER HIGHLIGHT (architectuur-proof)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const path = (window.location.pathname || "").toLowerCase();

  let activeService = "info"; // default = info

  if (path.endsWith("/index.html") || path === "/" || path.includes("over") || path.includes("contact")) {
    activeService = "info";
  }
  if (path.includes("aankoopadvies") || path.includes("start-aankoop")) {
    activeService = "advies";
  }
  if (path.includes("accucheck")) {
    activeService = "accu";
  }
  if (path.includes("bezwaar")) {
    activeService = "bezwaar";
  }

  document.querySelectorAll("[data-service]").forEach(el => {
    el.classList.toggle("footer-accent", el.dataset.service === activeService);
  });
});




/* =========================
   INTAKE LOGICA (veilig)
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
      if (o.text.toLowerCase().includes(preset.toLowerCase())) {
        o.selected = true;
      }
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

  if (isEV && !hasAccu) {
    evNotice && (evNotice.style.display = "block");
    evAnchor && (evAnchor.style.display = "block");
  } else {
    evNotice && (evNotice.style.display = "none");
    evAnchor && (evAnchor.style.display = "none");
  }
}

advertentieInput && advertentieInput.addEventListener("input", checkEV);
document.querySelector('input[name="AccuCheck"]')?.addEventListener("change", checkEV);






