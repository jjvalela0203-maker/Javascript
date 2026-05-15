document.getElementById("logout").addEventListener("click", () => {
    const confirmDelete = confirm("¿Estás seguro que quieres cerrar sesión ?");
    if (!confirmDelete) return;
    else{
    localStorage.removeItem("user");
    window.location.href = "index.html";
}});

// Obtiene la cadena JSON del usuario desde localStorage
const userString = localStorage.getItem("user");
let user = null;

if (userString) {
    try {
        // Parsea la cadena JSON de vuelta a un objeto JavaScript
        user = JSON.parse(userString);
    } catch (e) {
        console.error("Error al parsear los datos del usuario desde localStorage:", e);
        // Si hay un error al parsear, significa que los datos están corruptos o no son JSON válido
        localStorage.removeItem("user"); // Limpia los datos corruptos
    }
}

// Verifica si el objeto user existe y tiene la propiedad fullname
if (!user || !user.fullname || !user.username || !user.password || !user.age || !user.email || !user.description || !user.url) {
    window.location.href = "index.html";
}
else{
    document.querySelector("h1").textContent = `Bienvenido/a, ${user.fullname} al Dashboard`;
    document.querySelector("#dashboard-container").innerHTML = `
    <div class="card">
        <article>
            <h3 class="card-title">${user.fullname}</h3>
        </article>

    <figure class="card-figure">
        <img
        src="${user.url}"
        alt="${user.fullname}"
        class="card-image"
        />

    <span class="card-age">
        Edad: ${user.age}
    </span>
    </figure>

    <article class="card-description">
        <p>
        <b>Email:</b> ${user.email}
        </p>
        <p>  
        <b>Description:</b> <br>
        ${user.description}
        </p>
    </article>
    </div>`
    }
