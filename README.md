# Marivivian — Servicios de Tarot

Sitio web estático para Marivivian, orientado a presentar servicios de tarot online, facilitar consultas por WhatsApp y dejar una base profesional para SEO, tracking, mantenimiento y handoff comercial.

## Descripción

El proyecto contiene una web institucional y comercial de una sola marca, con páginas informativas y páginas SEO para consultas de tarot online, tarot en Montevideo, tarot amor y coordinación por WhatsApp.

El sitio prioriza:

- Claridad de servicios y modalidad de atención.
- Conversión a WhatsApp y llamada.
- Mensajes éticos, sin promesas absolutas ni garantías de resultados.
- SEO base con metadatos, canonical, sitemap, robots y datos estructurados.
- Tracking preparado sin cargar IDs inventados.
- Documentación local para mantenimiento, contenido, reseñas, deploy y entrega al cliente.

## Stack

- HTML estático.
- CSS en `css/styles.css`.
- JavaScript vanilla en `js/tracking.js`.
- Imágenes locales en `images/`.
- Sin framework ni bundler; `sharp` se usa únicamente como herramienta local de optimización de imágenes.

## Estructura de archivos

```text
.
├── index.html                    # Página principal
├── lecturas.html                 # Servicios y tipos de lectura
├── como-funciona.html            # Proceso de reserva y atención
├── testimonios.html              # Página preparada para reseñas autorizadas
├── faq.html                      # Preguntas frecuentes y FAQ schema
├── guia-tarot.html               # Guía informativa para preparar una consulta
├── contacto.html                 # Canales reales de contacto configurados
├── tarot-online.html             # Landing SEO para tarot online
├── tarot-en-montevideo.html      # Landing SEO para tarot en Montevideo
├── tarot-amor.html               # Landing SEO para tarot amor
├── tarot-por-whatsapp.html       # Landing SEO para coordinación por WhatsApp
├── css/
│   └── styles.css                # Estilos globales
├── js/
│   └── tracking.js               # Captura segura de eventos de conversión
├── images/
│   ├── marivivian-tarot-fondo.jpg # Fuente visual principal
│   └── cover.png                  # Imagen para Open Graph/Twitter
├── scripts/
│   └── optimize-images.mjs        # Genera derivados WebP optimizados
├── package.json                   # Tooling local (Sharp)
├── robots.txt                    # Reglas de rastreo
├── sitemap.xml                   # URLs públicas del sitio
└── docs/
    ├── client-handoff.md         # Guía de uso para Marivivian
    ├── content-roadmap.md        # Ideas futuras de contenido y mantenimiento SEO
    ├── google-business-profile.md# Guía para perfil de empresa en Google
    ├── pre-deploy-checklist.md   # Checklist técnico antes y después de publicar
    ├── reviews-strategy.md       # Estrategia ética de reseñas
    └── tracking.md               # Guía para activar y verificar medición
```

## Cómo correr localmente

Como es un sitio estático, puede abrirse directamente desde los archivos HTML o servirse con un servidor local simple.

Opción recomendada:

```bash
python3 -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000/
```

No hay un build obligatorio para servir el sitio. Para instalar el tooling y generar versiones WebP optimizadas de la imagen ambiental:

```bash
npm install
npm run optimize:images
```

El script conserva el JPG original, genera una versión WebP general y otra mobile de hasta 840 px. Solo crea la variante desktop de 1600 px cuando la fuente alcanza esa resolución; nunca amplía artificialmente la imagen. También informa por consola el tamaño de cada archivo generado.

## Cómo desplegar

El sitio puede desplegarse en cualquier hosting de archivos estáticos.

Flujo sugerido:

1. Confirmar datos pendientes de producción.
2. Revisar `docs/pre-deploy-checklist.md`.
3. Subir todos los archivos del repositorio que forman parte del sitio público:
   - HTML raíz.
   - `css/`.
   - `js/`.
   - `images/`.
   - `robots.txt`.
   - `sitemap.xml`.
4. Configurar el dominio final `https://www.mariviviantarot.com/`.
5. Verificar que todas las URLs de `sitemap.xml` respondan en producción.
6. Dar de alta/verificar el dominio en Google Search Console.
7. Enviar `https://www.mariviviantarot.com/sitemap.xml` en Search Console.
8. Activar GA4 o GTM solo cuando exista un ID real confirmado.

## Variables y datos reales pendientes

No se deben inventar datos ni publicar placeholders. Antes de producción o durante el mantenimiento, confirmar:

- Measurement ID real de GA4 o Container ID real de GTM si se va a medir tráfico y conversiones.
- Email real si Marivivian desea publicar un canal por correo.
- Enlace real para pedir reseñas de Google Business Profile.
- Confirmación operativa de horarios publicados, precios o rangos de precios si cambian.
- Testimonios reales con autorización explícita antes de agregarlos a `testimonios.html`.
- Imágenes finales optimizadas si el hosting no comprime automáticamente `images/marivivian-tarot-fondo.jpg` y `images/cover.png`.

## SEO implementado

- Títulos y metadescripciones por página.
- URLs canónicas con dominio final.
- Open Graph y Twitter Card con imagen compartible.
- Sitemap XML con las páginas públicas principales.
- `robots.txt` permitiendo rastreo y apuntando al sitemap.
- Datos estructurados JSON-LD:
  - `ProfessionalService` en la home.
  - `BreadcrumbList` en páginas internas.
  - `FAQPage` en preguntas frecuentes.
- Páginas SEO específicas para:
  - Tarot online.
  - Tarot en Montevideo.
  - Tarot amor.
  - Tarot por WhatsApp.
- Contenido informativo de apoyo en guía y FAQ.

## Tracking preparado

El sitio ya incluye atributos `data-event` y `data-service` en las llamadas a la acción principales, y carga `js/tracking.js` con `defer`.

El tracking funciona de forma segura:

- Si existe `window.gtag`, envía eventos a GA4.
- Si existe `window.dataLayer`, empuja eventos para GTM.
- Si no hay GA4 ni GTM cargado, no bloquea la navegación ni rompe los enlaces.

La guía completa está en `docs/tracking.md`.

## Contactos configurables

Actualmente el sitio usa como contacto real:

- WhatsApp/teléfono: `+598 97 054 961`.
- Enlaces `wa.me` configurados con mensajes según contexto.
- Enlace `tel:+59897054961` en la página de contacto.

No hay email ni redes sociales publicadas porque no hay datos reales confirmados en el proyecto.

## Checklist de mantenimiento

Revisión mensual recomendada:

- [ ] Revisar en Search Console impresiones, clics, consultas y páginas con crecimiento o caída.
- [ ] Revisar conversiones de WhatsApp/llamada cuando GA4 o GTM estén activos.
- [ ] Confirmar que precios, horarios, servicios y modalidad siguen vigentes.
- [ ] Actualizar FAQ con preguntas reales recibidas por WhatsApp.
- [ ] Agregar testimonios solo si hay autorización explícita.
- [ ] Revisar que no se prometan resultados garantizados en textos nuevos.
- [ ] Verificar que el sitemap incluya cualquier página nueva.
- [ ] Optimizar imágenes nuevas antes de subirlas.
- [ ] Probar CTAs principales en mobile y desktop.
- [ ] Revisar que no se hayan agregado placeholders visibles, comentarios internos ni datos técnicos sensibles al HTML público.

## Documentación relacionada

- `docs/client-handoff.md`: guía clara para Marivivian.
- `docs/content-roadmap.md`: próximos contenidos y mejoras.
- `docs/tracking.md`: activación de medición y conversiones.
- `docs/reviews-strategy.md`: solicitud y respuesta de reseñas.
- `docs/google-business-profile.md`: configuración del perfil de Google.
- `docs/pre-deploy-checklist.md`: control final de publicación.
