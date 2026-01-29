
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Search, PlusCircle, MinusCircle, ShoppingBag } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { CartContext } from '../App';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState('招牌菜');

  const restaurant = RESTAURANTS.find(r => r.id === id);
  if (!restaurant) return <div>未找到餐厅</div>;

  const menuCategories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  const handleAdd = (item: any) => {
    cartContext?.addToCart({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      quantity: 1
    });
  };

  const getItemCount = (itemId: string) => {
    return cartContext?.cart.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Header Image */}
      <div className="h-32 bg-gray-300 relative">
        <img src={restaurant.logo} className="w-full h-full object-cover blur-sm opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
          <button onClick={() => navigate(-1)} className="p-1 bg-black/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <Share2 size={20} />
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Restaurant Info Card */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <img src={restaurant.logo} className="w-12 h-12 rounded-lg border-2 border-white shadow-sm -mt-8" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <span className="text-orange-500 font-bold">★ {restaurant.rating}</span>
            <span>约{restaurant.deliveryTime}分钟</span>
            <span>夜间配送费￥{restaurant.deliveryFee}</span>
          </div>
          <p className="text-[10px] text-gray-400">公告: 欢迎光临{restaurant.name}，很高兴为您服务！</p>
          <div className="flex gap-2">
            <span className="text-[9px] bg-red-50 text-red-500 px-1 border border-red-100 rounded">50减10</span>
            <span className="text-[9px] bg-red-50 text-red-500 px-1 border border-red-100 rounded">80减20</span>
          </div>
        </div>
      </div>

      {/* Menu Area */}
      <div className="flex-1 flex overflow-hidden mt-4">
        {/* Sidebar */}
        <div className="w-20 bg-gray-50 overflow-y-auto">
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-4 px-2 text-[11px] text-left leading-tight ${
                activeCategory === cat ? 'bg-white font-bold border-l-4 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{activeCategory}</h2>
          {restaurant.menu.filter(item => item.category === activeCategory).map(item => (
            <div key={item.id} className="flex gap-3">
              <img src={item.image} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{item.description}</p>
                  <div className="text-[10px] text-gray-500 mt-1">
                    月售 {item.sales} 好评 {item.rating * 20}%
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-red-500 font-bold text-base">￥{item.price}</span>
                  <div className="flex items-center gap-2">
                    {getItemCount(item.id) > 0 && (
                      <>
                        <button onClick={() => cartContext?.removeFromCart(item.id)}>
                          <MinusCircle size={22} className="text-gray-300" />
                        </button>
                        <span className="text-sm font-medium">{getItemCount(item.id)}</span>
                      </>
                    )}
                    <button onClick={() => handleAdd(item)}>
                      <PlusCircle size={22} className="text-blue-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {cartContext && cartContext.cart.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-50">
          <div className="bg-black/80 backdrop-blur rounded-full px-4 py-2 flex items-center justify-between text-white shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-blue-500 p-2 rounded-full -mt-6 shadow-lg">
                  <ShoppingBag size={24} />
                </div>
                <span className="absolute -top-7 -right-1 bg-red-500 text-[10px] text-white rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartContext.cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">￥{cartContext.totalAmount}</span>
                <span className="text-[10px] text-gray-400 line-through">￥{cartContext.totalAmount + 20}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/cart')}
              className="bg-blue-500 px-6 py-2 rounded-full text-sm font-bold active:bg-blue-600"
            >
              去结算
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
