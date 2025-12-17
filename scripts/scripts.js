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
  const dienstSelect = document.getElementById("dienst");
  const pakketAankoop = document.getElementById("pakketAankoop");
  const comboOptie = document.getElementById("comboOptie");

  function updateComboOptie() {
    if (!pakketAankoop || !comboOptie) return;
    comboOptie.style.display =
      pakketAankoop.value === "premium" || pakketAankoop.value === "full"
        ? "block"
        : "none";
  }

  pakketAankoop?.addEventListener("change", updateComboOptie);
});



