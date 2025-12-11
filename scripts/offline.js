/* ===============================
   COUNTDOWN SCRIPT
=============================== */
function updateCountdown() {
    const target = new Date("January 1, 2026 00:00:00").getTime();
    const now = Date.now();
    const diff = target - now;

    const countdown = document.getElementById("countdown");
    if (!countdown) return;

    if (diff <= 0) {
        countdown.innerText = "Welkom in 2026 🎉";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdown.innerText = `${d} dagen • ${h} uur • ${m} min`;
}

updateCountdown();
setInterval(updateCountdown, 60000);


/* ===============================
   GOLD PARTICLE SNOW
=============================== */
const particleContainer = document.getElementById("particles");
if (particleContainer) {
    const total = 55;

    for (let i = 0; i < total; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");

        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = 4 + Math.random() * 5 + "s";
        p.style.animationDelay = Math.random() * 4 + "s";
        p.style.opacity = 0.5 + Math.random() * 0.5;
        p.style.transform = `scale(${0.4 + Math.random() * 1.3})`;

        particleContainer.appendChild(p);
    }
}

