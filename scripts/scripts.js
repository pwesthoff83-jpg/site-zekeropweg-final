/* ============================================================
   ZEKEROPWEG – CORE JS
   Mobile menu + intake (stabiel)
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
   INTAKE LOGICA (veilig)
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const pakketSelect = document.querySelector('select[name="Pakket"]');
  const accuAddon = document.getElementById("accuAddon");

  if (!pakketSelect || !accuAddon) return;

  function updateAddon() {
    const val = pakketSelect.value.toLowerCase();

    if (val.includes("premium") || val.includes("full")) {
      accuAddon.style.display = "block";
    } else {
      accuAddon.style.display = "none";
    }
  }

  // preset vanuit ?pakket=
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



