'use client';

import React, { useEffect, useState } from 'react';
import { Product, fetchProducts, deleteProduct } from '../lib/api';
import ProductItem from './productItem';
import { useAuth } from '../context/authContext';

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

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products.filter(product => {
      const price = product.price;
      const matchesPrice = price >= minPrice && price <= maxPrice;
      const matchesCategory = category === 'all' || product.category === category;
      return matchesPrice && matchesCategory;
    });

    switch (sortBy) {
      case 'price_asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name_asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [products, minPrice, maxPrice, sortBy, category]);

  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (filteredAndSortedProducts.length === 0) {
    return <div className="text-center py-4">No products found matching your criteria.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAndSortedProducts.map(product => (
        <ProductItem key={product.id} product={product} onDelete={handleDelete} />
      ))}
    </div>
  );
}