const input = document.getElementById('nota')
const addBtn = document.getElementById("add")
const list = document.getElementById("list")

addBtn.addEventListener('click', () => {
    const nota = input.value
    if (nota) {
        const li = document.createElement('li')
        li.textContent = nota
        list.appendChild(li)
        input.value = ''
    }
})