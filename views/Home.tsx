
import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, X, Loader2, Navigation, Star, Clock, Flame } from 'lucide-react';
import { RESTAURANTS, CATEGORIES } from '../data/mockData';
import { AppContext } from '../App';
import { searchAddresses } from '../services/gemini';
import { AddressResult } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [addrQuery, setAddrQuery] = useState('');
  const [addrResults, setAddrResults] = useState<AddressResult[]>([]);
  const [searchingAddr, setSearchingAddr] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.categories.some(c => c.includes(search));
      const matchCat = selectedCat ? r.categories.includes(selectedCat) : true;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  const handleAddrSearch = async () => {
    if (!addrQuery.trim()) return;
    setSearchingAddr(true);
    const results = await searchAddresses(addrQuery);
    setAddrResults(results);
    setSearchingAddr(false);
  };

  const handleClaim = () => {
    context?.claimCoupon({
      id: 'claim_' + Date.now(),
      title: '特惠专享红包',
      amount: 10,
      minSpend: 30,
      expiry: '2025-12-31'
    });
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#f7f8fa]">
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-40 border-b border-gray-50 shadow-sm">
        <div 
          className="flex items-center gap-1 mb-4 cursor-pointer active:opacity-60 transition-opacity"
          onClick={() => setShowAddrModal(true)}
        >
          <MapPin size={18} className="text-blue-500 fill-blue-100" />
          <span className="font-bold text-base truncate max-w-[200px] text-gray-800">{context?.address}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="搜美食、大牌午餐、奶茶"
            className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {showAddrModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate__animated animate__fadeIn">
          <div className="bg-white rounded-t-3xl absolute bottom-0 left-0 right-0 max-w-md mx-auto h-[85vh] flex flex-col animate__animated animate__slideInUp">
            <div className="px-4 py-5 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-lg">选择收货地址</h2>
              <button onClick={() => setShowAddrModal(false)} className="p-2 bg-gray-50 rounded-full">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col overflow-hidden">
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    autoFocus
                    placeholder="输入地标、写字楼或小区"
                    className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                    value={addrQuery}
                    onChange={(e) => setAddrQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddrSearch()}
                  />
                </div>
                <button onClick={handleAddrSearch} className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-bold active:scale-95 transition-transform">查找</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 px-1 hide-scrollbar">
                {searchingAddr ? (
                  <div className="flex flex-col items-center py-20 text-gray-400">
                    <Loader2 className="animate-spin mb-4 text-blue-500" size={32} />
                    <span className="text-xs font-medium">Gemini 正在定位中...</span>
                  </div>
                ) : addrResults.length > 0 ? (
                  addrResults.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex gap-4 items-start border-b border-gray-50 pb-4 cursor-pointer active:bg-blue-50 rounded-xl p-3"
                      onClick={() => { context?.setAddress(item.name); setShowAddrModal(false); }}
                    >
                      <MapPin size={18} className="text-gray-400 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">{item.district} · {item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Navigation size={32} className="text-gray-200 mx-auto mb-4" />
                    <p className="text-sm text-gray-400">试试搜“中关村”</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-4 py-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl h-32 p-4 relative overflow-hidden shadow-lg shadow-blue-100">
             <div className="relative z-10 text-white">
                <h3 className="text-lg font-bold">SmartEats 特惠</h3>
                <p className="text-xs opacity-90 mt-1">下单即享满 30 减 10 优惠</p>
                <button 
                  onClick={handleClaim}
                  className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold mt-4 shadow-sm active:scale-95 transition-transform"
                >
                  立即领取
                </button>
             </div>
             <Flame className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-y-6 bg-white p-4 mx-4 rounded-2xl shadow-sm overflow-hidden">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => setSelectedCat(selectedCat === cat.name ? null : cat.name)}
              className={`flex flex-col items-center cursor-pointer transition-all ${selectedCat === cat.name ? 'scale-110 opacity-100' : 'opacity-80'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-1.5 transition-colors ${selectedCat === cat.name ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' : 'bg-gray-50'}`}>
                {cat.icon}
              </div>
              <span className={`text-[11px] font-bold whitespace-nowrap ${selectedCat === cat.name ? 'text-blue-600' : 'text-gray-600'}`}>{cat.name}</span>
            </div>
          ))}
        </div>

        <div className="px-4 mt-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800">附近商家</h2>
            {selectedCat && <button onClick={() => setSelectedCat(null)} className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">清除筛选</button>}
          </div>

          <div className="space-y-4">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-xs">没有找到符合要求的餐厅</div>
            ) : filteredRestaurants.map((res, index) => (
              <div 
                key={res.id} 
                className="bg-white p-3 rounded-2xl cursor-pointer transition-all active:scale-[0.98] shadow-sm hover:shadow-md flex gap-4 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/restaurant/${res.id}`)}
              >
                <div className="relative shrink-0 w-24 h-24">
                  <img src={res.logo} className="w-full h-full rounded-xl object-cover" />
                  <div className="absolute top-1 left-1 bg-black/60 text-white text-[8px] px-1 rounded">品牌</div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="font-bold text-base leading-tight mb-1 text-gray-800 line-clamp-1">{res.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-orange-500 font-bold text-[11px]">
                        <Star size={10} fill="currentColor" />
                        <span>{res.rating}</span>
                      </div>
                      <span className="text-gray-400 text-[10px]">{res.deliveryTime}分钟 | {res.distance}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {res.categories.map((c, i) => <span key={i} className="bg-gray-50 text-gray-500 text-[9px] px-1.5 py-0.5 rounded">{c}</span>)}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-[10px] text-gray-400 font-medium">起送￥{res.minOrder} | 配送￥{res.deliveryFee}</div>
                    {res.promotion && <span className="bg-red-50 text-red-500 text-[9px] px-2 py-0.5 rounded-lg border border-red-100 font-bold">{res.promotion}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
