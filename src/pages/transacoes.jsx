
import { useState, useEffect } from 'react';

import {
    listarTransacoes,
    cadastrarTransacao,
    editarTransacao as atualizarTransacaoAPI,
    excluirTransacao as removerTransacaoAPI
} from '../services/transacoesService';

function Transacoes() {

    const [transacao, setTransacao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("Receita");
    const [transacoes, setTransacoes] = useState([]);
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    // Carregar as transações da API
    useEffect(() => {
        async function carregarTransacoes() {
            try {
                const dados = await listarTransacoes();
                setTransacoes(dados);
            } catch (error) {
                setErro(obterMensagemErro(
                    error,
                    'Não foi possível carregar as transações.'
                ));
            } finally {
                setCarregando(false);
            }
        }

        carregarTransacoes();
    }, []);

    function limparCampos() {
        setTransacao("");
        setValor("");
        setTipo("Receita");
    }

    function editarTransacao(item) {
        setTransacao(item.descricao || '');
        setValor(String(item.valor ?? ''));
        setTipo(item.tipo || 'Receita');
        setEditando(item.id);
        setErro('');
    }

    async function salvarTransacao() {
        if (transacao.trim() === '' || valor.trim() === '') {
            setErro('Preencha a descrição e o valor!');
            return;
        }

        const dados = {
            descricao: transacao.trim(),
            valor: Number(valor),
            tipo: tipo
        };

        try {
            setErro('');

            if (editando === null) {
                const novaTransacao = await cadastrarTransacao(dados);

                setTransacoes([...transacoes, novaTransacao]);

            } else {
                const transacaoAtualizada = await atualizarTransacaoAPI(editando, dados);

                setTransacoes(
                    transacoes.map((item) =>
                        item.id === editando ? transacaoAtualizada : item
                    )
                );

                setEditando(null);
            }

            limparCampos();

        } catch (error) {
            setErro(obterMensagemErro(
                error,
                'Não foi possível excluir a transação.'
            ));
        }
    }

    async function excluirTransacao(id) {
        try {
            setErro('');

            await removerTransacaoAPI(id);

            setTransacoes(
                transacoes.filter((item) => item.id !== id)
            );

            if (editando === id) {
                setEditando(null);
                limparCampos();
            }

        } catch (error) {
            setErro(
                error.response?.data?.mensagem ||
                'Não foi possível excluir a transação.'
            );
        }
    }

    // Função auxiliar para não confundir com o serviço importado
    async function excluirTransacaoAPI(id) {
        await excluirTransacao(id);
    }

    function obterMensagemErro(error, mensagemPadrao) {
        if (!error.response) {
            return 'Não foi possível conectar ao servidor.';
        }

        return error.response.data?.mensagem || mensagemPadrao;
    }

    return (
        <>
            <h1>Transações</h1>
            <p>Cadastre uma nova transação financeira.</p>

            <div className="formulario">
                <input
                    type="text"
                    value={transacao}
                    onChange={(e) => setTransacao(e.target.value)}
                    placeholder="Digite uma transação"
                />

                <input
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="Digite o valor"
                />

                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                </select>

                <button onClick={salvarTransacao}>
                    {editando === null ? "Adicionar" : "Salvar alterações"}
                </button>
            </div>

            {erro && (
                <p role="alert" className="mensagem_erro">
                    {erro}
                </p>
            )}

            {transacao && (
                <div className="transacao">
                    <strong>Última transação:</strong>
                    <p>{transacao}</p>
                </div>
            )}

            {carregando && <p>Carregando transações...</p>}

            {!carregando && transacoes.filter(Boolean).map((item) => (

                <div
                    key={item.id}
                    className={
                        item.tipo === "Despesa"
                            ? "lista_despesa lista_transacoes"
                            : "lista_receita lista_transacoes"
                    }
                >
                    <div>
                        <p>{item.descricao}</p>
                        <p><span>Valor: </span>R${item.valor}</p>
                        <p><span>Tipo: </span>{item.tipo}</p>
                    </div>

                    <div className="botao_editar_excluir_transacao">
                        <button
                            className="botao_excluir_transacao"
                            onClick={() => excluirTransacao(item.id)}
                        >
                            Excluir
                        </button>

                        <button
                            className="botao_editar_transacao"
                            onClick={() => editarTransacao(item)}
                        >
                            Editar
                        </button>
                    </div>
                </div>

            ))}
        </>
    );
}

export default Transacoes;