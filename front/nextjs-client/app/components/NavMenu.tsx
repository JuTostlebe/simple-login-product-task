'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function NavMenu() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };
  
  return (
    <nav className="bg-gray-800 p-4 shadow-md mb-6 rounded-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link 
            href="/home" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Tuotteet
          </Link>
          <Link 
            href="/search" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Haku
          </Link>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
          Kirjaudu ulos
        </button>
      </div>
    </nav>
   );
}