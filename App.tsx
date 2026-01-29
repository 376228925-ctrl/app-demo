
import React, { useState, useMemo, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RESTAURANTS, CATEGORIES } from './data/mockData';
import { CartItem, Restaurant, Order } from './types';
import Home from './views/Home';
import RestaurantDetail from './views/RestaurantDetail';
import Cart from './views/Cart';
import Orders from './views/Orders';
import Profile from './views/Profile';
import AIChat from './views/AIChat';
import BottomNav from './components/BottomNav';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearCart = () => setCart([]);

  const totalAmount = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/restaurant/');

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50 shadow-xl overflow-hidden relative">
      <div className={`flex-1 overflow-y-auto hide-scrollbar ${hideNav ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai" element={<AIChat />} />
        </Routes>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  );
};

export default App;
