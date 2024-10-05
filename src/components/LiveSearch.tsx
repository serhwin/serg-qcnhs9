import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Truck } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  articleNumber: string;
  analogue: string;
  company: string;
  brand: string;
  price: number;
  quantity: number;
}

interface LiveSearchProps {
  onSearch: (query: string) => void;
  products: Product[];
}

const LiveSearch: React.FC<LiveSearchProps> = ({ onSearch, products }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  const filterProducts = useCallback(() => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.articleNumber.toLowerCase().includes(query.toLowerCase()) ||
      product.analogue.toLowerCase().includes(query.toLowerCase())
    );

    // Group products by article number and select the first one
    const uniqueProducts = Object.values(
      filteredProducts.reduce((acc, product) => {
        if (!acc[product.articleNumber]) {
          acc[product.articleNumber] = product;
        }
        return acc;
      }, {} as { [key: string]: Product })
    );

    return uniqueProducts;
  }, [query, products]);

  useEffect(() => {
    const filteredProducts = filterProducts();
    setResults(filteredProducts);
  }, [filterProducts]);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Пошук запчастин за назвою або артикулом..."
          className="w-full px-4 py-2 pl-10 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-500 bg-white text-gray-800 placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
      </div>
      {query && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-blue-200 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((product) => (
              <div 
                key={product.id} 
                className="p-3 hover:bg-blue-50 cursor-pointer border-b border-blue-100 last:border-b-0"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="flex items-center">
                  <Truck className="mr-3 text-blue-500" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Артикул: {product.articleNumber} | Бренд: {product.brand}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-600">
              Нічого не знайдено
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LiveSearch