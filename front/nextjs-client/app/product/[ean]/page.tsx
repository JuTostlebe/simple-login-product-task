'use client';
import { use } from 'react';
import { useEffect, useState } from 'react';
import NavMenu from '../../components/NavMenu';
import Cookies from 'js-cookie';

interface NutritionalInfo {
  energy: number;
  fat: number;
  carbohydrates: number;
  protein: number;
  salt: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  packageSize: string;
  eanCode: string;
  ingredients: string;
  nutritionalInfoId: number;
  nutritionalInfo: NutritionalInfo;
  dietaryInfo: string;
  imageUrl: string;
}

export default function ProductDetail({ params }: { params: Promise<{ ean: string }> }) {
    const { ean } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const token = Cookies.get('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Search/${ean}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchProduct();
    }, [ean]);

  if (!product) return <div>Lataa...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <NavMenu />
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-full">
                    <img 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                    alt={product.name}
                    className="rounded-lg m-auto"
                    />
                </div>
                <div className="space-y-6 text-gray-300">
                    <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                    <p className="text-gray-400">{product.description}</p>
                    
                    <div className="space-y-2">
                        <p>Pakkauskoko: {product.packageSize}</p>
                        <p>EAN: {product.eanCode}</p>
                        <p>Ainesosat: {product.ingredients}</p>
                    </div>
        
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">Ravintosisältö (per 100g)</h2>
                        <p>Energia: {product.nutritionalInfo.energy} kcal</p>
                        <p>Rasva: {product.nutritionalInfo.fat}g</p>
                        <p>Hiilihydraatit: {product.nutritionalInfo.carbohydrates}g</p>
                        <p>Proteiini: {product.nutritionalInfo.protein}g</p>
                        <p>Suola: {product.nutritionalInfo.salt}g</p>
                    </div>
        
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Erityisruokavaliot</h2>
                        <div className="flex flex-wrap gap-2">
                        {product.dietaryInfo.split(',').map((info, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-600 rounded-full text-white text-sm">
                            {info.trim()}
                            </span>
                        ))}
                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
   );
}