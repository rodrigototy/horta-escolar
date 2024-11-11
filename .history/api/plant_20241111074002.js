const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const app = express();

// Carregar os dados do JSON
const plants = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'plants.json'), 'utf-8'));

// Configurações
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rota dinâmica para exibir detalhes de uma planta
router.get('/:id', (req, res) => {
  const plant = plants.find(p => p.id === req.params.id);
  if (plant) {
    res.render('plant', { title: plant.name, plant });
  } else {
    res.status(404).send('Planta não encontrada');
  }
});

// Exporta a rota para Vercel
module.exports = router;
