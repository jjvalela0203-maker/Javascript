const addButton = document.getElementById("addbutton");
const newNote = document.getElementById("newnote");
const noteList = document.getElementById("notelist");

let notas = JSON.parse(localStorage.getItem("notas")) || [];

function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

function crearNotaEnDOM(valorNota) {
    const li = document.createElement("li");
    li.textContent = valorNota;

    const button = document.createElement("button");
    button.textContent = "Eliminar";

    button.addEventListener("click", () => {
        noteList.removeChild(li);

        const indice = notas.indexOf(valorNota);
        if (indice !== -1) {
            notas.splice(indice, 1);
        }

        guardarNotas();
        console.log("Nota eliminada");
    });

    li.appendChild(button);
    noteList.appendChild(li);
}

document.addEventListener("DOMContentLoaded", () => {
    noteList.innerHTML = "";

    for (let i = 0; i < notas.length; i++) {
        crearNotaEnDOM(notas[i]);
    }

    console.log(`Se recuperaron ${notas.length} notas`);
});

addButton.addEventListener("click", () => {
    if (!newNote.value.trim()) {
        alert("No hay nota para agregar");
        return;
    }

    const valorNota = newNote.value.trim();

    notas.push(valorNota);
    guardarNotas();
    crearNotaEnDOM(valorNota);

    newNote.value = "";
    newNote.focus();

    console.log("Nota agregada");
});