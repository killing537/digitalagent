'use server'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { revalidatePath } from 'next/cache';

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, auth);

export async function getProducts() {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  return rows.map(row => ({
    id: row.get('id'),
    nama: row.get('nama'),
    harga: row.get('harga'),
    url_preview: row.get('url_preview'),
    url_asli: row.get('url_asli'),
    status: row.get('status'),
  }));
}

export async function confirmPayment(productId: string) {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const row = rows.find(r => r.get('id') === productId);
  if (row) {
    row.set('status', 'sold out');
    await row.save();
    revalidatePath('/');
    revalidatePath('/admin');
  }
}