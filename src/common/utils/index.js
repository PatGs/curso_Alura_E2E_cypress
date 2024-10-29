export const calculaNovoSaldo = (valores, saldo) => {
  if (valores.tipoTransacao === 'Depósito') {
    return saldo + parseInt(valores.valor);
  } else {
    return saldo - parseInt(valores.valor);
  }
};
