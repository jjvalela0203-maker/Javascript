
// ============================================================
// TASK 1 — Creación del objeto de productos
// ============================================================

const productos = {
  producto1: {
    id: 1,
    nombre: "Laptop Pro",
    precio: 2500000,
    categoria: "Tecnología",
  },
  producto2: {
    id: 2,
    nombre: "Audífonos Bluetooth",
    precio: 350000,
    categoria: "Accesorios",
  },
  producto3: {
    id: 3,
    nombre: "Teclado Mecánico",
    precio: 480000,
    categoria: "Accesorios",
  },
  producto4: {
    id: 4,
    nombre: "Monitor 4K",
    precio: 1800000,
    categoria: "Tecnología",
  },
  producto5: {
    id: 5,
    nombre: "Mouse Inalámbrico",
    precio: 120000,
    categoria: "Accesorios",
  },
};

console.log("==============================");
console.log("TASK 1 — Objeto de Productos");
console.log("==============================");
console.log("Objeto completo de productos:");
console.log(productos);

// Object.keys() — lista las claves del objeto
console.log("\nClaves del objeto (Object.keys()):");
console.log(Object.keys(productos));

// Object.values() — lista los valores del objeto
console.log("\nValores del objeto (Object.values()):");
console.log(Object.values(productos));

// Object.entries() — lista pares [clave, valor]
console.log("\nEntradas del objeto (Object.entries()):");
Object.entries(productos).forEach(([clave, valor]) => {
  console.log(`  ${clave}:`, valor);
});


// ============================================================
// TASK 2 — Uso de Set en JavaScript
// ============================================================

console.log("\n==============================");
console.log("TASK 2 — Set en JavaScript");
console.log("==============================");

// Creación de un Set con valores repetidos — los duplicados se eliminan automáticamente
const numerosConDuplicados = [10, 20, 30, 20, 10, 40, 50, 30, 60];
const conjuntoNumeros = new Set(numerosConDuplicados);

console.log("Array original (con duplicados):", numerosConDuplicados);
console.log("Set resultante (sin duplicados):", conjuntoNumeros);

// .add() — agrega un nuevo número al Set
conjuntoNumeros.add(70);
console.log("\nDespués de agregar 70 con .add():", conjuntoNumeros);

// .has() — verifica si un número existe en el Set
const numeroAVerificar = 30;
console.log(`\n¿El Set contiene ${numeroAVerificar}? → ${conjuntoNumeros.has(numeroAVerificar)}`);
console.log(`¿El Set contiene 99? → ${conjuntoNumeros.has(99)}`);

// .delete() — elimina un número del Set
conjuntoNumeros.delete(20);
console.log("\nDespués de eliminar 20 con .delete():", conjuntoNumeros);

// for...of — recorre cada valor del Set
console.log("\nRecorriendo el Set con for...of:");
for (const numero of conjuntoNumeros) {
  console.log(`  Valor: ${numero}`);
}


// ============================================================
// TASK 3 — Creación de un Map
// ============================================================

console.log("\n==============================");
console.log("TASK 3 — Map de Productos");
console.log("==============================");

// El Map relaciona: categoría del producto (clave) → nombre del producto (valor)
// Se usa un Map de arrays para manejar varias categorías con múltiples productos
const mapaProductos = new Map();

// Se recorre el objeto para poblar el Map agrupando por categoría
Object.values(productos).forEach((producto) => {
  const { categoria, nombre } = producto;

  // Si la categoría ya existe en el Map, se agrega el nombre al array existente
  if (mapaProductos.has(categoria)) {
    mapaProductos.get(categoria).push(nombre);
  } else {
    // Si no existe la categoría, se crea una nueva entrada con un array
    mapaProductos.set(categoria, [nombre]);
  }
});

console.log("Map de categorías → productos:");
console.log(mapaProductos);


// ============================================================
// TASK 4 — Iteración sobre las estructuras de datos
// ============================================================

console.log("\n==============================");
console.log("TASK 4 — Iteraciones");
console.log("==============================");

// --- for...in → recorre las propiedades (claves) de un objeto ---
console.log("for...in sobre el objeto productos:");
for (const clave in productos) {
  const p = productos[clave];
  console.log(`  [${clave}] → ID: ${p.id} | Nombre: ${p.nombre} | Precio: $${p.precio.toLocaleString()}`);
}

// --- for...of → recorre los valores del Set ---
console.log("\nfor...of sobre el Set de números:");
for (const valor of conjuntoNumeros) {
  console.log(`  → ${valor}`);
}

// --- forEach() → recorre el Map mostrando clave y valor de forma descriptiva ---
console.log("\nforEach() sobre el Map de productos:");
mapaProductos.forEach((nombres, categoria) => {
  console.log(`  Categoría: "${categoria}" → Productos: ${nombres.join(", ")}`);
});


// ============================================================
// TASK 5 — Validación y pruebas
// ============================================================

console.log("\n==============================");
console.log("TASK 5 — Validaciones y Pruebas");
console.log("==============================");

/**
 * Valida que un producto tenga id, nombre y precio correctos.
 * @param {object} producto - El producto a validar.
 * @returns {{ esValido: boolean, errores: string[] }}
 */
function validarProducto(producto) {
  const errores = [];

  // Validar id: debe existir y ser un número positivo
  if (producto.id === undefined || producto.id === null) {
    errores.push("El 'id' es obligatorio.");
  } else if (typeof producto.id !== "number" || producto.id <= 0) {
    errores.push("El 'id' debe ser un número positivo.");
  }

  // Validar nombre: debe existir y ser un string no vacío
  if (!producto.nombre) {
    errores.push("El 'nombre' es obligatorio.");
  } else if (typeof producto.nombre !== "string" || producto.nombre.trim() === "") {
    errores.push("El 'nombre' debe ser un texto no vacío.");
  }

  // Validar precio: debe existir y ser un número mayor a 0
  if (producto.precio === undefined || producto.precio === null) {
    errores.push("El 'precio' es obligatorio.");
  } else if (typeof producto.precio !== "number" || producto.precio <= 0) {
    errores.push("El 'precio' debe ser un número mayor a 0.");
  }

  return {
    esValido: errores.length === 0,
    errores,
  };
}

// --- Prueba 1: validar todos los productos del objeto ---
console.log("Prueba 1 — Validando productos del objeto:");
Object.entries(productos).forEach(([clave, producto]) => {
  const resultado = validarProducto(producto);
  if (resultado.esValido) {
    console.log(`  ✅ ${clave} ("${producto.nombre}") — válido`);
  } else {
    console.log(`  ❌ ${clave} — errores: ${resultado.errores.join(" | ")}`);
  }
});

// --- Prueba 2: producto con datos inválidos ---
console.log("\nPrueba 2 — Productos con datos inválidos:");

const productosInvalidos = [
  { id: null, nombre: "Sin ID", precio: 100 },
  { id: 6, nombre: "", precio: 200 },
  { id: 7, nombre: "Sin precio", precio: -50 },
  { id: "abc", nombre: "ID incorrecto", precio: 500 },
  {},
];

productosInvalidos.forEach((p, i) => {
  const resultado = validarProducto(p);
  console.log(`  Producto inválido #${i + 1}:`);
  resultado.errores.forEach((err) => console.log(`    ⚠️  ${err}`));
});

// --- Prueba 3: resumen final de todas las estructuras ---
console.log("\nPrueba 3 — Resumen final:");

console.log("\n📦 Lista completa de productos (Objeto):");
Object.values(productos).forEach((p) => {
  console.log(`  [ID ${p.id}] ${p.nombre} — $${p.precio.toLocaleString()} (${p.categoria})`);
});

console.log("\n🔢 Números únicos (Set):");
console.log("  ", [...conjuntoNumeros].join(", "));

console.log("\n🗂️  Categorías y nombres de productos (Map):");
mapaProductos.forEach((nombres, categoria) => {
  console.log(`  ${categoria}: ${nombres.join(", ")}`);
});

console.log("\n✅ Fin de gestion_datos.js");
