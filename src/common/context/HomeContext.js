import useListaTransacoes from 'common/hooks/useListaTransacoes';
import useSaldo from 'common/hooks/useSaldo';
import { createContext } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [saldo, setSaldo] = useSaldo();
  const [transacoes, setTransacoes] = useListaTransacoes();

  return (
    <HomeContext.Provider
      value={{ saldo, setSaldo, transacoes, setTransacoes }}
    >
      {children}
    </HomeContext.Provider>
  );
};
