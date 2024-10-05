import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Truck, Settings } from 'lucide-react'
import { priceLists } from '../data/priceLists'
import { useCart } from '../context/CartContext'
import ReviewForm from '../components/ReviewForm'
import ReviewList from '../components/ReviewList'
import { Review } from '../types'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [reviews, setReviews] = useState<Review[]>([])

  const allProducts = priceLists.flatMap(priceList => priceList.products)
  const product = allProducts.find(p => p.id === Number(id))

  if (!product) {
    return <div>Товар не знайдено</div>
  }

  const groupedPrices = allProducts
    .filter(p => p.articleNumber === product.articleNumber)
    .map(p => ({ company: p.company, price: p.price, quantity: p.quantity }))

  const handleAddToCart = (company: string, price: number) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      company: company
    })
  }

  const handleAddReview = (newReview: { rating: number; comment: string }) => {
    const review: Review = {
      id: Date.now(),
      userId: 'user-' + Date.now(),
      userName: 'Анонімний користувач',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    }
    setReviews([...reviews, review])
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <Truck className="mr-2" size={32} />
          {product.name}
        </h1>
        <p className="text-gray-600 mb-2 flex items-center">
          <Settings className="mr-2" size={18} />
          <Link to={`/brand/${product.brand}`} className="hover:underline">
            Бренд: {product.brand}
          </Link>
        </p>
        <p className="text-gray-600 mb-4">Артикул: {product.articleNumber}</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Доступні пропозиції:</h2>
          {groupedPrices.map((offer, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <Link to={`/company/${offer.company}`} className="font-semibold hover:underline">
                  {offer.company}
                </Link>
                <p>Ціна: {offer.price.toFixed(2)} грн</p>
                <p>Кількість: {offer.quantity} шт.</p>
              </div>
              <button 
                onClick={() => handleAddToCart(offer.company, offer.price)}
                className="btn-primary flex items-center"
              >
                <ShoppingCart className="mr-2" size={18} />
                Додати
              </button>
            </div>
          ))}
        </div>
        <ReviewList reviews={reviews} />
        <ReviewForm onSubmit={handleAddReview} />
      </div>
    </div>
  )
}

export default ProductPage