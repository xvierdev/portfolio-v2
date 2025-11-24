const express = require('express');
const router = express.Router();
const portfolioData = require('../../data');
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.render('index', { data: portfolioData, currentPage: 'home' });
        }
        const [rows] = await connection.execute('SELECT texto FROM sobre_mim LIMIT 1');
        const biografia = rows.length > 0 ? rows[0].texto : portfolioData.profile.biografia;
        const dataWithBiografia = { ...portfolioData, profile: { ...portfolioData.profile, biografia } };
        res.render('index', { data: dataWithBiografia, currentPage: 'home' });
    } catch (error) {
        console.error('Erro ao buscar biografia:', error);
        res.render('index', { data: portfolioData, currentPage: 'home' });
    }
});

router.get('/formacao', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.render('formacao', { data: portfolioData, currentPage: 'formacao' });
        }
        const [rows] = await connection.execute('SELECT * FROM formacao ORDER BY created_at DESC');
        const formacao = rows.length > 0 ? rows : portfolioData.formacao;
        const dataWithFormacao = { ...portfolioData, formacao };
        res.render('formacao', { data: dataWithFormacao, currentPage: 'formacao' });
    } catch (error) {
        console.error('Erro ao buscar formação:', error);
        res.render('formacao', { data: portfolioData, currentPage: 'formacao' });
    }
});

router.get('/projetos', async (req, res) => {
    res.render('projetos', { data: portfolioData, currentPage: 'projetos' });
});

router.get('/projetos/edit/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).send('Serviço de banco de dados indisponível');
        }
        const [rows] = await connection.execute('SELECT * FROM projetos WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            res.render('projeto-edit', { data: portfolioData, currentPage: 'projetos', projeto: rows[0] });
        } else {
            res.status(404).redirect('/projetos');
        }
    } catch (error) {
        console.error('Erro ao buscar projeto:', error);
        res.status(500).send('Erro interno');
    }
});

router.get('/formacao/edit/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).send('Serviço de banco de dados indisponível');
        }
        const [rows] = await connection.execute('SELECT * FROM formacao WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            res.render('formacao-edit', { data: portfolioData, currentPage: 'formacao', formacao: rows[0] });
        } else {
            res.status(404).redirect('/formacao');
        }
    } catch (error) {
        console.error('Erro ao buscar formação:', error);
        res.status(500).send('Erro interno');
    }
});

router.get('/competencias', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.render('competencias', { data: portfolioData, currentPage: 'competencias' });
        }
        const [rows] = await connection.execute('SELECT * FROM competencias ORDER BY tipo, nome');
        const competencias = { tecnicas: [], interpessoais: [] };
        rows.forEach(comp => {
            competencias[comp.tipo].push(comp.nome);
        });
        const dataWithCompetencias = { ...portfolioData, competencias };
        res.render('competencias', { data: dataWithCompetencias, currentPage: 'competencias' });
    } catch (error) {
        console.error('Erro ao buscar competências:', error);
        res.render('competencias', { data: portfolioData, currentPage: 'competencias' });
    }
});

router.get('/experiencias', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.render('experiencias', { data: portfolioData, currentPage: 'experiencias' });
        }
        const [rows] = await connection.execute('SELECT * FROM experiencias ORDER BY created_at DESC');
        const experiencias = rows.length > 0 ? rows : portfolioData.experiencias;
        const dataWithExperiencias = { ...portfolioData, experiencias };
        res.render('experiencias', { data: dataWithExperiencias, currentPage: 'experiencias' });
    } catch (error) {
        console.error('Erro ao buscar experiências:', error);
        res.render('experiencias', { data: portfolioData, currentPage: 'experiencias' });
    }
});

router.get('/contatos', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.render('contatos', { data: portfolioData, currentPage: 'contatos' });
        }
        const [rows] = await connection.execute('SELECT * FROM contatos ORDER BY ordem ASC, id ASC');
        const contatos = rows.length > 0 ? rows : portfolioData.contatos;
        const dataWithContatos = { ...portfolioData, contatos };
        res.render('contatos', { data: dataWithContatos, currentPage: 'contatos' });
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.render('contatos', { data: portfolioData, currentPage: 'contatos' });
    }
});

router.get('/experiencias/edit/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).send('Serviço de banco de dados indisponível');
        }
        const [rows] = await connection.execute('SELECT * FROM experiencias WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            res.render('experiencia-edit', { data: portfolioData, currentPage: 'experiencias', experiencia: rows[0] });
        } else {
            res.status(404).redirect('/experiencias');
        }
    } catch (error) {
        console.error('Erro ao buscar experiência:', error);
        res.status(500).send('Erro interno');
    }
});

router.get('/recados', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.render('recados', { data: portfolioData, currentPage: 'recados', recados: [] });
        }
        const [rows] = await connection.execute('SELECT * FROM recados ORDER BY created_at DESC');
        res.render('recados', { data: portfolioData, currentPage: 'recados', recados: rows });
    } catch (error) {
        console.error('Erro ao buscar recados:', error);
        res.render('recados', { data: portfolioData, currentPage: 'recados', recados: [] });
    }
});

router.get('/recados/edit/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).send('Serviço de banco de dados indisponível');
        }
        const [rows] = await connection.execute('SELECT * FROM recados WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            res.render('recado-edit', { data: portfolioData, currentPage: 'recados', recado: rows[0] });
        } else {
            res.status(404).redirect('/recados');
        }
    } catch (error) {
        console.error('Erro ao buscar recado:', error);
        res.status(500).send('Erro interno');
    }
});

router.get('/api/recados', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM recados ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar recados:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/recados/:id', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM recados WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Recado não encontrado." });
        }
    } catch (error) {
        console.error('Erro ao buscar recado:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/recados', async (req, res) => {
    const { nome, mensagem } = req.body;

    if (!nome || !mensagem) {
        return res.status(400).json({ mensagem: "Nome e Mensagem são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'INSERT INTO recados (nome, mensagem) VALUES (?, ?)',
            [nome, mensagem]
        );
        const novoRecado = { id: result.insertId, nome, mensagem };
        return res.status(201).json({
            mensagem: "Recado criado com sucesso!",
            recado: novoRecado
        });
    } catch (error) {
        console.error('Erro ao criar recado:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/recados/:id', async (req, res) => {
    const { nome, mensagem } = req.body;
    const id = parseInt(req.params.id);

    if (!nome || !mensagem) {
        return res.status(400).json({ mensagem: "Nome e Mensagem são obrigatórios para a atualização." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'UPDATE recados SET nome = ?, mensagem = ? WHERE id = ?',
            [nome, mensagem, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Recado atualizado com sucesso!",
                recado: { id, nome, mensagem }
            });
        } else {
            return res.status(404).json({ mensagem: "Recado não encontrado para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar recado:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/recados/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute('DELETE FROM recados WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensagem: 'Recado deletado com sucesso' });
        }
        return res.status(404).json({ mensagem: "Recado não encontrado para deleção." });
    } catch (error) {
        console.error('Erro ao deletar recado:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/sobre-mim/edit', async (req, res) => {
    res.redirect('/');
});

router.get('/api/projetos', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM projetos ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/projetos/:id', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM projetos WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Projeto não encontrado." });
        }
    } catch (error) {
        console.error('Erro ao buscar projeto:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/projetos', async (req, res) => {
    const { titulo, tecnologias, descricao, linkGithub, linkDemo } = req.body;

    if (!titulo || !tecnologias || !descricao) {
        return res.status(400).json({ mensagem: "Título, Tecnologias e Descrição são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'INSERT INTO projetos (titulo, tecnologias, descricao, linkGithub, linkDemo) VALUES (?, ?, ?, ?, ?)',
            [titulo, tecnologias, descricao, linkGithub || null, linkDemo || null]
        );
        const novoProjeto = { 
            id: result.insertId, 
            titulo, 
            tecnologias, 
            descricao, 
            linkGithub: linkGithub || null, 
            linkDemo: linkDemo || null 
        };
        return res.status(201).json({
            mensagem: "Projeto criado com sucesso!",
            projeto: novoProjeto
        });
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/projetos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, tecnologias, descricao, linkGithub, linkDemo } = req.body;

    if (!titulo || !tecnologias || !descricao) {
        return res.status(400).json({ mensagem: "Título, Tecnologias e Descrição são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'UPDATE projetos SET titulo = ?, tecnologias = ?, descricao = ?, linkGithub = ?, linkDemo = ? WHERE id = ?',
            [titulo, tecnologias, descricao, linkGithub || null, linkDemo || null, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Projeto atualizado com sucesso!",
                projeto: { id, titulo, tecnologias, descricao, linkGithub: linkGithub || null, linkDemo: linkDemo || null }
            });
        } else {
            return res.status(404).json({ mensagem: "Projeto não encontrado para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/projetos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute('DELETE FROM projetos WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensagem: 'Projeto deletado com sucesso' });
        }
        return res.status(404).json({ mensagem: "Projeto não encontrado para deleção." });
    } catch (error) {
        console.error('Erro ao deletar projeto:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/competencias', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM competencias ORDER BY tipo, nome');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar competências:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/competencias/:id', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM competencias WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Competência não encontrada." });
        }
    } catch (error) {
        console.error('Erro ao buscar competência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/competencias', async (req, res) => {
    const { tipo, nome } = req.body;

    if (!tipo || !nome || !['tecnicas', 'interpessoais'].includes(tipo)) {
        return res.status(400).json({ mensagem: "Tipo (tecnicas ou interpessoais) e Nome são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'INSERT INTO competencias (tipo, nome) VALUES (?, ?)',
            [tipo, nome]
        );
        const novaCompetencia = { id: result.insertId, tipo, nome };
        return res.status(201).json({
            mensagem: "Competência criada com sucesso!",
            competencia: novaCompetencia
        });
    } catch (error) {
        console.error('Erro ao criar competência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/competencias/:id', async (req, res) => {
    const { tipo, nome } = req.body;
    const id = parseInt(req.params.id);

    if (!tipo || !nome || !['tecnicas', 'interpessoais'].includes(tipo)) {
        return res.status(400).json({ mensagem: "Tipo (tecnicas ou interpessoais) e Nome são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'UPDATE competencias SET tipo = ?, nome = ? WHERE id = ?',
            [tipo, nome, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Competência atualizada com sucesso!",
                competencia: { id, tipo, nome }
            });
        } else {
            return res.status(404).json({ mensagem: "Competência não encontrada para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar competência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/competencias/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute('DELETE FROM competencias WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensagem: 'Competência deletada com sucesso' });
        }
        return res.status(404).json({ mensagem: "Competência não encontrada para deleção." });
    } catch (error) {
        console.error('Erro ao deletar competência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/sobre-mim', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM sobre_mim LIMIT 1');
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Sobre Mim não encontrado." });
        }
    } catch (error) {
        console.error('Erro ao buscar sobre mim:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/sobre-mim', async (req, res) => {
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ mensagem: "Texto é obrigatório." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'INSERT INTO sobre_mim (texto) VALUES (?)',
            [texto]
        );
        const novoSobreMim = { id: result.insertId, texto };
        return res.status(201).json({
            mensagem: "Sobre Mim criado com sucesso!",
            sobreMim: novoSobreMim
        });
    } catch (error) {
        console.error('Erro ao criar sobre mim:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/sobre-mim/:id', async (req, res) => {
    const { texto } = req.body;
    const id = parseInt(req.params.id);

    if (!texto) {
        return res.status(400).json({ mensagem: "Texto é obrigatório." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'UPDATE sobre_mim SET texto = ? WHERE id = ?',
            [texto, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Sobre Mim atualizado com sucesso!",
                sobreMim: { id, texto }
            });
        } else {
            return res.status(404).json({ mensagem: "Sobre Mim não encontrado para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar sobre mim:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/sobre-mim/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        const [result] = await connection.execute('DELETE FROM sobre_mim WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ mensagem: "Sobre Mim não encontrado para deleção." });
        }
    } catch (error) {
        console.error('Erro ao deletar sobre mim:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/formacao', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM formacao ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar formação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/formacao/:id', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.execute('SELECT * FROM formacao WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Formação não encontrada." });
        }
    } catch (error) {
        console.error('Erro ao buscar formação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/formacao', async (req, res) => {
    const { instituicao, curso, periodo, descricao } = req.body;

    if (!instituicao || !curso || !periodo || !descricao) {
        return res.status(400).json({ mensagem: "Instituição, Curso, Período e Descrição são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'INSERT INTO formacao (instituicao, curso, periodo, descricao) VALUES (?, ?, ?, ?)',
            [instituicao, curso, periodo, descricao]
        );
        const novaFormacao = { 
            id: result.insertId, 
            instituicao, 
            curso, 
            periodo, 
            descricao 
        };
        return res.status(201).json({
            mensagem: "Formação criada com sucesso!",
            formacao: novaFormacao
        });
    } catch (error) {
        console.error('Erro ao criar formação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/formacao/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { instituicao, curso, periodo, descricao } = req.body;

    if (!instituicao || !curso || !periodo || !descricao) {
        return res.status(400).json({ mensagem: "Instituição, Curso, Período e Descrição são obrigatórios." });
    }

    try {
        const connection = getConnection();
        const [result] = await connection.execute(
            'UPDATE formacao SET instituicao = ?, curso = ?, periodo = ?, descricao = ? WHERE id = ?',
            [instituicao, curso, periodo, descricao, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Formação atualizada com sucesso!",
                formacao: { id, instituicao, curso, periodo, descricao }
            });
        } else {
            return res.status(404).json({ mensagem: "Formação não encontrada para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar formação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/formacao/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        const [result] = await connection.execute('DELETE FROM formacao WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ mensagem: "Formação não encontrada para deleção." });
        }
    } catch (error) {
        console.error('Erro ao deletar formação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/experiencias', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [rows] = await connection.execute('SELECT * FROM experiencias ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar experiências:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/experiencias/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [rows] = await connection.execute('SELECT * FROM experiencias WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Experiência não encontrada." });
        }
    } catch (error) {
        console.error('Erro ao buscar experiência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/experiencias', async (req, res) => {
    const { cargo, empresa, periodo, descricao } = req.body;

    if (!cargo || !empresa || !periodo || !descricao) {
        return res.status(400).json({ mensagem: "Cargo, Empresa, Período e Descrição são obrigatórios." });
    }

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute(
            'INSERT INTO experiencias (cargo, empresa, periodo, descricao) VALUES (?, ?, ?, ?)',
            [cargo, empresa, periodo, descricao]
        );
        const novaExperiencia = { 
            id: result.insertId, 
            cargo, 
            empresa, 
            periodo, 
            descricao 
        };
        return res.status(201).json({
            mensagem: "Experiência criada com sucesso!",
            experiencia: novaExperiencia
        });
    } catch (error) {
        console.error('Erro ao criar experiência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/experiencias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { cargo, empresa, periodo, descricao } = req.body;

    if (!cargo || !empresa || !periodo || !descricao) {
        return res.status(400).json({ mensagem: "Cargo, Empresa, Período e Descrição são obrigatórios." });
    }

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute(
            'UPDATE experiencias SET cargo = ?, empresa = ?, periodo = ?, descricao = ? WHERE id = ?',
            [cargo, empresa, periodo, descricao, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Experiência atualizada com sucesso!",
                experiencia: { id, cargo, empresa, periodo, descricao }
            });
        } else {
            return res.status(404).json({ mensagem: "Experiência não encontrada para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar experiência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/experiencias/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute('DELETE FROM experiencias WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensagem: 'Experiência deletada com sucesso' });
        }
        return res.status(404).json({ mensagem: "Experiência não encontrada para deleção." });
    } catch (error) {
        console.error('Erro ao deletar experiência:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/certificacoes', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [rows] = await connection.execute('SELECT * FROM certificacoes ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar certificações:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/certificacoes/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [rows] = await connection.execute('SELECT * FROM certificacoes WHERE id = ?', [parseInt(req.params.id)]);
        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensagem: "Certificação não encontrada." });
        }
    } catch (error) {
        console.error('Erro ao buscar certificação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/certificacoes', async (req, res) => {
    const { nome, emissor } = req.body;

    if (!nome || !emissor) {
        return res.status(400).json({ mensagem: "Nome e Emissor são obrigatórios." });
    }

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute(
            'INSERT INTO certificacoes (nome, emissor) VALUES (?, ?)',
            [nome, emissor]
        );
        const novaCertificacao = { 
            id: result.insertId, 
            nome, 
            emissor 
        };
        return res.status(201).json({
            mensagem: "Certificação criada com sucesso!",
            certificacao: novaCertificacao
        });
    } catch (error) {
        console.error('Erro ao criar certificação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/certificacoes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, emissor } = req.body;

    if (!nome || !emissor) {
        return res.status(400).json({ mensagem: "Nome e Emissor são obrigatórios." });
    }

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute(
            'UPDATE certificacoes SET nome = ?, emissor = ? WHERE id = ?',
            [nome, emissor, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                mensagem: "Certificação atualizada com sucesso!",
                certificacao: { id, nome, emissor }
            });
        } else {
            return res.status(404).json({ mensagem: "Certificação não encontrada para atualização." });
        }
    } catch (error) {
        console.error('Erro ao atualizar certificação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/certificacoes/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Conexão com banco de dados não disponível' });
        }
        const [result] = await connection.execute('DELETE FROM certificacoes WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensagem: 'Certificação deletada com sucesso' });
        }
        return res.status(404).json({ mensagem: "Certificação não encontrada para deleção." });
    } catch (error) {
        console.error('Erro ao deletar certificação:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/contatos', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Serviço indisponível: sem conexão com banco', contatos: portfolioData.contatos || [] });
        }
        const [rows] = await connection.execute('SELECT * FROM contatos ORDER BY ordem ASC, id ASC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.get('/api/contatos/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Serviço indisponível: sem conexão com banco' });
        }
        const { id } = req.params;
        const [rows] = await connection.execute('SELECT * FROM contatos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Contato não encontrado' });
        }
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar contato:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/api/contatos', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Serviço indisponível: sem conexão com banco' });
        }
        const { tipo, label, valor, link, ordem } = req.body;
        
        if (!tipo || !label || !valor) {
            return res.status(400).json({ mensagem: 'Tipo, label e valor são obrigatórios' });
        }
        
        const [result] = await connection.execute(
            'INSERT INTO contatos (tipo, label, valor, link, ordem) VALUES (?, ?, ?, ?, ?)',
            [tipo, label, valor, link || null, ordem || 0]
        );
        
        return res.status(201).json({ 
            mensagem: 'Contato criado com sucesso',
            id: result.insertId
        });
    } catch (error) {
        console.error('Erro ao criar contato:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.put('/api/contatos/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Serviço indisponível: sem conexão com banco' });
        }
        const { id } = req.params;
        const { tipo, label, valor, link, ordem } = req.body;
        
        if (!tipo || !label || !valor) {
            return res.status(400).json({ mensagem: 'Tipo, label e valor são obrigatórios' });
        }
        
        const [result] = await connection.execute(
            'UPDATE contatos SET tipo = ?, label = ?, valor = ?, link = ?, ordem = ? WHERE id = ?',
            [tipo, label, valor, link || null, ordem || 0, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Contato não encontrado' });
        }
        
        return res.status(200).json({ mensagem: 'Contato atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar contato:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.delete('/api/contatos/:id', async (req, res) => {
    try {
        const connection = getConnection();
        if (!connection) {
            return res.status(503).json({ mensagem: 'Serviço indisponível: sem conexão com banco' });
        }
        const { id } = req.params;
        const [result] = await connection.execute('DELETE FROM contatos WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Contato não encontrado' });
        }
        
        return res.status(200).json({ mensagem: 'Contato deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar contato:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

module.exports = router;