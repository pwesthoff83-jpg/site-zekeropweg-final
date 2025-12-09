/* ============================================================
   ZEKEROPWEG – Scripts
   Navigatie, intake-logica, zakelijk advies en rayons
============================================================ */

/* =========================
   MOBIELE NAVIGATIE + OVERLAY
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
    // Sluit menu bij klik op een link
    const nav = document.getElementById("mainNav");
    if (nav) {
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    /* =========================
       INTAKE – DIENST BLOKKEN
    ========================== */

    const dienstSelect = document.getElementById("dienst");
    const blokAankoop = document.getElementById("blokAankoopadvies");
    const blokAccu = document.getElementById("blokAccu");
    const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
    const blokBezwaar = document.getElementById("blokBezwaar");

    function updateDienstBlokken() {
        if (!dienstSelect) return;

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

    // URL parameters verwerken
    const params = new URLSearchParams(window.location.search);
    const dienstParam = params.get("dienst");
    const pakketParam = params.get("pakket");
    const rayonParam = params.get("rayon");

    if (dienstSelect) {
        if (dienstParam) {
            dienstSelect.value = dienstParam;
        }
        updateDienstBlokken();
    }

    // Aankoopadvies pakket uit URL
    if (dienstParam === "aankoopadvies" && pakketParam) {
        const pakketSelect = document.getElementById("pakketAankoop");
        if (pakketSelect) {
            pakketSelect.value = pakketParam;
        }
    }

    /* =========================
       RAYON LOGICA EV PARTICULIER
    ========================== */

    const postcodeInput = document.getElementById("postcode");
    const zoneOutput = document.getElementById("zoneOutput");

    function bepaalRayonOpBasisVanPostcode(pc) {
        // Verwacht een string zoals "2993RL" of "2993"
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

        // Als er een rayon in de URL staat bijvoorbeeld intake.html?dienst=evaccu&rayon=A
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
        if (p === "los") prijsPerStuk = 129;
        else if (p === "pakket5") prijsPerStuk = 109;
        else if (p === "pakket10") prijsPerStuk = 99;

        const totaal = prijsPerStuk * n;
        prijsIndicatie.textContent = `Indicatie totaalprijs €${totaal} excl btw (${prijsPerStuk} per test)`;
    }

    if (aantalInput && pakketSelectZakelijk && adviesPakket) {
        aantalInput.addEventListener("input", () => {
            const n = parseInt(aantalInput.value, 10);

            if (!n || n < 1) {
                adviesPakket.textContent = "";
                if (prijsIndicatie) prijsIndicatie.textContent = "";
                return;
            }

            if (n <= 3) {
                adviesPakket.textContent = "Advies losse test past bij kleinere aantallen.";
                pakketSelectZakelijk.value = "los";
            } else if (n <= 7) {
                adviesPakket.textContent = "Advies pakket vijf is passend voor uw wagenpark.";
                pakketSelectZakelijk.value = "pakket5";
            } else {
                adviesPakket.textContent = "Advies pakket tien is het meest rendabel bij grotere aantallen.";
                pakketSelectZakelijk.value = "pakket10";
            }

            berekenZakelijkePrijs();
        });

        pakketSelectZakelijk.addEventListener("change", berekenZakelijkePrijs);
    }

    /* =========================
       FORM SUBMIT → DANKPAGINA
    ========================== */

    const intakeForm = document.getElementById("intakeForm");

    if (intakeForm && dienstSelect) {
        intakeForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const dienst = dienstSelect.value;
            if (!dienst) {
                alert("Kies eerst welke dienst u wilt aanvragen.");
                return;
            }

            // Extra check voor zakelijke aanvragen
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

            window.location.href = `dank.html?dienst=${encodeURIComponent(dienst)}`;
        });
    }
});



