import React from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ваш кошик</h1>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.company}`} className="flex items-center justify-between border-b py-4 last:border-b-0">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.price.toFixed(2)} грн x {item.quantity}</p>
                  <p className="text-sm text-gray-500">Компанія: {item.company}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700 mr-2"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700 ml-2"
                  >
                    <Plus size={18} />
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Всього:</span>
              <span className="text-xl font-bold">{total.toFixed(2)} грн</span>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Очистити кошик
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                Перейти до оформлення
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage