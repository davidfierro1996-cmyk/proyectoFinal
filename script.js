let saldo = 10000.00;
let portafolio = 0.00;

function setTheme(nombreTema) {
    document.body.className = "theme-" + nombreTema;

    let btnEmerald = document.getElementById("btn-emerald");
    let btnBlue = document.getElementById("btn-blue");

    if (nombreTema === "emerald") {
        if(btnEmerald) btnEmerald.classList.add("active");
        if(btnBlue) btnBlue.classList.remove("active");
    }

    if (nombreTema === "blue") {
        if(btnBlue) btnBlue.classList.add("active");
        if(btnEmerald) btnEmerald.classList.remove("active");
    }
}

function tradeAsset(nombreActivo, precioActivo, tipoOperacion) {
    let pantallaDinero = document.getElementById("balance-display");
    let pantallaPortafolio = document.getElementById("portfolio-display");
    let contenedorHistorial = document.getElementById("log-container");

    if (tipoOperacion === "buy") {
        if (saldo >= precioActivo) {
            saldo -= precioActivo;
            portafolio += precioActivo;
        } else {
            alert("No cuentas con saldo suficiente para esta operación.");
            return;
        }
    }

    if (tipoOperacion === "sell") {
        if (portafolio >= precioActivo) {
            portafolio -= precioActivo;
            saldo += precioActivo;
        } else {
            alert("No posees suficiente valor en portafolio para vender este activo.");
            return;
        }
    }

    // Actualizar pantallas en el DOM
    if (pantallaDinero) pantallaDinero.textContent = "$" + saldo.toFixed(2) + " USD";
    if (pantallaPortafolio) pantallaPortafolio.textContent = "$" + portafolio.toFixed(2) + " USD";

    // Manejar Historial
    if (contenedorHistorial) {
        if (contenedorHistorial.querySelector(".empty-log")) {
            contenedorHistorial.innerHTML = "";
        }

        let horaActual = new Date().toLocaleTimeString();
        let textoAccion = (tipoOperacion === "buy") ? "Compra" : "Venta";
        let claseColor = (tipoOperacion === "buy") ? "trend up" : "trend down";

        let nuevoLog = document.createElement("div");
        nuevoLog.className = "log-item";
        nuevoLog.style.padding = "0.5rem 0";
        nuevoLog.style.borderBottom = "1px dotted var(--border-color, #ccc)";
        nuevoLog.innerHTML = `<span class="${claseColor}"><strong>${textoAccion}</strong></span> de <strong>${nombreActivo}</strong> por $${precioActivo.toFixed(2)} - <small>${horaActual}</small>`;

        contenedorHistorial.prepend(nuevoLog);
    }
}