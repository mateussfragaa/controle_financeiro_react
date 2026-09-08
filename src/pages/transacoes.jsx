import { useState } from 'react'

function Transacoes() {

    const [transacao, setTransacao] = useState("")
    const [valor, setValor] = useState("")
    const [tipo, setTipo] = useState("Receita")
    const [transacoes, setTransacoes] = useState([])

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

                <button onClick={() => {
                    setTransacoes([
                        ...transacoes,
                        {
                            transacao: transacao,
                            valor: valor,
                            tipo: tipo
                        }
                    ])

                    setTransacao("");
                    setValor("");
                }}
                >
                    Adicionar
                </button>
            </div>

            {transacao && (
                <div className="transacao">
                    <strong>Última transação:</strong>
                    <p>{transacao}</p>
                </div>
            )}

            {transacoes.map((item) => (
                <div >
                    <p>Entrada {item.transacao}</p>
                    <p>Valor R${item.valor}</p>
                    <p>Tipo {item.tipo}</p>
                </div>
            ))} 
        </>
    )
}

export default Transacoes