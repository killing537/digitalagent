'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ password }) });
    if (res.ok) { router.push('/admin'); router.refresh(); }
    else { alert('Password Salah'); }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="p-8 border rounded-lg shadow-lg">
        <h2 className="mb-4 font-bold">Admin Login</h2>
        <input 
          type="password" 
          className="border p-2 w-full mb-4" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="w-full bg-black text-white py-2 rounded">Masuk</button>
      </form>
    </div>
  );
}