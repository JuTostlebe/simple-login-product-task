'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/api/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token);
        router.push('/home');
      } else {
        setError('Väärä käyttäjätunnus/salasana');
      }
    } catch (error) {
      setError('Jokin meni pieleen. Yritä uudelleen.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 p-8 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Tervetuloa</h1>
        <p className="text-gray-400 text-center mb-6">Kirjaudu sisään jatkaaksesi</p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Käyttäjätunnus</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              placeholder="Anna käyttäjätunnus"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Salasana</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              placeholder="Anna salasana"
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full p-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Kirjaudutaan sisään...' : 'Kirjaudu'}
          </button>
        </form>
      </div>
    </div>
  );
}