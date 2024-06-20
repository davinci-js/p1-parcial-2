class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        debugger;
        let productoExistente = this.productos.find(prod => prod.id === producto.id);
        if (!productoExistente) {
            this.productos.push(producto);
            this.actualizarCarrito();
        } else {
            console.log('El producto ya existe en el carrito.');
        }
    }

    removerProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.actualizarCarrito();
    }

    obtenerTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    contarProductos() {
        return this.productos.length;
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
        categoria1.textContent = 'Categoría 1';
        categoria1.onclick = () => filtrarPorCategoria('categoria 1');
        
        const categoria2 = document.createElement('a');
        categoria2.href = '#';
        categoria2.textContent = 'Categoría 2';
        categoria2.onclick = () => filtrarPorCategoria('categoria 2');
        
        const categoria3 = document.createElement('a');
        categoria3.href = '#';
        categoria3.textContent = 'Categoría 3';
        categoria3.onclick = () => filtrarPorCategoria('categoria 3');
    
        filtrarPor.appendChild(categoria1);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(categoria2);
        filtrarPor.appendChild(document.createTextNode(' | '));
        filtrarPor.appendChild(categoria3);
    
        const verCarritoBtn = document.createElement('button');
        verCarritoBtn.textContent = 'Ver carrito';
        verCarritoBtn.onclick = mostrarCarrito;
    
        carritoElemento.appendChild(itemsAgregados);
        carritoElemento.appendChild(total);
        carritoElemento.appendChild(filtrarPor);
        carritoElemento.appendChild(verCarritoBtn);
    }
}

const carrito = new Carrito();
