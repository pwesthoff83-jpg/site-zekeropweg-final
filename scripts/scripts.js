/* ZekerOpWeg menu gedrag */

function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");

    nav.classList.toggle("open");
    overlay.classList.toggle("active");
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");

    nav.classList.remove("open");
    overlay.classList.remove("active");
}

// Escape sluit menu
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
