const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Home - Portfólio',
        mensagem: 'Em desenvolvimento [...]'
    });
});

module.exports = router;