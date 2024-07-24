class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        let productoExistente = this.productos.find(prod => prod.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad = (productoExistente.cantidad || 1) + 1; // Incrementar la cantidad
            productoExistente.totalPrecio = productoExistente.cantidad * productoExistente.precio; // Actualizar el precio total
        } else {
            producto.cantidad = 1; // Inicializar la cantidad en 1
            producto.totalPrecio = producto.precio; // Inicializar el precio total
            this.productos.push(producto);
        }
        this.actualizarCarrito();
    }

    removerProducto(prod) {
        if(prod.cantidad<=1){
            this.productos = this.productos.filter(producto => producto.id !== prod.id);
        } else{
            prod.cantidad = parseInt(prod.cantidad)-1
            prod.totalPrecio -= prod.precio;
        }
        this.actualizarCarrito();
    }

    vaciarCarrito() {
        this.productos = [];
        this.actualizarCarrito();
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
        itemsAgregados.textContent = `${this.contarProductos()} ítems agregados`;

        const total = document.createElement('p');
        total.textContent = `$${this.obtenerTotal()} es el total`;

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

        filtrarPor.appendChild(categoria1);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(categoria2);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(categoria3);

        const verCarritoBtn = document.createElement('button');
        verCarritoBtn.textContent = 'Ver carrito';
        verCarritoBtn.classList.add('btn')
        verCarritoBtn.classList.add('btn-primary')
        verCarritoBtn.onclick = mostrarCarrito;
        const vaciarCarritoBtn = document.createElement('button');
        vaciarCarritoBtn.textContent = 'Vaciar carrito';
        vaciarCarritoBtn.classList.add('btn')
        vaciarCarritoBtn.classList.add('btn-danger')
        vaciarCarritoBtn.classList.add('mx-2');
        vaciarCarritoBtn.onclick = vaciarCarrito;

        carritoElemento.appendChild(itemsAgregados);
        carritoElemento.appendChild(total);
        carritoElemento.appendChild(filtrarPor);
        carritoElemento.appendChild(verCarritoBtn);
        carritoElemento.appendChild(vaciarCarritoBtn);
    }
}
const carrito = new Carrito();
