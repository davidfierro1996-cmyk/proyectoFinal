let saldo = 10000.00;
let bitcoin = 0.00;

function setTheme(nombreTema) {
    document.body.className = `theme-${nombreTema}`;
    document.getElementById('btn-emerald').classList.toggle('active', nombreTema === 'emerald');
    document.getElementById('btn-blue').classList.toggle('active', nombreTema === 'blue');
}

function tradeAsset(nombreActivo, precioActivo, tipoOperacion) {
    const pantallaDinero = document.getElementById('balance-display');
    const pantallaPortafolio = document.getElementById('portfolio-display');
    const contenedorHistorial = document.getElementById('log-container');

    if (tipoOperacion === 'buy') {
        if (saldo >= precioActivo) {
            saldo -= precioActivo;
            bitcoin += precioActivo;
        } else {
            alert('¡No cuentas con saldo suficiente para esta operación!');
            return;
        }
    } else if (tipoOperacion === 'sell') {
        if (bitcoin >= precioActivo) {
            bitcoin -= precioActivo;
            saldo += precioActivo;
        } else {
            alert('No posees este activo en tu portafolio para poder venderlo.');
            return;
        }
    }

    pantallaDinero.textContent = `$${saldo.toFixed(2)} USD`;
    pantallaPortafolio.textContent = `$${bitcoin.toFixed(2)} USD`;

    if (contenedorHistorial.querySelector('.empty-log')) {
        contenedorHistorial.innerHTML = '';
    }

    const horaActual = new Date().toLocaleTimeString();
    const textoAccion = tipoOperacion === 'buy' ? 'Compra' : 'Venta';
    
    contenedorHistorial.innerHTML += `
        <div class="log-item ${tipoOperacion}">
            <span><strong>${textoAccion}</strong> de ${nombreActivo.toUpperCase()} a un precio de $${precioActivo}</span>
            <span>${horaActual}</span>
        </div>
    `;
}