const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const fontSize = 16;
const columns = canvas.width/fontSize;
const drops = [];
const specificText = ['HACK', 'ISHRAQ', 'UITS','PWNED'];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function draw() {
  context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  context.fillRect(0, 0, width, height);

  context.fillStyle = 'rgb(0, 255, 0)';
  context.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    let text;
    if (Math.random() < 0.005) { // Adjusted probability to 3% for specific text
      text = specificText[Math.floor(Math.random() * specificText.length)];
    } else {
      text = randomChar();
    }
    context.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 1;
    }

    drops[i]++;
  }
}

function randomChar() {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

setInterval(draw, 60);
