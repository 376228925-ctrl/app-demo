
import React, { useState, useMemo, createContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartItem, Order, Coupon, ToastMessage } from './types';
import Home from './views/Home';
import RestaurantDetail from './views/RestaurantDetail';
import Cart from './views/Cart';
import Orders from './views/Orders';
import Profile from './views/Profile';
import AIChat from './views/AIChat';
import BottomNav from './components/BottomNav';
import { INITIAL_COUPONS } from './data/mockData';

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
  address: string;
  setAddress: (addr: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  walletBalance: number;
  setWalletBalance: (v: number) => void;
  coupons: Coupon[];
  claimCoupon: (c: Coupon) => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<string>(localStorage.getItem('smarteats_addr') || '北京中关村大厦 A座');
  const [orders, setOrders] = useState<Order[]>([]);
  const [walletBalance, setWalletBalance] = useState(150.00);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('smarteats_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      if (prev.length > 0 && prev[0].restaurantId !== item.restaurantId) {
        if (window.confirm('切换餐厅将清空之前的购物车，是否继续？')) {
          showToast('已切换至新餐厅', 'info');
          return [item];
        }
        return prev;
      }
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      showToast('已加入购物车', 'success');
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

  const addOrder = (order: Order) => {
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem('smarteats_orders', JSON.stringify(newOrders));
    setWalletBalance(prev => prev - order.totalPrice);
    showToast('支付成功！', 'success');
  };

  const claimCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev, coupon]);
    showToast(`成功领取 ${coupon.amount}元 红包`, 'success');
  };

  const totalAmount = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart, totalAmount, 
      address, setAddress: (a) => { setAddress(a); localStorage.setItem('smarteats_addr', a); }, 
      orders, addOrder, walletBalance, setWalletBalance, coupons, claimCoupon, showToast
    }}>
      {children}
      {/* Global Toast UI */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] flex flex-col gap-2 w-full max-w-[200px]">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-2 rounded-full text-white text-xs text-center shadow-lg animate__animated animate__fadeInUp ${
            t.type === 'success' ? 'bg-green-500' : t.type === 'error' ? 'bg-red-500' : 'bg-gray-800'
          }`}>
            {t.text}
          </div>
        ))}
      </div>
    </AppContext.Provider>
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
