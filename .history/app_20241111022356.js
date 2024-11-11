const express = require('express');
const app = express();
const path = require('path');
const data = require('./data/plants.json');

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Página inicial
app.get('/', (req, res) => {
  res.render('index', { plants: data });
});

// Página específica da planta
app.get('/plant/:id', (req, res) => {
  const plant = data.find(p => p.id === req.params.id);
  if (plant) {
    res.render('plant', { plant });
  } else {
    res.status(404).send('Planta não encontrada');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
