import { createContext, useState } from 'react';

export const CabecalhoContext = createContext();

export const CabecalhoProvider = ({ children }) => {
  const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
  const [modalLoginAberta, setModalLoginAberta] = useState(false);
  const [burguerOpen, setBurguerOpen] = useState(false);

  return (
    <CabecalhoContext.Provider
      value={{
        modalCadastroAberta,
        modalLoginAberta,
        burguerOpen,
        setModalCadastroAberta,
        setModalLoginAberta,
        setBurguerOpen,
      }}
    >
      {children}
    </CabecalhoContext.Provider>
  );
};
