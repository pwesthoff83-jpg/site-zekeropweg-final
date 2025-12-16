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
       INTAKE BLOKKEN
    ========================== */

    const dienstSelect = document.getElementById("dienst");
    const blokAankoop = document.getElementById("blokAankoopadvies");
    const blokAccu = document.getElementById("blokAccu");
    const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
    const blokBezwaar = document.getElementById("blokBezwaar");
    const comboOptie = document.getElementById("comboOptie");
    const pakketAankoop = document.getElementById("pakketAankoop");

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

    /* =========================
       COMBINATIEVOORDEEL
    ========================== */
    function updateComboOptie() {
        if (!pakketAankoop) return;

        const pak = pakketAankoop.value;

        if (pak === "premium" || pak === "full") {
            comboOptie.style.display = "block";
        } else {
            comboOptie.style.display = "none";
        }
    }

    if (pakketAankoop) {
        pakketAankoop.addEventListener("change", updateComboOptie);
    }

    /* =========================
       URL PARAMETERS
    ========================== */

    const params = new URLSearchParams(window.location.search);
    const dienstParam = params.get("dienst");
    const pakketParam = params.get("type");
    const rayonParam = params.get("rayon");

    if (dienstParam) {
        dienstSelect.value = dienstParam;
    }

    updateDienstBlokken();

    if (dienstParam === "aankoopadvies" && pakketParam) {
        if (pakketParam === "premium") pakketAankoop.value = "premium";
        if (pakketParam === "full") pakketAankoop.value = "full";
        updateComboOptie();
    }

    /* =========================
       RAYON BEREKENING
    ========================== */

    const postcodeInput = document.getElementById("postcode");
    const zoneOutput = document.getElementById("zoneOutput");

    function bepaalRayon(pc) {
        if (!pc || pc.length < 4) return "";

        const eerste = parseInt(pc.charAt(0), 10);
        if (eerste <= 3) return "Rayon A regio Randstad";
        if (eerste <= 6) return "Rayon B midden Nederland";
        return "Rayon C overige regio";
    }

    if (postcodeInput) {
        postcodeInput.addEventListener("input", () => {
            const pc = postcodeInput.value.replace(/\s+/g, "");
            zoneOutput.textContent = bepaalRayon(pc);
        });

        if (rayonParam && !postcodeInput.value) {
            if (rayonParam === "A") zoneOutput.textContent = "Rayon A regio Randstad";
            if (rayonParam === "B") zoneOutput.textContent = "Rayon B midden Nederland";
            if (rayonParam === "C") zoneOutput.textContent = "Rayon C overige regio";
        }
    }

    /* =========================
       ZAKELIJK STAFFEL
    ========================== */

    const aantalInput = document.getElementById("aantalVoertuigen");
    const pakketSelectZakelijk = document.getElementById("zakelijkPakket");
    const adviesPakket = document.getElementById("adviesPakket");
    const prijsIndicatie = document.getElementById("prijsIndicatie");

    function zakelijkBerekening() {
        const n = parseInt(aantalInput.value, 10);
        if (!n || n < 1) {
            adviesPakket.textContent = "";
            prijsIndicatie.textContent = "";
            return;
        }

        if (n <= 4) {
            pakketSelectZakelijk.value = "los";
            adviesPakket.textContent = "Losse testen zijn het meest geschikt voor 1–4 voertuigen.";
        } else if (n <= 9) {
            pakketSelectZakelijk.value = "pakket5";
            adviesPakket.textContent = "Het pakket van vijf testen past bij 5–9 voertuigen.";
        } else {
            pakketSelectZakelijk.value = "pakket10";
            adviesPakket.textContent = "Het pakket van tien testen past bij 10 voertuigen of meer.";
        }

        let prijs = 0;
        if (n <= 4) prijs = 129;
        else if (n <= 9) prijs = 109;
        else prijs = 99;

        prijsIndicatie.textContent =
            `Indicatieve totaalprijs: €${(prijs * n)} exclusief btw — €${prijs} per test.`;
    }

    if (aantalInput) aantalInput.addEventListener("input", zakelijkBerekening);

    /* =========================
       FORM SUBMIT
    ========================== */

    const intakeForm = document.getElementById("intakeForm");
    if (intakeForm) {

        intakeForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const dienst = dienstSelect.value;

            if (dienst === "evaccu-zakelijk") {
                const kvk = document.getElementById("kvk").value.trim();
                const bedrijf = document.getElementById("bedrijfsnaam").value.trim();

                if (!kvk || !bedrijf) {
                    alert("Voor zakelijke aanvragen zijn bedrijfsnaam en KvK verplicht.");
                    return;
                }
            }

            window.location.href = `dank.html?dienst=${encodeURIComponent(dienst)}`;
        });
    }
});

/* =========================================================
   MOBILE MENU – STABIEL (ZekerOpWeg)
========================================================= */

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  menu.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  menu.classList.remove("open");
  document.body.classList.remove("menu-open");
}
/* =========================================================
   MOBILE MENU – STABIEL (ZekerOpWeg)
========================================================= */

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  menu.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  menu.classList.remove("open");
  document.body.classList.remove("menu-open");
}



