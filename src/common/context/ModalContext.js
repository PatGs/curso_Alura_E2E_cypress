import { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState({});

  return (
    <ModalContext.Provider
      value={{
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        erro,
        setErro,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
