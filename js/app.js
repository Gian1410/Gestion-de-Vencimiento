const productoInput = document.querySelector("#producto");
const cantidadInput = document.querySelector("#cantidad");
const vencimientoInput = document.querySelector("#vencimiento");
const categoriaInput = document.querySelector("#categoria")
const detalleInput = document.querySelector("#detalle");

const formulario = document.querySelector("#formulario-producto");
const formularioInput = document.querySelector("#formulario-producto input[type='submit']");
const productosLista = document.querySelector("#productos-lista")

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

productoInput.addEventListener("change",datosProducto);
cantidadInput.addEventListener("change",datosProducto),
categoriaInput.addEventListener("change", datosProducto)
vencimientoInput.addEventListener("change",datosProducto),
detalleInput.addEventListener("change",datosProducto);

formulario.addEventListener("submit",submitProducto);

class AdminProductos{
    constructor(){
        this.productos = [];
    }

    agregar(producto){
        this.productos = [...this.productos,producto];
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

            divProducto.appendChild(productoL);
            divProducto.appendChild(cantidad);
            divProducto.appendChild(fechaVencimiento);
            divProducto.appendChild(categoria);
            divProducto.appendChild(diasDiv);
            divProducto.appendChild(detalle)
            divProducto.appendChild(diaARetirar)

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