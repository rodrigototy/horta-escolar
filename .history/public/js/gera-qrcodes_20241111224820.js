const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const data = require("./data/plants.json");

// Diretório de saída
const outputDir = path.join(__dirname, "static", "qr-codes");

// Certifique-se de que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

data.forEach((plant) => {
  const outputFile = path.join(outputDir, `${plant.id}.png`);
  const url = `https://horta-escolar.vercel.app/plant/${plant.id}`;

  QRCode.toFile(outputFile, url, (err) => {
    if (err) {
      console.error(`Erro ao gerar QR Code para ${plant.name}:`, err);
    } else {
      console.log(`QR Code gerado para ${plant.name}`);
    }
  });
});
