const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurações
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Carregar os dados do JSON
const plants = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'plants.json'), 'utf-8'));

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Horta Escolar', plants });
});

// Rota dinâmica para cada planta
app.get('/plant/:id', (req, res) => {
  const plant = plants.find(p => p.id === req.params.id);
  if (plant) {
    res.render('plant', { title: plant.name, plant });
  } else {
    res.status(404).send('Planta não encontrada');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;