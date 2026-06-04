document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btn-calcular");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const formResultados = document.getElementById("resultados");
    const contenedorAlerta = document.getElementById("contenedor-alerta");
    const tablaCuerpo = document.querySelector("#tabla-proyeccion tbody");

    btnCalcular.addEventListener("click", calcularSimulacion);
    btnLimpiar.addEventListener("click", limpiarFormulario);

    function calcularSimulacion() {
        const reservaInicial = parseFloat(document.getElementById("reserva-inicial").value);
        const consumoDiario = parseFloat(document.getElementById("consumo-diario").value);
        const reabastecimientoDiario = parseFloat(document.getElementById("reabastecimiento").value);
        const nivelCritico = parseFloat(document.getElementById("nivel-critico").value);

        if (isNaN(reservaInicial) || isNaN(consumoDiario) || isNaN(reabastecimientoDiario) || isNaN(nivelCritico)) {
            alert("Por favor, complete todos los campos con números válidos.");
            return;
        }

        if (reservaInicial < 0 || consumoDiario < 0 || reabastecimientoDiario < 0 || nivelCritico < 0) {
            alert("Los valores no pueden ser negativos.");
            return;
        }

        if (nivelCritico >= reservaInicial) {
            alert("El nivel crítico no puede ser mayor o igual a la reserva inicial.");
            return;
        }

        tablaCuerpo.innerHTML = "";

        let reservaActual = reservaInicial;
        let dia = 0;
        let diaCritico = -1;
        let seAgotara = consumoDiario > reabastecimientoDiario;

        formResultados.classList.remove("hidden");

        while (reservaActual > 0 && dia < 100) {
            dia++;
            reservaActual = reservaActual + reabastecimientoDiario - consumoDiario;

            if (reservaActual < 0) reservaActual = 0;

            let estadoTexto = "Normal";
            let claseEstado = "estado-normal";

            if (reservaActual <= 0) {
                estadoTexto = "AGOTADO";
                claseEstado = "estado-agotado";
            } else if (reservaActual <= nivelCritico) {
                estadoTexto = "Crítico";
                claseEstado = "estado-critico";
                if (diaCritico === -1) diaCritico = dia;
            }

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>Día ${dia}</td>
                <td>${reservaActual.toFixed(0)} Litros</td>
                <td class="${claseEstado}">${estadoTexto}</td>
            `;
            tablaCuerpo.appendChild(fila);

            if (reservaActual <= 0) break;
        }

        contenedorAlerta.className = "alerta";
        if (seAgotara) {
            contenedorAlerta.style.backgroundColor = "rgba(255, 118, 117, 0.2)";
            contenedorAlerta.style.border = "1px solid #ff7675";
            contenedorAlerta.style.color = "#ff7675";
            
            let mensajeHTML = `Atención: El consumo supera al reabastecimiento. `;
            if (diaCritico !== -1) {
                mensajeHTML += `La estación llegará al nivel crítico en el <strong>Día ${diaCritico}</strong> `;
            }
            mensajeHTML += `y las reservas se agotarán por completo en el <strong>Día ${dia}</strong>.`;
            contenedorAlerta.innerHTML = mensajeHTML;
        } else {
            contenedorAlerta.style.backgroundColor = "rgba(85, 239, 196, 0.2)";
            contenedorAlerta.style.border = "1px solid #55efc4";
            contenedorAlerta.style.color = "#55efc4";
            contenedorAlerta.innerHTML = "¡Reserva Sustentable! El reabastecimiento diario cubre o supera la demanda del consumo estimado.";
        }
    }

    function limpiarFormulario() {
        document.getElementById("form-simulador").reset();
        tablaCuerpo.innerHTML = "";
        formResultados.classList.add("hidden");
        contenedorAlerta.innerHTML = "";
        contenedorAlerta.className = "alerta";
    }
});