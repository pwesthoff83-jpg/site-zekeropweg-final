window.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bezwaarForm");
  const result = document.getElementById("apiResult");

  if (!form) {
    console.error("FORM NOT FOUND");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    result.innerHTML = "⏳ Dossier wordt aangemaakt...";

    const fd = new FormData(form);

    try {
      const r = await fetch("https://script.google.com/macros/s/AKfycbwXCX_5Z8heD-HkkMsxQHBbGZXFup-SU5DBO9_A6Lpg1Yy_GamUdMEgsRpnrQREjUq8Zw/exec", {
        method: "POST",
        body: fd
      });

      const t = await r.text();
      result.innerHTML = t;

    } catch (err) {
      console.error(err);
      result.innerHTML = "❌ Verbindingsfout";
    }
  });
});

