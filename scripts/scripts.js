function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    nav.classList.toggle("open");
    overlay.classList.toggle("active");
    toggle.classList.toggle("open");
}

function closeMenu() {
    document.getElementById("mainNav").classList.remove("open");
    document.getElementById("menuOverlay").classList.remove("active");
    document.querySelector(".menu-toggle").classList.remove("open");
}

