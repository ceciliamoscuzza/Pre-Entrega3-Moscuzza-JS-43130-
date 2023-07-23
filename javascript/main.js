let carrito = [];

const productos = [
  {
    codigo: "a",
    imagen: "imagenes/cataNac.png",
    nombre: "Cata Nacional",
    precio: 5000,
  },
  {
    codigo: "b",
    imagen: "imagenes/cataImp.png",
    nombre: "Cata Importado",
    precio: 8000,
  },
  {
    codigo: "c",
    imagen: "imagenes/cataAutor.png",
    nombre: "Cata De autor",
    precio: 12000,
  },
  {
    codigo: "d",
    imagen: "imagenes/cataMix.png",
    nombre: "Cata Mix Premium",
    precio: 16000,
  },
  {
    codigo: "e",
    imagen: "imagenes/w1.png",
    nombre: "Whisky Habermas",
    precio: 16000,
  },
  {
    codigo: "f",
    imagen: "imagenes/w2.png",
    nombre: "Whisky Butler",
    precio: 7990,
  },
  {
    codigo: "g",
    imagen: "imagenes/w3.png",
    nombre: "Whisky Latour",
    precio: 14000,
  },
  {
    codigo: "h",
    imagen: "imagenes/w4.png",
    nombre: "Whisky Zizek",
    precio: 8562,
  },
  {
    codigo: "i",
    imagen: "imagenes/w5.png",
    nombre: "Whisky Nussbaum",
    precio: 18000,
  },
  {
    codigo: "j",
    imagen: "imagenes/w6.png",
    nombre: "Whisky Taylor",
    precio: 32000,
  },
  {
    codigo: "k",
    imagen: "imagenes/w7.png",
    nombre: "Whisky Badiou",
    precio: 45000,
  },
];

function generarCatalogo() {
  if (!document.getElementById("catalogo")) return;
  document.getElementById("catalogo").innerHTML = "";
  productos.forEach((producto) => {
    let html = generarProductoHtml(producto);
    document.getElementById("catalogo").innerHTML += html;
  });
}

function generarProductoHtml(producto) {
  return `
  <div class="lista-item">
    <div class="imagen"><img src="${producto.imagen}" /></div>
    <div><p>${producto.nombre}</p></div>
    <div><p>$ ${producto.precio}</p></div>
    <div><button onclick="agregarCarrito('${producto.codigo}', this)">Agregar al carrito</button></div>
  </div>
         `;
}

function generarCarrito() {
  if (!document.getElementById("carrito")) return;
  document.getElementById("carrito").innerHTML = "";
  document.getElementById("carritoTotal").innerHTML = "";
  carrito.forEach((producto) => {
    let html = generarCarritoHtml(producto);
    document.getElementById("carrito").innerHTML += html;
  });
  if (carrito.length > 0) {
    const cata = new Compra(carrito);
    document.getElementById("carritoTotal").innerHTML = `
    <div>Tu experiencia suma un total de: $ ${cata.obtenerSubtotal()}</div>
    <div><button class="boton" onclick="finalizarCompra()">Finalizar compra</button></div>
           `;
  }
}

function generarCarritoHtml(producto) {
  return `
  <div class="lista-item">
    <div class="imagen"><img src="${producto.imagen}" /></div>
    <div><p>${producto.nombre}</p></div>
    <div><p>$ ${producto.precio}</p></div>
    <div><button onclick="eliminarCarrito('${producto.codigo}')">Eliminar del carrito</button></div>
  </div>
         `;
}

function actualizarCarrito() {
  document.getElementById(
    "carritoCantidad"
  ).innerHTML = `Tu carrito (${carrito.length})`;
}

function leerCarrito() {
  let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
  if (carritoLocal) {
    carrito = carritoLocal;
    actualizarCarrito();
  }
}

function guardarCarrito() {
  let carritoJson = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJson);
  actualizarCarrito();
}

function agregarCarrito(codigo, elemento) {
  let producto = buscarProductos(codigo);
  carrito.push(producto);
  guardarCarrito();
  elemento.innerHTML = "Agregado!";
}

function eliminarCarrito(codigo) {
  let producto = buscarCarrito(codigo);
  let indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  guardarCarrito();
  generarCarrito();
}

function buscarProductos(codigo) {
  let resultado = productos.find(
    (producto) => producto.codigo === codigo.toLowerCase()
  );
  return resultado;
}

function buscarCarrito(codigo) {
  let resultado = carrito.find(
    (producto) => producto.codigo === codigo.toLowerCase()
  );
  return resultado;
}

function finalizarCompra() {
  carrito = [];
  guardarCarrito();
  generarCarrito();
  document.getElementById("carritoTotal").innerHTML =
    "Compra finalizada, gracias por elegirnos!" +
    "<div><a href='index.html'>Volver al inicio</a></div>";
}

function catar() {
  let codigo = prompt(
    "Ingresa el código de tu Cata Experience ó Cata Experience a casa:"
  );
  let cataElegida = buscarProductos(codigo);
  if (cataElegida !== undefined) {
    carrito.push(cataElegida);
    alert(
      "🥃" + cataElegida.nombre + " se agregó a tu Carrito de Experiencias 🥃"
    );
    let respuesta = confirm("¿Querés sumar otra experiencia?");
    if (respuesta === true) {
      catar();
    } else {
      console.table(carrito);
      terminarCompra();
    }
  } else {
    alert("Ítem no encontrado. Por favor ingresá otra opción.");
    catar();
  }
}

function comenzar() {
  let usuario = prompt("Ingrese su Nombre y apellido:");
  console.log("🥃👋🏼Bienvenidx " + usuario);
  let edad = prompt("Ingrese su edad:");

  if (edad >= 21) {
    console.log(
      "👍🏼Como sos mayor de edad, podés elegir entre las siguientes experiencias, chequealas en nuestra web: (a,b,c,d,e,f,g,h,i,j,k)"
    );
    let experiencia = alert(
      "Elegí tu CataExperience🥃declarando catar() en la consola"
    );
  } else {
    alert(
      "🚫No podemos sumarte a esta experiencia, tenés que ser mayor de edad🚫"
    );
  }
}

//comenzar();
generarCatalogo();
leerCarrito();
generarCarrito();
