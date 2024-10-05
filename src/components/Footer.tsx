import React from 'react'
import { Truck, Phone, Mail, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Truck className="mr-2" size={24} />
              Вантажний МаркетПлейс
            </h3>
            <p>Ваш надійний постачальник запчастин для вантажівок</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Швидкі посилання</h4>
            <ul>
              <li><a href="/" className="hover:text-accent">Головна</a></li>
              <li><a href="/catalog" className="hover:text-accent">Каталог</a></li>
              <li><a href="/cart" className="hover:text-accent">Кошик</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Зв'яжіться з нами</h4>
            <p className="flex items-center mb-2">
              <Phone className="mr-2" size={18} />
              (050) 19-19-118
            </p>
            <p className="flex items-center mb-2">
              <Mail className="mr-2" size={18} />
              serg@truckmarket.com.ua
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2" size={18} />
              вул. Вантажна, 123, м. Київ
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Вантажний МаркетПлейс. Усі права захищені.</p>
          <a href="https://app.netlify.com/sites/markettruck/deploys" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
            <img src="https://api.netlify.com/api/v1/badges/b3c37077-39eb-4ba0-a434-e941f37ea5dd/deploy-status" alt="Netlify Status" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer