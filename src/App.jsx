import { useState, useEffect } from 'react'
import Home from './pages/home'
import Transacoes from './pages/transacoes'
import Sobre from './pages/sobre'
import api from './services/api';
import './App.css'

function App() {

    // useEffect(() => {
    //     api.get('/transacoes')
    //         .then((resposta) => {
    //             console.log(resposta.data);
    //         })
    //         .catch((error) => {
    //             console.log('Erro ao conectar com a API:', error);
    //         });
    // }, []);

    const [content, setContent] = useState('home');


    return (
        <>
            <nav>
                <button onClick={() => setContent('home')}>Início</button>
                <button onClick={() => setContent('transacoes')}>Transações</button>
                <button onClick={() => setContent('sobre')}>Sobre</button>
            </nav>

            <div>
                {content === 'home' && <Home />}
                {content === 'transacoes' && <Transacoes />}
                {content === 'sobre' && <Sobre />}
            </div>
        </>
      )
}

export default App
