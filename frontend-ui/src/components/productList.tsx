'use client';

import React, { useEffect, useState } from 'react';
import { Product, fetchProducts, deleteProduct, searchProducts, SearchProductDto } from '../lib/api';
import ProductItem from './productItem';
import { useAuth } from '../context/authContext';
import ProductFilters from './ProductFilters';

interface ProductListProps {
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  category?: string;
}

export default function ProductList({
  minPrice = 0,
  maxPrice = Infinity,
  sortBy = 'price_asc',
  category = 'all'
}: ProductListProps) {
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchProductDto>({
    name: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await searchProducts(searchParams);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to search products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value ? Number(value) : undefined
    }));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Failed to delete product. You might not be logged in or have permission.');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 relative min-h-screen">
      {/* Main Content - Product Grid */}
      <div className="lg:w-3/4">        
        {products.length === 0 ? (
          <div className="text-center py-4 bg-white rounded-lg shadow-sm">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(product => (
              <ProductItem key={product.id} product={product} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <ProductFilters
        searchParams={searchParams}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        onPriceChange={handlePriceChange}
      />
    </div>
  );
}