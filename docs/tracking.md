# Tracking de conversiones

Este sitio está preparado para medir conversiones de contacto sin agregar dependencias, frameworks, cookies propias ni IDs inventados de Analytics.

## Estructura implementada

- Los enlaces de conversión usan atributos semánticos:
  - `data-event`: nombre del evento que se envía.
  - `data-service`: contexto o tipo de lectura asociado.
  - `aria-label`: descripción accesible del destino del enlace.
- El archivo `js/tracking.js` escucha clicks en enlaces con `data-event` y envía el evento solo si ya existe una herramienta de medición cargada.
- El script está cargado con `defer`, por lo que no bloquea el render inicial.
- Fallback seguro:
  - Si existe `window.gtag`, envía eventos a GA4 con `gtag('event', ...)`.
  - Si existe `window.dataLayer`, empuja el evento para GTM.
  - Si no existe GA4 ni GTM, no hace nada y los enlaces siguen funcionando normalmente.

## Eventos disponibles

| Evento | `data-service` | Significado |
| --- | --- | --- |
| `click_whatsapp_general` | `general` | Click en un enlace general de WhatsApp para coordinar o consultar disponibilidad. |
| `click_whatsapp_lectura_general` | `lectura_general` | Click en WhatsApp desde una CTA de tirada o lectura general. |
| `click_whatsapp_consulta_puntual` | `consulta_puntual` | Click en WhatsApp desde una CTA de consulta puntual o situación concreta. |
| `click_whatsapp_tirada_vincular` | `tirada_vincular` | Click en WhatsApp desde una CTA de tirada vincular. |
| `click_whatsapp_3_preguntas` | `3_preguntas` | Click en WhatsApp desde una CTA de lectura de 3 preguntas. |
| `click_whatsapp_no_se_que_lectura` | `no_se_que_lectura` | Click en WhatsApp desde una CTA para pedir orientación cuando la persona no sabe qué lectura elegir. |
| `click_call` | `llamada` | Click en un enlace telefónico `tel:`. |
| `click_email` | `email` | Click en un enlace de email `mailto:` cuando se agregue una casilla real. |

Cada evento envía estos parámetros cuando GA4 o GTM están disponibles:

- `event_category`: siempre `conversion_contact`.
- `event_label`: toma el `aria-label` del enlace o el texto visible como fallback.
- `service`: toma el valor de `data-service`.
- `link_url`: URL del enlace clickeado.
- `page_path`: ruta de la página donde ocurrió el click.

## Dónde insertar GA4 o GTM

Actualmente no hay un ID real cargado. No insertar IDs inventados.

### Opción GA4 directa

1. Reemplazar `G-XXXXXXXXXX` por el Measurement ID real de GA4.
2. Insertar este bloque en el `<head>` de cada HTML, cerca del comentario de tracking existente:

```html
<!-- Google Analytics 4: reemplazar por el ID real antes de publicar. -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Opción Google Tag Manager

1. Reemplazar `GTM-XXXXXXX` por el Container ID real de GTM.
2. Insertar el script de GTM en el `<head>` de cada HTML.
3. Insertar el `noscript` oficial de GTM al inicio del `<body>`.
4. En GTM, crear disparadores de evento personalizado usando los nombres de `data-event` que llegan al `dataLayer`.

Ejemplo de placeholder seguro para el `<head>`:

```html
<!-- Google Tag Manager: reemplazar por el ID real antes de publicar. -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

## Cómo verificar clicks

### Sin GA4/GTM cargado

1. Abrir una página local o publicada.
2. En la consola del navegador, ejecutar:

```js
window.dataLayer = [];
```

3. Hacer click en una CTA de WhatsApp, llamada o email.
4. Revisar en consola:

```js
window.dataLayer;
```

Deberías ver objetos con `event`, `service`, `event_category`, `event_label`, `link_url` y `page_path`.

### Con GA4 cargado

1. Abrir la sección **Admin > DebugView** o **Realtime** en GA4.
2. Hacer click en las CTAs principales.
3. Verificar que aparezcan los eventos con los nombres de la tabla anterior.

### Con GTM cargado

1. Abrir **Preview** en Google Tag Manager.
2. Navegar el sitio desde el modo de vista previa.
3. Hacer click en las CTAs.
4. Verificar que los eventos personalizados aparezcan en el timeline de GTM.

## Conversiones recomendadas en GA4

Configurar como eventos clave/conversiones:

1. `click_whatsapp_general`
2. `click_whatsapp_lectura_general`
3. `click_whatsapp_consulta_puntual`
4. `click_whatsapp_tirada_vincular`
5. `click_whatsapp_3_preguntas`
6. `click_whatsapp_no_se_que_lectura`
7. `click_call`
8. `click_email` cuando exista un email real publicado

Para análisis comercial, conviene agrupar todos los eventos con `event_category = conversion_contact` como contactos, y usar `service` para comparar qué lectura genera más intención de contacto.

## Datos pendientes

- Measurement ID real de GA4 (`G-...`) o Container ID real de GTM (`GTM-...`).
- Email real confirmado si se desea publicar un enlace `mailto:` y activar `click_email` en producción.
