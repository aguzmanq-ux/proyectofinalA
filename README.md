# 📊 Simulador de Abastecimiento de Carburantes — Documentación Técnica

## 📝 1. Descripción del Proyecto
El **Simulador de Abastecimiento de Carburantes** es una aplicación web interactiva de carácter educativo e investigativo. Su propósito fundamental es modelar, proyectar y analizar matemáticamente el comportamiento del inventario de hidrocarburos líquidos o gaseosos dentro de una estación de servicio o centro de distribución logística.

Frente a escenarios complejos como contingencias de transporte, bloqueos de rutas o picos atípicos de demanda, esta herramienta permite calcular con precisión el total de días útiles de autonomía antes de ingresar en un estado de reserva crítico o de desabastecimiento total.

---

## 🚀 2. Características Principales y UX/UI
* **Motor Procedural de Lluvia de Carburantes:** Sistema en segundo plano gobernado por JavaScript que inyecta dinámicamente símbolos temáticos (`⛽, 🛢️, 🔥, ⚡, 🚗, 🚚, 📈`). Cada partícula cuenta con propiedades aleatorias de tamaño, posición horizontal y velocidad de caída en tres dimensiones, ofreciendo una experiencia inmersiva sin comprometer el rendimiento del navegador.
* **Diseño Neón Pastel de Alto Contraste:** Estética visual basada en una paleta de colores oscuros con bordes resplandecientes (*neon glow*). Diseñado meticulosamente para reducir la fatiga visual y segmentar de forma intuitiva los bloques de interacción y control.
* **Tablero de Control Interactiva (Dashboard):** Al procesar los datos, la aplicación genera un diagnóstico automatizado que incluye una barra de progreso de autonomía del tanque y alertas visuales inteligentes según el tipo de escenario.
* **Diseño Adaptativo (Responsive Design):** Arquitectura CSS optimizada mediante Media Queries para garantizar una visualización fluida, escalable y cómoda en smartphones, tablets y pantallas de escritorio.

---

## 🧮 3. Modelo Matemático de Simulación
El núcleo del simulador ejecuta una función iterativa por jornadas (días). El volumen de combustible para cualquier día de proyección se calcula mediante la siguiente ecuación de balance de masa de primer orden:

$$R_{t} = R_{t-1} + C_{r} - C_{d}$$

Donde:
* **$R_{t}$**: Reserva de carburante remanente en el día actual ($L$).
* **$R_{t-1}$**: Reserva de carburante del día anterior ($L$).
* **$C_{r}$**: Coeficiente logístico de reabastecimiento diario ($L/\text{día}$).
* **$C_{d}$**: Coeficiente de consumo o demanda diaria estimada ($L/\text{día}$).

### Condicionales de Estado Operativo:
1. **Estado Normal:** $R_{t} > \text{Nivel Crítico}$
2. **Estado Crítico:** $0 < R_{t} \le \text{Nivel Crítico}$
3. **Estado Agotado:** $R_{t} = 0$

---

## ⚙️ 4. Arquitectura del Repositorio
El proyecto sigue una estructura de desarrollo front-end desacoplada, limpia y modular, lo que facilita el mantenimiento del código fuente:

```text
proyectofinalA/
├── index.html        # Estructura del documento, marcado semántico y contenedores del DOM.
├── css/
│   └── estilos.css   # Variables globales (:root), animaciones de lluvia y diseño adaptativo.
└── js/
    └── script.js     # Motor procedural de la lluvia, validaciones de formularios y lógica de la simulación.