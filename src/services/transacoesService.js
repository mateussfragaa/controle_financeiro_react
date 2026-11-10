import api from './api';

export async function listarTransacoes() {
    const resposta = await api.get('/transacoes');
    return resposta.data;
}

export async function cadastrarTransacao(transacao) {
    const resposta = await api.post('/transacoes', transacao);
    return resposta.data;
}

export async function editarTransacao(id, transacao) {
    const resposta = await api.put(`/transacoes/${id}`, transacao);
    return resposta.data;
}

export async function excluirTransacao(id) {
    const resposta = await api.delete(`/transacoes/${id}`);
    return resposta.data;
}