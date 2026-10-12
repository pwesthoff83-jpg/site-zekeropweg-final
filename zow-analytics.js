(function () {
  'use strict';
  const id = 'G-W2YH2BMQM3';
  const key = 'zow_analytics_consent_v1';
  let active = false;
  let started = false;
  function stored(storage, name) { try { return storage.getItem(name); } catch (_) { return null; } }
  function save(storage, name, value) { try { storage.setItem(name, value); } catch (_) {} }
  function pathOf(raw) { try { const u = new URL(raw, location.href); return u.pathname; } catch (_) { return ''; } }
  function sameSiteSource() { try { const u = new URL(document.referrer); return u.origin === location.origin ? u.pathname : ''; } catch (_) { return ''; } }
  function consent() {
    try { const v = JSON.parse(stored(localStorage, key) || 'null'); return v && Date.now() - v.at < 15552000000 ? v.choice : null; } catch (_) { return null; }
  }
  function leadContext() {
    return {
      service: 'ev_accucheck',
      page_path: location.pathname,
      source_page: sameSiteSource(),
      landing_page: stored(sessionStorage, 'zow_landing_path') || location.pathname
    };
  }
  function start() {
    active = true;
    if (started) return;
    started = true;
    if (!stored(sessionStorage, 'zow_landing_path')) save(sessionStorage, 'zow_landing_path', location.pathname);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    gtag('consent', 'update', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    gtag('js', new Date());
    let ref = '';
    try { const u = new URL(document.referrer); ref = u.origin + u.pathname; } catch (_) {}
    gtag('config', id, {send_page_view:true,page_location:location.origin+location.pathname,page_referrer:ref,allow_google_signals:false,allow_ad_personalization_signals:false});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
  function track(name, details, done) {
    let finished = false;
    function finish() { if (!finished) { finished = true; if (done) done(); } }
    if (!active || typeof window.gtag !== 'function') { finish(); return; }
    const params = Object.assign({}, details, {send_to:id,page_location:location.origin+location.pathname});
    if (done) { params.event_callback = finish; params.event_timeout = 800; setTimeout(finish, 900); }
    gtag('event', name, params);
  }
  // Called only after the Make endpoint has accepted an AccuCheck submission.
  window.zowLeadReceived = function (done) {
    const details = leadContext();
    const product = document.getElementById('productField');
    details.test_location = product && product.value === 'ev-accucheck-barendrecht-95' ? 'barendrecht' : 'mobile';
    track('generate_lead', details, done);
  };
  function choose(value) {
    save(localStorage, key, JSON.stringify({choice:value,at:Date.now()}));
    const panel = document.getElementById('zow-analytics-choice');
    if (panel) panel.hidden = true;
    if (value === 'yes') start();
    else if (started) {
      active = false;
      gtag('consent', 'update', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      document.cookie.split(';').forEach(function (item) {
        const name = item.split('=')[0].trim();
        if (/^_ga(?:_|$)/.test(name)) {
          [null,location.hostname,'.'+location.hostname,'.zekeropweg.nu'].forEach(function (domain) {
            document.cookie = name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'')+'; SameSite=Lax';
          });
        }
      });
      location.reload();
    }
  }
  function ready() {
    const style = document.createElement('style');
    style.textContent = '#zow-analytics-choice{box-sizing:border-box;position:fixed;bottom:12px;left:12px;right:12px;max-width:850px;margin:auto;background:#fffdf8;color:#142b35;border:1px solid #d8d5ca;border-radius:12px;padding:16px;box-shadow:0 6px 24px #0002;z-index:10010;font:14px/1.5 system-ui,sans-serif}#zow-analytics-choice[hidden]{display:none}#zow-analytics-choice p{margin:0 0 12px;color:#142b35;font:inherit}#zow-analytics-choice a{color:#18583d;text-decoration:underline}#zow-analytics-choice button{background:#fff;color:#142b35;border:1px solid #142b35;padding:10px 14px;border-radius:6px;min-height:44px;font:600 14px system-ui;cursor:pointer;margin:0 8px 0 0}#zow-analytics-choice button:focus-visible,#zow-analytics-settings:focus-visible{outline:3px solid #a17c39;outline-offset:3px}#zow-analytics-settings{display:block;background:transparent;border:0;color:#4b5660;text-decoration:underline;font:13px system-ui;cursor:pointer;padding:16px;margin:0 auto}';
    document.head.appendChild(style);
    const panel = document.createElement('section');
    panel.id = 'zow-analytics-choice';
    panel.setAttribute('aria-label', 'Keuze voor analytische cookies');
    panel.innerHTML = '<p>Mag ZekerOpWeg Google Analytics gebruiken om bezoeken en aanvragen te meten? Uw naam, kenteken en contactgegevens worden niet meegestuurd. <a href="/privacyverklaring.html">Privacyverklaring</a></p><button type="button" data-choice="yes">Analyse toestaan</button><button type="button" data-choice="no">Weigeren</button>';
    panel.hidden = consent() !== null;
    panel.querySelectorAll('button').forEach(function (button) { button.addEventListener('click', function () { choose(button.dataset.choice); }); });
    document.body.appendChild(panel);
    const settings = document.createElement('button');
    settings.id = 'zow-analytics-settings';settings.type = 'button';settings.textContent = 'Cookiekeuze aanpassen';
    settings.addEventListener('click', function () { panel.hidden = false; panel.querySelector('button').focus(); });
    document.body.appendChild(settings);
    document.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (/^(https?:\/\/(wa\.me|api\.whatsapp\.com)|whatsapp:)/i.test(href)) track('whatsapp_click', {page_path:location.pathname});
      else if (/^tel:/i.test(href)) track('phone_click', {page_path:location.pathname});
      else if (pathOf(href) === '/intake.html') track('accucheck_request_click', {page_path:location.pathname});
    });
    const form = document.getElementById('accucheckForm');
    if (form) {
      const field = document.createElement('input');field.type='hidden';field.name='aanvraag_bronpagina';field.value=sameSiteSource();form.appendChild(field);
    }
  }
  if (consent() === 'yes') start();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
