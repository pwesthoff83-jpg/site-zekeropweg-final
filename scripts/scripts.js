// ============================
// MENU
// ============================
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    if (!nav || !overlay) return;
    nav.classList.toggle("open");
    overlay.classList.toggle("active");
}

function closeMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("menuOverlay");
    if (!nav || !overlay) return;
    nav.classList.remove("open");
    overlay.classList.remove("active");
}

// ============================
// INTAKE LOGICA
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const dienstSelect = document.getElementById("dienst");
    const intakeForm = document.getElementById("intakeForm");

    const blokAankoop = document.getElementById("blokAankoopadvies");
    const blokAccu = document.getElementById("blokAccu");
    const blokAccuZakelijk = document.getElementById("blokAccuZakelijk");
    const blokBezwaar = document.getElementById("blokBezwaar");

    function toonBlokVoorDienst() {
        if (!dienstSelect) return;
        const waarde = dienstSelect.value;

        const alleBlokken = [blokAankoop, blokAccu, blokAccuZakelijk, blokBezwaar];
        alleBlokken.forEach(blok => {
            if (blok) blok.classList.remove("actief");
        });

        if (waarde === "aankoopadvies" && blokAankoop) blokAankoop.classList.add("actief");
        if (waarde === "evaccu" && blokAccu) blokAccu.classList.add("actief");
        if (waarde === "evaccu-zakelijk" && blokAccuZakelijk) blokAccuZakelijk.classList.add("actief");
        if (waarde === "bezwaar" && blokBezwaar) blokBezwaar.classList.add("actief");
    }

    if (dienstSelect) {
        dienstSelect.addEventListener("change", toonBlokVoorDienst);

        // URL parameter verwerking voor dienst
        const params = new URLSearchParams(window.location.search);
        const dienstParam = params.get("dienst");
        if (dienstParam) {
            dienstSelect.value = dienstParam;
            toonBlokVoorDienst();
        }
    }

    // Zakelijke logica
    const aantalInput = document.getElementById("aantalVoertuigen");
    const pakketSelect = document.getElementById("zakelijkPakket");
    const adviesPakket = document.getElementById("adviesPakket");
    const prijsIndicatie = document.getElementById("prijsIndicatie");
    const kvkInput = document.getElementById("kvk");
    const bedrijfsnaamInput = document.getElementById("bedrijfsnaam");

    function berekenZakelijkePrijs() {
        if (!aantalInput || !pakketSelect || !prijsIndicatie) return;

        const n = parseInt(aantalInput.value);
        const p = pakketSelect.value;

        if (!n || !p) {
            prijsIndicatie.textContent = "";
            return;
        }

        let prijsPerStuk = 0;
        if (p === "los") prijsPerStuk = 129;
        if (p === "pakket5") prijsPerStuk = 109;
        if (p === "pakket10") prijsPerStuk = 99;

        const totaal = prijsPerStuk * n;
        prijsIndicatie.textContent = `Indicatie totaalprijs €${totaal} excl btw (${prijsPerStuk} per test)`;
    }

    if (aantalInput && pakketSelect && adviesPakket) {
        aantalInput.addEventListener("input", () => {
            const n = parseInt(aantalInput.value);

            if (!n || n < 1) {
                adviesPakket.textContent = "";
                prijsIndicatie.textContent = "";
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

    // Formulier submit en blokkeren particulieren bij zakelijk
    if (intakeForm && dienstSelect) {
        intakeForm.addEventListener("submit", function (e) {
            const dienst = dienstSelect.value;

            if (dienst === "evaccu-zakelijk") {
                // KvK en bedrijfsnaam verplicht
                if (!kvkInput || !bedrijfsnaamInput || !kvkInput.value.trim() || !bedrijfsnaamInput.value.trim()) {
                    alert("Zakelijke aanvragen vereisen een geldige bedrijfsnaam en KvK nummer.");
                    e.preventDefault();
                    return;
                }

                // optionele domein check
                const emailInput = document.querySelector("input[name='email']");
                if (emailInput && emailInput.value) {
                    const domein = emailInput.value.split("@")[1]?.toLowerCase();
                    const verbodenDomeinen = ["gmail.com", "hotmail.com", "outlook.com", "live.nl", "yahoo.com"];
                    if (domein && verbodenDomeinen.includes(domein)) {
                        alert("Gebruik voor zakelijke aanvragen bij voorkeur een zakelijk emailadres.");
                        e.preventDefault();
                        return;
                    }
                }
            }

            e.preventDefault();
            window.location.href = `dank.html?dienst=${dienst}`;
        });
    }
});

