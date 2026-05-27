colores = [ "white", "black", "blue", "yellow", "red", "green", "pink", "orange", "purple", "brown", "gray", "aqua"]

const cambiarColor = document.getElementById("changeColor")

cambiarColor.addEventListener("click", () => {
    indice = Math.floor(Math.random() * colores.length)
    color = colores[indice]
    document.body.style.backgroundColor = color
})
