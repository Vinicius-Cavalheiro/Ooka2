import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import { Button } from "flowbite-react";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';





interface RegistroProps {
  onSwitchToPage: () => void; // função para alternar para a tela de login
}

export default function Registro({ onSwitchToPage }: RegistroProps) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | undefined>('');
  const [first_name, setNome] = useState<string>('');
  const [last_name, setSobrenome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailValido, setEmailValido] = useState<boolean>(true);
  const [senha, setSenha] = useState<string>('');
  const [repetirSenha, setRepetirSenha] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [senhaValida, setSenhaValida] = useState<boolean>(true);


  const handlePhoneChange = (value: string | undefined): void => {
    setPhone(value || '');
    setIsValid(isValidPhoneNumber(value || ''));
  };

  // Valida o email
  const validarEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(com|org|net|gov|edu|studio)$/;
    const dominiosProibidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const dominio = email.split('@')[1];
    return regex.test(email) && !dominiosProibidos.includes(dominio);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    setEmail(valor);
    setEmailValido(validarEmail(valor));
  };
 // Função de validação de senha
const validarSenha = (senha: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
};

// Função de onChange para a senha
const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const senha = event.target.value;
  setSenha(senha); 
  setSenhaValida(validarSenha(senha)); 
};


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const api_Url = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailValido)  {
      alert('Por favor, verifique o email.');
      return;
    }
    if ( !isValid ) {
      alert('Por favor, verifique o telefone.');
      return;
    }
    if (senha !== repetirSenha) {
      alert('Por favor, verifique a senha.');
      return;
    }


    try {
      const response = await axios.post(`${api_Url}/api/registrar`, {
        first_name,
        last_name,
        email,
        cellphone: phone,
        senha
      });

      if (response.status === 200 || response.status === 201) {
        alert('Usuário registrado com sucesso!');
        onSwitchToPage(); // Navegar para a tela de login
      }
    } catch (error: any) {
      console.error('Erro:', error.response?.data || error.message);
      alert('Erro ao registrar usuário: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex grow items-center justify-center bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center px-6">
          <a
            href="#"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="mr-2"
              src="https://oka.arandu.studio/wp-content/uploads/2024/11/logo-light.svg"
              alt="logo"
              width={150}
              height={80}
            />
          </a>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Crie sua conta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Seu nome"
                    required
                    value={first_name}
                    onChange={(e) => setNome(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Sobrenome"
                    required
                    value={last_name}
                    onChange={(e) => setSobrenome(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <label
                      htmlFor="cell"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Celular
                    </label>
                    <PhoneInput
                      international
                      defaultCountry="BR"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter phone"
                      initialValueFormat="national"
                      limitMaxLength
                    />
                    {!isValid && phone && (
                      <p className="text-red-500 text-xs mt-2">Número inválido</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="emailCorp"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-mail Corporativo
                  </label>
                  <input
                    type="text"
                    name="emailCorp"
                    id="emailCorp"
                    placeholder="nome@empresa.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${emailValido ? 'border-gray-300' : 'border-red-500'}`}
                    required
                  />
                  {!emailValido && (
                    <p className="text-red-500 text-xs mt-2">
                      Por favor, insira um email corporativo válido.
                    </p>
                  )}
                </div>
                <div className="relative">
                    <label
                      htmlFor="senha"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Senha
                    </label>
                    
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="senha"
                        id="senha"
                        placeholder="••••••••"
                        required
                        value={senha}
                        onChange={handlePasswordChange} 
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                      
                      {/* Botão olhinho */}
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={`absolute inset-y top-3 right-3 flex items-center justify-center text-gray-600 dark:text-gray-400`}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/*mensagem de erro */}
                    {!senhaValida && (
                      <p className="text-red-500 text-xs mt-2">
                        A senha deve conter:
                        <ul className="list-disc pl-5">
                          <li>Pelo menos uma letra maiúscula</li>
                          <li>Pelo menos um número</li>
                          <li>Pelo menos um caractere especial</li>
                        </ul>
                      </p>
                    )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="repetirSenha"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Repetir a senha
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="repetirSenha"
                    id="repetirSenha"
                    placeholder="••••••••"
                    required
                    value={repetirSenha}
                    onChange={(e) => setRepetirSenha(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Cadastrar
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Já tem uma conta?{" "}
                  <a
                    href="#"
                    onClick={onSwitchToPage}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Voltar para login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
