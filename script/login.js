console.log("Login page script loaded");

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        // simple demo check – replace with real auth as needed
        if (username === "admin" && password === "admin123") {
            // redirect on successful login
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password");
        }
    });
} else {
    console.warn("loginForm element not found");
}