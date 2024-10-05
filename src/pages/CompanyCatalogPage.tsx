import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Star, Package, ShoppingCart, MessageSquare, Truck } from 'lucide-react'
import { priceLists } from '../data/priceLists'

interface CompanyStats {
  name: string;
  rating: number;
  salesCount: number;
  productCount: number;
  reviewCount: number;
}

const CompanyCatalogPage: React.FC = () => {
  const companyStats: CompanyStats[] = useMemo(() => {
    return priceLists.map(priceList => ({
      name: priceList.company,
      rating: Math.random() * 2 + 3, // Random rating between 3 and 5
      salesCount: Math.floor(Math.random() * 10000), // Random sales count
      productCount: priceList.products.length,
      reviewCount: Math.floor(Math.random() * 1000), // Random review count
    }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Truck className="mr-2" size={32} />
        Каталог компаній
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyStats.map((company) => (
          <Link
            key={company.name}
            to={`/company/${company.name}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-4">{company.name}</h2>
            <div className="flex items-center mb-2">
              <Star className="text-yellow-400 mr-1" size={20} />
              <span className="font-medium">{company.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-2">({company.reviewCount} відгуків)</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <ShoppingCart className="mr-2" size={18} />
              <span>{company.salesCount} продажів</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Package className="mr-2" size={18} />
              <span>{company.productCount} товарів</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageSquare className="mr-2" size={18} />
              <span>{company.reviewCount} відгуків</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyCatalogPage;