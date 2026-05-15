let a = 5;
let b = 10;


function suma (a,b){
    return a + b;
}
console.log(suma(a,b));

a= 6
b= 12

const resta = (a,b) => a - b;
console.log(resta(a,b));


saludar();

function saludar() {
  console.log("Hola");
}

console.log(x);
var x = 10;

alert("El valor de a es: " + a);
alert("El valor de b es: " + b);
let nombre = prompt("¿Cuál es tu nombre?");

a= Number(prompt("Cuanto vale a"));
    b= Number(prompt("Cuanto vale b"));

alert(nombre + " La suma de a y b es: " + suma(a,b));
alert(nombre + " La resta de a y b es: " + resta(a,b));

function contador() {
    let count = 0;
    return function () {
      count++;
      console.log(count);
      return count;
    };
}

const counter = contador();
counter();
counter();
counter();  

function respecto(edad) {
  console.log("Hola, tienes " + edad + " años.");
}

function ejecutarSaludo(callback){
    const edad = prompt("¿Cuál es tu edad?");
  callback(edad);
} 

ejecutarSaludo(respecto);

console.log(suma(a,b), resta(a,b));

const notas = [ 3, 4, 5, 2, 1 ];

function promedio(notas){
  let suma = 0;
  for(let i = 0; i < notas.length; i++){
    suma += notas[i];
  }
  return suma / notas.length;
  }

console.log("El promedio de las notas es: " + promedio(notas));

