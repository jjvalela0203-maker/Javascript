document.querySelector(".register").innerHTML =  `
<div class="register-container">
      <form id="registerForm">
        <label for="newusername">Username</label>
        <input type="text" id="newusername" name="newusername" placeholder="your.username">

        <label for="newpassword">Password</label>
        <input type="password" id="newpassword" name="newpassword" placeholder="••••••••">

        <label for="fullname">Full Name</label>
        <input type="text" id="fullname" name="name" placeholder="John Doe">

        <label for="birthdate">Birthdate</label>
        <input type="date" id="birthdate" name="birthdate">

        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com">

        <label for="description">About you</label>
        <textarea id="description" name="description" placeholder="Tell us a bit about yourself..."></textarea>

        <label for="url">Photo URL</label>
        <input type="url" id="url" name="url" placeholder="https://...">

        <button type="submit" id="register">Create Account</button>
      </form>
      <button id="cancel">← Back to Login</button>
    </div>
`;


document.getElementById("cancel").addEventListener("click", () => {
    window.location.href = "index.html";
});


addEventListener("DOMContentLoaded", () => {
  birthdate.max = new Date().toISOString().split("T")[0];
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const newusername = document.getElementById("newusername").value;
    const newpassword = document.getElementById("newpassword").value;
    const name = document.getElementById("fullname").value
    const birthdate= document.getElementById("birthdate").value
    const email = document.getElementById("email").value
    const description = document.getElementById("description").value
    const url = document.getElementById("url").value

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

// si no se encuentra un campo relleno se le da una alerta al usuario//
    if (!newusername || !newpassword || !name || !birthdate || !email || !description || !url) {
        alert("Hey completa la informacion");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.username === newusername)) {
        alert("El usuario ya existe, por favor elige otro nombre de usuario.");
        return
    }
    else{

    users.push({ username: newusername, password: newpassword, fullname: name, age: calculateAge(birthdate), email:email, description:description , url:url});
    localStorage.setItem("users", JSON.stringify(users));   
    alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
    window.location.href = "index.html";
}

});

