/* ============================================================
   ZEKEROPWEG – Scripts
   Navigatie, intake-logica en zakelijk prijsadvies
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
    /* Sluit menu als je op een navigatielink klikt */
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

    if (dienstSelect) {
        dienstSelect.addEventListener("change", updateDienstBlokken);

        // Vooraf vullen via URL: intake.html?dienst=evaccu
        const params = new URLSearchParams(window.location.search);
        const dienstParam = params.get("dienst");
        if (dienstParam) {
            dienstSelect.value = dienstParam;
        }

        updateDienstBlokken();
    }

    /* =========================
       ZAKELIJK EV ACCUCHECK
       – advies + prijsindicatie
    ========================== */

    const aantalInput = document.getElementById("aantalVoertuigen");
    const pakketSelect = document.getElementById("zakelijkPakket");
    const adviesPakket = document.getElementById("adviesPakket");
    const prijsIndicatie = document.getElementById("prijsIndicatie");

    function berekenZakelijkePrijs() {
        if (!aantalInput || !pakketSelect || !prijsIndicatie) return;

        const n = parseInt(aantalInput.value, 10);
        const p = pakketSelect.value;

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

    if (aantalInput && pakketSelect && adviesPakket) {
        aantalInput.addEventListener("input", () => {
            const n = parseInt(aantalInput.value, 10);

            if (!n || n < 1) {
                adviesPakket.textContent = "";
                if (prijsIndicatie) prijsIndicatie.textContent = "";
                return;
            }

            if (n <= 3) {
                adviesPakket.textContent = "Advies: losse test past bij kleinere aantallen.";
                pakketSelect.value = "los";
            } else if (n <= 7) {
                adviesPakket.textContent = "Advies: pakket vijf biedt een passend tarief voor uw wagenpark.";
                pakketSelect.value = "pakket5";
            } else {
                adviesPakket.textContent = "Advies: pakket tien is het meest rendabel bij grotere aantallen.";
                pakketSelect.value = "pakket10";
            }

            berekenZakelijkePrijs();
        });

        pakketSelect.addEventListener("change", berekenZakelijkePrijs);
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

            // Extra controle voor zakelijke aanvragen
            if (dienst === "evaccu-zakelijk") {
                const kvkInput = document.getElementById("kvk");
                const bedrijfsnaamInput = document.getElementById("bedrijfsnaam");

                if (!kvkInput || !bedrijfsnaamInput ||
                    !kvkInput.value.trim() || !bedrijfsnaamInput.value.trim()) {
                    alert("Voor zakelijke aanvragen zijn bedrijfsnaam en KvK nummer verplicht.");
                    return;
                }

                const emailInput = document.querySelector("input[name='email']");
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
                            "U gebruikt een particulier emailadres. Deze dienst is bedoeld voor bedrijven met KvK registratie. Wilt u toch doorgaan met deze aanvraag?"
                        );
                        if (!doorgaan) {
                            return;
                        }
                    }
                }
            }

            // Simpele redirect naar dankpagina
            window.location.href = `dank.html?dienst=${encodeURIComponent(dienst)}`;
        });
    }
});



