/* ============================================================
   ZEKEROPWEG – Navigatie en intake logica
============================================================ */

/* =========================
   MOBIEL MENU MET OVERLAY
========================= */

function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    if (!nav || !overlay || !toggle) return;

    nav.classList.toggle("open");
    overlay.classList.toggle("active");
    toggle.classList.toggle("open");
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

    if (!nav || !overlay || !toggle) return;

    nav.classList.remove("open");
    overlay.classList.remove("active");
    toggle.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       MENU LINKS SLUITEN OP MOBIEL
    ========================== */
    const nav = document.getElementById("mainNav");
    if (nav) {
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    /* =========================
       INTAKE FORMULIER LOGICA
    ========================== */

    const dienstSelect = document.getElementById("dienst");
    const blokAankoop = document.getElementById("blokAankoopadvies");
    const blokAccu = document.getElementById("blokAccu");
    const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
    const blokBezwaar = document.getElementById("blokBezwaar");
    const intakeForm = document.getElementById("intakeForm");

    // Stop als dit niet de intakepagina is
    if (!intakeForm || !dienstSelect) return;

    function updateDienstBlokken() {
        const v = dienstSelect.value;
        const blokken = [blokAankoop, blokAccu, blokAccuZakelijk, blokBezwaar];

        blokken.forEach(blok => {
            if (blok) blok.classList.remove("actief");
        });

        if (v === "aankoopadvies" && blokAankoop) blokAankoop.classList.add("actief");
        if (v === "evaccu" && blokAccu) blokAccu.classList.add("actief");
        if (v === "evaccu-zakelijk" && blokAccuZakelijk) blokAccuZakelijk.classList.add("actief");
        if (v === "bezwaar" && blokBezwaar) blokBezwaar.classList.add("actief");
    }

    /* =========================
       URL parameters verwerken
    ========================== */

    const params = new URLSearchParams(window.location.search);
    const dienstParam = params.get("dienst");
    const pakketParam = params.get("pakket");
    const rayonParam = params.get("rayon");

    if (dienstParam) {
        dienstSelect.value = dienstParam;
    }
    updateDienstBlokken();

    /* =========================
       AANKOOPADVIES PAKKET EN COMBINATIEVOORDEEL
    ========================== */

    const pakketSelect = document.getElementById("pakketAankoop");
    const comboRow = document.getElementById("comboVoordeelRow");
    const comboHint = document.getElementById("comboHint");

    if (pakketSelect) {
        // Pakket uit URL (basis, premium, full)
        if (dienstParam === "aankoopadvies" && pakketParam) {
            pakketSelect.value = pakketParam;
        }

        function updateComboVisibility() {
            const v = pakketSelect.value;
            if (v === "premium" || v === "full") {
                if (comboRow) comboRow.style.display = "block";
                if (comboHint) comboHint.style.display = "block";
            } else {
                if (comboRow) comboRow.style.display = "none";
                if (comboHint) comboHint.style.display = "none";
            }
        }

        pakketSelect.addEventListener("change", updateComboVisibility);
        updateComboVisibility();
    }

    /* =========================
       RAYON LOGICA EV PARTICULIER
    ========================== */

    const postcodeInput = document.getElementById("postcode");
    const zoneOutput = document.getElementById("zoneOutput");

    function bepaalRayonOpBasisVanPostcode(pc) {
        if (!pc || pc.length < 4) return "";

        const eersteCijfer = parseInt(pc.charAt(0), 10);
        if (isNaN(eersteCijfer)) return "";

        if (eersteCijfer <= 3) {
            return "Rayon A regio Randstad";
        } else if (eersteCijfer <= 6) {
            return "Rayon B midden Nederland";
        } else {
            return "Rayon C overige regio";
        }
    }

    if (postcodeInput && zoneOutput) {
        postcodeInput.addEventListener("input", () => {
            const pc = postcodeInput.value.replace(/\s+/g, "");
            const tekst = bepaalRayonOpBasisVanPostcode(pc);
            zoneOutput.textContent = tekst;
        });

        // Rayon uit URL wanneer er nog geen postcode is ingevuld
        if (dienstParam === "evaccu" && rayonParam && !postcodeInput.value) {
            if (rayonParam === "A") zoneOutput.textContent = "Rayon A regio Randstad";
            else if (rayonParam === "B") zoneOutput.textContent = "Rayon B midden Nederland";
            else if (rayonParam === "C") zoneOutput.textContent = "Rayon C overige regio";
        }
    }

    /* =========================
       ZAKELIJK EV ACCUCHECK
    ========================== */

    const aantalInput = document.getElementById("aantalVoertuigen");
    const pakketSelectZakelijk = document.getElementById("zakelijkPakket");
    const adviesPakket = document.getElementById("adviesPakket");
    const prijsIndicatie = document.getElementById("prijsIndicatie");

    function berekenZakelijkePrijs() {
        if (!aantalInput || !pakketSelectZakelijk || !prijsIndicatie) return;

        const n = parseInt(aantalInput.value, 10);
        const p = pakketSelectZakelijk.value;

        if (!n || n < 1 || !p) {
            prijsIndicatie.textContent = "";
            return;
        }

        let prijsPerStuk = 0;

        // staffel: 1–4 = 129, 5–9 = 109, 10+ = 99
        if (p === "los") prijsPerStuk = 129;
        else if (p === "pakket5") prijsPerStuk = 109;
        else if (p === "pakket10") prijsPerStuk = 99;

        const totaal = prijsPerStuk * n;
        prijsIndicatie.textContent = `Indicatieve totaalprijs ${totaal} euro exclusief btw, ${prijsPerStuk} per test.`;
    }

    // pakket uit URL voor zakelijk (optioneel)
    if (dienstParam === "evaccu-zakelijk" && pakketParam && pakketSelectZakelijk) {
        pakketSelectZakelijk.value = pakketParam;
    }

    if (aantalInput && pakketSelectZakelijk && adviesPakket) {
        aantalInput.addEventListener("input", () => {
            const n = parseInt(aantalInput.value, 10);

            if (!n || n < 1) {
                adviesPakket.textContent = "";
                if (prijsIndicatie) prijsIndicatie.textContent = "";
                return;
            }

            if (n <= 4) {
                adviesPakket.textContent = "Losse testen zijn passend bij dit aantal voertuigen.";
                pakketSelectZakelijk.value = "los";
            } else if (n >= 5 && n <= 9) {
                adviesPakket.textContent = "Dit aantal past bij pakket vijf testen.";
                pakketSelectZakelijk.value = "pakket5";
            } else {
                adviesPakket.textContent = "Dit aantal past bij pakket tien testen.";
                pakketSelectZakelijk.value = "pakket10";
            }

            berekenZakelijkePrijs();
        });

        pakketSelectZakelijk.addEventListener("change", berekenZakelijkePrijs);
    }

    /* =========================
       WIJZIGING VAN DIENSTSELECTIE
    ========================== */
    dienstSelect.addEventListener("change", updateDienstBlokken);

    /* =========================
       FORM SUBMIT → DANKPAGINA
    ========================== */

    intakeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const dienst = dienstSelect.value;
        if (!dienst) {
            alert("Kies eerst welke dienst u wilt aanvragen.");
            return;
        }

        // extra controle voor zakelijk
        if (dienst === "evaccu-zakelijk") {
            const kvkInput = document.getElementById("kvk");
            const bedrijfsnaamInput = document.getElementById("bedrijfsnaam");

            if (!kvkInput || !bedrijfsnaamInput ||
                !kvkInput.value.trim() || !bedrijfsnaamInput.value.trim()) {
                alert("Voor zakelijke aanvragen zijn bedrijfsnaam en KvK nummer verplicht.");
                return;
            }

            const emailInput = document.getElementById("email");
            if (emailInput && emailInput.value.includes("@")) {
                const domein = emailInput.value.split("@")[1].toLowerCase();
                const consumentenDomeinen = [
                    "gmail.com",
                    "hotmail.com",
                    "outlook.com",
                    "live.nl",
                    "yahoo.com"
                ];

                if (consumentenDomeinen.includes(domein)) {
                    const doorgaan = confirm(
                        "U gebruikt een particulier emailadres. Deze dienst is bedoeld voor bedrijven met KvK registratie. Wilt u toch doorgaan met deze aanvraag."
                    );
                    if (!doorgaan) {
                        return;
                    }
                }
            }
        }

        // redirect naar dankpagina met dienst parameter
        window.location.href = `dank.html?dienst=${encodeURIComponent(dienst)}`;
    });
});



