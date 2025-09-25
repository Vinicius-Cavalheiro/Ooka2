'use client'
import React,  {useState, useEffect, use}  from 'react';
import axios from 'axios';
import Register from './register';
import VerifyCode from './verifyCode';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';





export default function Home() {
  
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const api_Url = process.env.NEXT_PUBLIC_API_URL;
 

  // Função de login
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${api_Url}/api/login`, {
        email,
        senha,
      });
      console.log('Resposta do servidor:', response.data);
      if (response.status === 200 || response.status === 201) {
        
        setIsVerifying(true); // navega para tela de verificação
          
        } else{
          console.log('emailsenhaerrado')
         setErrorMessage('Email ou senha incorretos.')
        }
     
        
        
      
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
     
    }
  };

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Redirecionamento para o Registro
  if (isRegistering) {
    return <Register onSwitchToPage={() => setIsRegistering(false)} />;
  }

  // Redirecionamento para a Verificação de Código
  if (isVerifying) {
    return <VerifyCode email= {email} onSwitchToPage={() => setIsVerifying(false)}/>
  }
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <section className="flex grow items-center justify-center bg-gray-50 py-8 dark:bg-gray-900">
          <div className="container mx-auto flex flex-col items-center justify-center px-6">
            <a
              href="#"
              className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <Image
                className="mr-2"
                src="https://oka.arandu.studio/wp-content/uploads/2024/11/logo-light.svg"
                alt="logo"
                width={150}
                height={80}
              />
            </a>
            {errorMessage && (
                  <div className="p-2 mb-4 text-sm text-red-600 bg-red-100 rounded dark:bg-red-800 dark:text-red-300">
                    {errorMessage}
                  </div>
                )}
            <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
              <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                  Acesse sua conta
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Seu email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="nome@empresa.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Senha
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 top-6 right-3 flex items-center justify-center text-gray-600 dark:text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          className="focus:ring-3 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Lembrar senha
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>

                  <button
                  
                    type="submit"
                    id="BotaoLogin"
                    className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Entrar
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Ainda não tem conta?{' '}
                    <a
                      href="#"
                      onClick={() => setIsRegistering(true)}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Cadastre-se aqui
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
