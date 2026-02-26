document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initTabs();
  initForms();
  initPhoneMask();
  initScrollToCta();
});

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

function initTabs() {
  const tabs = document.querySelectorAll('.product-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

function initForms() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName');
    const phone = document.getElementById('formPhone');
    [name, phone].forEach(el => el.classList.remove('error'));
    let valid = true;
    if (!name.value.trim()) { name.classList.add('error'); valid = false; }
    if (phone.value.replace(/\D/g, '').length < 11) { phone.classList.add('error'); valid = false; }
    if (!valid) return;
    form.style.display = 'none';
    success.classList.add('show');
  });
}

function initPhoneMask() {
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (!v.length) { e.target.value = ''; return; }
      if (v[0] === '8') v = '7' + v.slice(1);
      if (v[0] !== '7') v = '7' + v;
      let f = '+7';
      if (v.length > 1) f += ' (' + v.slice(1,4);
      if (v.length > 4) f += ') ' + v.slice(4,7);
      if (v.length > 7) f += '-' + v.slice(7,9);
      if (v.length > 9) f += '-' + v.slice(9,11);
      e.target.value = f;
    });
  });
}

function initScrollToCta() {
  ['heroCta', 'ctaBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => {
      const target = document.getElementById('contacts');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
