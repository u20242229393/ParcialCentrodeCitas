# Centro de Citas Médicas - USCO

Aplicación móvil desarrollada con Ionic Framework y Angular Standalone Components para la gestión y agendamiento de citas médicas. El proyecto consume información de un servicio REST externo y aplica filtros dinámicos, ordenamiento de datos e interactividad mediante modales y notificaciones.

## Características Principales

- **Consumo de API REST:** Integración con `HttpClient` para cargar el listado de médicos especialistas.
- **Filtros Dinámicos:** Selección múltiple por ciudad y EPS (entidad) de Colombia usando `[(ngModel)]`.
- **Orden alfabético:** Listado ordenado automáticamente de la A a la Z por apellido del especialista.
- **Métricas:** Tarjetas informativas en tiempo real con el conteo de médicos y disponibilidad de agenda.
- **Modal y Confirmación:** Apertura de `ion-modal` para ver el detalle del registro seleccionado y agendar fecha/hora.
- **Notificaciones y Alert:** Uso de `AlertController` para confirmar la acción y `ToastController` con duración de 2.5 segundos tras completar la reserva.
- **Diseño Responsive y Temas:** Interfaz adaptada con Ionicons y soporte automático para Modo Claro / Modo Oscuro.

## Tecnologías Utilizadas

- **Framework:** Ionic 8 + Angular 18 (Standalone Components)
- **Lenguaje:** TypeScript / HTML5 / SCSS
- **Módulos:** `@angular/common/http` (`HttpClient`), `FormsModule` (`[(ngModel)]`)
- **Librería de Íconos:** `ionicons`

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm
- Ionic CLI (`npm install -g @ionic/cli`)

## Instalación y Ejecución

1. Clonar el repositorio o descargar el código fuente.
2. Abrir la terminal en la carpeta raíz del proyecto y ejecutar:
   ```bash
   npm install