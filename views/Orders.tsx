
import React from 'react';
import { Search } from 'lucide-react';

const Orders: React.FC = () => {
  const mockOrders = [
    { id: '1', res: '望湘园 (中关村店)', date: '2023-11-20 12:30', total: 118, status: '已送达', items: '剁椒鱼头等2件商品' },
    { id: '2', res: '麦当劳 (双榆树店)', date: '2023-11-19 18:15', total: 47, status: '已完成', items: '巨无霸套餐等1件商品' },
    { id: '3', res: '喜茶 (三里屯店)', date: '2023-11-18 15:45', total: 28, status: '已完成', items: '多肉葡萄' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold mb-4">我的订单</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索订单" 
            className="w-full bg-gray-100 rounded-lg py-2 pl-10 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <img src={`https://picsum.photos/40/40?random=${order.id}`} className="w-8 h-8 rounded" />
                <span className="font-bold text-sm truncate max-w-[150px]">{order.res}</span>
              </div>
              <span className="text-xs text-gray-400">{order.status}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600 border-b pb-3 mb-3">
              <span>{order.items}</span>
              <span className="font-bold text-black">￥{order.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-400">{order.date}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded text-xs text-gray-600">再来一单</button>
                <button className="px-3 py-1 bg-blue-50 text-blue-500 rounded text-xs font-medium">评价得金币</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
