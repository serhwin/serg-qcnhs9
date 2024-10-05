import React from 'react'
import { useParams } from 'react-router-dom'
import { Truck, Star, Shield } from 'lucide-react'
import { priceLists } from '../data/priceLists'

const BrandPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const products = priceLists.flatMap(list => list.products).filter(product => product.brand === name)

  if (products.length === 0) {
    return <div>Бренд не знайдено</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Truck className="mr-2" size={32} />
        {name}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Про бренд</h2>
        <p className="text-gray-700 mb-4">
          {name} - це всесвітньо відомий виробник запчастин для вантажних автомобілів. 
          Компанія славиться своєю якістю та інноваційними рішеннями в автомобільній індустрії.
        </p>
        <div className="flex items-center text-gray-600 mb-2">
          <Star className="mr-2" size={20} />
          <span>Рейтинг: 4.8/5</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Shield className="mr-2" size={20} />
          <span>Гарантія якості</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Товари бренду {name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 6).map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price.toFixed(2)} грн</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandPage