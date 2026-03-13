const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  const productId = ctx.startPayload; // Mengambil ID dari URL: t.me/bot?start=ID

  if (productId) {
    ctx.reply(`📦 Pesanan Produk ID: ${productId}\n\nSilakan selesaikan pembayaran agar admin bisa mengirimkan file asli.\n\n🏦 BANK BCA: 1234567890\n👤 A/N: NAMA KAMU\n💰 Total: (Cek harga di web)`);
    
    // Kirim QRIS (Gunakan URL QRIS kamu yang sudah diupload ke Uploadthing)
    ctx.sendPhoto('https://utfs.io/f/link-qris-kamu.png', {
      caption: 'Kirim bukti transfer ke sini setelah membayar.'
    });
  } else {
    ctx.reply('Halo! Silakan pilih produk di website kami terlebih dahulu.');
  }
});

bot.launch();