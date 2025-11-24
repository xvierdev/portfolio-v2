const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'fatec',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

async function connectDB() {
    try {
        pool = mysql.createPool({
            ...dbConfig,
            database: 'portfolio_db',
            multipleStatements: true
        });
        
        console.log('Pool MySQL criado');
        
        const connection = await pool.getConnection();
        
        await connection.query('CREATE DATABASE IF NOT EXISTS portfolio_db');
        await connection.query('USE portfolio_db');
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS recados (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                mensagem TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS projetos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                tecnologias TEXT NOT NULL,
                descricao TEXT NOT NULL,
                linkGithub VARCHAR(255),
                linkDemo VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS competencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tipo ENUM('tecnicas', 'interpessoais') NOT NULL,
                nome VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS sobre_mim (
                id INT AUTO_INCREMENT PRIMARY KEY,
                texto TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS formacao (
                id INT AUTO_INCREMENT PRIMARY KEY,
                instituicao VARCHAR(255) NOT NULL,
                curso VARCHAR(255) NOT NULL,
                periodo VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS experiencias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cargo VARCHAR(255) NOT NULL,
                empresa VARCHAR(255) NOT NULL,
                periodo VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS certificacoes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                emissor VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS contatos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tipo VARCHAR(50) NOT NULL,
                label VARCHAR(100) NOT NULL,
                valor VARCHAR(255) NOT NULL,
                link VARCHAR(255),
                ordem INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        connection.release();
        console.log('Database e tabelas criadas/verificadas');
    } catch (error) {
        console.error('Erro ao conectar ao MySQL (startup continuará, rotas usarão fallback):', error);
        pool = undefined;
    }
}

async function seedProjetos(projetosData) {
    try {
        if (!pool) {
            console.log('Seed de projetos ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM projetos');
        if (rows[0].count > 0) return;
        
        if (projetosData.length > 0) {
            const values = projetosData.map(p => [p.titulo, p.tecnologias, p.descricao, p.linkGithub, p.linkDemo]);
            const placeholders = values.map(() => '(?, ?, ?, ?, ?)').join(', ');
            await pool.execute(
                `INSERT INTO projetos (titulo, tecnologias, descricao, linkGithub, linkDemo) VALUES ${placeholders}`,
                values.flat()
            );
            console.log('Projetos seedados no banco');
        }
    } catch (error) {
        console.error('Erro ao seedar projetos:', error);
    }
}

async function seedCompetencias(competenciasData) {
    try {
        if (!pool) {
            console.log('Seed de competências ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM competencias');
        if (rows[0].count > 0) return;
        
        const values = [];
        for (const tipo of ['tecnicas', 'interpessoais']) {
            for (const nome of competenciasData[tipo]) {
                values.push([tipo, nome]);
            }
        }
        if (values.length > 0) {
            const placeholders = values.map(() => '(?, ?)').join(', ');
            await pool.execute(
                `INSERT INTO competencias (tipo, nome) VALUES ${placeholders}`,
                values.flat()
            );
            console.log('Competências seedadas no banco');
        }
    } catch (error) {
        console.error('Erro ao seedar competências:', error);
    }
}

async function seedSobreMim(sobreMimTexto) {
    try {
        if (!pool) {
            console.log('Seed de sobre mim ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM sobre_mim');
        if (rows[0].count > 0) return;
        
        await pool.execute(
            'INSERT INTO sobre_mim (texto) VALUES (?)',
            [sobreMimTexto]
        );
        console.log('Sobre Mim seedado no banco');
    } catch (error) {
        console.error('Erro ao seedar sobre mim:', error);
    }
}

async function seedFormacao(formacaoData) {
    try {
        if (!pool) {
            console.log('Seed de formação ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM formacao');
        if (rows[0].count > 0) return;
        
        if (formacaoData.length > 0) {
            const values = formacaoData.map(f => [f.instituicao, f.curso, f.periodo, f.descricao]);
            const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');
            await pool.execute(
                `INSERT INTO formacao (instituicao, curso, periodo, descricao) VALUES ${placeholders}`,
                values.flat()
            );
            console.log('Formação seedada no banco');
        }
    } catch (error) {
        console.error('Erro ao seedar formação:', error);
    }
}

async function seedExperiencias(experienciasData) {
    try {
        if (!pool) {
            console.log('Seed de experiências ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM experiencias');
        if (rows[0].count > 0) return;
        
        if (experienciasData.length > 0) {
            const values = experienciasData.map(e => [e.cargo, e.empresa, e.periodo, e.descricao]);
            const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');
            await pool.execute(
                `INSERT INTO experiencias (cargo, empresa, periodo, descricao) VALUES ${placeholders}`,
                values.flat()
            );
            console.log('Experiências seedadas no banco');
        }
    } catch (error) {
        console.error('Erro ao seedar experiências:', error);
    }
}

async function seedCertificacoes(certificacoesData) {
    try {
        if (!pool) {
            console.log('Seed de certificações ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM certificacoes');
        if (rows[0].count > 0) return;
        
        if (certificacoesData.length > 0) {
            const values = certificacoesData.map(c => [c.nome, c.emissor]);
            const placeholders = values.map(() => '(?, ?)').join(', ');
            await pool.execute(
                `INSERT INTO certificacoes (nome, emissor) VALUES ${placeholders}`,
                values.flat()
            );
            console.log('Certificações seedadas no banco');
        }
    } catch (error) {
        console.error('Erro ao seedar certificações:', error);
    }
}

async function seedContatos(contatosData) {
    try {
        if (!pool) {
            console.log('Seed de contatos ignorado: conexão não disponível');
            return;
        }
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM contatos');
        if (rows[0].count > 0) return;
        
        if (contatosData.length > 0) {
            const values = contatosData.map(c => [c.tipo, c.label, c.valor, c.link, c.ordem]);
            const placeholders = values.map(() => '(?, ?, ?, ?, ?)').join(', ');
            await pool.execute(
                `INSERT INTO contatos (tipo, label, valor, link, ordem) VALUES ${placeholders}`,
                values.flat()
            );
            console.log('Contatos seedados no banco');
        }
    } catch (error) {
        console.error('Erro ao seedar contatos:', error);
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
    getConnection: () => pool 
};