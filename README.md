# Car History — Checklist de Mantenimiento Vehicular

Aplicación web para gestionar el mantenimiento preventivo de vehículos mediante un checklist inteligente basado en kilometraje. Calcula automáticamente el estado de cada tarea de mantenimiento y te alerta cuando algo está vencido o próximo a vencer.

---

## Características

- **Checklist basado en kilometraje** — Ingresa tu kilometraje actual y obtén un reporte completo del estado de mantenimiento
- **Categorías organizadas** — Motor, frenos, fluidos, filtros, neumáticos, eléctrico, transmisión y general
- **Priorización inteligente** — Cada item tiene nivel de importancia (crítica, alta, media)
- **Estados visuales** — Vencido (rojo), próximo a vencer (amarillo), al día (verde)
- **Descripciones detalladas** — Cada tarea incluye guía de procedimiento y recomendaciones
- **Intervalos personalizables** — Cada item de mantenimiento tiene su propio intervalo en kilómetros

---

## Stack Tecnológico

| Layer      | Technology             |
| ---------- | ---------------------- |
| Frontend   | Vue 3 + TailwindCSS    |
| Backend    | Express 5              |
| Database   | SQLite via Drizzle ORM |
| Auth       | better-auth            |
| Runtime    | Node.js 24+            |
| Containers | Docker                 |

---

## Before you start

Make sure you have these installed on your machine:

- **Node.js 24 or higher** — [nodejs.org](https://nodejs.org)
- **Vite+** — run this once in your terminal:

  ```bash
  # macOS / Linux
  curl -fsSL https://vite.plus | bash

  # Windows
  irm https://vite.plus/ps1 | iex
  ```

  Then open a new terminal and verify it works: `vp help`

- **An AI agent** — Claude Code or any agent you prefer

---

## Getting started

**1. Install dependencies**

```bash
vp install
```

**2. Start the development servers**

```bash
vp run dev
```

This starts both the frontend (`http://localhost:5173`) and the backend (`http://localhost:3001`) at the same time.

**4. Open your AI agent in this folder and start building**

Open Claude Code (or any AI coding agent) in this project folder and start describing what you want to build:

- _"Create a services page with a grid of cards"_
- _"Add a contact form that saves to the database"_
- _"Add user authentication with email and password"_
- _"Create a dashboard with a table of users"_

The agent will generate the code, create files, update the database schema, and wire everything up.

---

## Common tasks

Esto inicia el frontend (`http://localhost:5173`) y el backend (`http://localhost:3001`) simultáneamente.

**3. Usa la aplicación**

1. Abre `http://localhost:5173` en tu navegador
2. Ingresa el kilometraje actual de tu vehículo
3. Revisa el checklist generado con el estado de cada item de mantenimiento
4. Marca las tareas completadas según avances

---

## Cómo funciona

### Flujo de uso

1. gregar una tabla nueva\*\*

1. Actualiza el schema en `apps/api/src/db/schema.ts`
1. Genera y aplica la migracióefinidos en `apps/website/src/components/checklist/maintenanceData.ts`. Para agregar nuevos items:

````typescript
{
  id: "nuevo-item",
  name: "Nombre del mantenimiento",
  description: "Descripción detallada del procedimiento...",
  intervalKm: 10000, // cada cuántos km se debe realizar
  cer la base de datos**

```bash
vp run db:studio
````

Esto abre Drizzle Studio en el navegador para inspeccionar y editar datos.

### Despliegueo\*\* — Batería, alternador, luces

- **🔩 Transmisión** — Aceite de transmisión, clutch
- **spliegue con Docker**

```bash
docker compose up --build
```

Construye todo e inicia la aplicación en `http://localhost:3001`. La base de datos y archivos subidos se guardan en `storage/` y persisten entre reinicios.

**Despliegue a producción (Coolify, Railway, etc.)**

Usa el tipo de despliegue **Docker Compose**. El proyecto incluye
vp run db:generate
vp run db:migrate

````

**View your database**

```bash
vp Estructura del proyecto

````

apps/
website/ ← Frontend Vue.js
src/
components/
checklist/
maintenanceData.ts ← Items de mantenimiento
ChecklistView.vue ← Vista del checklist
ChecklistItem.vue ← Item individual
MileageInput.vue ← Entrada de kilometraje
api/ ← Backend Express
packages/
utils/ ← Utilidades compartidas
storage/
db/ ← Base de datos SQLite (no eliminar)
uploads/ ← Archivos subidos por usuarios
inbox/ ← Assets sin procesar (imágenes, fuentes, PDFs)

```

---

## Roadmap

- [ ] Guardar historial de mantenimiento en la base de datos
- [ ] Autenticación de usuarios
- [ ] Múltiples vehículos por usuario
- [ ] Recordatorios por email/SMS
- [ ] Exportar historial a PDF
- [ ] Agregar fotos de comprobantes
- [ ] Costos de mantenimiento
- [ ] Gráficas de gastos y tendencias

---

## Contacto

**José Daniel** —
---

## Project structure

```

apps/
website/ ← Vue.js frontend
api/ ← Express backend
packages/
utils/ ← Shared utilities
storage/
db/ ← SQLite database (do not delete)
uploads/ ← User file uploads
inbox/ ← Drop your assets here (images, fonts, PDFs...)

```

### The `inbox/` folder

This is your workspace. Drop any files here that you want your AI agent to work with — logos, images, fonts, PDFs, spreadsheets, whatever. The agent will read from this folder and use those files as raw material when you ask it to.

---

## Need help?

Contact **José Daniel** at [jose@hellodebrain.com](mailto:jose@hellodebrain.com)
```
