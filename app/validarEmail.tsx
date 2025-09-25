import React, {useState} from "react";


// Componente exportado de forma nomeada
 const FormularioEmail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailValido, setEmailValido] = useState<boolean>(true);

  // Função de validação do email
  const validarEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(com|org|net|gov|edu)$/;
    const domíniosProibidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

    const dominio = email.split('@')[1];
    
    return regex.test(email) && !domíniosProibidos.includes(dominio);
  };

  // Função para lidar com as mudanças no campo de email
  const tratarMudancaEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    setEmail(valor);
    setEmailValido(validarEmail(valor));
  };

  return (
    <div>
      <label
        htmlFor="emailCorp"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        E-mail Corporativo
      </label>
      <input
        type="email"
        name="emailCorp"
        id="emailCorp"
        placeholder="nome@empresa.com"
        required
        value={email}
        onChange={tratarMudancaEmail}  /* Passando a função correta */
        className={`block w-full rounded-lg border p-2.5 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 ${emailValido ? 'border-gray-300' : 'border-red-500'}`}
      />
      {!emailValido && (
        <p className="text-red-500 text-xs mt-2">Por favor, insira um email corporativo válido (sem domínios pessoais como Gmail, Hotmail, Outlook, etc.).</p>
      )}
    </div>
  );
};
export default FormularioEmail;