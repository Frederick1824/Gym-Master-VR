# 🥽 Gym Master VR

**Sistema de realidad virtual para entrenamiento físico**

Proyecto académico desarrollado para **Arquitectura de las Computadoras** en el **Instituto Superior Politécnico Córdoba (ISPC)**, ciclo lectivo **2026**.

Gym Master VR propone una experiencia de entrenamiento inmersiva donde un visor y controladores VR capturan movimiento, posición y estados del usuario para procesarlos en tiempo real y generar respuesta visual, auditiva y háptica.

---

## 🎯 Objetivo del proyecto

El trabajo analiza Gym Master VR desde el punto de vista de la arquitectura de computadoras:

- representación y flujo de datos;
- lógica digital;
- CPU y GPU;
- jerarquía de memoria;
- almacenamiento;
- dispositivos de entrada y salida;
- interrupciones y DMA;
- integración general;
- rendimiento y cuellos de botella.

La web transforma ese contenido en una **experiencia interactiva**, para que cada integrante pueda explicar su área principal sin perder de vista que toda la arquitectura funciona como un único sistema.

---

## 🧠 Concepto general

El flujo global del sistema puede resumirse así:

```text
Visor + Controladores
        ↓
Interfaces de entrada
        ↓
Memoria principal
        ↓
CPU / GPU
        ↓
Procesamiento del entorno VR
        ↓
Visor / Audio / Háptica / Almacenamiento
```

### Requisitos principales

| ID | Requisito |
|---|---|
| R1 | Frecuencia mínima de actualización: **90 Hz** |
| R2 | Latencia objetivo máxima: **20 ms** |
| R3 | Resolución mínima: **2160 × 2160 px por ojo** |
| R4 | Seguimiento simultáneo de **1 visor + 2 controladores** en 6 DoF |
| R5 | Sesiones continuas de hasta **60 minutos** |
| R6 | Al menos **20 GB** reservados para perfiles, configuración e historial |

---

## 👥 Equipo CTRL+E

| Integrante | Área principal |
|---|---|
| **Fiorella Easdale Castillo** | Definición del sistema, requisitos y datos |
| **Emmanuel Gillio** | Lógica digital y simulación |
| **Emilio Santiago Guzmán** | CPU, GPU y ciclo de instrucción |
| **Josefina Madai Alcaraz** | Memoria y almacenamiento |
| **Marcelo Nahuel Raspo** | Entrada/Salida, comunicación, interrupciones y DMA |
| **Federico Montoro** | Integración, arquitectura y rendimiento |

> Cada integrante posee un área principal de desarrollo, pero la defensa del proyecto requiere comprender el funcionamiento completo de Gym Master VR.

---

## 🧪 Experiencia interactiva

La web está pensada como un pequeño laboratorio visual, inspirado en una dinámica de simulación.

### ✅ Fiorella · Requisitos y datos

Incluye contenidos relacionados con:

- requisitos cuantificables;
- representación digital;
- palabra de control binaria y hexadecimal;
- telemetría;
- cálculo de tasa de transferencia;
- ancho de banda gráfico;
- simulación dinámica del flujo de datos.

### ✅ Emmanuel · Lógica digital

Incluye:

- entradas **T, Z, B y E**;
- salida **Run**;
- tabla de verdad;
- expresión lógica;
- minitérmino;
- compuertas NOT y AND;
- simulación interactiva del circuito lógico.

Expresión principal:

```text
Run = T · Z · B · ¬E
```

### ✅ Emilio · CPU, GPU y ciclo de instrucción

Incluye:

- CPU y GPU;
- Unidad de Control;
- ALU;
- registros;
- caché;
- ISA;
- ciclo de instrucción;
- pipeline;
- visualización del flujo de procesamiento aplicado al tracking VR.

Ciclo representado:

```text
Fetch → Decode → Execute → Memory Access → Write Back
```

### ✅ Josefina · Memoria y almacenamiento

Incluye:

- jerarquía Registros → Caché → RAM → SSD NVMe;
- comparación de latencias y capacidades;
- simulación de acceso a memoria;
- análisis de RAM insuficiente y uso de swap;
- comparación entre telemetría cruda y resumen de sesión;
- cálculo de almacenamiento por sesión.

### 🚧 Próximas secciones

- Nahuel: entrada/salida, comunicación, interrupciones y DMA.
- Federico: integración, arquitectura, rendimiento, cuellos de botella y mejoras futuras.

---

## 🎨 Identidad visual

La interfaz utiliza una estética tecnológica y académica basada en:

- fondo oscuro;
- paleta azul/cyan;
- animaciones suaves;
- visualizaciones de tracking;
- nodos, señales y flujo de datos;
- simulaciones interactivas;
- navegación secuencial entre integrantes.

Cada sección individual podrá utilizar un color de acento propio sin perder la identidad general de Gym Master VR.

---

## 🛠️ Tecnologías

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS 4**
- **CSS personalizado**
- **ESLint**

---

## 🚀 Ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Frederick1824/Gym-Master-VR.git
```

### 2. Entrar al proyecto

```bash
cd Gym-Master-VR
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el entorno de desarrollo

```bash
npm run dev
```

Vite mostrará la dirección local, normalmente:

```text
http://localhost:5173/
```

> No es necesario utilizar Live Server. El proyecto debe levantarse mediante Vite.

---

## ✅ Comandos disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## 📁 Estructura actual

```text
src/
├── components/
│   └── BrandMark.tsx
├── pages/
│   ├── FiorellaPage.tsx
│   ├── EmmanuelPage.tsx
│   ├── EmilioPage.tsx
│   └── JosefinaPage.tsx
├── App.tsx
├── main.tsx
├── index.css
├── fiorella.css
├── emmanuel.css
├── emilio.css
└── josefina.css
```

La estructura continuará creciendo de forma modular a medida que se incorporen las siguientes áreas del proyecto.

---

## 📚 Contexto académico

**Instituto Superior Politécnico Córdoba**  
**Tecnicatura Superior en Desarrollo de Software**  
**Espacio curricular:** Arquitectura de las Computadoras  
**Proyecto ABP:** Gym Master VR  
**Ciclo lectivo:** 2026

---

## 🔄 Estado del desarrollo

El proyecto se encuentra en desarrollo incremental.

Actualmente están implementadas:

- portada animada;
- identidad visual general;
- sección interactiva de Fiorella;
- sección interactiva de Emmanuel;
- sección interactiva de Emilio;
- sección interactiva de Josefina.

El resto de las secciones se incorporará progresivamente manteniendo una arquitectura visual y técnica común.

---

## 💡 Idea central

Gym Master VR no busca mostrar seis trabajos aislados.

Busca mostrar **una sola arquitectura**, explicada desde seis áreas distintas y conectadas entre sí.

**Sensores → Datos → Memoria → Procesamiento → Salida → Experiencia VR**
