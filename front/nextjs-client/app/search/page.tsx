'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavMenu from '../components/NavMenu';

export default function Search() {
  const [eanCode, setEanCode] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/product/${eanCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
      <NavMenu />
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            value={eanCode}
            onChange={(e) => setEanCode(e.target.value)}
            placeholder="Anna EAN koodi..."
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Hae</button>
        </form>
      </div>
    </div>
  );
}