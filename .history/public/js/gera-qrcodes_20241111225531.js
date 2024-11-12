const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

// Carregar os dados do JSON
const plants = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "..", "data", "plants.json"), "utf-8")
);

// Diretório de saída
const outputDir = path.join(__dirname, "..", "public", "qr-codes");

// Certifique-se de que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

plants.forEach((plant) => {
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
