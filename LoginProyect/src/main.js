
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

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(initialUsers));
}

document.querySelector("#app").innerHTML = `
  <div class="login-container">
    <img src="src/assets/img/Trifuerza.png" alt="Logo">
    <h1>Welcome back</h1>
    <p>Don't have an account? <a id="registerLink" href="register.html">Sign up</a></p>
    <form id="loginForm">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" placeholder="your.username" autocomplete="username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="••••••••" autocomplete="current-password">
      <button id="login" type="submit">Sign In →</button>
    </form>
  </div>
`;

document.getElementById("registerLink").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "register.html";
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Por favor ingresa usuario y contraseña.");
    return;
  }

  const currentUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = currentUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});
