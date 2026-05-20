const views = {
  login:     document.getElementById('view-login'),
  register:  document.getElementById('view-register'),
  dashboard: document.getElementById('view-dashboard'),
};

function navigate(viewName) {
  Object.values(views).forEach(v => v.classList.remove('active'));
  views[viewName].classList.add('active');
  window.scrollTo(0, 0);
}

const initialUsers = [
  {
    username: "neyder.ramirez",
    password: "123Admin.**",
    fullname: "Neyder Ramirez",
    age: 22,
    email: "neyderramirez@gmail.com",
    description: "un valecita de riwi",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTOnh2HTt1VNUg6Bc-0PXGioqjs0yHiDsxw&s"
  },
  {
    username: "juan.bustamante",
    password: "HJ_503",
    fullname: "Juan Bustamante",
    age: 24,
    email: "juanbustamante@gmail.com",
    description: "un pá de riwi",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMfANTCUetDzc96ibKIOHc0BRQ5Ax9_bCKFA&s"
  },
  {
    username: "kevin.mendoza",
    password: "OnlyEnglish.**",
    fullname: "Kevin Mendoza",
    age: 22,
    email: "kevinmendoza@gmail.com",
    description: "un bilingue de riwi",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmukQvYkn42kSsuHU91OyhVDie4lmRUNFzcg&s"
  }
];
//Si no existe una lista de usuarios utiliza una lista inicial
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(initialUsers));
}

document.getElementById("registerLink").addEventListener("click", (e) => {
  e.preventDefault();
  navigate('register');
});
// Obtiene el valor del username y la contraseña
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Por favor ingresa usuario y contraseña.");
    return;
  }
//Busca en la lista de usuario si coincide el username y contraseña ingresados
  const currentUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = currentUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    loadDashboard();
    navigate('dashboard');
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

document.getElementById("cancel").addEventListener("click", () => {
  navigate('login');
});

document.getElementById("birthdate").max = new Date().toISOString().split("T")[0];

const calculateAge = (birthdate) => {
  if (!birthdate) return "N/A";
  const birthDateObj = new Date(birthdate);
  if (isNaN(birthDateObj.getTime())) return "N/A";
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const newusername  = document.getElementById("newusername").value;
  const newpassword  = document.getElementById("newpassword").value;
  const name         = document.getElementById("fullname").value;
  const birthdate    = document.getElementById("birthdate").value;
  const email        = document.getElementById("email").value;
  const description  = document.getElementById("description").value;
  const url          = document.getElementById("url").value;

  if (!newusername || !newpassword || !name || !birthdate || !email || !description || !url) {
    alert("Hey completa la informacion");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(user => user.username === newusername)) {
    alert("El usuario ya existe, por favor elige otro nombre de usuario.");
    return;
  }

  users.push({ username: newusername, password: newpassword, fullname: name, age: calculateAge(birthdate), email, description, url });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
  document.getElementById("registerForm").reset();
  navigate('login');
});

function loadDashboard() {
  const userString = localStorage.getItem("user");
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      console.error("Error al parsear los datos del usuario desde localStorage:", e);
      localStorage.removeItem("user");
    }
  }

  if (!user || !user.fullname || !user.username || !user.password || !user.age || !user.email || !user.description || !user.url) {
    navigate('login');
    return;
  }

  document.getElementById("dashboard-title").textContent = `Bienvenido/a, ${user.fullname} al Dashboard`;
  document.getElementById("dashboard-container").innerHTML = `
    <div class="card">
      <article>
        <h3 class="card-title">${user.fullname}</h3>
      </article>
      <figure class="card-figure">
        <img src="${user.url}" alt="${user.fullname}" class="card-image" />
        <span class="card-age">Edad: ${user.age}</span>
      </figure>
      <article class="card-description">
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Description:</b><br>${user.description}</p>
      </article>
    </div>`;
}

document.getElementById("logout").addEventListener("click", () => {
  const confirmDelete = confirm("¿Estás seguro que quieres cerrar sesión ?");
  if (!confirmDelete) return;
  localStorage.removeItem("user");
  navigate('login');
});

(function init() {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      if (user && user.fullname && user.username && user.password && user.age && user.email && user.description && user.url) {
        loadDashboard();
        navigate('dashboard');
        return;
      }
    } catch (e) {
      localStorage.removeItem("user");
    }
  }
  navigate('login');
})();