import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import UploadPriceListPage from './pages/UploadPriceListPage'
import CompanyPage from './pages/CompanyPage'
import BrandPage from './pages/BrandPage'
import CompanyCatalogPage from './pages/CompanyCatalogPage'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/upload-price-list" element={<UploadPriceListPage />} />
              <Route path="/company/:name" element={<CompanyPage />} />
              <Route path="/brand/:name" element={<BrandPage />} />
              <Route path="/companies" element={<CompanyCatalogPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App