// COUNTDOWN TOT 1 JANUARI 2026
(function initCountdown() {
    const target = new Date("2026-01-01T00:00:00");

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");

    function update() {
        const now = new Date();
        let diff = target - now;

        if (diff <= 0) return;

        const sec = Math.floor(diff / 1000);
        const days = Math.floor(sec / 86400);
        const hours = Math.floor((sec % 86400) / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const seconds = sec % 60;

        elDays.textContent = String(days).padStart(2, "0");
        elHours.textContent = String(hours).padStart(2, "0");
        elMinutes.textContent = String(minutes).padStart(2, "0");
        elSeconds.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
})();

// GOUDEN PARTICLE SNOW
(function initParticles() {
    const hero = document.querySelector(".hero-offline");
    if (!hero) return;

    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.className = "particle";

        const left = Math.random() * 100;
        const size = 4 + Math.random() * 5;
        const duration = 10 + Math.random() * 12;
        const delay = Math.random() * 8;
        const drift = (Math.random() - 0.5) * 80;

        p.style.left = left + "vw";
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.animationDuration = duration + "s";
        p.style.animationDelay = delay + "s";
        p.style.setProperty("--driftX", drift + "px");

        hero.appendChild(p);
    }
})();

