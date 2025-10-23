const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const mainRouters = require("./routes/main");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRouters);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
