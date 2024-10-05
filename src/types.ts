export interface Price {
  company: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  prices: Price[];
  articleNumber: string;
  analogue: string;
  image: string;
  company: string;
  price: number;
  quantity: number;
  reviews: Review[];
}