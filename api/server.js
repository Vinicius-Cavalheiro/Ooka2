const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer')
const app = express();
const port = process.env.PORT || 10000;
const crypto = require('crypto')

// Configuração do banco de dados
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});


app.use(express.json());
app.use(
  cors({
    origin: 'https://oka-git-3-criar-verificao-d30df5-vinicius-cavalheiros-projects.vercel.app',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Função de validação de senha
const validarSenha = (senha) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
};




////////////////////////////////////////////////Registro de usuario/////////////////////////////////////////


app.post('/api/registrar', (req, res) => {
  const { first_name, last_name, email, cellphone, senha } = req.body;

  // Criptografar
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erro ao criptografar a senha:', err);
      return res.status(500).json({ message: 'Erro ao criptografar a senha' });
    }

    // Verificar se já está cadastrado
    const queryVerificarEmail = 'SELECT * FROM users_okaa WHERE email = $1';
    const queryVerificarTelefone = 'SELECT * FROM users_okaa WHERE cellphone = $1';

    pool.query(queryVerificarEmail, [email], (err, resultsEmail) => {
      if (err) {
        console.error('Erro ao verificar e-mail:', err);
        return res.status(500).json({ message: 'Erro ao verificar e-mail' });
      }

      if (resultsEmail.rows.length > 0) {
        return res.status(400).json({ message: 'E-mail já cadastrado' });
      }

      pool.query(queryVerificarTelefone, [cellphone], (err, resultsTelefone) => {
        if (err) {
          console.error('Erro ao verificar telefone:', err);
          return res.status(500).json({ message: 'Erro ao verificar telefone' });
        }

        if (resultsTelefone.rows.length > 0) {
          return res.status(400).json({ message: 'Telefone já cadastrado' });
        }

        // Inserir o usuário no banco de dados
        const queryInserirUsuario =
          'INSERT INTO users_okaa (first_name, last_name, email, cellphone, password_hash) VALUES ($1, $2, $3, $4, $5)';

        pool.query(queryInserirUsuario, [first_name, last_name, email, cellphone, hashedPassword], (err) => {
          if (err) {
            console.error('Erro ao registrar usuário:', err);
            return res.status(500).json({ message: 'Erro ao registrar usuário' });
          }

          res.status(200).json({ message: 'Usuário registrado com sucesso!' });
        });
      });
    });
  });
});



// Rota para login///////////////////////////////////////////////////////////////////////////////


app.post('/api/login' , (req, res) => {
  const { email, senha } = req.body;
 
  

  const query = 'SELECT * FROM users_okaa WHERE email = $1';

  pool.query(query, [email], async  (err, results) => {
    if (err) {
      console.error('Erro ao verificar email:', err);
      return res.status(500).json({ message: 'Credenciais incorretas' });
    }

    if (results.rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }
   

    const usuario = results.rows[0];

    
    bcrypt.compare(senha, usuario.password_hash, async (err, result) => {
      console.log('Comparando senha...');
      if (!result) {
        return res.status(400).json({ errorMessage: 'Credenciais incorretas' });
      }console.log('Resultado da comparação:', result);
       
       try {
        await sendVerificationCode(email);
        res.status(200).json({ message: 'Código de verificação enviado para o e-mail.' });
      } catch (error) {
        console.error('Erro ao enviar o código de verificação:', error);
        res.status(500).json({ message: 'Erro ao enviar código de verificação' });
      }
    });
     
  });});
      ;
      // Função para enviar o código de verificação
const sendVerificationCode = async (email) => {
  const verificationToken = crypto.randomInt(100000, 999999).toString();
  const expirationTime = 10 * 60 * 1000; 
  const expireAt = new Date(Date.now() + expirationTime); 

  
  const query = 'INSERT INTO verification_tokens1 (email, token, expire_at) VALUES ($1, $2, $3)';
  pool.query(query, [email, verificationToken, expireAt], (err, results) => {
    if (err) {
      console.error('Erro ao armazenar o token:', err);
      throw new Error('Erro ao armazenar o token de verificação');
    }
    console.log('Token armazenado com sucesso:', results);
  });

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Configuração do e-mail mandado ao cliente
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Código de Verificação - Oka Design Seguro',
    text: `
      Olá,

      Recebemos uma solicitação para verificar seu login em nossa plataforma.
      Por favor, use o código abaixo para confirmar seu acesso:

      ${verificationToken}

      Este código é válido por 10 minutos. Caso não tenha solicitado este código, desconsidere este e-mail.

      Se precisar de ajuda, entre em contato com nossa equipe de suporte.

      Atenciosamente,
      Equipe Oka Design Seguro`,
  };

  
  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar código de verificação');
  }
};


// Rota para verificar o código de verificação///////////////////////////////


app.post('/api/verify-code', async (req, res) => {
  const { email, token } = req.body;

  // Consultar o banco de dados para obter o código armazenado e a data de expiração
  const query = 'SELECT * FROM verification_tokens1 WHERE email = $1 AND token = $2';
  
  try {
    const result = await pool.query(query, [email, token]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Código de verificação inválido ou expirado' });
    }

    const verificationData = result.rows[0];

    // Verificar se o token expirou
    const now = new Date();
    if (now > new Date(verificationData.expire_at)) {
      return res.status(400).json({ message: 'O código de verificação expirou' });
    }

    // Se o código for válido e não expirou
    return res.status(200).json({ message: 'Código de verificação válido', success: true });

  } catch (error) {
    console.error('Erro ao verificar o código de verificação:', error);
    return res.status(500).json({ message: 'Erro ao verificar o código' });
  }
});

      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)});



  
   