// Variables
const nombre= prompt("¿Cuál es tu nombre?");
let edadinput= prompt("¿Cuál es tu edad?");

// Convertimos la entrada a número
const edad=Number(edadinput);

//Validaciones
if (isNaN(edad) || edadinput==="") {
    console.error("Por favor, ingresa un número válido para la edad.");
    alert("La edad ingresada no es un número válido.");
} else{

if (edad >= 18) {
    alert(`Hola ${nombre}, eres mayor de edad`);
    console.log(`Hola ${nombre}, eres mayor de edad`);
} else {
    alert(`Hola ${nombre}, eres menor de edad`);
    console.log(`Hola ${nombre}, eres menor de edad`);
}
}