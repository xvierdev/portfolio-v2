const express = require("express");
const path = require("path");
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override'); 
const { connectDB, seedProjetos, seedCompetencias, seedSobreMim, seedFormacao, seedExperiencias, seedCertificacoes, seedContatos } = require('./db');
const portfolioData = require('../data');

const port = 3000;
const app = express();

const mainRouters = require("./routes/main");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejsLayouts);
app.set('layout', 'layout');

app.use("/", mainRouters);

(async () => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
    
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
        console.log('Seeds completados');
    } catch (err) {
        console.error('Erro ao iniciar seeds:', err);
    }
})();

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});