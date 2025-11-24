const express = require("express");
const path = require("path");
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override'); 
const { connectDB, seedProjetos, seedCompetencias, seedSobreMim, seedFormacao, seedExperiencias, seedCertificacoes, seedContatos, getConnection } = require('./db');
const portfolioData = require('../data');

const port = 3000;
const app = express();

const mainRouters = require("./routes/main");

// Serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));
// Processa dados de formulários HTML (url-encoded)
app.use(express.urlencoded({ extended: true }));
// Processa o corpo da requisição em JSON (ESSENCIAL para APIs)
app.use(express.json()); 
// Habilita PUT e DELETE em formulários HTML (via _method)
app.use(methodOverride('_method')); 

// CONFIGURAÇÃO DO VIEW ENGINE (EJS)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejsLayouts);
app.set('layout', 'layout'); 

// ROTAS PRINCIPAIS

app.use("/", mainRouters);

// ----------------------------------------------------
// INICIALIZAÇÃO DO BANCO DE DADOS E SERVIDOR
// ----------------------------------------------------

(async () => {
    // Iniciar servidor imediatamente
    app.listen(port, () => {
        console.log(`🎉 Servidor rodando em http://localhost:${port}`);
    });
    
    // Executar seeds em background (não bloqueia o servidor)
    try {
        await connectDB();
        await Promise.all([
            seedProjetos(portfolioData.projetos),
            seedCompetencias(portfolioData.competencias),
            seedSobreMim(portfolioData.profile.biografia),
            seedFormacao(portfolioData.formacao),
            seedExperiencias(portfolioData.experiencias),
            seedCertificacoes(portfolioData.certificacoes),
            seedContatos(portfolioData.contatos)
        ]);
        console.log('✅ Seeds completados');
    } catch (err) {
        console.error('Erro ao iniciar seeds:', err);
    }
})();

// ----------------------------------------------------
// HANDLERS DE ERRO GLOBAIS
// ----------------------------------------------------
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});