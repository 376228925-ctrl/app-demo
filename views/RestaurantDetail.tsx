
import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Search, PlusCircle, MinusCircle, ShoppingBag, Sparkles, Loader2 } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { AppContext } from '../App';
import { searchMenuAI } from '../services/gemini';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('招牌菜');
  const [menuSearch, setMenuSearch] = useState('');
  const [isAISearching, setIsAISearching] = useState(false);
  const [aiFilteredIds, setAiFilteredIds] = useState<string[] | null>(null);

  const restaurant = RESTAURANTS.find(r => r.id === id);
  if (!restaurant) return <div>未找到餐厅</div>;

  const menuCategories = useMemo(() => 
    Array.from(new Set(restaurant.menu.map(item => item.category))),
    [restaurant.menu]
  );

  const handleAISearch = async () => {
    if (!menuSearch.trim()) {
      setAiFilteredIds(null);
      return;
    }
    setIsAISearching(true);
    const filtered = await searchMenuAI(restaurant.name, restaurant.menu, menuSearch);
    setAiFilteredIds(filtered.map(f => f.id));
    setIsAISearching(false);
  };

  const visibleMenu = useMemo(() => {
    if (aiFilteredIds !== null) {
      return restaurant.menu.filter(item => aiFilteredIds.includes(item.id));
    }
    return restaurant.menu.filter(item => item.category === activeCategory);
  }, [restaurant.menu, activeCategory, aiFilteredIds]);

  const handleAdd = (item: any) => {
    context?.addToCart({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      quantity: 1
    });
  };

  const getItemCount = (itemId: string) => {
    return context?.cart.find(i => i.id === itemId)?.quantity || 0;
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Header Image */}
      <div className="h-32 bg-gray-300 relative shrink-0">
        <img src={restaurant.logo} className="w-full h-full object-cover blur-sm opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
          <button onClick={() => navigate(-1)} className="p-1 bg-black/20 rounded-full active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <Share2 size={20} />
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Restaurant Info Card */}
      <div className="px-4 -mt-10 relative z-10 shrink-0">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <img src={restaurant.logo} className="w-12 h-12 rounded-lg border-2 border-white shadow-sm -mt-8" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <span className="text-orange-500 font-bold">★ {restaurant.rating}</span>
            <span>约{restaurant.deliveryTime}分钟</span>
            <span>配送费￥{restaurant.deliveryFee}</span>
          </div>
          
          {/* Smart Search Input */}
          <div className="relative mt-2">
            <input 
              type="text" 
              placeholder="想吃什么？让 AI 帮你挑 (如: 清淡点的)"
              className="w-full bg-gray-50 rounded-lg py-2 pl-3 pr-10 text-[11px] focus:outline-none border border-transparent focus:border-blue-100"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
            />
            <button 
              onClick={handleAISearch}
              className="absolute right-2 top-1.5 text-blue-500 p-1 active:scale-90"
            >
              {isAISearching ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Area */}
      <div className="flex-1 flex overflow-hidden mt-4">
        {/* Sidebar */}
        <div className="w-20 bg-gray-50 overflow-y-auto">
          {aiFilteredIds === null && menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-4 px-2 text-[11px] text-left leading-tight transition-all ${
                activeCategory === cat ? 'bg-white font-bold border-l-4 border-blue-500 text-blue-600 shadow-sm' : 'text-gray-500 opacity-70'
              }`}
            >
              {cat}
            </button>
          ))}
          {aiFilteredIds !== null && (
            <button
              onClick={() => {setAiFilteredIds(null); setMenuSearch('');}}
              className="w-full py-4 px-2 text-[11px] text-blue-500 font-bold bg-white"
            >
              清除筛选
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-28">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {aiFilteredIds !== null ? `AI 智能筛选 (${visibleMenu.length})` : activeCategory}
            </h2>
            {aiFilteredIds !== null && (
               <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">由 Gemini 支持</span>
            )}
          </div>
          
          {visibleMenu.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-xs">未找到符合要求的菜品</div>
          ) : visibleMenu.map(item => (
            <div key={item.id} className="flex gap-3 animate__animated animate__fadeIn">
              <img src={item.image} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{item.description}</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-red-500 font-bold text-base">￥{item.price}</span>
                  <div className="flex items-center gap-2">
                    {getItemCount(item.id) > 0 && (
                      <button onClick={() => context?.removeFromCart(item.id)} className="p-0.5">
                        <MinusCircle size={22} className="text-gray-200" />
                      </button>
                    )}
                    {getItemCount(item.id) > 0 && <span className="text-xs font-bold">{getItemCount(item.id)}</span>}
                    <button onClick={() => handleAdd(item)} className="p-0.5 active:scale-110 transition-transform">
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
      {context && context.cart.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-50 animate__animated animate__slideInUp">
          <div className="bg-gray-900/90 backdrop-blur rounded-full px-4 py-2 flex items-center justify-between text-white shadow-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-blue-500 p-2.5 rounded-full -mt-8 shadow-xl border-4 border-gray-900">
                  <ShoppingBag size={24} />
                </div>
                <span className="absolute -top-10 -right-2 bg-red-500 text-[10px] text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1 border-2 border-gray-900">
                  {context.cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">￥{context.totalAmount}</span>
                <span className="text-[9px] text-gray-500">另需配送费 ￥{restaurant.deliveryFee}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/cart')}
              className="bg-blue-500 px-8 py-2.5 rounded-full text-sm font-bold active:scale-95 transition-transform"
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
