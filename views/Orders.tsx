
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ChevronRight, Clock } from 'lucide-react';
import { AppContext } from '../App';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const orders = context?.orders || [];

  return (
    <div className="bg-gray-50 min-h-screen animate__animated animate__fadeIn">
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-50">
        <h1 className="text-xl font-bold mb-4">我的订单</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索订单、菜品、餐厅" 
            className="w-full bg-gray-100 rounded-lg py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <ShoppingBag size={48} className="text-gray-200" />
            </div>
            <p className="text-gray-400 text-sm">还没有订单，快去下一单吧</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={order.items[0]?.image || `https://picsum.photos/40/40?seed=${order.id}`} alt="" />
                  </div>
                  <div className="flex items-center gap-1 group cursor-pointer" onClick={() => navigate('/')}>
                    <span className="font-bold text-sm text-gray-800 truncate max-w-[150px]">{order.restaurantName}</span>
                    <ChevronRight size={14} className="text-gray-400 group-active:translate-x-1 transition-transform" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">已送达</span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                {order.items.map((item, idx) => (
                  <div key={idx} className="shrink-0">
                    <img src={item.image} className="w-16 h-16 rounded-xl object-cover mb-1 border border-gray-50" />
                    <p className="text-[10px] text-gray-500 truncate w-16 text-center">{item.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end border-t border-gray-50 pt-3">
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Clock size={12} />
                  <span>{new Date(order.timestamp).toLocaleString('zh-CN', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">实付<span className="text-sm font-bold text-gray-800 ml-1">￥{order.totalPrice}</span></span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate('/')}
                      className="px-4 py-1.5 border border-gray-200 rounded-full text-xs text-gray-600 font-medium active:bg-gray-50"
                    >
                      再来一单
                    </button>
                    <button className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-xs font-bold shadow-md shadow-blue-100 active:scale-95 transition-transform">
                      去评价
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
