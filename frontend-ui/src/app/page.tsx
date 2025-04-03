'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProductList from '../components/productList';
import AddProductForm from '../components/addProductForm';
import { useSearchParams } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import Navbar from '@/components/navbar';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we should show the add form based on URL parameter
    const shouldShowAddForm = searchParams.get('add') === 'true';
    if (shouldShowAddForm) {
      setShowAddForm(true);
    }
  }, [searchParams]);

  const handleProductAdded = () => {
    // Increment refresh trigger to reload the product list
    setRefreshTrigger(prev => prev + 1);
    setShowAddForm(false); // Hide the form after adding a product
  };

  return (
    <><Navbar /><main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Product Catalog
            </h1>
            <Button
              type="primary"
              className="!font-semibold !text-lg !px-8 !py-5 flex items-center gap-3 hover:!scale-105 transition-transform !shadow-lg hover:!shadow-xl"
              onClick={() => setShowAddForm(true)}
            >
              <PlusOutlined className="text-xl" />
              <span>Add Product</span>
            </Button>
          </div>

          <div className="w-full">
            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-8 text-gray-700">Products</h2>
              <ProductList key={refreshTrigger} />
            </div>
          </div>

          <AddProductForm
            visible={showAddForm}
            onProductAdded={handleProductAdded}
            onClose={() => setShowAddForm(false)} />
        </div>
      </div>
    </main></>
  );
}