const productoInput = document.querySelector("#producto");
const cantidadInput = document.querySelector("#cantidad");
const vencimientoInput = document.querySelector("#vencimiento");
const categoriaInput = document.querySelector("#categoria")
const detalleInput = document.querySelector("#detalle");

const formulario = document.querySelector("#formulario-producto");
const formularioInput = document.querySelector("#formulario-producto input[type='submit']");
const productosLista = document.querySelector("#productos-lista")

window.onload = () =>{
    eventListeners();

    crearDB();
}

let diasRetiro = {
  // Carnes y pescados
  polloF: 1,        // Pollo fresco
  vacuno: 9,        // Carne de vacuno
  polloPescCong: 5, // Pollo y pescado congelado

  // Embutidos y quesos
  embQues: 3,

  // Lácteos
  lactRef: 3,       // Yogurt, mantequilla
  cremaL: 3,        // Cremas de leche
  lecheUHT: 5,      // Leches UHT, condensada, evaporada

  // Huevos
  huevos: 5,

  // Congelados
  cong: 5,

  // Abarrotes
  abarBase: 5,      // Arroz, azúcar, avena
  abarVar: 5,       // Fideos, sal, salsas, bebidas, etc.

  // Snacks
  snacks: 3,

  // Cigarros
  cigarros: 5,

  // Mascotas
  mascotas: 7,

  // Panadería y fabricación
  panes: 1,
};

// const dias = diasRetiro[producto.categoria];

const productObj = {
    id: generarId(),
    producto: "",
    cantidad: 0,
    categoria: "",
    categoriaTexto: "",
    vencimiento: "",
    detalle: "",
}

eventListeners();
function eventListeners() {
    productoInput.addEventListener("change",datosProducto);
    cantidadInput.addEventListener("change",datosProducto),
    categoriaInput.addEventListener("change", datosProducto)
    vencimientoInput.addEventListener("change",datosProducto),
    detalleInput.addEventListener("change",datosProducto);
}


formulario.addEventListener("submit",submitProducto);

let editando = false;

class AdminProductos{
    constructor(){
        this.productos = [];
    }

    agregar(producto){
        this.productos = [...this.productos,producto];
        this.mostrar();
    }

    editar(productoActualizado){
        this.productos = this.productos.map(producto => producto.id === productoActualizado.id ? productoActualizado : producto);
        this.mostrar();
    }

    eliminar(id){
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.mostrar();
    }

    mostrar(){
        while (productosLista.firstChild) {
            productosLista.removeChild(productosLista.firstChild)
        }

        let diasRestantes;
        for (const categoria in diasRetiro) {
                for (const element in productObj) {
                    if (categoria === productObj[element]) {
                        diasRestantes = diasRetiro[categoria]
                    }
                }
                
        }
        
        this.productos.forEach(producto =>{
            const dias = diasRetiro[producto.categoria];
            const hoy = new Date();
            const fechaV = new Date(producto.vencimiento);
            const fechaRetiro = new Date(fechaV);
            fechaRetiro.setDate(fechaRetiro.getDate() - dias);
            const diasRestantes = Math.ceil((fechaRetiro - hoy)/(1000 * 60 * 60 * 24));

            const divProducto = document.createElement("DIV");
            divProducto.classList.add("mx-5","my-10","bg-white","shadow-md","px-5","py-10","rounded-xl");

            const productoL = document.createElement("P");
            productoL.classList.add("font-normal","mb-3","text-gray-700","normal-case");
            productoL.innerHTML = `<span class="font-bold uppercase">Producto: </span>${producto.producto}`;

            const cantidad = document.createElement("P");
            cantidad.classList.add("font-normal","mb-3","text-gray-700","normal-case")
            cantidad.innerHTML = `<span class="font-bold uppercase">Cantidad: </span> ${producto.cantidad}`;

            const fechaVencimiento = document.createElement("P");
            fechaVencimiento.classList.add("font-normal","mb-3","text-gray-700","normal-case")
            fechaVencimiento.innerHTML = `<span class="font-bold uppercase">Fecha de Vencimiento: </span>${producto.vencimiento}`;

            const categoria = document.createElement("P");
            categoria.classList.add("font-normal","mb-3","text-gray-700","normal-case");
            categoria.innerHTML = `<span class="font-bold uppercase">Categoria: </span>${producto.categoriaTexto}`;



            const diasDiv = document.createElement("P");
            diasDiv.classList.add("font-normal","mb-3","text-gray-700","normal-case");
            diasDiv.innerHTML = `<span class="font-bold uppercase">Dias restantes: </span>${diasRestantes}`;

            const detalle = document.createElement("P");
            detalle.classList.add("font-normal","mb-3","text-gray-700","normal-case");
            detalle.innerHTML = `<span class="font-bold uppercase">Detalle: </span>${producto.detalle}`;

            const diaARetirar = document.createElement("P");
            diaARetirar.classList.add("font-normal","mb-3","text-gray-700","normal-case");
            diaARetirar.innerHTML = `<span class="font-bold uppercase">Fecha de Retiro: </span>${fechaRetiro.toLocaleDateString()}`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            const clone = structuredClone(producto);
            btnEditar.onclick = () => cargarEdicion(clone);

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => this.eliminar(producto.id)

            const contenedorBotones = document.createElement("DIV");
            contenedorBotones.classList.add("flex","justify-between","mt-10");

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            divProducto.appendChild(productoL);
            divProducto.appendChild(cantidad);
            divProducto.appendChild(fechaVencimiento);
            divProducto.appendChild(categoria);
            divProducto.appendChild(diasDiv);
            divProducto.appendChild(detalle);
            divProducto.appendChild(diaARetirar);
            divProducto.appendChild(contenedorBotones);

            productosLista.appendChild(divProducto)
        })
    }
}

const productos = new AdminProductos();

function submitProducto(e) {
    e.preventDefault();
    if (Object.values(productObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: "Completa los Campos",
            tipo: "error"
        })
        return;
    }
    if (editando) {
        productos.editar({...productObj});
        new Notificacion({
            texto: "Guardado Correctamente",
            tipo: "Exito"
        })
    }else{
        productos.agregar({...productObj});
        new Notificacion({
            texto:"Producto Agregado",
            tipo: "exito"
        })

    }
    
    formulario.reset();
    reiniciarObjetoProducto();
}

class Notificacion{
    constructor({texto,tipo}){
        this.texto = texto,
        this.tipo = tipo,

        this.mostrar();
    }

    mostrar(){
        const alerta = document.createElement("DIV");
        alerta.classList.add("text-center","w-full","p-3","text-white","my-5","alert","uppercase","font-bold","text-sm");

        const alertaPrevia = document.querySelector(".alert");
        alertaPrevia?.remove();

        this.tipo === "error" ? alerta.classList.add("bg-red-500") : alerta.classList.add("bg-green-500");

        alerta.textContent = this.texto;

        formulario.parentElement.insertBefore(alerta,formulario);
        setTimeout(()=>{
            alerta.remove()
        },2000)
    }
}

function datosProducto(e) {
    if (e.target.name === "categoria") {
        const select = e.target;
        productObj.categoria = select.value;
        productObj.categoriaTexto = select.options[select.selectedIndex].text;
    }else{
        productObj[e.target.name] = e.target.value;
        
    }
    
    console.log(productObj);
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function reiniciarObjetoProducto() {
    Object.assign(productObj,{
        producto: "",
        cantidad: 0,
        categoria:"",
        categoriaTexto: "",
        vencimiento: "",
        detalle:"",
    })
}

function cargarEdicion(producto) {
    Object.assign(productObj,producto);

    productoInput.value = producto.producto;
    cantidadInput.value = producto.cantidad;
    categoriaInput.value = producto.categoriaTexto;
    vencimientoInput.value = producto.vencimiento;
    detalleInput.value = producto.detalle;

    editando = true;

    formularioInput.value = "Guardar Cambios";
}

function crearDB() {
    // base de datos Indexed DB
    const crearDB = window.indexedDB.open('productos',1)
}