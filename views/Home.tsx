
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, X, Loader2, Navigation } from 'lucide-react';
import { RESTAURANTS, CATEGORIES } from '../data/mockData';
import { AppContext } from '../App';
import { searchAddresses } from '../services/gemini';
import { AddressResult } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [addrQuery, setAddrQuery] = useState('');
  const [addrResults, setAddrResults] = useState<AddressResult[]>([]);
  const [searchingAddr, setSearchingAddr] = useState(false);

  const filteredRestaurants = RESTAURANTS.filter(r => 
    r.name.includes(search) || r.categories.some(c => c.includes(search))
  );

  const handleAddrSearch = async () => {
    if (!addrQuery.trim()) return;
    setSearchingAddr(true);
    const results = await searchAddresses(addrQuery);
    setAddrResults(results);
    setSearchingAddr(false);
  };

  const selectAddress = (name: string) => {
    context?.setAddress(name);
    setShowAddrModal(false);
    setAddrResults([]);
    setAddrQuery('');
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-40 border-b border-gray-50">
        <div 
          className="flex items-center gap-1 mb-3 cursor-pointer active:opacity-70 transition-opacity"
          onClick={() => setShowAddrModal(true)}
        >
          <MapPin size={18} className="text-blue-500" />
          <span className="font-bold text-sm truncate max-w-[180px]">{context?.address}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索附近的美食、餐厅"
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Address Search Modal */}
      {showAddrModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate__animated animate__fadeIn">
          <div className="bg-white rounded-t-2xl absolute bottom-0 left-0 right-0 max-w-md mx-auto h-[80vh] flex flex-col animate__animated animate__slideInUp">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold">修改收货地址</h2>
              <button onClick={() => setShowAddrModal(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <div className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    type="text"
                    autoFocus
                    placeholder="输入地标、小区、写字楼"
                    className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
                    value={addrQuery}
                    onChange={(e) => setAddrQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddrSearch()}
                  />
                </div>
                <button 
                  onClick={handleAddrSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  搜索
                </button>
              </div>
              
              <div className="mt-4 space-y-4 overflow-y-auto max-h-[60vh]">
                {searchingAddr ? (
                  <div className="flex flex-col items-center py-10 text-gray-400">
                    <Loader2 className="animate-spin mb-2" />
                    <span className="text-xs">AI 正在精准定位...</span>
                  </div>
                ) : addrResults.length > 0 ? (
                  addrResults.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex gap-3 items-start border-b border-gray-50 pb-3 cursor-pointer active:bg-gray-50 rounded p-2"
                      onClick={() => selectAddress(item.name)}
                    >
                      <MapPin size={16} className="text-gray-300 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{item.district} · {item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <Navigation size={40} className="mx-auto text-gray-100 mb-2" />
                    <p className="text-xs text-gray-400">试试搜索“五道口”或“三里屯”</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-y-4 bg-white p-4">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform">
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Restaurant List */}
      <div className="px-4 mt-4 pb-20">
        <h2 className="font-bold text-base mb-4">附近商家</h2>
        <div className="space-y-6">
          {filteredRestaurants.map(res => (
            <div 
              key={res.id} 
              className="flex gap-3 bg-white p-2 rounded-xl cursor-pointer transition-transform active:scale-[0.98] shadow-sm hover:shadow-md"
              onClick={() => navigate(`/restaurant/${res.id}`)}
            >
              <img src={res.logo} alt={res.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-sm leading-tight mb-1">{res.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 text-[10px] font-bold">★ {res.rating}</span>
                    <span className="text-gray-400 text-[10px]">{res.distance} | {res.deliveryTime}分钟</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500">
                  起送 ￥{res.minOrder} | 配送 ￥{res.deliveryFee}
                </div>
                {res.promotion && (
                  <div className="mt-1">
                    <span className="bg-red-50 text-red-500 text-[9px] px-1.5 py-0.5 rounded border border-red-100">{res.promotion}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
