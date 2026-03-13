import { getProducts } from './actions';

export default async function Home() {
  const products = await getProducts();
  const availableProducts = products.filter(p => p.status === 'tersedia');

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Toko Digital</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableProducts.map((p) => (
          <div key={p.id} className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
            <img src={p.url_preview} className="w-full h-48 object-cover" alt={p.nama} />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{p.nama}</h2>
              <p className="text-blue-600 font-bold mb-4">Rp {Number(p.harga).toLocaleString()}</p>
              <a 
                href={`https://t.me/UsernameBotKamu?start=${p.id}`}
                className="block text-center bg-black text-white py-2 rounded-lg font-medium"
              >
                Beli & Dapatkan QRIS
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}