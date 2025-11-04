const express = require('express');
const router = express.Router();
const portfolioData = require('../../data'); // Dependência externa para dados do portfólio

// ----------------------------------------------------
// SIMULAÇÃO DE BANCO DE DADOS EM MEMÓRIA (DADOS RESETAM AO REINICIAR)
// ----------------------------------------------------

// Dados para Recados (CRUD Funcional)
let recados = [
    { id: 1, nome: "Visitante Exemplo", mensagem: "Comentário de teste." },
    { id: 2, nome: "Outro Visitante", mensagem: "Estou aqui para aprimorar o CRUD!" },
];
let nextRecadoId = recados.length > 0 ? recados[recados.length - 1].id + 1 : 1; 

// Dados para Projetos (Novo CRUD Funcional)
// 💡 Inicializa o array de projetos com os dados estáticos para simular o reset
let projetos = portfolioData.projetos.map((p, index) => ({
    ...p,
    // Garante que todos os projetos tenham um ID numérico para o CRUD
    id: p.id || (index + 1)
}));
let nextProjetoId = projetos.length > 0 ? Math.max(...projetos.map(p => p.id || 0)) + 1 : 10; 
// Usamos um ID alto para não conflitar com os IDs iniciais (se houver)


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

// Rota para Projetos (Renderiza a view de listagem/CRUD)
router.get('/projetos', (req, res) => {
    res.render('projetos', { data: portfolioData, currentPage: 'projetos' });
});

// Rota para Edição de Projeto (Renderiza a view de edição)
router.get('/projetos/edit/:id', (req, res) => {
    const projeto = projetos.find(p => p.id == req.params.id);
    if (projeto) {
        res.render('projeto-edit', { data: portfolioData, currentPage: 'projetos', projeto: projeto });
    } else {
        res.status(404).redirect('/projetos');
    }
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

    const novoRecado = { id: nextRecadoId++, nome, mensagem };
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

// Rota para Edição de Recado (Renderiza a view de edição)
router.get('/recados/edit/:id', (req, res) => {
    // Busca o recado no array em memória
    const recado = recados.find(r => r.id == req.params.id); 

    if (recado) {
        // Se encontrado, renderiza a view de edição, passando os dados do recado
        res.render('recado-edit', { 
            data: portfolioData, 
            currentPage: 'recados', 
            recado: recado 
        });
    } else {
        // Se não encontrado, retorna 404 ou redireciona para a lista
        res.status(404).redirect('/recados');
    }
});


// ----------------------------------------------------
// ROTAS DA API DE PROJETOS (CRUD JSON)
// ----------------------------------------------------

// 1. Rota GET /api/projetos (READ ALL)
router.get('/api/projetos', (req, res) => {
    // Retorna todos os projetos (Status 200 OK)
    return res.status(200).json(projetos);
});

// 2. Rota POST /api/projetos (CREATE)
router.post('/api/projetos', (req, res) => {
    const { titulo, tecnologias, descricao, linkGithub, linkDemo } = req.body;

    if (!titulo || !tecnologias || !descricao) {
        // Dados inválidos (Status 400 Bad Request)
        return res.status(400).json({ mensagem: "Título, Tecnologias e Descrição são obrigatórios." });
    }

    const novoProjeto = { 
        id: nextProjetoId++, // Atribui e incrementa o ID
        titulo, 
        tecnologias, 
        descricao, 
        linkGithub: linkGithub || null, 
        linkDemo: linkDemo || null 
    };
    projetos.push(novoProjeto);

    // Retorna o novo recurso criado (Status 201 Created)
    return res.status(201).json({
        mensagem: "Projeto criado com sucesso!",
        projeto: novoProjeto
    });
});

// 3. Rota PUT /api/projetos/:id (UPDATE)
router.put('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, tecnologias, descricao, linkGithub, linkDemo } = req.body;
    const projeto = projetos.find(p => p.id === id);

    if (!projeto) {
        // Projeto não encontrado (Status 404 Not Found)
        return res.status(404).json({ mensagem: "Projeto não encontrado para atualização." });
    }
    if (!titulo || !tecnologias || !descricao) {
        // Dados inválidos (Status 400 Bad Request)
        return res.status(400).json({ mensagem: "Título, Tecnologias e Descrição são obrigatórios." });
    }

    // Atualiza os campos do projeto existente
    projeto.titulo = titulo;
    projeto.tecnologias = tecnologias;
    projeto.descricao = descricao;
    projeto.linkGithub = linkGithub || null;
    projeto.linkDemo = linkDemo || null;

    // Retorna o recurso atualizado (Status 200 OK)
    return res.status(200).json({
        mensagem: "Projeto atualizado com sucesso!",
        projeto: projeto
    });
});

// 4. Rota DELETE /api/projetos/:id (DELETE)
router.delete('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = projetos.length;
    projetos = projetos.filter(p => p.id !== id);

    if (projetos.length === initialLength) {
        // Projeto não encontrado para deleção (Status 404 Not Found)
        return res.status(404).json({ mensagem: "Projeto não encontrado para deleção." });
    }

    // Retorna uma resposta vazia (Status 204 No Content)
    return res.status(204).send();
});


module.exports = router;