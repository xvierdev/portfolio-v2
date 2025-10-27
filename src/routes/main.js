const express = require('express');
const router = express.Router();
const portfolioData = require('../../data');
// SIMULAÇÃO DE BANCO DE DADOS PARA RECADOS
let recados = [
    { id: 1, nome: "Visitante Exemplo", mensagem: "Comentário de teste." },
];
let nextId = 3;

// --- ROTAS GET PARA AS PÁGINAS ---

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

// --- ROTAS PARA A FUNCIONALIDADE DE RECADOS (CRUD) ---

// (GET) Rota para exibir o mural de recados e o formulário
router.get('/recados', (req, res) => {
    res.render('recados', { data: portfolioData, currentPage: 'recados', recados: recados });
});

// (POST) Rota para receber um novo recado
router.post('/recados', (req, res) => {
    const { nome, mensagem } = req.body;
    if (nome && mensagem) {
        recados.push({ id: nextId++, nome, mensagem });
    }
    res.redirect('/recados'); // Redireciona de volta para a página de recados
});

// (GET) Rota para exibir a página de edição de um recado específico
router.get('/recados/edit/:id', (req, res) => {
    const recado = recados.find(r => r.id == req.params.id);
    if (recado) {
        res.render('recado-edit', { data: portfolioData, currentPage: 'recados', recado: recado });
    } else {
        res.redirect('/recados');
    }
});

// (PUT - Simulado com POST) Rota para atualizar um recado
router.post('/recados/update/:id', (req, res) => {
    const recado = recados.find(r => r.id == req.params.id);
    if (recado) {
        recado.nome = req.body.nome;
        recado.mensagem = req.body.mensagem;
    }
    res.redirect('/recados');
});


// (DELETE - Simulado com POST) Rota para deletar um recado
router.post('/recados/delete/:id', (req, res) => {
    recados = recados.filter(r => r.id != req.params.id);
    res.redirect('/recados');
});


module.exports = router;