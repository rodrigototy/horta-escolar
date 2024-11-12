const QRCode = require('qrcode');
const data = require('./data/plants.json');

data.forEach(plant => {
  QRCode.toFile(`./static/qrcodes/${plant.id}.png`, `https://horta-escolar.vercel.app/plant/${plant.id}`, (err) => {
    if (err) console.error(err);
    else console.log(`QR Code gerado para ${plant.name}`);
  });
});
