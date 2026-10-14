(() => {
  'use strict';
  let language = 'ru';
  let trackingState = null;
  let calculated = false;
  const $ = (selector) => document.querySelector(selector);
  const t = (key) => window.RIKA_I18N?.[language]?.[key] ?? window.RIKA_I18N?.ru?.[key] ?? key;
  const escape = (text) => String(text).replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  const translateText = (node, value) => {
    // Translations are local trusted copy; only explicit line breaks are rendered as markup.
    node.innerHTML = escape(value).replace(/&lt;br\s*\/?&gt;/g, '<br>');
  };
  function setLanguage(lang) {
    if (!['ru','kk','en'].includes(lang)) return;
    language = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = window.RIKA_I18N?.[lang]?.[node.dataset.i18n];
      if (value !== undefined) translateText(node, value);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => node.placeholder = t(node.dataset.i18nPlaceholder));
    document.querySelectorAll('[data-i18n-alt]').forEach(node => node.alt = t(node.dataset.i18nAlt));
    document.querySelectorAll('[data-i18n-aria]').forEach(node => node.setAttribute('aria-label', t(node.dataset.i18nAria)));
    document.querySelectorAll('[data-i18n-title]').forEach(node => node.title = t(node.dataset.i18nTitle));
    document.querySelectorAll('[data-lang]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.lang === lang)));
    $('.menu-button').setAttribute('aria-label', t('menuLabel'));
    $('#swap-cities')?.setAttribute('aria-label', t('swapLabel'));
    document.title = t(document.body.dataset.pageTitle || 'pageTitle');
    try { localStorage.setItem('rika-language', lang); } catch { /* File/private mode can disable storage. */ }
    if (trackingState) renderTracking();
    if (calculated) renderCalculation();
    if ($('#tracking-error') && !$('#tracking-error').hidden) $('#tracking-error').textContent = t('trackInvalid');
    document.dispatchEvent(new CustomEvent('rika:language', {detail:lang}));
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function activateTab(button, moveFocus = false) {
    tabs.forEach(tab => {
      const active = tab === button;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (moveFocus) button.focus();
  }
  tabs.forEach((button,index) => {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activateTab(tabs[next], true); }
    });
  });
  const menuButton = $('.menu-button');
  function closeMenu() { $('#mobile-menu').hidden = true; menuButton.setAttribute('aria-expanded','false'); }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    $('#mobile-menu').hidden = open;
    menuButton.setAttribute('aria-expanded', String(!open));
  });
  $('#mobile-menu').querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#mobile-menu').hidden) { closeMenu(); menuButton.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const trackingInput = $('#tracking-number');
  function renderTracking() {
    const result = $('#tracking-result');
    result.hidden = false;
    if (trackingState === 'demo') {
      result.innerHTML = `<span class="mode-badge">${escape(t('demoBadge'))} · RIKA-DEMO</span><h3>${escape(t('demoTrackingTitle'))}</h3><p>${escape(t('demoRoute'))}</p><ol class="timeline"><li>${escape(t('demoStep1'))}</li><li>${escape(t('demoStep2'))}</li><li aria-current="step">${escape(t('demoStep3'))}</li><li>${escape(t('demoStep4'))}</li></ol><p class="result-note">${escape(t('demoTrackingNote'))}</p>`;
    } else {
      result.innerHTML = `<h3>${escape(t('trackRealTitle'))}</h3><p>${escape(t('trackRealText'))}</p><a class="subtle-link" href="#live-tracking">${escape(t('realTracking'))} →</a>`;
    }
  }
  $('#tracking-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const value = trackingInput.value.trim();
    if (!/^[\p{L}\p{N}-]{3,40}$/u.test(value)) {
      $('#tracking-error').textContent = t('trackInvalid');
      $('#tracking-error').hidden = false;
      trackingInput.setAttribute('aria-invalid','true');
      $('#tracking-result').hidden = true;
      trackingState = null;
      trackingInput.focus();
      return;
    }
    $('#tracking-error').hidden = true;
    trackingInput.removeAttribute('aria-invalid');
    trackingState = value.toUpperCase() === 'RIKA-DEMO' ? 'demo' : 'real';
    renderTracking();
  });
  trackingInput?.addEventListener('input', () => {
    $('#tracking-error').hidden = true;
    trackingInput.removeAttribute('aria-invalid');
    $('#tracking-result').hidden = true;
    trackingState = null;
  });
  $('#try-demo')?.addEventListener('click', () => {
    trackingInput.value = 'RIKA-DEMO';
    $('#tracking-form').requestSubmit();
  });

  const calculator = $('#calculator-form');
  function clearCalculation() { calculated = false; $('#calculator-result').hidden = true; }
  $('#swap-cities')?.addEventListener('click', () => {
    const from = $('#from-city'), to = $('#to-city');
    [from.value, to.value] = [to.value, from.value];
    clearCalculation();
  });
  function renderCalculation() {
    const weight = Number($('#weight').value);
    if (!Number.isFinite(weight) || weight < .1 || weight > 30) return;
    const base = $('#from-city').value === $('#to-city').value ? 900 : 1500;
    const steps = Math.ceil(weight);
    const price = base + steps * 400; // Illustrative units only; no official RIKA rate data.
    const formatted = new Intl.NumberFormat(language === 'kk' ? 'kk-KZ' : language === 'en' ? 'en-US' : 'ru-RU').format(price);
    const formula = t('calcFormula').replace('{base}',String(base)).replace('{steps}',String(steps)).replace('{price}',formatted);
    const result = $('#calculator-result');
    result.innerHTML = `<span class="mode-badge">${escape(t('demoBadge'))}</span><h3>${escape(t('calcResultTitle'))}</h3><output class="price-result">${formatted} ₸</output><p>${escape(formula)}</p><p class="result-note">${escape(t('calcResultNote'))}</p>`;
    result.hidden = false;
  }
  calculator?.addEventListener('submit', event => { event.preventDefault(); calculated = true; renderCalculation(); });
  calculator?.addEventListener('input', clearCalculation);
  calculator?.addEventListener('change', clearCalculation);
  let saved = 'ru';
  try { saved = localStorage.getItem('rika-language') || 'ru'; } catch { /* Optional language persistence. */ }
  setLanguage(saved);
})();
