const notas = [ 3, 4, 5, 2, 1 ];

function evenOrOdd(notas){
    let even = 0;
    let odd = 0;
    for (let i = 0; i < notas.length; i++) {
        if (notas[i]% 2 === 0){
            even++;
        } else {
            odd++;
        }
        }
    return "Cantidad de números pares: " + even + ", Cantidad de números impares: " + odd;
}


console.log(evenOrOdd(notas));

