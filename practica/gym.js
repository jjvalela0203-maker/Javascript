let edad = parseInt(prompt("¿Cuál es tu edad?"));

function accesoGym(edad){
    if (edad < 13){
        alert("No puedes entrar al gimnasio");
    }
    else if (edad >= 13 && edad <= 17){
        alert("Clase juvenil");
    }
    else if (edad >= 18 && edad < 60){
        alert("clase general")
    }
    else if (edad >= 60){
        alert("clase senior")
    }
    else {
        alert("Edad inválida")
    }
}

accesoGym(edad);