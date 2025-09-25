
  document.getElementById('/app/register.tsx').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Capturando os dados do formulário
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const emailCorp = document.getElementById('emailCorp').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
  
    // Enviando os dados para o backend
    try {
      const response = await fetch('/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          emailCorp,
          telefone,
          senha,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Usuário registrado com sucesso!');
      } else {
        alert('Erro ao registrar usuário: ' + data.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar ao servidor.');
    }
  });
  