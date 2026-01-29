
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  sales: number;
  rating: number;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  deliveryTime: number;
  minOrder: number;
  deliveryFee: number;
  categories: string[];
  menu: FoodItem[];
  distance: string;
  promotion?: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface User {
  name: string;
  address: string;
  phone: string;
  avatar: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
  timestamp: number;
}
