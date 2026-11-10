const express = require('express');
const router = express.Router();

const db = require('../database/db');

// Listar todas as transações
router.get('/', (req, res) => {
    try {
        const transacoes = db.prepare('SELECT * FROM transacoes').all();

        res.json(transacoes);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar transações.'
        });
    }
});

// Cadastrar uma nova transação
router.post('/', (req, res) => {
    try {
        const { descricao, valor, tipo } = req.body;

        // Validar os campos
        if (!descricao || !descricao.trim() || valor === undefined || valor === null || !tipo) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        const valorNumerico = Number(valor);

        if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
            return res.status(400).json({
                mensagem: 'Informe um valor válido.'
            });
        }

        if (tipo !== 'Receita' && tipo !== 'Despesa') {
            return res.status(400).json({
                mensagem: 'O tipo deve ser Receita ou Despesa.'
            });
        }

        const resultado = db.prepare(`
            INSERT INTO transacoes (descricao, valor, tipo)
            VALUES (?, ?, ?)
        `).run(descricao.trim(), valorNumerico, tipo);

        res.status(201).json({
            id: resultado.lastInsertRowid,
            descricao: descricao.trim(),
            valor: valorNumerico,
            tipo: tipo
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao cadastrar transação.'
        });
    }
});

// Editar uma transação
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, valor, tipo } = req.body;

        if (!descricao || !descricao.trim() || valor === undefined || valor === null || !tipo) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        const valorNumerico = Number(valor);

        if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
            return res.status(400).json({
                mensagem: 'Informe um valor válido.'
            });
        }

        if (tipo !== 'Receita' && tipo !== 'Despesa') {
            return res.status(400).json({
                mensagem: 'O tipo deve ser Receita ou Despesa.'
            });
        }

        const resultado = db.prepare(`
            UPDATE transacoes
            SET descricao = ?, valor = ?, tipo = ?
            WHERE id = ?
        `).run(descricao.trim(), valorNumerico, tipo, id);

        if (resultado.changes === 0) {
            return res.status(404).json({
                mensagem: 'Transação não encontrada.'
            });
        }

        res.json({
            id: Number(id),
            descricao: descricao.trim(),
            valor: valorNumerico,
            tipo
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar transação.'
        });
    }
});

// Excluir uma transação
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const resultado = db.prepare(`
            DELETE FROM transacoes WHERE id = ?
        `).run(id);

        if (resultado.changes === 0) {
            return res.status(404).json({
                mensagem: 'Transação não encontrada.'
            });
        }

        res.json({
            mensagem: 'Transação excluída com sucesso.'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao excluir transação.'
        });
    }
});

module.exports = router;