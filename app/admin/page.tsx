import { getProducts, confirmPayment } from '../actions';

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Verifikasi Pembayaran</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Produk</th>
              <th className="p-4">Status</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4">{p.nama}</td>
                <td className="p-4">{p.status}</td>
                <td className="p-4">
                  {p.status === 'tersedia' && (
                    <form action={async () => { 'use server'; await confirmPayment(p.id); }}>
                      <button className="bg-green-600 text-white px-4 py-1 rounded">Lunas</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}