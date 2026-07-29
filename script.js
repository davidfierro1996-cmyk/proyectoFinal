let saldo = 10000.00;
let bitcoin = 0.00;

function setTheme(nombreTema) {

    document.body.className = "theme-" + nombreTema;

    if (nombreTema == "emerald") {
        document.getElementById("btn-emerald").classList.add("active");
        document.getElementById("btn-blue").classList.remove("active");
    }

    if (nombreTema == "blue") {
        document.getElementById("btn-blue").classList.add("active");
        document.getElementById("btn-emerald").classList.remove("active");
    }

}

function tradeAsset(nombreActivo, precioActivo, tipoOperacion) {

    let pantallaDinero = document.getElementById("balance-display");
    let pantallaPortafolio = document.getElementById("portfolio-display");
    let contenedorHistorial = document.getElementById("log-container");

    if (tipoOperacion == "buy") {

        if (saldo >= precioActivo) {

            saldo = saldo - precioActivo;
            bitcoin = bitcoin + precioActivo;

        } else {

            alert("No cuentas con saldo suficiente para esta operación.");
            return;

        }

    }

    if (tipoOperacion == "sell") {

        if (bitcoin >= precioActivo) {

            bitcoin = bitcoin - precioActivo;
            saldo = saldo + precioActivo;

        } else {

            alert("No posees este activo para vender.");
            return;

        }

    }

    pantallaDinero.textContent = "$" + saldo.toFixed(2) + " USD";
    pantallaPortafolio.textContent = "$" + bitcoin.toFixed(2) + " USD";

    if (contenedorHistorial.querySelector(".empty-log")) {
        contenedorHistorial.innerHTML = "";
    }

    let horaActual = new Date().toLocaleTimeString();
    let textoAccion = "";

    if (tipoOperacion == "buy") {
        textoAccion = "Compra";
    } else {
        textoAccion = "Venta";
    }

contenedorHistorial.innerHTML = contenedorHistorial.innerHTML +
textoAccion + " de " + nombreActivo +
" por $" + precioActivo +
" - " + horaActual + "<br>";

}