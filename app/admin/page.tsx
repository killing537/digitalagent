import { getProducts, confirmPayment } from '../actions';
import Link from 'next/link';

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/add" className="bg-black text-white px-4 py-2 rounded-lg"> + Tambah Produk </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Status</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-4">
                  <p className="font-semibold">{p.nama}</p>
                  <p className="text-xs text-gray-500">ID: {p.id}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${p.status === 'tersedia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {p.status === 'tersedia' && (
                    <form action={async () => { 'use server'; await confirmPayment(p.id); }}>
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Lunas & Sold Out</button>
                    </form>
                  )}
                  <a href={p.url_asli} target="_blank" className="bg-gray-200 px-3 py-1 rounded text-sm">Cek File</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}