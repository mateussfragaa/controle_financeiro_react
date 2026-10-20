import { useState } from 'react'
import { useLocalStorage } from "../useLocalStorage.js";

function Transacoes() {

    const [transacao, setTransacao] = useState("")
    const [valor, setValor] = useState("")
    const [tipo, setTipo] = useState("Receita")
    const [transacoes, setTransacoes] = useLocalStorage("transacoes", [])
    const [editando, setEditando] = useState(null)

    function excluirTransacao(index) {
        const novaLista = transacoes.filter((item, i) => i !== index);
        setTransacoes(novaLista);

        if (editando === index) {
            setEditando(null);
            limparCampos();
        } else if (editando !== null && editando > index) {
            setEditando(editando - 1);
        }
    }

    function editarTransacao(index) {
        setTransacao(transacoes[index].transacao);
        setValor(transacoes[index].valor);
        setTipo(transacoes[index].tipo);
        setEditando(index);
    }

    function salvarTransacao() {
        if (transacao.trim() === "" || valor.trim() === "") {
            alert("Preencha a descrição e o valor!");
            return;
        }

        if (editando === null) {
            setTransacoes([
                ...transacoes,
                {
                    transacao: transacao,
                    valor: valor,
                    tipo: tipo
                }
            ]);
        } else {
            const novaLista = [...transacoes];

            novaLista[editando] = {
                transacao: transacao,
                valor: valor,
                tipo: tipo
            };

            setTransacoes(novaLista);
            setEditando(null);
        }
        limparCampos();
    }

    function limparCampos(){
        setTransacao("");
        setValor("");
        setTipo("Receita");
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
                    type="text"
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

            {transacao && (
                <div className="transacao">
                    <strong>Última transação:</strong>
                    <p>{transacao}</p>
                </div>
            )}

            

            {transacoes.map((item, index) => (
                
                <div key={index} className={item.tipo === "Despesa" ? "lista_despesa lista_transacoes"  : "lista_receita lista_transacoes"}>
                    <div>
                    <p>{item.transacao}</p>
                    <p><span>Valor: </span>R${item.valor}</p>
                    <p><span>Tipo: </span>{item.tipo}</p>
                    </div>
                    <div className="botao_editar_excluir_transacao">
                        <button className="botao_excluir_transacao" onClick={() => excluirTransacao(index)} >Excluir</button>
                        <button className="botao_editar_transacao" onClick={() => editarTransacao(index)}>Editar</button>
                    </div>
                    
                    
                </div>
                
                
            ))} 
        </>
    )
}

export default Transacoes