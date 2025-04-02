'use client';

import { useState } from 'react';
import ProductList from '../components/productList';
import AddProductForm from '../components/addProductForm';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleProductAdded = () => {
    // Increment refresh trigger to reload the product list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Catalog</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <ProductList key={refreshTrigger} />
        </div>
        
        <div className="lg:col-span-1">
          <AddProductForm onProductAdded={handleProductAdded} />
        </div>
      </div>
    </main>
  );
}