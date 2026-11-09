
// ELEMENTOS DO LOGIN
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

// ELEMENTOS DOS CAMPOS
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// ELEMENTOS DA SENHA
const togglePassword = document.getElementById("toggle-password");
const passwordStrength = document.getElementById("password-strength");

// BOTÃO PARA ESQUECER E-MAIL
const forgetEmailButton = document.getElementById("forget-email");

// RECUPERAR E-MAIL SALVO
const savedEmail = localStorage.getItem("savedEmail");

if (savedEmail) {
    emailInput.value = savedEmail;
}

// MOSTRAR MENSAGEM
function showMessage(message, type) {

    loginMessage.textContent = message;
    loginMessage.className = type;

}

// LIMPAR MENSAGEM AO DIGITAR
loginForm.addEventListener("input", function() {

    loginMessage.textContent = "";
    loginMessage.className = "";

});

// INDICADOR DE FORÇA DA SENHA
passwordInput.addEventListener("input", function() {

    const password = passwordInput.value;

    if (password.length === 0) {

        passwordStrength.textContent = "";

    } else if (password.length < 6) {

        passwordStrength.textContent = "Senha fraca";

    } else if (password.length < 10) {

        passwordStrength.textContent = "Senha média";

    } else {

        passwordStrength.textContent = "Senha forte";

    }

});

// ENVIO E VALIDAÇÃO DO FORMULÁRIO
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "" || password === "") {

        showMessage("Preencha todos os campos.", "message-error");

    } else if (password.length < 6) {

        showMessage("A senha precisa ter pelo menos 6 caracteres.", "message-error");

    } else {

        localStorage.setItem("savedEmail", email);

        showMessage("Login realizado com sucesso!", "message-success");

        setTimeout(function() {

            loginForm.reset();

            loginMessage.textContent = "";
            loginMessage.className = "";

            emailInput.value = localStorage.getItem("savedEmail") || "";

            passwordInput.type = "password";
            togglePassword.textContent = "Mostrar senha";

            passwordStrength.textContent = "";

        }, 3000);

    }

});

// MOSTRAR E OCULTAR SENHA
togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Ocultar senha";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Mostrar senha";

    }

});

// ESQUECER E-MAIL SALVO
forgetEmailButton.addEventListener("click", function() {

    localStorage.removeItem("savedEmail");

    emailInput.value = "";

    showMessage("E-mail salvo removido com sucesso!", "message-success");

});
