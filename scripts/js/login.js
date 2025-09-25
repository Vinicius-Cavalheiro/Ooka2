document.getElementById("BotaoLogin").addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const button = this;
    button.innerHTML = "Carregando...";
    button.disabled = true;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/dashboard";
        } else {
            alert("Credenciais incorretas.");
        }
    })
    .catch(error => {
        console.error("Erro de autenticação:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    })
    .finally(() => {
        button.innerHTML = "Entrar";
        button.disabled = false;
    });
});
