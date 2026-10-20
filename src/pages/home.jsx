import Transacoes from "./transacoes"

function Home() {
    return (
        <>
            <h1>Controle Financeiro</h1>
            <p>Organize suas finanças de forma simples.</p>

            <div className="resumo">
                <div className="card">
                    <h2>Receitas</h2>
                    <p>R$ 0,00</p>
                </div>

                <div className="card">
                    <h2>Despesas</h2>
                    <p>R$ 0,00</p>
                </div>

                <div className="card">
                    <h2>Saldo</h2>
                    <p>R$ 0,00</p>
                </div>
            </div>
        </>
    )
}

export default Home