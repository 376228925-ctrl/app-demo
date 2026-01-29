
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ClipboardList, User, MessageCircle, ShoppingBag } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Home size={22} />, label: '首页' },
    { path: '/ai', icon: <MessageCircle size={22} className="text-blue-500" />, label: 'AI助理' },
    { path: '/orders', icon: <ClipboardList size={22} />, label: '订单' },
    { path: '/profile', icon: <User size={22} />, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around py-2 safe-bottom z-50 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center flex-1 transition-colors ${
            location.pathname === item.path ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          {item.icon}
          <span className="text-[10px] mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
