const Database = require('better-sqlite3');
const path = require('path');

const caminhoBanco = path.join(__dirname, 'financeiro.db');

const db = new Database(caminhoBanco);

db.exec(`
    CREATE TABLE IF NOT EXISTS transacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        tipo TEXT NOT NULL
    )
`);

module.exports = db;