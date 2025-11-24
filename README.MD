# 🧑‍💻 Portfólio Pessoal | Express.js + MySQL

## 🚀 Sobre o Projeto

Aplicação web full-stack para gerenciamento de portfólio pessoal com sistema CRUD completo. Desenvolvida com Node.js, Express 5, MySQL e EJS templates, oferece interface interativa para administração de projetos, experiências, formação, competências e contatos.

**📚 Contexto Acadêmico:**
Projeto desenvolvido para a disciplina de Engenharia de Software II, ministrada pelo Professor Claudio Etelvino Lima.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** v24.6.0
- **Express.js** v5.1.0 (framework web)
- **MySQL2** v3.15.3 (banco de dados com promises)
- **Method Override** v3.0.0 (suporte PUT/DELETE em formulários)

### Frontend
- **EJS** v3.1.10 (template engine)
- **Express EJS Layouts** v2.5.1 (sistema de layouts)
- **CSS3** (variáveis CSS, flexbox, grid)

### Ferramentas de Desenvolvimento
- **Nodemon** v3.1.10 (auto-reload do servidor)
- **Browser-sync** v3.0.4 (live reload do navegador)
- **Concurrently** v9.2.1 (execução paralela de scripts)
- **ESLint** v9.38.0 (linter JavaScript)
- **PNPM** v10.19.0 (gerenciador de pacotes)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **MySQL** (versão 8.0 ou superior)
- **PNPM** (recomendado) ou NPM

---

## ⚙️ Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/xvierdev/portfolio-v2.git
cd portfolio-v2
```

### 2. Instale as Dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure o Banco de Dados

**⚠️ IMPORTANTE:** Edite o arquivo `src/db.js` (linhas 4-9) e altere a senha:

```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'SUA_SENHA_AQUI',  // ← ALTERE AQUI
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
```

**📖 Guia completo:** Consulte o arquivo `CONFIGURACAO_MYSQL.md` para instruções detalhadas.

O banco de dados `portfolio_db` e todas as tabelas serão criados automaticamente na primeira execução.

### 4. Execute o Projeto

**Modo Desenvolvimento** (com hot-reload):
```bash
pnpm dev
# ou
npm run dev
```

**Modo Produção**:
```bash
pnpm start
# ou
npm start
```

O servidor estará disponível em: **http://localhost:3000**

---

## 📁 Estrutura do Projeto

```
portfolio-v2/
├── src/
│   ├── server.js          # Inicialização do servidor Express
│   ├── db.js              # Configuração MySQL e seeds
│   ├── routes/
│   │   └── main.js        # Todas as rotas (51 endpoints)
│   ├── views/             # Templates EJS
│   │   ├── layout.ejs     # Layout principal
│   │   ├── index.ejs      # Página inicial
│   │   ├── projetos.ejs   # Gerenciamento de projetos
│   │   ├── formacao.ejs   # Formação acadêmica
│   │   ├── experiencias.ejs
│   │   ├── competencias.ejs
│   │   ├── contatos.ejs
│   │   ├── recados.ejs
│   │   └── partials/
│   │       └── menu.ejs   # Menu de navegação
│   └── public/
│       ├── css/
│       │   └── style.css  # Estilos globais
│       └── img/           # Imagens estáticas
├── data.js                # Dados estáticos (fallback)
├── package.json
├── eslint.config.js
└── README.md
```

---

## 🎯 Funcionalidades

### CRUD Completo
- ✅ **Projetos**: Título, tecnologias, descrição, links (GitHub/Demo)
- ✅ **Formação**: Instituição, curso, período, descrição
- ✅ **Experiências**: Cargo, empresa, período, descrição
- ✅ **Competências**: Técnicas e interpessoais
- ✅ **Certificações**: Nome e emissor
- ✅ **Contatos**: Tipo, label, valor, link, ordem
- ✅ **Recados**: Nome e mensagem (área pública)
- ✅ **Sobre Mim**: Biografia editável

---

## 🗄️ Banco de Dados

### Tabelas Criadas Automaticamente

- `recados` - Mensagens públicas
- `projetos` - Portfólio de projetos
- `competencias` - Habilidades técnicas/interpessoais
- `sobre_mim` - Biografia
- `formacao` - Formação acadêmica
- `experiencias` - Experiência profissional
- `certificacoes` - Certificados
- `contatos` - Informações de contato

---

## 🔗 Rotas da API

### Views (11 rotas)
- `GET /` - Página inicial
- `GET /formacao` - Formação
- `GET /projetos` - Projetos
- `GET /competencias` - Competências
- `GET /experiencias` - Experiências
- `GET /contatos` - Contatos
- `GET /recados` - Recados
- `GET /projetos/edit/:id` - Editar projeto
- `GET /formacao/edit/:id` - Editar formação
- `GET /experiencias/edit/:id` - Editar experiência
- `GET /recados/edit/:id` - Editar recado

### API REST (40 endpoints)
Cada recurso possui 5 operações CRUD:
- `GET /api/:resource` - Listar todos
- `GET /api/:resource/:id` - Buscar por ID
- `POST /api/:resource` - Criar novo
- `PUT /api/:resource/:id` - Atualizar
- `DELETE /api/:resource/:id` - Deletar

**Recursos disponíveis:** recados, projetos, competencias, sobre-mim, formacao, experiencias, certificacoes, contatos

---

## 📝 Scripts Disponíveis

```bash
pnpm dev      # Desenvolvimento com hot-reload
pnpm start    # Produção
pnpm lint     # Verificar código com ESLint
```

---

## 👤 Autor

**Wesley Xavier**
- GitHub: [@xvierdev](https://github.com/xvierdev)

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
