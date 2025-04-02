import React from 'react';
import { Product } from '../lib/api';
import { useAuth } from '../context/authContext';

interface ProductItemProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductItem({ product, onDelete }: ProductItemProps) {
  const { isLoggedIn } = useAuth();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-green-600 font-medium">${product.price.toFixed(2)}</p>
      {product.description && (
        <p className="text-gray-600 mt-2">{product.description}</p>
      )}
      {isLoggedIn && (
        <button
          onClick={handleDelete}
          className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}