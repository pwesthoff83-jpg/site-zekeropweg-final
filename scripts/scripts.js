// MENU
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    nav.classList.toggle("open");
    overlay.classList.toggle("active");
}

function closeMenu() {
    document.getElementById("mainNav").classList.remove("open");
    document.getElementById("menuOverlay").classList.remove("active");
}

// INTAKE FORM LOGICA
const dienstSelect = document.getElementById("dienst");
const blokAankoop = document.getElementById("blokAankoopadvies");
const blokAccu = document.getElementById("blokAccu");
const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
const blokBezwaar = document.getElementById("blokBezwaar");

dienstSelect.addEventListener("change", () => {
    const v = dienstSelect.value;

    blokAankoop.classList.remove("actief");
    blokAccu.classList.remove("actief");
    blokAccuZakelijk.classList.remove("actief");
    blokBezwaar.classList.remove("actief");

    if (v === "aankoopadvies") blokAankoop.classList.add("actief");
    if (v === "evaccu") blokAccu.classList.add("actief");
    if (v === "evaccu-zakelijk") blokAccuZakelijk.classList.add("actief");
    if (v === "bezwaar") blokBezwaar.classList.add("actief");
});

// REDIRECT NAAR DANKPAGINA
document.getElementById("intakeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const dienst = dienstSelect.value;
    window.location.href = `dank.html?dienst=${dienst}`;
});
