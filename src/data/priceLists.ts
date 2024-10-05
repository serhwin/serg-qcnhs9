import { Product } from '../types';

export interface PriceList {
  id: number;
  company: string;
  products: Product[];
}

// Updated mock data to include brand and quantity
export const priceLists: PriceList[] = [
  {
    id: 1,
    company: "AutoParts Inc.",
    products: [
      { id: 1, name: "Гальмівні колодки", brand: "Bosch", price: 1199.99, quantity: 10, articleNumber: "BP001", analogue: "BP001A", company: "AutoParts Inc.", image: "https://i.avto.pro/partimage/81671/gdb3466-id-13-476f9e92dbf49728d7344b39411da6cd-small.jpg" },
      { id: 2, name: "Масляний фільтр", brand: "Mann-Filter", price: 299.99, quantity: 15, articleNumber: "OF002", analogue: "OF002A", company: "AutoParts Inc.", image: "https://i.avto.pro/img/ti/9/259/959.jpg" },
    ]
  },
  {
    id: 2,
    company: "CarParts Co.",
    products: [
      { id: 3, name: "Гальмівні колодки", brand: "Bosch", price: 1150.00, quantity: 8, articleNumber: "BP001", analogue: "BP001A", company: "CarParts Co.", image: "https://i.avto.pro/partimage/81671/gdb3466-id-13-476f9e92dbf49728d7344b39411da6cd-small.jpg" },
      { id: 4, name: "Свічки запалювання", brand: "NGK", price: 450.00, quantity: 20, articleNumber: "SP003", analogue: "SP003A", company: "CarParts Co.", image: "https://i.avto.pro/img/ti/9/259/959.jpg" },
    ]
  }
];