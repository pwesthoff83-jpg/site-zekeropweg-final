document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!toggle || !menu || !overlay) return;

  const closeBtn = menu.querySelector(".close-menu");

  const openMenu = () => {
    menu.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // Alleen bestandsnaam zonder pad
  let current = window.location.pathname.split("/").pop();

  // Fallback: als je op / zit
  if (!current) current = "index.html";

  document.querySelectorAll(".zop-nav a").forEach(link => {

    const href = link.getAttribute("href");

    // 1. Eerst ALLES resetten
    link.classList.remove("active");

    // 2. ALLEEN exacte match mag active worden
    if (href === current) {
      link.classList.add("active");
    }

  });

});


