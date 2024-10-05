import React from 'react'
import { useParams } from 'react-router-dom'
import { Truck, Package, Users, Star, ShoppingCart, MessageSquare } from 'lucide-react'
import { priceLists } from '../data/priceLists'

const CompanyPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const company = priceLists.find(list => list.company === name)

  if (!company) {
    return <div>Компанію не знайдено</div>
  }

  // Generate random stats for the company
  const rating = (Math.random() * 2 + 3).toFixed(1) // Random rating between 3 and 5
  const salesCount = Math.floor(Math.random() * 10000) // Random sales count
  const reviewCount = Math.floor(Math.random() * 1000) // Random review count

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Truck className="mr-2" size={32} />
        {company.company}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Про компанію</h2>
        <p className="text-gray-700 mb-4">
          {company.company} - це провідний постачальник запчастин для вантажних автомобілів. 
          Ми пропонуємо широкий асортимент якісних деталей від провідних виробників.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <Star className="mr-2" size={20} />
            <span>Рейтинг: {rating}/5</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ShoppingCart className="mr-2" size={20} />
            <span>Продажі: {salesCount}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Package className="mr-2" size={20} />
            <span>Кількість товарів: {company.products.length}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MessageSquare className="mr-2" size={20} />
            <span>Відгуки: {reviewCount}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="mr-2" size={20} />
            <span>Працюємо з 2005 року</span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Популярні товари</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {company.products.slice(0, 6).map(product => (
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

export default CompanyPage