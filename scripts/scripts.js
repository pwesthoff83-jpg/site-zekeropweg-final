function toggleMenu() {
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    if (!overlay || !toggle) return;

    toggle.classList.toggle("open");
    overlay.classList.toggle("active");
}

function closeMenu() {
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    if (!overlay || !toggle) return;

    toggle.classList.remove("open");
    overlay.classList.remove("active");
}
