const diasRetiro = {
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

const productObj = {
    producto: "Arroz",
    cantidad: 10,
    categoria: "abarBase",
    categoriaTexto: "Abarrotes",
    vencimiento: "2002-06-14",
    detalle: "Esta malogrado",
}

for (const categoria in diasRetiro) {
  for (const element in productObj) {
    if (categoria === productObj[element]) {
      return console.log(diasRetiro[categoria]);
      
    }
  }
}
