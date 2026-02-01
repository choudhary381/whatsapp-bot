const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('WhatsApp Bot شروع ہو رہا ہے...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR Code دکھائیں
client.on('qr', (qr) => {
    console.log('\n📱 نیچے دیے گئے QR کوڈ کو WhatsApp میں اسکین کریں:');
    qrcode.generate(qr, { small: true });
});

// جب WhatsApp تیار ہو جائے
client.on('ready', () => {
    console.log('✅ WhatsApp Bot تیار ہے!');
    console.log('Bot اب میسجز کا جواب دے سکتا ہے۔');
});

// میسجز پڑھیں
client.on('message', async (message) => {
    console.log(`📩 نیا میسج: ${message.body}`);

    // صرف user messages کا جواب دیں (group messages کو نظر انداز کریں)
    if (message.fromMe) return;

    // سادہ جواب
    if (message.body.toLowerCase() === 'ہیلو' || message.body.toLowerCase() === 'hello') {
        await message.reply('اسلام علیکم! میں WhatsApp AI بوٹ ہوں۔');
    }
});

// Bot شروع کریں
client.initialize();


console.log('Bot چل رہا ہے...');
