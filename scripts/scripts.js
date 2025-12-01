document.addEventListener('DOMContentLoaded', ()=> {
  const w = document.querySelectorAll('a[href*="wa.me"]');
  w.forEach(el=>{
    el.addEventListener('click', ()=> console.log('WhatsApp clicked'));
  });
});
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    if (!nav) return; // safety

    const isOpen = nav.classList.contains("open");

    if (isOpen) {
        nav.classList.remove("open");
        if (overlay) overlay.classList.remove("active");
        if (toggle) toggle.classList.remove("open");
    } else {
        nav.classList.add("open");
        if (overlay) overlay.classList.add("active");
        if (toggle) toggle.classList.add("open");
    }
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    if (nav) nav.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
    if (toggle) toggle.classList.remove("open");
}
