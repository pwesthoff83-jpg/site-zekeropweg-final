/* ============================
   MOBIEL MENU
============================ */
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

/* ============================
   INTAKE FORMULIER LOGICA
============================ */
function toonDienstBlok() {
    const dienst = document.getElementById("dienst").value;

    // Alle blokken verbergen
    document.querySelectorAll(".dienst-blok").forEach(blok => {
        blok.classList.remove("actief");
    });

    // Bijbehorende blok tonen
    switch (dienst) {
        case "aankoopadvies":
            document.getElementById("blok-aankoopadvies").classList.add("actief");
            break;
        case "evaccu":
            document.getElementById("blok-evaccu").classList.add("actief");
            break;
        case "evaccuzakelijk":
            document.getElementById("blok-evaccuzakelijk").classList.add("actief");
            break;
        case "inruil":
            document.getElementById("blok-inruil").classList.add("actief");
            break;
        case "bezwaar":
            document.getElementById("blok-bezwaar").classList.add("actief");
            break;
    }
}

/* ============================
   URL PARAMETERS (AUTO SELECT)
============================ */
// Maakt intake direct ingevuld als CTA's parameters meegeven
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const dienstParam = params.get("dienst");
    const variantParam = params.get("variant");

    if (dienstParam) {
        const dienstSelect = document.getElementById("dienst");
        if (dienstSelect) {
            dienstSelect.value = dienstParam;
            toonDienstBlok();
        }
    }

    // Zakelijke variant automatisch selecteren
    if (variantParam && dienstParam === "evaccuzakelijk") {
        const zakelijkSelect = document.getElementById("accu_zakelijk_variant");
        if (zakelijkSelect) {
            zakelijkSelect.value = variantParam;
        }
    }
});
