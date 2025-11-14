document.addEventListener('DOMContentLoaded', ()=> {
  const w = document.querySelectorAll('a[href*="wa.me"]');
  w.forEach(el=>{
    el.addEventListener('click', ()=> console.log('WhatsApp clicked'));
  });
});
