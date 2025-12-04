function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    toggle.classList.toggle("open");

    if (overlay) {
        overlay.classList.toggle("active");
    }
}

function closeMenu() {
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    toggle.classList.remove("open");

    if (overlay) {
        overlay.classList.remove("active");
    }
}

