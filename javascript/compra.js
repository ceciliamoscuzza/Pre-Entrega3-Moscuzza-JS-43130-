class Compra {
  constructor(carritoDeCompras) {
    this.carrito = carritoDeCompras;
  }
  obtenerSubtotal() {
    if (this.carrito.length > 0) {
      return this.carrito.reduce((acc, producto) => acc + producto.precio, 0);
    }
  }
}
