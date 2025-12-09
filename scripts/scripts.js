/* ============================================================
   ZEKEROPWEG – Navigatie en intake logica
============================================================ */

/* =========================
   MOBIEL MENU
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
       MENU LINKS SLUITEN
    ========================== */
    const nav = document.getElementById("mainNav");
    if (nav) {
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    /* =========================
       INTAKE LOGICA
    ========================== */

    const dienstSelect = document.getElementById("dienst");
    const intakeForm = document.getElementById("intakeForm");

    const blokAankoop = document.getElementById("blokAankoopadvies");
    const blokAccu = document.getElementById("blokAccu");
    const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
    const blokBezwaar = document.getElementById("blokBezwaar");

    function updateDienstBlokken() {
        if (!dienstSelect) return;
        const v = dienstSelect.value;

        [blokAankoop, blokAccu, blokAccuZakelijk, blokBezwaar].forEach(b => {
            if (b) b.classList.remove("actief");
        });

        if (v === "aankoopadvies" && blokAankoop) blokAankoop.classList.add("actief");
        if (v === "evaccu" && blokAccu) blokAccu.classList.add("actief");
        if (v === "evaccu-zakelijk" && blokAccuZakelijk) blokAccuZakelijk.classList.add("actief");
        if (v === "bezwaar" && blokBezwaar) blokBezwaar.classList.add("actief");
    }

    // Als dit geen intakepagina is, stoppen we na menu logica
    if (!intakeForm || !dienstSelect) return;

    /* =========================
       URL PARAMETERS
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
       AANKOOPADVIES – pakket + EV korting
    ========================== */

    const pakketSelect = document.getElementById("pakketAankoop");
    const evKortingBlok = document.getElementById("evKortingBlok");
    const evKortingSelect = document.getElementById("evKorting");
    const accuPrijsOutput = document.getElementById("accuPrijsOutput");
    const totaalPrijsOutput = document.getElementById("totaalPrijsOutput");

    function updateAccuPrijs() {
        if (!pakketSelect || !evKortingSelect || !accuPrijsOutput || !totaalPrijsOutput) return;

        const pakket = pakketSelect.value;
        const keuze = evKortingSelect.value;

        // Basis heeft geen korting en geen keuze
        if (pakket === "basis") {
            evKortingBlok.style.display = "none";
            accuPrijsOutput.style.display = "none";
            totaalPrijsOutput.style.display = "none";
            accuPrijsOutput.textContent = "";
            totaalPrijsOutput.textContent = "";
            return;
        }

        // Alleen bij premium en full tonen we het blok
        evKortingBlok.style.display = "block";

        // Nog geen keuze gemaakt
        if (!keuze || keuze === "") {
            accuPrijsOutput.style.display = "none";
            totaalPrijsOutput.style.display = "none";
            accuPrijsOutput.textContent = "";
            totaalPrijsOutput.textContent = "";
            return;
        }

        const accuNormaal = 169;
        const accuMetKorting = +(accuNormaal * 0.9).toFixed(2);

        let pakketPrijs = 0;
        if (pakket === "premium") pakketPrijs = 299;
        if (pakket === "full") pakketPrijs = 449;

        if (keuze === "ja") {
            accuPrijsOutput.style.display = "block";
            totaalPrijsOutput.style.display = "block";

            accuPrijsOutput.textContent =
                `EV AccuCheck met tien procent korting: €${accuMetKorting} inclusief.`;

            const totaal = +(pakketPrijs + accuMetKorting).toFixed(2);
            totaalPrijsOutput.textContent =
                `Totaalprijs pakket inclusief AccuCheck: €${totaal}.`;
        } else {
            accuPrijsOutput.style.display = "none";
            totaalPrijsOutput.style.display = "none";
            accuPrijsOutput.textContent = "";
            totaalPrijsOutput.textContent = "";
        }
    }

    function updateAankoopPakket() {
        if (!pakketSelect || !evKortingBlok) return;

        const v = pakketSelect.value;

        if (v === "premium" || v === "full") {
            evKortingBlok.style.display = "block";
        } else {
            evKortingBlok.style.display = "none";
            if (accuPrijsOutput && totaalPrijsOutput) {
                accuPrijsOutput.style.display = "none";
                totaalPrijsOutput.style.display = "none";
                accuPrijsOutput.textContent = "";
                totaalPrijsOutput.textContent = "";
            }
        }
    }

    if (pakketSelect) {
        pakketSelect.addEventListener("change", () => {
            updateAankoopPakket();
            updateAccuPrijs();
        });
    }

    if (evKortingSelect) {
        evKortingSelect.addEventListener("change", updateAccuPrijs);
    }

    // Pakket uit URL na blok zichtbaar maken
    if (dienstParam === "aankoopadvies" && pakketParam) {
        setTimeout(() => {
            if (pakketSelect) {
                pakketSelect.value = pakketParam;
                updateAankoopPakket();
                updateAccuPrijs();
            }
        }, 10);
    }

    /* =========================
       EV ACCUCHECK PARTICULIER – rayon
    ========================== */

    const postcodeInput = document.getElementById("postcode");
    const zoneOutput = document.getElementById("zoneOutput");

    function bepaalRayon(pc) {
        if (!pc || pc.length < 4) return "";

        const c = parseInt(pc.charAt(0), 10);
        if (isNaN(c)) return "";

        if (c <= 3) return "Rayon A regio Randstad";
        if (c <= 6) return "Rayon B midden Nederland";
        return "Rayon C overige regio";
    }

    if (postcodeInput && zoneOutput) {
        postcodeInput.addEventListener("input", () => {
            const pc = postcodeInput.value.replace(/\s+/g, "");
            zoneOutput.textContent = bepaalRayon(pc);
        });

        if (dienstParam === "evaccu" && rayonParam && !postcodeInput.value) {
            if (rayonParam === "A") zoneOutput.textContent = "Rayon A regio Randstad";
            else if (rayonParam === "B") zoneOutput.textContent = "Rayon B midden Nederland";
            else if (rayonParam === "C") zoneOutput.textContent = "Rayon C overige regio";
        }
    }

    /* =========================
       ZAKELIJK EV ACCUCHECK – staffel + highlight
    ========================== */

    const aantalInput = document.getElementById("aantalVoertuigen");
    const pakketSelectZakelijk = document.getElementById("zakelijkPakket");
    const adviesPakket = document.getElementById("adviesPakket");
    const prijsIndicatie = document.getElementById("prijsIndicatie");

    function highlightZakelijkPakket(keuze) {
        if (!pakketSelectZakelijk) return;

        pakketSelectZakelijk.querySelectorAll("option").forEach(opt => {
            opt.classList.remove("pakket-highlight");
        });

        if (!keuze) return;

        const target = pakketSelectZakelijk.querySelector(`option[value="${keuze}"]`);
        if (target) target.classList.add("pakket-highlight");
    }

    function berekenZakelijkePrijs() {
        if (!aantalInput || !pakketSelectZakelijk || !prijsIndicatie) return;

        const n = parseInt(aantalInput.value, 10);
        const p = pakketSelectZakelijk.value;

        if (!n || n < 1 || !p) {
            prijsIndicatie.textContent = "";
            return;
        }

        let prijsPerStuk = 0;

        if (n <= 4) prijsPerStuk = 129;
        else if (n <= 9) prijsPerStuk = 109;
        else prijsPerStuk = 99;

        const totaal = prijsPerStuk * n;
        prijsIndicatie.textContent =
            `Indicatieve totaalprijs ${totaal} euro exclusief btw, ${prijsPerStuk} per test.`;
    }

    if (aantalInput && pakketSelectZakelijk && adviesPakket) {
        aantalInput.addEventListener("input", () => {
            const n = parseInt(aantalInput.value, 10);

            if (!n || n < 1) {
                adviesPakket.textContent = "";
                prijsIndicatie.textContent = "";
                highlightZakelijkPakket("");
                return;
            }

            if (n <= 4) {
                adviesPakket.textContent = "Bij 1 tot 4 voertuigen past het losse tarief.";
                pakketSelectZakelijk.value = "los";
                highlightZakelijkPakket("los");
            } else if (n <= 9) {
                adviesPakket.textContent = "Bij 5 tot 9 voertuigen past pakket vijf het beste.";
                pakketSelectZakelijk.value = "pakket5";
                highlightZakelijkPakket("pakket5");
            } else {
                adviesPakket.textContent = "Bij tien of meer voertuigen past pakket tien het beste.";
                pakketSelectZakelijk.value = "pakket10";
                highlightZakelijkPakket("pakket10");
            }

            berekenZakelijkePrijs();
        });

        pakketSelectZakelijk.addEventListener("change", () => {
            highlightZakelijkPakket(pakketSelectZakelijk.value);
            berekenZakelijkePrijs();
        });
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

        // extra controle voor zakelijk EV
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



