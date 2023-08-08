
const num = Math.random()
let botonProductos = document.getElementById('btn1')
let body = document.querySelector("body")
body.style.backgroundColor = "#fdf5e6"
let total = 0
let carrito = []
let productos = []

    botonProductos.onclick = () => {
        //Defino el DOM
        let spinner = document.getElementById("spinner");
        let mostrarCarrito = document.getElementById('carrito')
        let carritoTitulo = document.getElementById('h2Carrito')
        let totalCompra = document.getElementById('totalCompra')
        let tituloTotalCompra = document.getElementById('tituloTotalCompra')
            tituloTotalCompra.style.margin = "15px"
                carritoTitulo.style.margin = "15px"
                    mostrarCarrito.style.width = '50rem';
                    mostrarCarrito.style.border = "1px solid black";
                    mostrarCarrito.style.padding = "15px";
                    mostrarCarrito.style.margin = "15px"
                    totalCompra.style.width = '20rem';
                    totalCompra.style.border = "1px solid black";
                    totalCompra.style.padding = "15px";
                    totalCompra.style.margin = "15px"
                    document.body.appendChild(carritoTitulo)
                    document.body.appendChild(mostrarCarrito)
                    document.body.appendChild(tituloTotalCompra)
                    document.body.appendChild(totalCompra)
        spinner.style.display = "block";
//Productos de la base de datos y .then
        fetch("./data.json")
            .then((response) => response.json())
            .then((data) => {
                productos.push(data)
                setTimeout(() => {
                    for (const producto of data) {
                        let contenedor = document.createElement("div");
                        contenedor.innerHTML = `
                        <h2>Nombre del producto: ${producto.nombre}</h2>
                        <h3>ID del producto: ${producto.id}</h3>
                        <h3>Precio: $${producto.precio}</h3>
                        <button id="${producto.id}" class="btn btn-dark btn-agg btn-sucess ">Agregar al carrito</button>
                        `;
                contenedor.className = 'd-flex align-content-around flex-wrap';
                contenedor.style.width = '18rem';
                contenedor.style.border = "1px solid black";
                contenedor.style.padding = "15px";
                contenedor.style.margin = "15px"
                document.body.appendChild(contenedor);
                }
                spinner.style.display = "none";
                botonProductos.style.display = 'none'
                carritoTitulo.style.display = 'block'
                mostrarCarrito.style.display = 'block'
                tituloTotalCompra.style.display = 'block'
                totalCompra.style.display = 'block'

//find para el producto seleccionado
//Carrito de compras

    let btns = document.getElementsByClassName('btn-agg') 
    let productoElegido 
    for (const boton of btns) {
    boton.onclick = (e) => {
        let productoElegido = data.find((producto) => producto.id === parseInt(e.target.id)) 
        if(carrito.map((a) =>  a.id).includes(productoElegido.id)){
            productoElegido.cantidad++
            swal({
                text: `se agrego otro producto de ${productoElegido.nombre} al carrito` ,
                icon: 'success',
            })
        } else{
            swal({
                text: `se agrego el producto ${productoElegido.nombre} al carrito` ,
                icon: 'success',
            })
        carrito.push(productoElegido)}
        localStorage.setItem('carrito', JSON.stringify(carrito))
        mostrarCarrito.innerHTML =`
        Los productos agregados al carrito son: ${"\n" + carrito.map((producto) => producto.nombre + ": precio: $" + producto.precio + ", x" + producto.cantidad + " Unidad/es ||")}
        `;
        carrito.forEach(productoElegido => {
            total += productoElegido.precio
        })
        totalCompra.innerHTML = `$${total}`
    }}  

//Boton para limpiar carrito
    let btnLimpiarCarrito = document.createElement('button')
    btnLimpiarCarrito.innerText = 'Limpiar Carrito'
    btnLimpiarCarrito.style.border = "3px solid black"
    btnLimpiarCarrito.style.backgroundColor = "#fdf5e6"
    btnLimpiarCarrito.style.padding  = "5px"
    btnLimpiarCarrito.style.margin = "5px" 
    btnLimpiarCarrito.onclick = () => {
        for (var i = 0; i < carrito.length; i++) {
            carrito[i].cantidad = 1;
        }
        localStorage.clear()
        carrito.splice(0, carrito.length)
        mostrarCarrito.innerHTML = "Carrito vacío"
        total = 0
        totalCompra.innerHTML = `$${total}`
        swal({
            text: `Carrito Limpiado exitosamente`,
            icon: 'success',
        })
    }
    document.body.appendChild(btnLimpiarCarrito)

//Boton para finalizar compra
            let btnFinalizarCompra = document.createElement('button')
            btnFinalizarCompra.innerText = 'Finalizar Compra'
            btnFinalizarCompra.style.border = "3px solid black"
            btnFinalizarCompra.style.padding  = "5px"
            btnFinalizarCompra.style.margin = "5px" 
            document.body.appendChild(btnFinalizarCompra)
            btnFinalizarCompra.onclick = () => {
                swal({
                    title: 'Compra Finalizada',
                    text: `Compra finalizada con los siguientes productos: ${"\n" + carrito.map((producto) => producto.nombre + ": precio: $" + producto.precio + ", x" + producto.cantidad + " Unidad/es || \n")} Con un valor final de: $${total}
                    `,
                    icon: 'success',
                })
                for (var i = 0; i < carrito.length; i++) {
                    carrito[i].cantidad = 1;
                }
            localStorage.clear()
            carrito.splice(0, carrito.length)
            mostrarCarrito.innerHTML = "Carrito vacío"
            total = 0
            totalCompra.innerHTML = `$${total}`
            }
                }, 500);
            })
//Catch
            .catch(error => {
                spinner.style.display = "none"
                swal({
                    title: `ERROR 404`,
                    text: `Error al cargar los datos de la API` ,
                    icon: 'error',
                })
            });
}





