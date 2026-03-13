'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Masukkan Password Admin"
          className={`w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 ${error ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">Password salah, silakan coba lagi.</p>}
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
          Masuk Dashboard
        </button>
      </form>
    </div>
  );
}