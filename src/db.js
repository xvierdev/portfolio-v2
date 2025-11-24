const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'fatec'
};

let connection;

async function connectDB() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Conectado ao MySQL');
        
        // Criar banco de dados se não existir
        await connection.query('CREATE DATABASE IF NOT EXISTS portfolio_db');
        await connection.query('USE portfolio_db');
        
        // Criar tabelas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS recados (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                mensagem TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS projetos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                tecnologias TEXT NOT NULL,
                descricao TEXT NOT NULL,
                linkGithub VARCHAR(255),
                linkDemo VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS competencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tipo ENUM('tecnicas', 'interpessoais') NOT NULL,
                nome VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS sobre_mim (
                id INT AUTO_INCREMENT PRIMARY KEY,
                texto TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS formacao (
                id INT AUTO_INCREMENT PRIMARY KEY,
                instituicao VARCHAR(255) NOT NULL,
                curso VARCHAR(255) NOT NULL,
                periodo VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS experiencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cargo VARCHAR(255) NOT NULL,
                empresa VARCHAR(255) NOT NULL,
                periodo VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS certificacoes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                emissor VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS contatos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tipo VARCHAR(50) NOT NULL,
                label VARCHAR(100) NOT NULL,
                valor VARCHAR(255) NOT NULL,
                link VARCHAR(255),
                ordem INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✅ Tabelas criadas/verficadas');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MySQL (startup continuará, rotas usarão fallback):', error);
        // Não encerramos o processo para permitir que a aplicação suba e use dados estáticos como fallback.
        connection = undefined;
    }
}

async function seedProjetos(projetosData) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de projetos ignorado: conexão não disponível');
            return;
        }
        // Verificar se já há projetos
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM projetos');
        if (rows[0].count > 0) return; // Já seedado
        
        for (const projeto of projetosData) {
            await connection.execute(
                'INSERT INTO projetos (titulo, tecnologias, descricao, linkGithub, linkDemo) VALUES (?, ?, ?, ?, ?)',
                [projeto.titulo, projeto.tecnologias, projeto.descricao, projeto.linkGithub, projeto.linkDemo]
            );
        }
        console.log('✅ Projetos seedados no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar projetos:', error);
    }
}

async function seedCompetencias(competenciasData) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de competências ignorado: conexão não disponível');
            return;
        }
        // Verificar se já há competencias
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM competencias');
        if (rows[0].count > 0) return; // Já seedado
        
        for (const tipo of ['tecnicas', 'interpessoais']) {
            for (const nome of competenciasData[tipo]) {
                await connection.execute(
                    'INSERT INTO competencias (tipo, nome) VALUES (?, ?)',
                    [tipo, nome]
                );
            }
        }
        console.log('✅ Competências seedadas no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar competências:', error);
    }
}

async function seedSobreMim(sobreMimTexto) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de sobre mim ignorado: conexão não disponível');
            return;
        }
        // Verificar se já há sobre_mim
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM sobre_mim');
        if (rows[0].count > 0) return; // Já seedado
        
        await connection.execute(
            'INSERT INTO sobre_mim (texto) VALUES (?)',
            [sobreMimTexto]
        );
        console.log('✅ Sobre Mim seedado no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar sobre mim:', error);
    }
}

async function seedFormacao(formacaoData) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de formação ignorado: conexão não disponível');
            return;
        }
        // Verificar se já há formacao
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM formacao');
        if (rows[0].count > 0) return; // Já seedado
        
        for (const formacao of formacaoData) {
            await connection.execute(
                'INSERT INTO formacao (instituicao, curso, periodo, descricao) VALUES (?, ?, ?, ?)',
                [formacao.instituicao, formacao.curso, formacao.periodo, formacao.descricao]
            );
        }
        console.log('✅ Formação seedada no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar formação:', error);
    }
}

async function seedExperiencias(experienciasData) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de experiências ignorado: conexão não disponível');
            return;
        }
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM experiencias');
        if (rows[0].count > 0) return;
        
        for (const exp of experienciasData) {
            await connection.execute(
                'INSERT INTO experiencias (cargo, empresa, periodo, descricao) VALUES (?, ?, ?, ?)',
                [exp.cargo, exp.empresa, exp.periodo, exp.descricao]
            );
        }
        console.log('✅ Experiências seedadas no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar experiências:', error);
    }
}

async function seedCertificacoes(certificacoesData) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de certificações ignorado: conexão não disponível');
            return;
        }
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM certificacoes');
        if (rows[0].count > 0) return;
        
        for (const cert of certificacoesData) {
            await connection.execute(
                'INSERT INTO certificacoes (nome, emissor) VALUES (?, ?)',
                [cert.nome, cert.emissor]
            );
        }
        console.log('✅ Certificações seedadas no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar certificações:', error);
    }
}

async function seedContatos(contatosData) {
    try {
        if (!connection) {
            console.log('⚠️ Seed de contatos ignorado: conexão não disponível');
            return;
        }
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM contatos');
        if (rows[0].count > 0) return;
        
        for (const contato of contatosData) {
            await connection.execute(
                'INSERT INTO contatos (tipo, label, valor, link, ordem) VALUES (?, ?, ?, ?, ?)',
                [contato.tipo, contato.label, contato.valor, contato.link, contato.ordem]
            );
        }
        console.log('✅ Contatos seedados no banco');
    } catch (error) {
        console.error('❌ Erro ao seedar contatos:', error);
    }
}

module.exports = { 
    connectDB, 
    seedProjetos, 
    seedCompetencias, 
    seedSobreMim, 
    seedFormacao, 
    seedExperiencias, 
    seedCertificacoes, 
    seedContatos,
    getConnection: () => connection 
};