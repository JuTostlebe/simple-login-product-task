'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavMenu from '../components/NavMenu';
import Cookies from 'js-cookie';
import FilterBar, { Filters } from '../components/FilterBar';

interface Product {
  id: number;
  name: string;
  description: string;
  packageSize: string;
  eanCode: string;
  ingredients: string;
  nutritionalInfoId: number;
  dietaryInfo: string;
  imageUrl: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleProductClick = (eanCode: string) => {
      router.push(`/product/${eanCode}`);
     };

    useEffect(() => {
      setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/api/Products`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [router]);

    const handleFilter = (filters: Filters) => {
      let filtered = products;
      
      if (filters.search) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.eanCode.includes(filters.search)
        );
      }
  
      setFilteredProducts(filtered);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <NavMenu />
                <FilterBar onFilterChange={handleFilter} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:bg-gray-700 transition-colors"
                            onClick={() => handleProductClick(product.eanCode)}>
                            <img 
                                src={`https://${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`} 
                                alt={product.name}
                                className="w-full h-48 pt-6 object-contain"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                                <p className="text-gray-400 text-sm mb-4">{product.packageSize}</p>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-400 text-sm">
                                        EAN: {product.eanCode}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-gray-400 text-sm line-clamp-3">
                                        {product.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                    {product.dietaryInfo.split(',').map((info, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                                        >
                                            {info}
                                        </span>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}