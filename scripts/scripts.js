/* =======================================================
   ZEKER OP WEG — PREMIUM NAVIGATION SCRIPT
   Accessible, scalable and stable for long term use
   ======================================================= */

const nav = document.getElementById("mainNav");
const overlay = document.getElementById("menuOverlay");
const toggleBtn = document.querySelector(".zw-header__toggle");

/* =======================================================
   Toggle Mobile Menu
   ======================================================= */
function toggleMenu() {
    const isOpen = nav.classList.contains("open");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

/* =======================================================
   Open Menu
   ======================================================= */
function openMenu() {
    nav.classList.add("open");
    overlay.classList.add("active");

    // Accessibility
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Block scroll
}

/* =======================================================
   Close Menu
   ======================================================= */
function closeMenu() {
    nav.classList.remove("open");
    overlay.classList.remove("active");

    // Accessibility
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = ""; // Restore scroll
}

/* =======================================================
   Close menu via overlay click
   ======================================================= */
overlay.addEventListener("click", closeMenu);

/* =======================================================
   Keyboard Accessibility
   ======================================================= */
document.addEventListener("keydown", (event) => {
    // Close with ESC
    if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
    }
});

/* =======================================================
   Focus Trap for Accessibility
   (Prevents focus moving behind overlay)
   ======================================================= */
document.addEventListener("focus", function (e) {
    if (nav.classList.contains("open") && !nav.contains(e.target)) {
        e.stopPropagation();
        nav.querySelector("a").focus();
    }
}, true);
