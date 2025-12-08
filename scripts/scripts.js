/* =========================================================
   PREMIUM MENU LOGICA - ZEKEROPWEG
========================================================= */

const nav = document.getElementById("mainNav");
const overlay = document.getElementById("menuOverlay");
const toggle = document.querySelector(".menu-toggle");

/* OPENEN & SLUITEN VAN HET MENU */
function toggleMenu() {
    nav.classList.toggle("open");
    overlay.classList.toggle("active");
    toggle.classList.toggle("open");
}

function closeMenu() {
    nav.classList.remove("open");
    overlay.classList.remove("active");
    toggle.classList.remove("open");
}

/* SLUITEN BIJ KLIK BUITEN HET MENU */
overlay.addEventListener("click", () => {
    closeMenu();
});

/* SLUITEN BIJ KLIK OP EEN NAV-LINK (MOBIEL) */
document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            closeMenu();
        }
    });
});

/* ESC-TOETS OM HET MENU TE SLUITEN */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeMenu();
    }
});

/* SLUITEN BIJ SWIPE (MOBIEL) */
let startX = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    // Swipe to the right closes menu only when mobile menu is open
    if (nav.classList.contains("open") && endX - startX > 60) {
        closeMenu();
    }
});

/* VERBETERDE ACCESSIBILITY (A11Y) */
toggle.setAttribute("aria-expanded", "false");

toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
});

