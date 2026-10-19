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

  let saved = 'ru';
  try { saved = localStorage.getItem('rika-language') || 'ru'; } catch { /* Optional language persistence. */ }
  setLanguage(saved);
})();
