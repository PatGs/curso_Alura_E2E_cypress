import { HomeContext } from 'common/context/HomeContext';
import { atualizaSaldo } from 'common/services/saldo';
import { salvaTransacao } from 'common/services/transacoes';
import { calculaNovoSaldo } from 'common/utils';
import { useContext } from 'react';

export const useHomeContext = () => {
  const { saldo, setSaldo, transacoes, setTransacoes } =
    useContext(HomeContext);

  function realizarTransacao(valores) {
    const novoSaldo = calculaNovoSaldo(valores, saldo);
    setSaldo(novoSaldo);
    atualizaSaldo(novoSaldo);
    setTransacoes([...transacoes, valores]);
    salvaTransacao(valores);
  }

  return {
    saldo,
    transacoes,
    realizarTransacao,
  };
};
