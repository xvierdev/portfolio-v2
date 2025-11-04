const express = require("express");
const path = require("path");
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override'); 

const port = 3000;
const app = express();

const mainRouters = require("./routes/main");

// ----------------------------------------------------
// MIDDLEWARES ESSENCIAIS
// ----------------------------------------------------

// Serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));
// Processa dados de formulários HTML (url-encoded)
app.use(express.urlencoded({ extended: true }));
// Processa o corpo da requisição em JSON (ESSENCIAL para APIs)
app.use(express.json()); 
// Habilita PUT e DELETE em formulários HTML (via _method)
app.use(methodOverride('_method')); 

// ----------------------------------------------------
// CONFIGURAÇÃO DO VIEW ENGINE (EJS)
// ----------------------------------------------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejsLayouts);
app.set('layout', 'layout'); 


// ----------------------------------------------------
// ROTAS PRINCIPAIS
// ----------------------------------------------------

app.use("/", mainRouters);

// ----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// ----------------------------------------------------

app.listen(port, () => {
    console.log(`🎉 Servidor rodando em http://localhost:${port}`);
});