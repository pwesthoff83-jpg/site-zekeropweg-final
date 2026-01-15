<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Bezwaar starten | ZekerOpWeg</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="css/styles.css">
</head>

<body class="fade-in">
<section class="container">
<div class="contact-card">

<h2>Bezwaar starten</h2>
<p>Upload uw boete en wij starten automatisch uw juridische dossier.</p>

<form id="bezwaarForm">

<input name="naam" required placeholder="Naam">
<input name="email" required placeholder="E-mail">
<input name="kenteken" required placeholder="Kenteken">
<input name="beschikking" required placeholder="Beschikkingsnummer">
<input name="type" required placeholder="Overtreding">
<input name="token" required placeholder="Abonnementscode">

<textarea name="toelichting" rows="5" placeholder="Uw toelichting"></textarea>

<input type="file" id="boete" accept=".pdf,image/*" required>

<button class="btn-primary">Bezwaar starten</button>
</form>

<div id="apiResult"></div>
</div>

<script>
document.getElementById("bezwaarForm").addEventListener("submit", async e => {
  e.preventDefault();
  const result = document.getElementById("apiResult");
  result.innerHTML = "⏳ Dossier wordt aangemaakt...";

  const file = document.getElementById("boete").files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const data = Object.fromEntries(new FormData(e.target));
    data.filedata = reader.result.split(",")[1];
    data.filename = file.name;

    const r = await fetch("https://script.google.com/macros/s/AKfycbwUd2uxep2MqgNxZSHcRj1FpesnjQoapjB-xcOGGprMhSr5iBs0AHeu5zjmCaQSlV6SoA/exec", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    });

    result.innerHTML = await r.text();
  };

  reader.readAsDataURL(file);
});
</script>
</section>
</body>
</html>


