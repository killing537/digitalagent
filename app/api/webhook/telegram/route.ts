import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

bot.start((ctx) => {
  const productId = ctx.startPayload;
  if (productId) {
    ctx.reply(`📦 Pesanan Produk ID: ${productId}\n\nSilakan transfer ke:\n🏦 BCA: 1234567890\n👤 A/N: Nama Kamu`);
    ctx.sendPhoto('https://utfs.io/f/link-qris-kamu.png');
  } else {
    ctx.reply('Halo! Silakan pilih produk di website.');
  }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}