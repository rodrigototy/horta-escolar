const express = require('express');
const fs = require('fs');
const path = require('path');
const plantRoutes = require('./plant');
const helmet = require('helmet');

const app = express();

// Carregar os dados do JSON
const plants = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'plants.json'), 'utf-8'));

// Configurações
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Configuração do Helmet com CSP personalizada
app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "https://vercel.live"] } } }));
// Rota para plantas
app.use('/plant', plantRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Horta Escolar', plants });
});

// Exporta a função para Vercel
module.exports = app;
