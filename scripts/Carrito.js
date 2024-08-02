class Carrito {
    constructor() {
        this.productos = this.cargarCarritoDesdeLocalStorage();
    }

    agregarProducto(producto) {
        let productoExistente = this.productos.find(prod => prod.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad = (productoExistente.cantidad || 1) + 1; 
            productoExistente.totalPrecio = productoExistente.cantidad * productoExistente.precio;
        } else {
            producto.cantidad = 1;
            producto.totalPrecio = producto.precio;
            this.productos.push(producto);
        }
        this.actualizarCarrito();
        this.guardarCarritoEnLocalStorage();
    }

    removerProducto(prod) {
        if (prod.cantidad <= 1) {
            this.productos = this.productos.filter(producto => producto.id !== prod.id);
        } else {
            prod.cantidad = parseInt(prod.cantidad) - 1;
            prod.totalPrecio -= prod.precio;
        }
        this.actualizarCarrito();
        this.guardarCarritoEnLocalStorage();
    }

    vaciarCarrito() {
        this.productos = [];
        this.actualizarCarrito();
        this.guardarCarritoEnLocalStorage();
    }

    obtenerTotal() {
        return this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }

    contarProductos() {
        return this.productos.reduce((total, producto) => total + producto.cantidad, 0);
    }

    actualizarCarrito() {
        const carritoElemento = document.getElementById('carrito');
        carritoElemento.textContent = '';
        const itemsAgregados = document.createElement('p');
        const total = document.createElement('p');
        if (this.contarProductos() > 0) {
            itemsAgregados.textContent = `${this.contarProductos()} ítems agregados`;
            total.textContent = `$${this.obtenerTotal()} es el total`;
        } else {
            itemsAgregados.textContent = "El carrito está vacío";
        }

        const filtrarPor = document.createElement('p');
        filtrarPor.textContent = 'Filtrar por ';

        const categoria1 = document.createElement('a');
        categoria1.href = '#';
        categoria1.textContent = 'Sólido';
        categoria1.onclick = () => filtrarPorCategoria('solido');

        const categoria2 = document.createElement('a');
        categoria2.href = '#';
        categoria2.textContent = 'Carey';
        categoria2.onclick = () => filtrarPorCategoria('carey');

        const categoria3 = document.createElement('a');
        categoria3.href = '#';
        categoria3.textContent = 'Calicó';
        categoria3.onclick = () => filtrarPorCategoria('calico');

        const todos = document.createElement('a');
        todos.href = '#';
        todos.textContent = 'Todos';
        todos.onclick = () => filtrarPorCategoria('');

        filtrarPor.appendChild(categoria1);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(categoria2);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(categoria3);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(todos);

        const verCarritoBtn = document.createElement('button');
        verCarritoBtn.textContent = 'Ver carrito';
        verCarritoBtn.classList.add('btn', 'btn-primary');
        verCarritoBtn.onclick = mostrarCarrito;

        const vaciarCarritoBtn = document.createElement('button');
        vaciarCarritoBtn.textContent = 'Vaciar carrito';
        vaciarCarritoBtn.classList.add('btn', 'btn-danger', 'mx-2');
        vaciarCarritoBtn.onclick = vaciarCarrito;

        carritoElemento.appendChild(itemsAgregados);
        carritoElemento.appendChild(total);
        carritoElemento.appendChild(filtrarPor);
        carritoElemento.appendChild(verCarritoBtn);
        carritoElemento.appendChild(vaciarCarritoBtn);
    }

    guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(this.productos));
    }

    cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }
}

const carrito = new Carrito();
