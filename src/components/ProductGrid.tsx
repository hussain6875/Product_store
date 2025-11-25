import { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 89.99, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Leather Wallet', category: 'Accessories', price: 34.99, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'Running Shoes', category: 'Footwear', price: 79.99, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'Sunglasses', category: 'Accessories', price: 49.99, image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', price: 59.99, image: 'https://images.pexels.com/photos/1279365/pexels-photo-1279365.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Backpack', category: 'Accessories', price: 44.99, image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Laptop Stand', category: 'Electronics', price: 39.99, image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: 9, name: 'Water Bottle', category: 'Accessories', price: 19.99, image: 'https://images.pexels.com/photos/3747446/pexels-photo-3747446.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function ProductGrid() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');

    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleAddToCart = useCallback((product: Product) => {
    console.log('Adding to cart:', product.name);
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Store</h1>
          <p className="text-gray-600">Optimized with React.memo, useMemo, and useCallback</p>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <span className="text-gray-600">Cart: </span>
            <span className="font-bold text-blue-600">{cart.length}</span>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Optimizations Explained</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-blue-600 mb-1">React.memo (ProductCard)</h3>
              <p>Prevents re-rendering of ProductCard components when parent updates unless their props change. Check console logs to see that only necessary cards re-render.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-1">useMemo (filteredProducts)</h3>
              <p>Memoizes the filtered product list calculation. The expensive filtering operation only runs when searchQuery or products array changes, not on every render.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-1">useCallback (handleAddToCart)</h3>
              <p>Stabilizes the function reference across renders. Without it, ProductCard would re-render every time because it would receive a new function instance, breaking React.memo optimization.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
