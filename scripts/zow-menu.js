/* ZekerOpWeg hoofdmenu: mobiel menu openen en sluiten */
(function () {
  function init() {
    var header = document.querySelector("[data-zow-header]");
    if (!header) return;
    var toggle = header.querySelector(".zow-header__toggle");
    var panel = header.querySelector(".zow-header__mobile");
    if (!toggle || !panel) return;
    function setOpen(open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
      toggle.textContent = open ? "×" : "☰";
    }
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!header.classList.contains("is-open"));
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (header.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
