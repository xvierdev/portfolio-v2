const express = require('express');
const router = express.Router();
const portfolioData = require('../../data'); // Dependência externa para dados do portfólio

// --- Simulação de Banco de Dados para Recados ---
let recados = [
    { id: 1, nome: "Visitante Exemplo", mensagem: "Comentário de teste." },
    { id: 2, nome: "Outro Visitante", mensagem: "Estou aqui para aprimorar o CRUD!" },
];
let nextId = recados.length > 0 ? recados[recados.length - 1].id + 1 : 1; 

// ----------------------------------------------------
// ROTAS DE RENDERIZAÇÃO EJS (FRONTEND)
// ----------------------------------------------------

// Rota Principal (Apresentação)
router.get('/', (req, res) => {
    res.render('index', { data: portfolioData, currentPage: 'home' });
});

// Rota para Formação
router.get('/formacao', (req, res) => {
    res.render('formacao', { data: portfolioData, currentPage: 'formacao' });
});

// Rota para Projetos
router.get('/projetos', (req, res) => {
    res.render('projetos', { data: portfolioData, currentPage: 'projetos' });
});

// Rota para Competências
router.get('/competencias', (req, res) => {
    res.render('competencias', { data: portfolioData, currentPage: 'competencias' });
});

// Rota para Experiências
router.get('/experiencias', (req, res) => {
    res.render('experiencias', { data: portfolioData, currentPage: 'experiencias' });
});

// Rota para Página de Recados (Renderiza a view que consumirá a API)
router.get('/recados', (req, res) => {
    res.render('recados', { data: portfolioData, currentPage: 'recados', recados: recados });
});

// ----------------------------------------------------
// ROTAS DA API DE RECADOS (CRUD JSON)
// ----------------------------------------------------

// 1. Rota GET /api/recados (READ ALL)
router.get('/api/recados', (req, res) => {
    // Retorna todos os recados (Status 200 OK)
    return res.status(200).json(recados);
});

// 2. Rota GET /api/recados/:id (READ ONE)
router.get('/api/recados/:id', (req, res) => {
    const recado = recados.find(r => r.id == req.params.id);

    if (recado) {
        // Retorna o recado específico (Status 200 OK)
        return res.status(200).json(recado);
    } else {
        // Recado não encontrado (Status 404 Not Found)
        return res.status(404).json({ mensagem: "Recado não encontrado." });
    }
});

// 3. Rota POST /api/recados (CREATE)
router.post('/api/recados', (req, res) => {
    const { nome, mensagem } = req.body;

    if (!nome || !mensagem) {
        // Dados inválidos (Status 400 Bad Request)
        return res.status(400).json({ mensagem: "Nome e Mensagem são obrigatórios." });
    }

    const novoRecado = { id: nextId++, nome, mensagem };
    recados.push(novoRecado);

    // Retorna o novo recurso criado (Status 201 Created)
    return res.status(201).json({
        mensagem: "Recado criado com sucesso!",
        recado: novoRecado
    });
});

// 4. Rota PUT /api/recados/:id (UPDATE)
router.put('/api/recados/:id', (req, res) => {
    const { nome, mensagem } = req.body;
    const recado = recados.find(r => r.id == req.params.id);

    if (!recado) {
        // Recado não encontrado (Status 404 Not Found)
        return res.status(404).json({ mensagem: "Recado não encontrado para atualização." });
    }

    if (!nome || !mensagem) {
        // Dados inválidos (Status 400 Bad Request)
        return res.status(400).json({ mensagem: "Nome e Mensagem são obrigatórios para a atualização." });
    }

    recado.nome = nome;
    recado.mensagem = mensagem;

    // Retorna o recurso atualizado (Status 200 OK)
    return res.status(200).json({
        mensagem: "Recado atualizado com sucesso!",
        recado: recado
    });
});

// 5. Rota DELETE /api/recados/:id (DELETE)
router.delete('/api/recados/:id', (req, res) => {
    const initialLength = recados.length;
    recados = recados.filter(r => r.id != req.params.id);

    if (recados.length === initialLength) {
        // Recado não encontrado para deleção (Status 404 Not Found)
        return res.status(404).json({ mensagem: "Recado não encontrado para deleção." });
    }

    // Retorna uma resposta vazia (Status 204 No Content)
    return res.status(204).send();
});


module.exports = router;