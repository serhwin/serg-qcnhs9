import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, Upload, Truck, Building } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Truck className="mr-2" size={32} />
          Вантажний МаркетПлейс
        </Link>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex space-y-4 md:space-y-0 md:space-x-4 absolute md:relative top-full left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0`}>
          <Link to="/" className="block hover:text-accent">Головна</Link>
          <Link to="/catalog" className="block hover:text-accent">Каталог</Link>
          <Link to="/companies" className="block hover:text-accent">
            <Building className="inline-block mr-2" size={18} />
            Компанії
          </Link>
          <Link to="/upload-price-list" className="block hover:text-accent">
            <Upload className="inline-block mr-2" size={18} />
            Завантажити прайс-лист
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="hover:text-accent relative">
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header