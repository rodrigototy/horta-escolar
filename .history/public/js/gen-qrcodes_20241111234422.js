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

// Função para desenhar uma moldura com cantos arredondados
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.stroke();
}

// Função para gerar a imagem com texto e QR Code
const generateQRCodeWithTextAndFrame = async (plant) => {
  const canvas = createCanvas(500, 550); // Ajuste o tamanho conforme necessário
  const ctx = canvas.getContext('2d');

  // Fundo branco
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Moldura com cantos arredondados
  ctx.strokeStyle = '#4CAF50'; // Cor da moldura
  ctx.lineWidth = 5;
  drawRoundedRect(ctx, 10, 10, canvas.width - 20, canvas.height - 20, 20);

  // Adiciona o nome da planta
  ctx.font = '36px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(plant.name, canvas.width / 2, 75);

  // Gera o QR Code como um Data URL
  const qrCodeUrl = await QRCode.toDataURL(`https://horta-escolar.vercel.app/plant/${plant.id}`);

  // Carrega o QR Code gerado e adiciona ao canvas
  const qrImage = await loadImage(qrCodeUrl);
  ctx.drawImage(qrImage, 50, 100, 400, 400); // Posiciona o QR Code

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
