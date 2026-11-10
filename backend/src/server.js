const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const transacoesRoutes = require('./routes/transacoes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/transacoes', transacoesRoutes);

app.get('/', (req, res) => {
    res.send('API do Controle Financeiro funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});