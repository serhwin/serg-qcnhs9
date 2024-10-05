import React, { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Truck, Cog, Battery, Wrench } from 'lucide-react'
import LiveSearch from '../components/LiveSearch'
import PriceListsOverview from '../components/PriceListsOverview'
import { priceLists } from '../data/priceLists'

const HomePage: React.FC = () => {
  const allProducts = useMemo(() => priceLists.flatMap(priceList => priceList.products), []);
  const [searchResults, setSearchResults] = useState(allProducts);

  const handleSearch = useCallback((query: string) => {
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.articleNumber.toLowerCase().includes(query.toLowerCase()) ||
      product.analogue.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [allProducts]);

  return (
    <div className="space-y-8">
      <section className="text-center bg-gray-800 text-white py-16 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'}}>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg inline-block">
          <h1 className="text-4xl font-bold mb-4">Ласкаво просимо до ВантажЗапчастини</h1>
          <p className="text-xl mb-6">Знайдіть надійні запчастини для вашої вантажівки</p>
          <LiveSearch onSearch={handleSearch} products={allProducts} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Популярні категорії</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/catalog" className="card p-4 text-center hover:bg-gray-100 transition duration-300 flex flex-col items-center">
            <Cog size={48} className="mb-2 text-secondary" />
            <span>Двигун</span>
          </Link>
          <Link to="/catalog" className="card p-4 text-center hover:bg-gray-100 transition duration-300 flex flex-col items-center">
            <Truck size={48} className="mb-2 text-secondary" />
            <span>Кузов</span>
          </Link>
          <Link to="/catalog" className="card p-4 text-center hover:bg-gray-100 transition duration-300 flex flex-col items-center">
            <Battery size={48} className="mb-2 text-secondary" />
            <span>Електрика</span>
          </Link>
          <Link to="/catalog" className="card p-4 text-center hover:bg-gray-100 transition duration-300 flex flex-col items-center">
            <Wrench size={48} className="mb-2 text-secondary" />
            <span>Підвіска</span>
          </Link>
        </div>
      </section>

      <PriceListsOverview />
    </div>
  )
}

export default HomePage