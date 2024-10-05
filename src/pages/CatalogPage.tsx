import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Truck, Filter, ArrowUpDown } from 'lucide-react'
import { priceLists } from '../data/priceLists'

const CatalogPage: React.FC = () => {
  const [filterBrand, setFilterBrand] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  const allProducts = priceLists.flatMap(priceList => priceList.products)

  const uniqueProducts = useMemo(() => {
    return Object.values(
      allProducts.reduce((acc, product) => {
        if (!acc[product.articleNumber]) {
          acc[product.articleNumber] = { ...product, prices: [] }
        }
        acc[product.articleNumber].prices.push({ company: product.company, price: product.price })
        return acc
      }, {} as { [key: string]: any })
    )
  }, [allProducts])

  const filteredAndSortedProducts = useMemo(() => {
    let result = uniqueProducts

    if (filterBrand) {
      result = result.filter(product => product.brand.toLowerCase().includes(filterBrand.toLowerCase()))
    }

    result = result.filter(product => {
      const minPrice = Math.min(...product.prices.map(p => p.price))
      return minPrice >= priceRange[0] && minPrice <= priceRange[1]
    })

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === 'price') {
        const priceA = Math.min(...a.prices.map(p => p.price))
        const priceB = Math.min(...b.prices.map(p => p.price))
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
      }
      return 0
    })

    return result
  }, [uniqueProducts, filterBrand, sortBy, sortOrder, priceRange])

  const brands = useMemo(() => {
    return Array.from(new Set(uniqueProducts.map(product => product.brand)))
  }, [uniqueProducts])

  const maxPrice = useMemo(() => {
    return Math.max(...uniqueProducts.flatMap(product => product.prices.map(p => p.price)))
  }, [uniqueProducts])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Truck className="mr-2" size={32} />
        Каталог запчастин для вантажівок
      </h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center">
          <Filter className="mr-2" size={18} />
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Всі бренди</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <ArrowUpDown className="mr-2" size={18} />
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-')
              setSortBy(newSortBy)
              setSortOrder(newSortOrder)
            }}
            className="border rounded px-2 py-1"
          >
            <option value="name-asc">Назва (А-Я)</option>
            <option value="name-desc">Назва (Я-А)</option>
            <option value="price-asc">Ціна (за зростанням)</option>
            <option value="price-desc">Ціна (за спаданням)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span>Ціна:</span>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-24"
          />
          <span>{priceRange[0]} грн</span>
          <span>-</span>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-24"
          />
          <span>{priceRange[1]} грн</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="card">
            <Link to={`/product/${product.id}`} className="block">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">Артикул: {product.articleNumber}</p>
              </div>
            </Link>
            <div className="p-4 pt-0">
              <p className="text-sm text-gray-600 mb-2">
                Бренд: <Link to={`/brand/${product.brand}`} className="hover:underline">{product.brand}</Link>
              </p>
              <div className="space-y-1">
                {product.prices.map((price, index) => (
                  <p key={index} className="text-sm">
                    <Link to={`/company/${price.company}`} className="font-semibold hover:underline">
                      {price.company}:
                    </Link> {price.price.toFixed(2)} грн
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogPage