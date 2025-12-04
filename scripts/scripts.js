function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay"); 
    const toggle = document.querySelector(".menu-toggle");

    nav.classList.toggle("open");
    toggle.classList.toggle("open");

    // Controleer of overlay bestaat
    if (overlay) {
        overlay.classList.toggle("active");
    }
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    nav.classList.remove("open");
    toggle.classList.remove("open");

    // Alleen sluiten als overlay echt bestaat
    if (overlay) {
        overlay.classList.remove("active");
    }
}
