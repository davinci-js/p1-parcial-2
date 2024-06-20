// scripts/Producto.js

class Producto {
    constructor(id, nombre, descripcion, precio, imagen, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
    }

    render() {
        return `
            <div class="producto">
                <img src="${this.imagen}" alt="${this.nombre}">
                <h3>${this.nombre}</h3>
                <p>${this.descripcion}</p>
                <p>${this.categoria}</p>
                <p>Precio: $${this.precio}</p>
                <button onclick="mostrarDetalleProducto(${this.id})">Ver detalle</button>
            </div>
        `;
    }
}
