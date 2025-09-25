const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise')

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'nEVERLETTHISG0',
  database: 'okaa',
};

// Função para registrar 
const registrarUsuario = async (nome: string, sobrenome: string, emailCorp: string, telefone: string, senha: string) => {
  try {
    // Criptografando
    const hashedPassword = await bcrypt.hash(senha, 10);

  
    const connection = await mysql.createConnection(connectionConfig);

    
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email_corporativo = ?', [emailCorp]);
    if ((rows as any[]).length > 0) {
      console.log('Este e-mail corporativo já está cadastrado.');
      return;
    }

    
    await connection.execute(
      'INSERT INTO usuarios (nome, sobrenome, email, email_corporativo, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, sobrenome, emailCorp, emailCorp, telefone, hashedPassword]
    );

    console.log('Usuário registrado com sucesso!');
    await connection.end();
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
  }
};


registrarUsuario('João', 'Silva', 'joao.silva@empresa.com', '(11) 98765-4321', 'senhaSegura123');
