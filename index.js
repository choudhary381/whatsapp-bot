const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🚀 WhatsApp Bot Railway پر شروع ہو رہا ہے...');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/google-chrome-stable'
    }
});

// QR Code
client.on('qr', (qr) => {
    console.log('\n📱 QR Code اسکین کریں:');
    qrcode.generate(qr, { small: true });
});

// Ready
client.on('ready', () => {
    console.log('✅ WhatsApp Bot تیار ہے!');
});

// Messages
client.on('message', async (message) => {
    if (message.fromMe) return;
    
    if (message.body.toLowerCase() === 'ہیلو' || message.body.toLowerCase() === 'hello') {
        await message.reply('اسلام علیکم! میں Railway پر ہوسٹڈ WhatsApp Bot ہوں۔');
    }
});

// Start bot
client.initialize();

