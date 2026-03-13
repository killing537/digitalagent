'use client'
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [formData, setFormData] = useState({ id: '', nama: '', harga: '', deskripsi: '' });
  const [urls, setUrls] = useState({ preview: '', asli: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Panggil Server Action untuk simpan ke Google Sheets
    const res = await fetch('/api/products/add', {
        method: 'POST',
        body: JSON.stringify({ ...formData, ...urls, status: 'tersedia' })
    });
    if (res.ok) router.push('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="ID Produk (e.g P001)" onChange={e => setFormData({...formData, id: e.target.value})} />
        <input className="w-full p-2 border rounded" placeholder="Nama Produk" onChange={e => setFormData({...formData, nama: e.target.value})} />
        <input className="w-full p-2 border rounded" type="number" placeholder="Harga (Angka saja)" onChange={e => setFormData({...formData, harga: e.target.value})} />
        
        <div className="border-dashed border-2 p-4 rounded text-center">
          <p className="mb-2 font-medium">Upload Preview (Gambar/Video Kecil)</p>
          <UploadButton endpoint="productUploader" onClientUploadComplete={(res) => setUrls({...urls, preview: res[0].url})} />
          {urls.preview && <p className="text-xs text-green-600 mt-2">Preview siap!</p>}
        </div>

        <div className="border-dashed border-2 p-4 rounded text-center">
          <p className="mb-2 font-medium">Upload File Asli (Kualitas Tinggi)</p>
          <UploadButton endpoint="productUploader" onClientUploadComplete={(res) => setUrls({...urls, asli: res[0].url})} />
          {urls.asli && <p className="text-xs text-green-600 mt-2">File Asli siap!</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Simpan ke Google Sheets</button>
      </form>
    </div>
  );
}