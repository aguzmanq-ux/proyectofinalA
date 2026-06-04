document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btn-calcular");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const formResultados = document.getElementById("resultados");
    const contenedorAlerta = document.getElementById("contenedor-alerta");
    const tablaCuerpo = document.querySelector("#tabla-proyeccion tbody");
    const barraProgreso = document.getElementById("barra-progreso-llenado");

    // 1. Motor de Lluvia Procedural con Autolimpieza Eficiente nativa
    const contenedorLluvia = document.getElementById("contenedor-lluvia");
    const simbolosCarburantes = ['⛽', '🛢️', '🔥', '⚡', '🚗', '🚚', '📈', '💧'];

    function generarGotaCarburante() {
        const elemento = document.createElement("div");
        elemento.classList.add("simbolo-cayendo");
        elemento.innerText = simbolosCarburantes[Math.floor(Math.random() * simbolosCarburantes.length)];
        elemento.style.left = Math.random() * 100 + "vw";
        
        // Configuraciones de animación aleatorias
        const duracion = Math.random() * 3 + 4; // Entre 4s y 7s
        elemento.style.animationDuration = duracion + "s";
        const escalaAleatoria = Math.random() * 1.5 + 0.8;
        elemento.style.fontSize = `${escalaAleatoria}rem`;
        
        contenedorLluvia.appendChild(elemento);
        
        // Autolimpieza optimizada al terminar la animación sin usar setTimeouts vagos
        elemento.addEventListener('animationend', () => {
            elemento.remove();
        });
    }
    setInterval(generarGotaCarburante, 350);

    // 2. Controladores Lógicos de Simulación
    btnCalcular.addEventListener("click", calcularSimulacion);
    btnLimpiar.addEventListener("click", limpiarFormulario);

    function calcularSimulacion() {
        const reservaInicial = parseFloat(document.getElementById("reserva-inicial").value);
        const consumoDiario = parseFloat(document.getElementById("consumo-diario").value);
        const reabastecimientoDiario = parseFloat(document.getElementById("reabastecimiento").value);
        const nivelCritico = parseFloat(document.getElementById("nivel-critico").value);

        // Validaciones Estrictas
        if (isNaN(reservaInicial) || isNaN(consumoDiario) || isNaN(reabastecimientoDiario) || isNaN(nivelCritico)) {
            alert("Por favor, complete todos los campos con números válidos.");
            return;
        }
        if (reservaInicial <= 0 || consumoDiario < 0 || reabastecimientoDiario < 0 || nivelCritico < 0) {
            alert("Los valores de simulación deben ser mayores a cero.");
            return;
        }
        if (nivelCritico >= reservaInicial) {
            alert("El nivel crítico no puede ser superior o igual a la reserva de carburante inicial.");
            return;
        }

        // Reset de fila de datos de tabla
        tablaCuerpo.innerHTML = "";

        let reservaActual = reservaInicial;
        let dia = 0;
        let diaCritico = -1;
        const seAgotara = consumoDiario > reabastecimientoDiario;

        formResultados.classList.remove("hidden");

        // Bucle Algorítmico Iterativo (Hasta un tope lógico preventivo de 100 días)
        while (reservaActual > 0 && dia < 100) {
            dia++;
            reservaActual = (reservaActual + reabastecimientoDiario) - consumoDiario;

            if (reservaActual < 0) reservaActual = 0;

            // Determinación de Porcentajes Ponderados del Tanque
            const porcentajeRestante = (reservaActual / reservaInicial) * 100;

            let estadoTexto = "🟢 Normal";
            let claseEstado = "status-badge estado-normal";

            if (reservaActual <= 0) {
                estadoTexto = "🔴 AGOTADO";
                claseEstado = "status-badge estado-agotado";
            } else if (reservaActual <= nivelCritico) {
                estadoTexto = "🟡 Crítico";
                claseEstado = "status-badge estado-critico";
                if (diaCritico === -1) diaCritico = dia;
            }

            // Inyección Dinámica Estructurada en Fila
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><strong>Día ${dia}</strong></td>
                <td>${reservaActual.toLocaleString('de-DE', {maximumFractionDigits: 0})} Litros</td>
                <td>${porcentajeRestante.toFixed(1)}%</td>
                <td><span class="${claseEstado}">${estadoTexto}</span></td>
            `;
            tablaCuerpo.appendChild(fila);

            if (reservaActual <= 0) break;
        }

        // 3. Renderizado Gráfico del Tablero (Alertas y Progreso)
        if (seAgotara) {
            contenedorAlerta.style.backgroundColor = "rgba(255, 118, 117, 0.15)";
            contenedorAlerta.style.border = "2px dashed #ff7675";
            contenedorAlerta.style.color = "#ff7675";
            
            let mensajeHTML = `⚠ ALERTA DE DÉFICIT: El consumo supera la logística de reabastecimiento.<br>`;
            if (diaCritico !== -1) {
                mensajeHTML += `• Planta ingresa a Nivel Crítico en el <strong>Día ${diaCritico}</strong>.<br>`;
            }
            mensajeHTML += `• Desabastecimiento Total (0 Litros) previsto en el <strong>Día ${dia}</strong>.`;
            contenedorAlerta.innerHTML = mensajeHTML;
            
            // Forzar indicador a nivel de peligro
            barraProgreso.style.width = "15%";
            barraProgreso.style.background = "#ff7675";
        } else {
            contenedorAlerta.style.backgroundColor = "rgba(85, 239, 196, 0.15)";
            contenedorAlerta.style.border = "2px dashed #55efc4";
            contenedorAlerta.style.color = "#55efc4";
            contenedorAlerta.innerHTML = "✔ VOLUMEN SUSTENTABLE: La tasa de reabastecimiento equilibra o supera la demanda de consumo estimada.";
            
            // Tanque estable
            barraProgreso.style.width = "100%";
            barraProgreso.style.background = "#55efc4";
        }

        // Desplazamiento animado suave hacia los resultados obtenidos
        formResultados.scrollIntoView({ behavior: 'smooth' });
    }

    function limpiarFormulario() {
        document.getElementById("form-simulador").reset();
        tablaCuerpo.innerHTML = "";
        formResultados.classList.add("hidden");
        contenedorAlerta.innerHTML = "";
        barraProgreso.style.width = "0%";
    }
});