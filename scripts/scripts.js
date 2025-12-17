/* ============================================================
   ZEKEROPWEG – Intake logica
============================================================ */

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
        if (!dienstSelect) return;
        const v = dienstSelect.value;

        [blokAankoop, blokAccu, blokAccuZakelijk, blokBezwaar].forEach(b => {
            if (b) b.classList.remove("actief");
        });

        if (v === "aankoopadvies") blokAankoop?.classList.add("actief");
        if (v === "evaccu") blokAccu?.classList.add("actief");
        if (v === "evaccu-zakelijk") blokAccuZakelijk?.classList.add("actief");
        if (v === "bezwaar") blokBezwaar?.classList.add("actief");
    }

    if (dienstSelect) {
        dienstSelect.addEventListener("change", updateDienstBlokken);
        updateDienstBlokken();
    }

    function updateComboOptie() {
        if (!pakketAankoop || !comboOptie) return;
        comboOptie.style.display =
            (pakketAankoop.value === "premium" || pakketAankoop.value === "full")
            ? "block"
            : "none";
    }

    pakketAankoop?.addEventListener("change", updateComboOptie);
});



