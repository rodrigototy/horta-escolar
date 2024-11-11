const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Carregar os dados do JSON
const plants = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'plants.json'), 'utf-8'));

// Configurações
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rota dinâmica para cada planta
app.get('/plant/:id', (req, res) => {
  const plant = plants.find(p => p.id === req.params.id);
  console
  if (plant) {
    res.render('plant', { title: plant.name, plant });
  } else {
    res.status(404).send('Planta não encontrada');
  }
});

// Exporta a função para Vercel
module.exports = app;
