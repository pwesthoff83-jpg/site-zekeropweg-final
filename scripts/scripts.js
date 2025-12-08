/* ZekerOpWeg menu gedrag */

function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");

    nav.classList.toggle("open");
    overlay.classList.toggle("active");
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");

    nav.classList.remove("open");
    overlay.classList.remove("active");
}

// Escape sluit menu
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
function berekenZoneIntake(postcodeInputId, outputId) {
    const veld = document.getElementById(postcodeInputId);
    const output = document.getElementById(outputId);
    if (!veld || !output) return;

    const waarde = veld.value.trim();
    if (waarde.length < 4 || isNaN(waarde.slice(0, 4))) {
        output.textContent = "Voer een geldige postcode in";
        output.style.color = "red";
        return;
    }

    const pc = parseInt(waarde.slice(0, 4), 10);

    let zone = "";
    let toeslag = "";

    // Zone 1
    if (
        (pc >= 2600 && pc <= 2699) || // Dordrecht regio
        (pc >= 2800 && pc <= 2899) || // Gouda / Alblasserwaard
        (pc >= 2900 && pc <= 3299)    // Barendrecht / Rotterdam / Schiedam
    ) {
        zone = "Zone 1";
        toeslag = "Geen toeslag, inbegrepen in het tarief";
    }
    // Zone 2
    else if (
        (pc >= 3300 && pc <= 3499) || // Gorinchem / Leiden
        (pc >= 3500 && pc <= 3899)    // Utrecht / Den Haag / omgeving
    ) {
        zone = "Zone 2";
        toeslag = "Toeslag €25 per rit";
    }
    // Zone 3
    else if (
        (pc >= 3900 && pc <= 4299) // Brabant rand en verder
    ) {
        zone = "Zone 3";
        toeslag = "Toeslag €45 per rit";
    }
    // Buiten bereik
    else {
        zone = "Buiten standaardbereik";
        toeslag = "Tarief in overleg";
    }

    output.style.color = "#071322";
    output.innerHTML = "<strong>" + zone + "</strong><br>" + toeslag;
}

document.addEventListener("DOMContentLoaded", function () {
    const dienstSelect = document.getElementById("dienstSelect");
    if (!dienstSelect) return;

    const blokken = document.querySelectorAll(".dienst-blok");

    function updateDienstBlokken() {
        const waarde = dienstSelect.value;
        blokken.forEach(function (blok) {
            if (blok.dataset.dienst === waarde) {
                blok.classList.add("actief");
            } else {
                blok.classList.remove("actief");
            }
        });
    }

    dienstSelect.addEventListener("change", updateDienstBlokken);

    // Eerste keer initialiseren
    updateDienstBlokken();
});
