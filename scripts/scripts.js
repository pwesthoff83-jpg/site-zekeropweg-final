/* ============================================================
   ZEKEROPWEG – PREMIUM SCRIPTS
   Navigatie, intake-logica & intelligent gedrag websitebreed
============================================================ */

/* =========================
   MOBIELE NAVIGATIE + OVERLAY
========================= */

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

/* Sluit menu bij klik op overlay */
document.addEventListener("click", function (e) {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");

    if (overlay.classList.contains("active") && e.target === overlay) {
        closeMenu();
    }
});

/* Sluit menu bij klik op nav-links */
document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", closeMenu);
});


/* ==========================================
   INTAKE FORMULIER – TYPE DIENST SELECTIE
========================================== */

const dienstSelect = document.getElementById("dienstSelect");
const particulierBlok = document.getElementById("blokParticulier");
const zakelijkBlok = document.getElementById("blokZakelijk");

if (dienstSelect) {
    dienstSelect.addEventListener("change", function () {
        const waarde = this.value;

        // Alles verbergen
        particulierBlok?.classList.remove("actief");
        zakelijkBlok?.classList.remove("actief");

        // Particulier
        if (waarde === "premium" || waarde === "essentieel" || waarde === "full") {
            particulierBlok?.classList.add("actief");
        }

        // Zakelijk – alleen tonen wanneer expliciet "zakelijk" gekozen is
        if (waarde === "zakelijk") {
            zakelijkBlok?.classList.add("actief");
        }
    });
}


/* ==========================================
   ZAKELIJK ORDER-BEVEILIGING
   → voorkomt dat particulieren zakelijke
     EV-accutesten kunnen aanvragen
========================================== */

const zakelijkCheckbox = document.getElementById("zakelijkCheck");
const bedrijfsvelden = document.getElementById("bedrijfsGegevens");
const aantalVoertuigenSelect = document.getElementById("aantalVoertuigen");
const pakketKeuzeZakelijk = document.getElementById("pakketZakelijk");

if (zakelijkCheckbox) {
    zakelijkCheckbox.addEventListener("change", function () {
        if (this.checked) {
            // Zakelijk geselecteerd
            bedrijfsvelden.style.display = "block";
            pakketKeuzeZakelijk.style.display = "block";
        } else {
            // Particulier → geen zakelijke opties tonen
            bedrijfsvelden.style.display = "none";
            pakketKeuzeZakelijk.style.display = "none";

            // Reset values
            if (aantalVoertuigenSelect) aantalVoertuigenSelect.value = "";
            if (pakketKeuzeZakelijk) pakketKeuzeZakelijk.value = "";
        }
    });
}


/* ==========================================
   EV-ZONE / TARIEF INDICATIE (optioneel)
========================================== */

const postcodeInput = document.getElementById("postcode");
const zoneOutput = document.getElementById("zoneOutput");

if (postcodeInput && zoneOutput) {
    postcodeInput.addEventListener("input", function () {
        const pc = this.value.trim();

        if (pc.length === 4 && /^[0-9]{4}$/.test(pc)) {
            const eerste = parseInt(pc.charAt(0));

            let zone = "";
            if (eerste <= 3) zone = "Zone A – Randstad regio (basisgebied)";
            else if (eerste <= 6) zone = "Zone B – Midden Nederland";
            else zone = "Zone C – Buitenregio";

            zoneOutput.textContent = zone;
        } else {
            zoneOutput.textContent = "";
        }
    });
}


/* ==========================================
   MULTI-AUTO KORTING (PARTICULIER)
========================================== */

const autoAantalInput = document.getElementById("aantalAutos");
const kortingInfo = document.getElementById("kortingInfo");

if (autoAantalInput && kortingInfo) {
    autoAantalInput.addEventListener("change", function () {
        const aantal = parseInt(this.value);

        if (aantal >= 2) {
            kortingInfo.textContent = "U ontvangt een voordeel wanneer beide voertuigen op dezelfde locatie getest worden.";
        } else {
            kortingInfo.textContent = "";
        }
    });
}


/* ==========================================
   PAGINA SPECIFIEKE CALLS (optioneel)
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Hier kunnen pagina-specifieke functies komen indien nodig.
});


