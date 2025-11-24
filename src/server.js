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
    try {
        await connectDB();
        await seedProjetos(portfolioData.projetos);
        await seedCompetencias(portfolioData.competencias);
        await seedSobreMim(portfolioData.profile.biografia);
        await seedFormacao(portfolioData.formacao);
        await seedExperiencias(portfolioData.experiencias);
        await seedCertificacoes(portfolioData.certificacoes);
        await seedContatos(portfolioData.contatos);
    } catch (err) {
        console.error('Erro ao iniciar seeds:', err);
    }
    app.listen(port, () => {
        console.log(`🎉 Servidor rodando em http://localhost:${port}`);
    });
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