'use strict';

let productos = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data.map(prod => new Producto(prod.id, prod.nombre, prod.descripcion, prod.precio, prod.imagen, prod.categoria));
            renderProductos();
        })
        .catch(error => console.error('Error al cargar los productos:', error));
    carrito.actualizarCarrito();
});

function renderProductos(filtroCategoria = null) {
    const contenedorProductos = document.getElementById('productos');
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }

    let productosFiltrados = productos;
    if (filtroCategoria) {
        productosFiltrados = productos.filter(prod => prod.categoria === filtroCategoria);
    }

    productosFiltrados.forEach(producto => {
        const prodColEl = document.createElement('div');
        prodColEl.classList.add('col-xl-3', 'col-lg-4', 'col-md-6');
        
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        cardEl.appendChild(img);

        const titleEl = document.createElement('h3');
        titleEl.textContent = producto.nombre;
        cardEl.appendChild(titleEl);

        const textEl = document.createElement('p');
        textEl.classList.add('card-text');
        textEl.textContent = producto.descripcion;
        cardEl.appendChild(textEl);

        const contentElement = document.createElement('div');
        contentElement.classList.add('card-content');

        const spanPrecio = document.createElement('p');
        spanPrecio.classList.add('price');
        spanPrecio.textContent = `Precio: $${producto.precio}`;
        contentElement.appendChild(spanPrecio);

        const spanCategoria = document.createElement('p');
        spanCategoria.classList.add('category');
        spanCategoria.textContent = `Categoría: ${producto.categoria}`;
        contentElement.appendChild(spanCategoria);

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary');
        button.textContent = 'Ver detalle';
        button.addEventListener('click', () => mostrarDetalleProducto(producto.id));
        contentElement.appendChild(button);

        cardEl.appendChild(contentElement);
        prodColEl.appendChild(cardEl);
        contenedorProductos.appendChild(prodColEl);
    });
}

function filtrarPorCategoria(categoria) {
    modalOferta();
    renderProductos(categoria);
}

function modalOferta() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'modalOferta';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = '../images/gordo-pelusa1_no_bg.png';
    img.alt = 'Gordo Pelusa';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';

    const leyenda = document.createElement('p');
    leyenda.textContent = 'Llevate al Gordo Pelusa gratis, no hace falta que compres nada';
    leyenda.style.marginTop = '10px';
    leyenda.style.fontSize = '18px';
    leyenda.style.color = 'black';

    const buttonOferta = document.createElement('button');
    buttonOferta.classList.add('btn', 'btn-primary');
    buttonOferta.textContent = "Llevalo gratis";
    buttonOferta.addEventListener('click', () => llevarGordoPelusaGratis());

    const countdown = document.createElement('p');
    countdown.id = 'countdown';
    countdown.style.marginTop = '10px';
    countdown.style.fontSize = '18px';
    countdown.style.color = 'black';
    countdown.classList.add('text-center');

    modalContent.appendChild(img);
    modalContent.appendChild(leyenda);
    modalContent.appendChild(countdown);
    modalContent.appendChild(buttonOferta);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    let timeLeft = 10;
    countdown.textContent = `${timeLeft}...`;

    const interval = setInterval(() => {
        timeLeft--;
        countdown.textContent = `${timeLeft}...`;

        if (timeLeft <= 0) {
            clearInterval(interval);
            document.body.removeChild(modal);
        }
    }, 1000);
}

function llevarGordoPelusaGratis() {
    const producto = productos.find(prod => prod.id === 7);
    const productoGratis = { ...producto, id: `${producto.id}-gratis`, precio: 0 };
    carrito.agregarProducto(productoGratis);
    cerrarModal('modalOferta');
}

function mostrarDetalleProducto(id) {
    const producto = productos.find(prod => prod.id === id);
    const detalleProducto = document.getElementById('detalleProducto');
    while (detalleProducto.firstChild) {
        detalleProducto.removeChild(detalleProducto.firstChild);
    }
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    detalleProducto.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = producto.nombre;
    detalleProducto.appendChild(h2);

    const h3 = document.createElement('h3');
    h3.textContent = producto.descripcion;
    detalleProducto.appendChild(h3);

    const spanPrecio = document.createElement('span');
    spanPrecio.textContent = `Precio: $${producto.precio}`;
    detalleProducto.appendChild(spanPrecio);

    const spanCategoria = document.createElement('span');
    spanCategoria.textContent = `Categoría: ${producto.categoria}`;
    detalleProducto.appendChild(spanCategoria);

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.classList.add('btn-primary', 'btn', 'mb-2');
    button.addEventListener('click', () => agregarAlCarrito(producto.id));
    detalleProducto.appendChild(button);

    mostrarModal('modalProducto');
}

function mostrarCarrito() {
    const detalleCarrito = document.getElementById('detalleCarrito');
    const removeButton = document.createElement('button');
    removeButton.textContent = "Eliminar todos los productos del carrito";
    removeButton.classList.add('btn', 'btn-danger');
    removeButton.addEventListener('click', () => vaciarCarrito());
    let totalCompra = 0;

    while (detalleCarrito.firstChild) {
        detalleCarrito.removeChild(detalleCarrito.firstChild);
    }

    const totalCheckout = document.createElement('p');
    totalCheckout.classList.add('text-center', 'w-100');

    if (carrito.productos.length > 0) {
        carrito.productos.forEach(prod => {
            const div = document.createElement('div');
            div.classList.add('card-item-detail', 'col-lg-12', 'col-md-12', 'col-sm-12','my-3');

            const imgContainer = document.createElement('div');
            const dataContainer = document.createElement('div');
            imgContainer.style.width = "10%";
            dataContainer.style.fontSize = "7px";
            dataContainer.style.display = "flex";
            dataContainer.style.width = "90%";
            dataContainer.style.alignItems = "center";

            const img = document.createElement('img');
            img.src = prod.imagen;
            img.alt = prod.nombre;
            imgContainer.appendChild(img);

            const p1 = document.createElement('p');
            p1.textContent = `$ ${prod.precio}`;
            dataContainer.appendChild(p1);

            const unidades = document.createElement('p');
            unidades.textContent = `${prod.cantidad || 1} unidades`;
            dataContainer.appendChild(unidades);

            const totalPrecio = document.createElement('p');
            totalPrecio.textContent = `Total: $${prod.totalPrecio}`;
            dataContainer.appendChild(totalPrecio);

            totalCompra += prod.totalPrecio;
            totalCheckout.textContent = `Total: $${totalCompra}`;

            const buttonRemove = document.createElement('button');
            buttonRemove.classList.add('p-3', 'rounded', 'btn', 'btn-danger');

            const iconTrash = document.createElement('i');
            iconTrash.classList.add('fas', 'fa-trash');
            iconTrash.style.color = 'white';

            const iconRemove = document.createElement('i');
            iconRemove.classList.add('fas', 'fa-minus');
            iconRemove.style.color = 'white';
            buttonRemove.textContent = '';

            if (prod.cantidad > 1) {
                buttonRemove.appendChild(iconRemove);
                buttonRemove.addEventListener('click', () => reducirUnidad(prod));
            } else {
                buttonRemove.appendChild(iconTrash);
                buttonRemove.addEventListener('click', () => removerDelCarrito(prod));
            }

            dataContainer.appendChild(buttonRemove);

            div.appendChild(imgContainer);
            div.appendChild(dataContainer);
            detalleCarrito.appendChild(div);
        });

        const containerBtn = document.createElement('div');
        containerBtn.classList.add('w-100', 'd-flex', 'justify-content-center');

        const checkout = document.createElement('button');
        checkout.classList.add('btn', 'btn-primary', 'w-50', 'my-4');
        checkout.textContent = "Ir a pagar";
        checkout.addEventListener('click', () => mostrarCheckout());
        containerBtn.appendChild(checkout);

        detalleCarrito.appendChild(totalCheckout);
        detalleCarrito.appendChild(containerBtn);
    } else {
        const h1 = document.createElement('h1');
        h1.classList.add('text-center', 'w-100');
        h1.textContent = 'NO HAY PRODUCTOS PARA MOSTRAR';
        detalleCarrito.appendChild(h1);
        cerrarModal('modalCarrito');
    }

    mostrarModal('modalCarrito');
}

function reducirUnidad(prod) {
    prod.cantidad--;
    prod.totalPrecio -= prod.precio;
    if (prod.cantidad === 0) {
        removerDelCarrito(prod);
    } else {
        mostrarCarrito();
    }
}

function mostrarCheckout() {
    let totalCheckout = 0;
    cerrarModal('modalCarrito');
    const detalleCheckout = document.getElementById('detalleCheckout');
    while (detalleCheckout.firstChild) {
        detalleCheckout.removeChild(detalleCheckout.firstChild);
    }

    const divContainerProductos = document.createElement('div');
    divContainerProductos.classList.add('containerProductos');
    if (carrito.productos.length > 0) {
        carrito.productos.forEach(prod => {
            const divProducto = document.createElement('div');
            const img = document.createElement('img');
            img.src = prod.imagen;
            img.alt = prod.nombre;
            divProducto.appendChild(img);
            divContainerProductos.appendChild(divProducto)
            totalCheckout += prod.totalPrecio;
        });
        detalleCheckout.appendChild(divContainerProductos);

        const total = document.createElement('p');
        total.textContent = `Total: $${totalCheckout}`;
        detalleCheckout.appendChild(total);

        const formDatos = document.createElement('form');
        const labelNombre = document.createElement('label');
        labelNombre.textContent = "Nombre";
        const inputNombre = document.createElement('input');
        inputNombre.placeholder = "Ingrese su nombre";
        inputNombre.minLength = 4;
        inputNombre.required = true;

        const labelApellido = document.createElement('label');
        labelApellido.textContent = "Apellido";
        const inputApellido = document.createElement('input');
        inputApellido.placeholder = "Ingrese su apellido";
        inputApellido.minLength = 4;
        inputApellido.required = true;

        const labelEmail = document.createElement('label');
        labelEmail.textContent = "Email";
        const inputEmail = document.createElement('input');
        inputEmail.type = "email";
        inputEmail.placeholder = "Ingrese su Email";
        inputEmail.required = true;

        const labelLugar = document.createElement('label');
        labelLugar.textContent = "Lugar";
        const inputLugar = document.createElement('input');
        inputLugar.placeholder = "Ingrese su lugar de entrega";
        inputLugar.minLength = 6;
        inputLugar.required = true;

        const labelFechaDeEntrega = document.createElement('label');
        labelFechaDeEntrega.textContent = "Fecha De Entrega";
        const inputFechaDeEntrega = document.createElement('input');
        inputFechaDeEntrega.type = "date";
        inputFechaDeEntrega.placeholder = "Ingrese su Fecha De Entrega";
        inputFechaDeEntrega.required = true;

        const labelMetodoDePago = document.createElement('label');
        labelMetodoDePago.textContent = "Método De Pago";

        const divContainerMetodosPago = document.createElement('div');
        divContainerMetodosPago.classList.add("d-flex", "vw-30", "justify-content-evenly", "my-2");
        const divContainerVisa = document.createElement('div');
        divContainerVisa.classList.add("d-flex", "flex-column", "justify-content-center");
        const divContainerMastercard = document.createElement('div');
        divContainerMastercard.classList.add("d-flex", "flex-column", "justify-content-center");
        const divContainerAmex = document.createElement('div');
        divContainerAmex.classList.add("d-flex", "flex-column", "justify-content-center");
        const inputMetodoDePagoVisa = document.createElement('input');
        inputMetodoDePagoVisa.type = "radio";
        inputMetodoDePagoVisa.name = "metodoPago";
        inputMetodoDePagoVisa.checked = true;
        const labelVisa = document.createElement('label');
        const labelVisaImg = document.createElement('img');
        labelVisaImg.src = "./images/tarjetas/visa.svg";
        labelVisa.htmlFor = "visa";
        labelVisa.appendChild(labelVisaImg);
        divContainerVisa.appendChild(labelVisa);
        divContainerVisa.appendChild(inputMetodoDePagoVisa);

        const inputMetodoDePagoMastercard = document.createElement('input');
        inputMetodoDePagoMastercard.type = "radio";
        inputMetodoDePagoMastercard.name = "metodoPago";
        const labelMastercard = document.createElement('label');
        const labelMastercardImg = document.createElement('img');
        labelMastercardImg.src = "./images/tarjetas/mastercard.svg";
        labelMastercard.htmlFor = "mastercard";
        labelMastercard.appendChild(labelMastercardImg);
        divContainerMastercard.appendChild(labelMastercard);
        divContainerMastercard.appendChild(inputMetodoDePagoMastercard);

        const labelAmex = document.createElement('label');
        const labelAmexImg = document.createElement('img');
        labelAmexImg.src = './images/tarjetas/amex.svg';
        const inputMetodoDePagoAmex = document.createElement('input');
        inputMetodoDePagoAmex.type = "radio";
        inputMetodoDePagoAmex.name = "metodoPago";
        labelAmex.htmlFor = "amex";
        labelAmex.appendChild(labelAmexImg);
        divContainerAmex.appendChild(labelAmex);
        divContainerAmex.appendChild(inputMetodoDePagoAmex);

        formDatos.appendChild(labelNombre);
        formDatos.appendChild(inputNombre);
        formDatos.appendChild(labelApellido);
        formDatos.appendChild(inputApellido);
        formDatos.appendChild(labelEmail);
        formDatos.appendChild(inputEmail);
        formDatos.appendChild(labelLugar);
        formDatos.appendChild(inputLugar);
        formDatos.appendChild(labelFechaDeEntrega);
        formDatos.appendChild(inputFechaDeEntrega);
        formDatos.appendChild(labelMetodoDePago);
        divContainerMetodosPago.appendChild(divContainerVisa);
        divContainerMetodosPago.appendChild(divContainerMastercard);
        divContainerMetodosPago.appendChild(divContainerAmex);
        formDatos.appendChild(divContainerMetodosPago);
        detalleCheckout.appendChild(formDatos);

        const finalizarCompraBtn = document.createElement('button');
        finalizarCompraBtn.classList.add('btn', 'btn-primary', 'w-25', 'mx-auto', 'my-4');
        finalizarCompraBtn.textContent = "Finalizar Compra";
        const cancelarCompraBtn = document.createElement('button');
        cancelarCompraBtn.classList.add('btn', 'btn-danger', 'w-25', 'mx-auto', 'my-4');
        cancelarCompraBtn.textContent = "Volver";

        finalizarCompraBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (formDatos.checkValidity()) {
                cerrarModal('modalCheckout');
                vaciarCarrito();
            } else {
                formDatos.reportValidity();
            }
        });

        cancelarCompraBtn.addEventListener('click', (event) => {
            event.preventDefault();
            cerrarModal('modalCheckout');
            mostrarModal('modalCarrito');
        });

        const containerBtn = document.createElement('div');
        containerBtn.classList.add('w-100', 'mx-auto');
        containerBtn.appendChild(finalizarCompraBtn);
        containerBtn.appendChild(cancelarCompraBtn);
        detalleCheckout.appendChild(containerBtn);

    } else {
        const h1 = document.createElement('h1');
        h1.classList.add('text-center', 'w-100');
        h1.textContent = 'NO HAY PRODUCTOS PARA MOSTRAR';
        detalleCheckout.appendChild(h1);
    }

    mostrarModal('modalCheckout');
}

function mostrarModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "block";
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
    document.addEventListener('keydown', function (e) {
        if (e.key == 'Escape') {
            modal.style.display = "none";
        }
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    carrito.agregarProducto(producto);
    cerrarModal('modalProducto');
}

function removerDelCarrito(prod) {
    carrito.removerProducto(prod);
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito.vaciarCarrito();
}
