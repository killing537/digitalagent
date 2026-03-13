import { getProducts, confirmPayment } from '../actions';

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Panel Verifikasi Pembayaran</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Produk</th>
              <th className="p-4">Status</th>
              <th className="p-4">Link File Asli</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4 font-medium">{p.nama}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.status === 'tersedia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4">
                  <a href={p.url_asli} className="text-blue-500 underline text-sm" target="_blank">Cek File</a>
                </td>
                <td className="p-4">
                  {p.status === 'tersedia' && (
                    <form action={async () => { 'use server'; await confirmPayment(p.id); }}>
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Konfirmasi Lunas</button>
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