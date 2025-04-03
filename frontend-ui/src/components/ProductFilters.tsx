import React from 'react';
import { SearchProductDto } from '../lib/api';

interface ProductFiltersProps {
  searchParams?: SearchProductDto;
  onSearch?: (e: React.FormEvent) => Promise<void>;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductFilters({
  searchParams,
  onSearch,
  onInputChange,
  onPriceChange
}: ProductFiltersProps) {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-lg sticky top-4">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4">
            Filter Products
          </h2>
          <form onSubmit={onSearch} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={searchParams?.name}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all"
                  placeholder="Search by name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Minimum Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="minPrice"
                    value={searchParams?.minPrice || ''}
                    onChange={onPriceChange}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all"
                    placeholder="Min price"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Maximum Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={searchParams?.maxPrice || ''}
                    onChange={onPriceChange}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all"
                    placeholder="Max price"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 