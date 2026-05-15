let vainilla = 0
let chocolate = 0
let fresa = 0

let pedidos = prompt("¿Cuántos helados quieres pedir?")

for (let i = 0; i < pedidos; i++) {
    let sabor = prompt("¿Qué sabor quieres? (vainilla, chocolate o fresa)")
    if (sabor === "vainilla"){
        vainilla++
    } else if (sabor === "chocolate"){
        chocolate++
    } else if (sabor === "fresa"){
        fresa++
    } else {
        alert("Sabor inválido")
}
}

alert(`sabores pedidos: ${vainilla} de vainilla, ${chocolate} de chocolate y ${fresa} de fresa`)