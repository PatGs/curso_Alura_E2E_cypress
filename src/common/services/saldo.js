import api from './api';

export async function buscaSaldo() {
  const userId = localStorage.getItem('userId');
  try {
    const resp = await api.get(`/users/${userId}/saldo`);
    return resp.data;
  } catch (err) {
    return 1000;
  }
}

export async function atualizaSaldo(novoSaldo) {
  const userId = localStorage.getItem('userId');
  api
    .put(`/users/${userId}/saldo`, { saldo: novoSaldo })
    .then((resp) => console.log(resp.status))
    .catch((err) => console.log(err));
}
