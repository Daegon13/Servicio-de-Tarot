/*
  Tracking de conversiones Marivivian.
  - No carga cookies propias ni dependencias.
  - Para activar GA4 o GTM, insertar el ID real en el HTML según docs/tracking.md.
  - Este archivo usa gtag/dataLayer solo si ya existen; si no, falla de forma segura.
*/
(function () {
  'use strict';

  function getTrackingPayload(link) {
    return {
      event_category: 'conversion_contact',
      event_label: link.getAttribute('aria-label') || link.textContent.trim(),
      service: link.dataset.service || 'general',
      link_url: link.href,
      page_path: window.location.pathname
    };
  }

  function sendTrackingEvent(eventName, payload) {
    if (!eventName) return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
      return;
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: eventName }, payload));
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[data-event]');
    if (!link) return;

    sendTrackingEvent(link.dataset.event, getTrackingPayload(link));
  }, { passive: true });
}());
