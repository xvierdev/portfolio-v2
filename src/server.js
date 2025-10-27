const express = require("express");
const path = require("path");
const ejsLayouts = require('express-ejs-layouts');
const port = 3000;
const app = express();

const mainRouters = require("./routes/main");

// --- CONFIGURAÇÃO DE MIDDLEWARES ---

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// --- CONFIGURAÇÃO DO VIEW ENGINE (EJS) E LAYOUTS ---

// 1. Primeiro, defina qual view engine será usado
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 2. Agora, com o engine definido, aplique o middleware de layouts
app.use(ejsLayouts);

// 3. (Opcional) Defina o nome do arquivo de layout padrão
app.set('layout', 'layout'); 


// --- ROTAS ---
app.use("/", mainRouters);


// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});