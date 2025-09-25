import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';




interface VerifyCodeProps {
  onSwitchToPage: (page: string) => void; // Função para trocar a página
  email: string; 
}

export default function VerifyCode({ onSwitchToPage, email }: VerifyCodeProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/verify-code`, {
        email, 
        token: verificationCode, 
      });

      if (response.data.success) {
        setSuccessMessage('Código verificado com sucesso! Você será redirecionado.');
        setErrorMessage('');

        // Redirecionar ou alterar o estado para a próxima página
        setTimeout(() => {
          onSwitchToPage('HomeOka'); 
        }, 2000);
      } else {
        setErrorMessage('Código inválido ou expirado.');
        setSuccessMessage('');
      }
    } catch (error: any) {
      console.error('Erro ao verificar o código:', error);
      setErrorMessage('Ocorreu um erro ao verificar o código. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
       <Image
          className="mr-2"
           src="https://oka.arandu.studio/wp-content/uploads/2024/11/logo-light.svg"
           alt="logo"
            width={150}
             height={80}
                    />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-center text-gray-900 dark:text-white">
          Verificação de Código
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Digite o código enviado para o seu e-mail: <strong>{email}</strong>
        </p>
        {errorMessage && (
          <div className="p-2 mb-4 text-sm text-red-600 bg-red-100 rounded dark:bg-red-800 dark:text-red-300">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-2 mb-4 text-sm text-green-600 bg-green-100 rounded dark:bg-green-800 dark:text-green-300">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label
              htmlFor="verificationCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Código de Verificação
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Digite o código de 6 dígitos"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Verificar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Não recebeu o código?{' '}
          <button
            onClick={() => onSwitchToPage('login')}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Reenviar código
          </button>
        </p>
      </div>
    </div>
  );
}
