// --- LÓGICA DOS OLHOS DO NOTEBOOK ---
const eyes = document.querySelectorAll('.eye');

// Função centralizada para mover as pupilas
function moveEyes(x, y) {
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        const eyeRect = eye.getBoundingClientRect();
        
        const eyeCenterX = eyeRect.left + (eyeRect.width / 2);
        const eyeCenterY = eyeRect.top + (eyeRect.height / 2);
        
        const angle = Math.atan2(y - eyeCenterY, x - eyeCenterX);
        const distanceLimit = 10;
        
        const distance = Math.min(
            Math.hypot(x - eyeCenterX, y - eyeCenterY) / 15, 
            distanceLimit
        );
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
}

// 1. Mouse no computador
document.addEventListener('mousemove', (e) => {
    moveEyes(e.clientX, e.clientY);
});

// 2. Dedo deslizando no celular
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveEyes(touch.clientX, touch.clientY);
}, { passive: true });

// 3. Soltou o dedo do celular (volta pro centro)
document.addEventListener('touchend', () => {
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        pupil.style.transform = `translate(0px, 0px)`; 
    });
}, { passive: true });


// --- LÓGICA DA CHUVA MATRIX ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Textos variados caindo
const characters = 'HTML CSS JS REACT <>{}[]/\\ 0101010 WEB DEV VENDAS'.split('');
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];

// Inicia as gotas
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    // Fundo semitransparente para criar o rastro
    ctx.fillStyle = 'rgba(11, 15, 25, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cor e fonte do texto que cai
    ctx.fillStyle = '#00f3ff';
    ctx.font = fontSize + 'px Space Grotesk';

    for (let i = 0; i < drops.length; i++) {
        // Puxa uma letra aleatória
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Manda a gota de volta pro topo aleatoriamente
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
// Velocidade da chuva
setInterval(drawMatrix, 50);


// --- INICIA EFEITO 3D NOS CARDS ---
VanillaTilt.init(document.querySelectorAll(".card, .servico-card"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.1
});
// ==========================================
// LÓGICA DO FORMULÁRIO (EMAIL + WHATSAPP)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const formContato = document.getElementById('form-contato');

    if (formContato) {
        formContato.addEventListener('submit', function(event) {
            // Pegando os valores que o usuário digitou
            const nome = document.getElementById('nome').value;
            const tipo = document.getElementById('tipo').value;
            const mensagem = document.getElementById('mensagem').value;

            // O seu número de WhatsApp com o DDD (O mesmo que você já usa no flutuante)
            const numeroWhatsApp = "5562994613564"; 

            // Montando o texto que vai chegar no seu WhatsApp
            const textoWhatsApp = `Olá Ricardo! Meu nome é ${nome}. Tenho interesse em um projeto para ${tipo}.\n\nDetalhes: ${mensagem}`;

            // Criando o link do WhatsApp
            const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

            // Abre o WhatsApp em uma nova aba
            window.open(linkWhatsApp, '_blank');

            // Depois de abrir o WhatsApp, o formulário continua o processo padrão 
            // e envia os dados para o seu email via FormSubmit.
        });
    }
});
