import React from 'react';
import { priceLists } from '../data/priceLists';

const PriceListsOverview: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Збережені прайс-листи</h2>
      <ul className="space-y-2">
        {priceLists.map((priceList) => (
          <li key={priceList.id} className="bg-white p-4 rounded-lg shadow">
            <span className="font-semibold">{priceList.company}</span>
            <span className="ml-2 text-gray-600">
              ({priceList.products.length} товарів)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceListsOverview;