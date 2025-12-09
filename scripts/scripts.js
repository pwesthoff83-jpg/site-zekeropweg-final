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

    nav.classList.toggle("open");
    overlay.classList.toggle("active");
    toggle.classList.toggle("open");
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    const toggle = document.querySelector(".menu-toggle");

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
    const blokAankoop = document.getElementById("blokAankoopadvies");
    const blokAccu = document.getElementById("blokAccu");
    const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
    const blokBezwaar = document.getElementById("blokBezwaar");

    function updateDienstBlokken() {
        const v = dienstSelect.value;

        [blokAankoop, blokAccu, blokAccuZakelijk, blokBezwaar].forEach(b => {
            if (b) b.classList.remove("actief");
        });

        if (v === "aankoopadvies") blokAankoop.classList.add("actief");
        if (v === "evaccu") blokAccu.classList.add("actief");
        if (v === "evaccu-zakelijk") blokAccuZakelijk.classList.add("actief");
        if (v === "bezwaar") blokBezwaar.classList.add("actief");
    }

    const intakeForm = document.getElementById("intakeForm");
    if (!intakeForm) return;

    /* =========================
       URL PARAMETERS
    ========================== */
    const params = new URLSearchParams(window.location.search);
    const dienstParam = params.get("dienst");
    const pakketParam = params.get("pakket");
    const rayonParam = params.get("rayon");

    if (dienstParam) dienstSelect.value = dienstParam;
    updateDienstBlokken();

    /* =========================
       EV PARTICULIER RAYON LOGICA
    ========================== */

    const postcodeInput = document.getElementById("postcode");
    const zoneOutput = document.getElementById("zoneOutput");

    function bepaalRayon(pc) {
        if (!pc || pc.length < 4) return "";

        const c = parseInt(pc.charAt(0), 10);
        if (c <= 3) return "Rayon A regio Randstad";
        if (c <= 6) return "Rayon B midden Nederland";
        return "Rayon C overige regio";
    }

    if (postcodeInput) {
        postcodeInput.addEventListener("input", () => {
            const pc = postcodeInput.value.replace(/\s+/g, "");
            zoneOutput.textContent = bepaalRayon(pc);
        });

        if (dienstParam === "evaccu" && rayonParam && !postcodeInput.value) {
            if (rayonParam === "A") zoneOutput.textContent = "Rayon A regio Randstad";
            if (rayonParam === "B") zoneOutput.textContent = "Rayon B midden Nederland";
            if (rayonParam === "C") zoneOutput.textContent = "Rayon C overige regio";
        }
    }

    /* ============================================================
       NIEUW: ACCUCHECK OPTIONEEL MEEBESTELLEN (10% KORTING)
    ============================================================ */

    const pakketAankoop = document.getElementById("pakketAankoop");
    const accuMeebestellen = document.getElementById("accuMeebestellen");
    const accuPrijsOutput = document.getElementById("accuPrijsOutput");
    const totaalPrijsOutput = document.getElementById("totaalPrijsOutput");

    function updateAccuPrijs() {
        if (!pakketAankoop || !accuMeebestellen) return;

        const pakket = pakketAankoop.value;
        const wilAccu = accuMeebestellen.value === "ja";

        const accuNormaal = 169;
        const accuMetKorting = +(accuNormaal * 0.9).toFixed(2);

        let pakketPrijs = 0;
        if (pakket === "basis") pakketPrijs = 149;
        if (pakket === "premium") pakketPrijs = 299;
        if (pakket === "full") pakketPrijs = 449;

        if (!wilAccu) {
            accuPrijsOutput.style.display = "none";
            totaalPrijsOutput.style.display = "none";
            return;
        }

        accuPrijsOutput.style.display = "block";
        totaalPrijsOutput.style.display = "block";

        accuPrijsOutput.textContent =
            `EV AccuCheck met tien procent korting: €${accuMetKorting} inclusief.`;

        const totaal = +(pakketPrijs + accuMetKorting).toFixed(2);
        totaalPrijsOutput.textContent =
            `Totaalprijs pakket inclusief AccuCheck: €${totaal}.`;
    }

    if (pakketAankoop && accuMeebestellen) {
        pakketAankoop.addEventListener("change", updateAccuPrijs);
        accuMeebestellen.addEventListener("change", updateAccuPrijs);
    }

    /* =========================
       EV ACCUCHECK ZAKELIJK
    ========================== */

    const aantalInput = document.getElementById("aantalVoertuigen");
    const pakketZakelijk = document.getElementById("zakelijkPakket");
    const adviesPakket = document.getElementById("adviesPakket");
    const prijsIndicatie = document.getElementById("prijsIndicatie");

    function berekenZakelijkePrijs() {
        const n = parseInt(aantalInput.value, 10);
        const p = pakketZakelijk.value;

        if (!n || n < 1 || !p) {
            prijsIndicatie.textContent = "";
            return;
        }

        let prijs = 0;
        if (p === "los") prijs = 129;
        if (p === "pakket5") prijs = 109;
        if (p === "pakket10") prijs = 99;

        const totaal = prijs * n;

        prijsIndicatie.textContent =
            `Indicatieve totaalprijs €${totaal} exclusief btw (${prijs} per test).`;
    }

    if (aantalInput && pakketZakelijk) {
        aantalInput.addEventListener("input", () => {
            const n = parseInt(aantalInput.value, 10);

            if (!n || n < 1) {
                adviesPakket.textContent = "";
                prijsIndicatie.textContent = "";
                return;
            }

            if (n <= 3) {
                adviesPakket.textContent = "Losse testen passen bij kleinere aantallen.";
                pakketZakelijk.value = "los";
            } else if (n <= 7) {
                adviesPakket.textContent = "Pakket vijf past bij dit aantal.";
                pakketZakelijk.value = "pakket5";
            } else {
                adviesPakket.textContent = "Pakket tien is het meest passend.";
                pakketZakelijk.value = "pakket10";
            }

            berekenZakelijkePrijs();
        });

        pakketZakelijk.addEventListener("change", berekenZakelijkePrijs);
    }

    /* =========================
       FORM SUBMIT
    ========================== */

    intakeForm.addEventListener("submit", e => {
        e.preventDefault();

        const dienst = dienstSelect.value;

        if (dienst === "evaccu-zakelijk") {
            const kvk = document.getElementById("kvk").value.trim();
            const naam = document.getElementById("bedrijfsnaam").value.trim();
            if (!kvk || !naam) {
                alert("Voor zakelijke aanvragen zijn bedrijfsnaam en KvK verplicht.");
                return;
            }
        }

        window.location.href = `dank.html?dienst=${encodeURIComponent(dienst)}`;
    });

});



