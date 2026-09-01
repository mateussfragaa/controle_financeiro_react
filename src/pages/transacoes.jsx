import { useState } from 'react'

function Transacoes() {

    const [transacao, setTransacao] = useState("")

    return (
        <>
            <h1>Transações</h1>
            <p>Receitas e despesas.</p>

            <input
                type="text"
                value={transacao}
                onChange={(e) => setTransacao(e.target.value)}
            />

            <button onClick={() => console.log(transacao)}>
                Adicionar
            </button>
        </>
    )
}

export default Transacoes