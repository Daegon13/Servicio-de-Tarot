# Checklist pre-deploy y post-deploy

Documento de control final para publicar el sitio de Marivivian y registrarlo/verificarlo en Google Search Console.

## Revisión técnica realizada antes de deploy

### Performance
- [x] Confirmar peso general de HTML, CSS y JS: el sitio mantiene páginas HTML livianas, CSS único y `js/tracking.js` cargado con `defer`.
- [x] Revisar imágenes pesadas: `images/fondo.jpg` pesa aproximadamente 2.3 MB y `images/cover.png` aproximadamente 2.1 MB.
- [x] Evitar cargar la imagen de fondo en mobile: el fondo visual pesado queda limitado por CSS a viewport de escritorio (`min-width: 900px`).
- [x] Confirmar que no hay imágenes `<img>` visibles sin `loading="lazy"`, dimensiones o `alt`: actualmente no hay etiquetas `<img>` en las páginas.
- [x] Confirmar que la imagen `cover.png` se usa como recurso social/Open Graph y no como imagen visible de página.
- [x] Confirmar uso de `font-display=swap` en Google Fonts.
- [x] Confirmar preconnect a Google Fonts y `fonts.gstatic.com`.
- [x] Revisar CSS duplicado o innecesario: se eliminó una regla mobile redundante para navegación.
- [ ] Optimizar o reemplazar `images/fondo.jpg` y `images/cover.png` por versiones comprimidas/WebP antes de producción si el hosting no las optimiza automáticamente.

### Accesibilidad
- [x] Confirmar un solo `<h1>` por página.
- [x] Confirmar orden lógico de encabezados principales (`h1` seguido por secciones `h2` y subsecciones `h3`).
- [x] Corregir heading vacío dentro del template de testimonios para evitar falsos positivos en validadores estáticos.
- [x] Confirmar que los CTAs importantes a WhatsApp tienen `aria-label` descriptivo.
- [x] Confirmar foco visible en links y controles `summary`.
- [x] Confirmar contraste razonable en texto, botones, cards, header y footer sobre fondo oscuro.
- [x] Confirmar links descriptivos en navegación, footer, cards y CTAs.
- [x] Confirmar navegación mobile usable con enlaces prioritarios visibles y navegación horizontal.

### Consistencia visual
- [x] Revisar consistencia de botones principales (`.btn`, `.cta`) y secundarios (`.btn-ghost`).
- [x] Revisar cards, bordes, radios y espaciados compartidos.
- [x] Revisar header sticky y footer con enlaces principales.
- [x] Revisar CTAs intermedios/finales y bandas de conversión.
- [x] Revisar comportamiento mobile de header, botones y paneles divididos.

### SEO técnico
- [x] Confirmar sitemap con todas las páginas HTML públicas.
- [x] Confirmar `robots.txt` con `Allow: /` y referencia al sitemap.
- [x] Confirmar canonical absoluto y consistente por página.
- [x] Confirmar ausencia de `noindex` accidental.
- [x] Confirmar titles únicos.
- [x] Confirmar meta descriptions únicas.
- [x] Confirmar Open Graph y Twitter Card completos.
- [x] Confirmar JSON-LD parseable y sin placeholders visibles.
- [ ] Actualizar `lastmod` en sitemap si se decide usar fechas de modificación explícitas.

## Checklist antes de deploy

- [ ] Ejecutar validación HTML o revisar en W3C Validator las páginas principales.
- [ ] Verificar que el dominio final sea `https://www.mariviviantarot.com/` o ajustar canonicals/sitemap si cambia.
- [ ] Confirmar que el hosting fuerza HTTPS.
- [ ] Confirmar que `index.html`, páginas SEO, `robots.txt` y `sitemap.xml` se publican en la raíz del dominio.
- [x] Confirmar que no se publican comentarios internos sensibles ni datos placeholder visibles.
- [ ] Confirmar número de WhatsApp final: `+59897054961`.
- [ ] Confirmar horario comercial final antes de publicar JSON-LD y Google Business Profile.
- [ ] Optimizar imágenes pesadas o confirmar optimización automática del hosting/CDN.
- [ ] Probar navegación desktop y mobile en Chrome/Safari/Firefox si están disponibles.
- [ ] Probar enlaces del header, footer, cards y CTAs.
- [ ] Probar que el tracking queda inactivo si no hay GA4/GTM real configurado.

## Checklist después de deploy

- [ ] Abrir `https://www.mariviviantarot.com/` y confirmar carga correcta sin errores visuales.
- [ ] Abrir cada URL del sitemap y confirmar código 200.
- [ ] Confirmar que HTTP redirige a HTTPS.
- [ ] Confirmar que versión sin `www` redirige a la versión canónica, si esa será la versión oficial.
- [ ] Confirmar que CSS y JS cargan con código 200.
- [ ] Confirmar que `images/cover.png` y `images/fondo.jpg` cargan con código 200.
- [ ] Ejecutar Lighthouse/PageSpeed en mobile y desktop.
- [ ] Revisar consola del navegador sin errores JavaScript.
- [ ] Confirmar que eventos de WhatsApp se registran solo si se activó GA4/GTM real.

## Verificación en Google Search Console

- [ ] Crear propiedad de dominio o prefijo URL para `https://www.mariviviantarot.com/`.
- [ ] Completar verificación DNS o método provisto por el hosting.
- [ ] Enviar `https://www.mariviviantarot.com/sitemap.xml` en la sección **Sitemaps**.
- [ ] Usar **Inspección de URL** para la home y páginas SEO principales.
- [ ] Solicitar indexación de la home después de verificar que responde 200 y canonicaliza correctamente.
- [ ] Revisar reportes de indexación durante los días posteriores al deploy.

## Prueba de sitemap

- [ ] Abrir `https://www.mariviviantarot.com/sitemap.xml` en navegador.
- [ ] Confirmar que el XML es válido y no muestra HTML de error.
- [ ] Confirmar que contiene estas URLs:
  - `https://www.mariviviantarot.com/`
  - `https://www.mariviviantarot.com/lecturas.html`
  - `https://www.mariviviantarot.com/como-funciona.html`
  - `https://www.mariviviantarot.com/testimonios.html`
  - `https://www.mariviviantarot.com/faq.html`
  - `https://www.mariviviantarot.com/guia-tarot.html`
  - `https://www.mariviviantarot.com/contacto.html`
  - `https://www.mariviviantarot.com/tarot-online.html`
  - `https://www.mariviviantarot.com/tarot-en-montevideo.html`
  - `https://www.mariviviantarot.com/tarot-amor.html`
  - `https://www.mariviviantarot.com/tarot-por-whatsapp.html`
- [ ] Confirmar que Search Console lo procesa sin errores.

## Prueba de robots

- [ ] Abrir `https://www.mariviviantarot.com/robots.txt`.
- [ ] Confirmar contenido esperado:
  - `User-agent: *`
  - `Allow: /`
  - `Sitemap: https://www.mariviviantarot.com/sitemap.xml`
- [ ] Confirmar que no hay reglas `Disallow` inesperadas.
- [ ] Probar una URL principal con el validador/inspector de Search Console.

## Prueba de Rich Results

- [ ] Ejecutar la home en Rich Results Test: `https://search.google.com/test/rich-results`.
- [ ] Ejecutar `faq.html` para validar `FAQPage`.
- [ ] Ejecutar páginas SEO con breadcrumbs para validar `BreadcrumbList`.
- [ ] Confirmar que no hay errores críticos de datos estructurados.
- [ ] Confirmar que los datos estructurados no contradicen contenido visible, horario, teléfono, modalidad ni ubicación.

## Prueba de WhatsApp

- [ ] Probar CTA del header en desktop.
- [ ] Probar CTA principal de home.
- [ ] Probar CTA de `lecturas.html` para cada servicio.
- [ ] Probar CTA final de páginas SEO.
- [ ] Confirmar que abre `wa.me/59897054961`.
- [ ] Confirmar que el mensaje precargado se entiende y no contiene caracteres rotos.
- [ ] Confirmar que enlaces externos usan `target="_blank"` y `rel="noopener"`.

## Prueba mobile

- [ ] Revisar home a 360px, 390px y 430px de ancho.
- [ ] Confirmar que header no tapa contenido relevante.
- [ ] Confirmar que enlaces prioritarios de navegación quedan visibles/usables.
- [ ] Confirmar que botones ocupan ancho cómodo cuando corresponde.
- [ ] Confirmar que cards y paneles no generan scroll horizontal.
- [ ] Confirmar que foco visible y navegación por teclado siguen funcionando.
- [ ] Confirmar que la imagen de fondo pesada no se descarga en mobile por CSS.
