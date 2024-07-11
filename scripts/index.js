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
        button.textContent = 'Ver detalle';
        button.addEventListener('click', () => mostrarDetalleProducto(producto.id));
        productoElement.appendChild(button);

        contenedorProductos.appendChild(productoElement);
    });
}

function filtrarPorCategoria(categoria) {
    renderProductos(categoria);
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
    button.addEventListener('click', () => agregarAlCarrito(producto.id));
    detalleProducto.appendChild(button);

    mostrarModal('modalProducto');
}

function mostrarCarrito() {
    const detalleCarrito = document.getElementById('detalleCarrito');
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

            const button = document.createElement('button');
            button.classList.add('center');
            button.textContent = 'Quitar del carrito';
            button.addEventListener('click', () => removerDelCarrito(prod.id));
            div.appendChild(button);

            detalleCarrito.appendChild(div);
        });
    } else {
        const h1 = document.createElement('h1');
        h1.classList.add('text-center', 'w-100');
        h1.textContent = 'NO HAY PRODUCTOS PARA MOSTRAR';
        detalleCarrito.appendChild(h1);
    }

    mostrarModal('modalCarrito');
}

function mostrarModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "block";
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
}

function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    carrito.agregarProducto(producto);
    cerrarModal('modalProducto');
}

function removerDelCarrito(id) {
    carrito.removerProducto(id);
    mostrarCarrito();
}
