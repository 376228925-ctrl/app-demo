
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight, Clock, ShoppingBag } from 'lucide-react';
import { CartContext } from '../App';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);

  if (!context || context.cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <ShoppingBag size={80} className="text-gray-200 mb-4" />
        <p className="text-gray-500 mb-6">购物车竟然是空的</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-8 py-2 rounded-full font-medium"
        >
          去逛逛
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-blue-500 pt-10 pb-12 px-4 relative">
        <div className="flex items-center gap-2 text-white mb-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
          <h1 className="text-lg font-medium">确认订单</h1>
        </div>
        
        {/* Address Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                <MapPin size={12} />
                <span>收货地址</span>
              </div>
              <h3 className="font-bold text-base">北京中关村大厦 A座 1001室</h3>
              <p className="text-xs text-gray-500 mt-1">张先生 138****0000</p>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
          <div className="h-px bg-gray-100 my-3" />
          <div className="flex items-center gap-2 text-blue-500">
            <Clock size={14} />
            <span className="text-xs font-medium">立即送达（预计12:45）</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8">
        {/* Order Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <h2 className="font-bold text-sm border-b pb-2">{context.cart[0].restaurantName}</h2>
          {context.cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex gap-3">
                <img src={item.image} className="w-12 h-12 rounded object-cover" />
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <span className="text-xs text-gray-400">x{item.quantity}</span>
                </div>
              </div>
              <span className="text-sm font-bold">￥{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="pt-2 border-t space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">包装费</span>
              <span>￥2</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">配送费</span>
              <span>￥5</span>
            </div>
            <div className="flex justify-between text-xs text-red-500">
              <span>店铺红包</span>
              <span>-￥5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-4 flex justify-between items-center safe-bottom z-50">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-gray-500">合计</span>
          <span className="text-xl font-bold text-red-500">￥{context.totalAmount + 2}</span>
          <span className="text-[10px] text-gray-400">已优惠￥5</span>
        </div>
        <button 
          onClick={() => {
            alert('支付成功！');
            context.clearCart();
            navigate('/orders');
          }}
          className="bg-blue-500 text-white px-10 py-3 rounded-full font-bold text-base active:bg-blue-600 transition-transform active:scale-95 shadow-lg shadow-blue-200"
        >
          提交订单
        </button>
      </div>
    </div>
  );
};

export default Cart;