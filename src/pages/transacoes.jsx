import { useState } from 'react'

function Transacoes() {

    const [transacao, setTransacao] = useState("")

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

                <button onClick={() => console.log(transacao)}>
                    Adicionar
                </button>
            </div>

            {transacao && (
                <div className="transacao">
                    <strong>Última transação:</strong>
                    <p>{transacao}</p>
                </div>
            )}
        </>
    )
}

export default Transacoes