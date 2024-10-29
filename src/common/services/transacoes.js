import api from './api';

export async function buscaTransacoes() {
  const userId = localStorage.getItem('userId');
  try {
    const resp = await api.get(`/users/${userId}/transations`);
    return resp.data;
  } catch (err) {
    return [];
  }
}

export async function salvaTransacao(novaTransacao) {
  const userId = localStorage.getItem('userId');
  try {
    const resp = await api.post(`/users/${userId}/transations`, novaTransacao);
    return resp.status;
  } catch (err) {
    return 'Erro na requisição';
  }
}
