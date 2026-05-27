const sumar = document.getElementById("more")
const resta = document.getElementById("less")
const counter = document.getElementById("counter")

let count = 0

resta.addEventListener( "click",()=>{
    if(count === 0){alert("No se admiten numeros negativos"); return}
    count--
    counter.innerHTML = count
})

sumar.addEventListener( "click",()=>{
    count++
    counter.innerHTML = count
})