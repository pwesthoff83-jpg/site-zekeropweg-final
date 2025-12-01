document.addEventListener('DOMContentLoaded', ()=> {
  const w = document.querySelectorAll('a[href*="wa.me"]');
  w.forEach(el=>{
    el.addEventListener('click', ()=> console.log('WhatsApp clicked'));
  });
});
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");

    const isOpen = nav.classList.contains("open");

    if (isOpen) {
        nav.classList.remove("open");
        overlay.classList.remove("active");
    } else {
        nav.classList.add("open");
        overlay.classList.add("active");
    }
}

function closeMenu() {
    document.getElementById("mainNav").classList.remove("open");
    document.getElementById("menuOverlay").classList.remove("active");
}
