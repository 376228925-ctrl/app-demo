
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { RESTAURANTS, CATEGORIES } from '../data/mockData';
import { Restaurant } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredRestaurants = RESTAURANTS.filter(r => 
    r.name.includes(search) || r.categories.some(c => c.includes(search))
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-40">
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={18} className="text-blue-500" />
          <span className="font-bold text-sm">北京中关村大厦</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索附近的美食、餐厅"
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-y-4 bg-white p-4">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="flex flex-col items-center">
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="px-4 py-2">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white h-24 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">超级会员</h3>
            <p className="text-xs opacity-90">下单立享 ￥5 无门槛红包</p>
          </div>
          <button className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold">立即领取</button>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="px-4 mt-4">
        <h2 className="font-bold text-base mb-4">附近商家</h2>
        <div className="space-y-6">
          {filteredRestaurants.map(res => (
            <div 
              key={res.id} 
              className="flex gap-3 bg-white p-2 rounded-lg cursor-pointer transition-transform active:scale-[0.98]"
              onClick={() => navigate(`/restaurant/${res.id}`)}
            >
              <img src={res.logo} alt={res.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm leading-tight">{res.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-orange-50 text-orange-600 text-[10px] px-1 font-bold rounded">★ {res.rating}</span>
                    <span className="text-gray-400 text-[10px]">{res.distance} | {res.deliveryTime}分钟</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-[10px] text-gray-500">
                    起送 ￥{res.minOrder} | 配送 ￥{res.deliveryFee}
                  </div>
                </div>
                {res.promotion && (
                  <div className="mt-1">
                    <span className="border border-red-200 text-red-500 text-[9px] px-1 rounded">{res.promotion}</span>
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
