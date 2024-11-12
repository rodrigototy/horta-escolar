const QRCode = require("qrcode");
const { createCanvas, loadImage } = require('canvas');

const fs = require("fs");
const path = require("path");

// Carregar os dados do JSON
const plants = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "..", "data", "plants.json"), "utf-8")
);

// Diretório de saída
const outputDir = path.join(__dirname, "..", "qr-codes");

// Certifique-se de que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Função para gerar a imagem com texto e QR Code
const generateQRCodeWithText = async (plant) => {
  const canvas = createCanvas(300, 350); // Ajuste o tamanho conforme necessário
  const ctx = canvas.getContext('2d');

  // Fundo branco
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Adiciona o nome da planta
  ctx.font = '28px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(plant.name, canvas.width / 2, 30);

  // Gera o QR Code como um Data URL
  const qrCodeUrl = await QRCode.toDataURL(`https://horta-escolar.vercel.app/plant/${plant.id}`);

  // Carrega o QR Code gerado e adiciona ao canvas
  const qrImage = await loadImage(qrCodeUrl);
  ctx.drawImage(qrImage, 50, 50, 200, 200); // Posiciona o QR Code

  // Salva a imagem final no diretório
  const outputFile = path.join(outputDir, `${plant.id}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputFile, buffer);
  console.log(`QR Code com texto gerado para ${plant.name}`);
};

// Gera QR codes para todas as plantas
plants.forEach(plant => {
  generateQRCodeWithText(plant).catch(err => {
    console.error(`Erro ao gerar QR Code para ${plant.name}:`, err);
  });
});
