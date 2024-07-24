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
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.classList.add('col-lg-3');
        productoElement.classList.add('col-md-6');
        productoElement.classList.add('col-12');

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        productoElement.appendChild(img);

        const h2 = document.createElement('h2');
        h2.textContent = producto.nombre;
        productoElement.appendChild(h2);

        const h3 = document.createElement('h3');
        h3.textContent = producto.descripcion;
        productoElement.appendChild(h3);

        const spanPrecio = document.createElement('span');
        spanPrecio.textContent = `Precio: $${producto.precio}`;
        productoElement.appendChild(spanPrecio);

        const spanCategoria = document.createElement('span');
        spanCategoria.textContent = `${producto.categoria}`;
        productoElement.appendChild(spanCategoria);

        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-secondary');
        button.textContent = 'Ver detalle';
        button.addEventListener('click', () => mostrarDetalleProducto(producto.id));
        productoElement.appendChild(button);

        contenedorProductos.appendChild(productoElement);
    });
}

function filtrarPorCategoria(categoria) {
    modalOferta();
    renderProductos(categoria);
}

function modalOferta() {
    // Crear el modal y sus elementos
    const modal = document.createElement('div');
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
    img.src = '../images/gordo-pelusa1_no_bg.png'; // Cambia esto a la ruta de tu imagen
    img.alt = 'Gordo Pelusa';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';

    const leyenda = document.createElement('p');
    leyenda.textContent = 'Llévate al Gordo Pelusa gratis, no hace falta que compres nada';
    leyenda.style.marginTop = '10px';
    leyenda.style.fontSize = '18px';
    leyenda.style.color = 'black';

    // Añadir la imagen y la leyenda al contenido del modal
    modalContent.appendChild(img);
    modalContent.appendChild(leyenda);

    // Añadir el contenido del modal al modal
    modal.appendChild(modalContent);

    // Añadir el modal al cuerpo del documento
    document.body.appendChild(modal);

    // Configurar un temporizador para cerrar el modal después de 10 segundos
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 10000);
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
    spanCategoria.textContent = producto.categoria;
    detalleProducto.appendChild(spanCategoria);

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.classList.add('btn-primary');
    button.classList.add('btn');
    button.classList.add('mb-2');
    button.addEventListener('click', () => agregarAlCarrito(producto.id));
    detalleProducto.appendChild(button);

    mostrarModal('modalProducto');
}



function mostrarCarrito() {
    const detalleCarrito = document.getElementById('detalleCarrito');
    const removeButton = document.createElement('button');
    removeButton.textContent = "Eliminar todos los productos del carrito";
    removeButton.classList.add('btn');
    removeButton.classList.add('btn-danger');
    removeButton.addEventListener('click', ()=> vaciarCarrito());

    while (detalleCarrito.firstChild) {
        detalleCarrito.removeChild(detalleCarrito.firstChild);
    }

    if (carrito.productos.length > 0) {
        carrito.productos.forEach(prod => {
            const div = document.createElement('div');
            div.classList.add('h-100');

            const img = document.createElement('img');
            img.src = prod.imagen;
            img.alt = prod.nombre;
            div.appendChild(img);

            const h2 = document.createElement('h2');
            h2.textContent = prod.nombre;
            div.appendChild(h2);

            const p1 = document.createElement('p');
            p1.textContent = `Precio: $${prod.precio}`;
            div.appendChild(p1);

            const p2 = document.createElement('p');
            p2.textContent = prod.categoria;
            div.appendChild(p2);

            const unidades = document.createElement('p');
            unidades.textContent = `Cantidad: ${prod.cantidad || 1}`; // Mostrar cantidad
            div.appendChild(unidades);

            const totalPrecio = document.createElement('p');
            totalPrecio.textContent = `Total: $${prod.totalPrecio}`; // Mostrar el precio total del producto
            div.appendChild(totalPrecio);

            const button = document.createElement('button');
            button.classList.add('center');
            button.textContent = 'Quitar del carrito';
            button.addEventListener('click', () => removerDelCarrito(prod));
            div.appendChild(button);
            detalleCarrito.appendChild(div);
        });
        const checkout = document.createElement('button');
        checkout.classList.add('btn');
        checkout.classList.add('btn-primary');
        checkout.classList.add('w-25');
        checkout.classList.add('mx-auto');
        checkout.textContent = "Ir a pagar";
        checkout.addEventListener('click',()=>mostrarCheckout()) // Asegurarse de que este botón llama a mostrarCheckout
        const containerBtn = document.createElement('div');
        containerBtn.classList.add('w-100');
        containerBtn.classList.add('mx-auto');
        containerBtn.appendChild(checkout);
        detalleCarrito.appendChild(containerBtn);
    } else {
        const h1 = document.createElement('h1');
        h1.classList.add('text-center', 'w-100');
        h1.textContent = 'NO HAY PRODUCTOS PARA MOSTRAR';
        detalleCarrito.appendChild(h1);
    }

    mostrarModal('modalCarrito');
}



function mostrarCheckout() {
    let totalCheckout = 0;
    cerrarModal('modalCarrito');
    const detalleCheckout = document.getElementById('detalleCheckout');
    while (detalleCheckout.firstChild) {
        detalleCheckout.removeChild(detalleCheckout.firstChild);
    }

    console.log("Productos en el carrito:", carrito.productos); // Verificar que los productos están presentes

    if (carrito.productos.length > 0) {
        carrito.productos.forEach(prod => {
            console.log("Producto en el carrito:", prod); // Verificar que cada producto es iterado correctamente

            const div = document.createElement('div');
            div.classList.add('h-100');

            const img = document.createElement('img');
            img.src = prod.imagen;
            img.alt = prod.nombre;
            div.appendChild(img);

            const unidades = document.createElement('p');
            unidades.textContent = `Cantidad: ${prod.cantidad || 1}`; // Mostrar cantidad
            div.appendChild(unidades);

            const totalPrecio = document.createElement('p');
            totalPrecio.textContent = `Total: $${prod.totalPrecio}`; // Mostrar el precio total del producto
            div.appendChild(totalPrecio);

            detalleCheckout.appendChild(div);
            totalCheckout += prod.totalPrecio;
        });

        const total = document.createElement('p');
        total.textContent = `Total: $${totalCheckout}`; // Mostrar el precio total del producto
        detalleCheckout.appendChild(total);

        const formDatos = document.createElement('form');
        const labelNombre = document.createElement('label');
        labelNombre.textContent = "Nombre";
        const inputNombre = document.createElement('input');
        inputNombre.placeholder = "Ingrese su nombre";
        inputNombre.required = true;

        const labelApellido = document.createElement('label');
        labelApellido.textContent = "Apellido";
        const inputApellido = document.createElement('input');
        inputApellido.placeholder = "Ingrese su apellido";
        inputApellido.required = true;

        const labelEmail = document.createElement('label');
        labelEmail.textContent = "Email";
        const inputEmail = document.createElement('input');
        inputEmail.placeholder = "Ingrese su Email";
        inputEmail.required = true;

        const labelLugar = document.createElement('label');
        labelLugar.textContent = "Lugar";
        const inputLugar = document.createElement('input');
        inputLugar.placeholder = "Ingrese su Lugar";
        inputLugar.required = true;

        const labelFechaDeEntrega = document.createElement('label');
        labelFechaDeEntrega.textContent = "Fecha De Entrega";
        const inputFechaDeEntrega = document.createElement('input');
        inputFechaDeEntrega.placeholder = "Ingrese su Fecha De Entrega";
        inputFechaDeEntrega.required = true;

        const labelMetodoDePago = document.createElement('label');
        labelMetodoDePago.textContent = "Metodo De Pago";
        const inputMetodoDePago = document.createElement('input');
        inputMetodoDePago.placeholder = "Ingrese su Metodo De Pago";
        inputMetodoDePago.required = true;

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
        formDatos.appendChild(inputMetodoDePago);
        detalleCheckout.appendChild(formDatos);

        const finalizarCompraBtn = document.createElement('button');
        finalizarCompraBtn.classList.add('btn', 'btn-danger', 'w-25', 'mx-auto');
        finalizarCompraBtn.textContent = "Finalizar Compra";

        finalizarCompraBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del botón
            if (formDatos.checkValidity()) {
                cerrarModal('modalCheckout');
            } else {
                formDatos.reportValidity(); // Muestra mensajes de error en los campos no válidos
            }
        });

        const containerBtn = document.createElement('div');
        containerBtn.classList.add('w-100', 'mx-auto');
        containerBtn.appendChild(finalizarCompraBtn);
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
    if(id=='modalCheckout'){
        carrito.vaciarCarrito();
    }
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
function vaciarCarrito(){
    carrito.vaciarCarrito();
}