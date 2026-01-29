
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

export interface AddressResult {
  name: string;
  district: string;
  description: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
  timestamp: number;
}

export interface Coupon {
  id: string;
  title: string;
  amount: number;
  minSpend: number;
  expiry: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}
