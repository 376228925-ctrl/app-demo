
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight, Clock, ShoppingBag, CreditCard, Loader2, Wallet } from 'lucide-react';
import { AppContext } from '../App';
import { Order } from '../types';
// Import RESTAURANTS to lookup delivery fee
import { RESTAURANTS } from '../data/mockData';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [isPaying, setIsPaying] = useState(false);

  if (!context || context.cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <div className="bg-white p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-200" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">购物车是空的</h2>
        <p className="text-gray-400 text-sm mb-8">还没发现想吃的美食吗？快去逛逛吧</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          立即订餐
        </button>
      </div>
    );
  }

  // Look up the restaurant to get the delivery fee
  const currentRestaurant = RESTAURANTS.find(r => r.id === context.cart[0].restaurantId);
  const deliveryFee = currentRestaurant?.deliveryFee || 5;
  const packageFee = 2;
  const discount = 5;
  const finalTotal = context.totalAmount + deliveryFee + packageFee - discount;

  const handlePay = () => {
    if (context.walletBalance < finalTotal) {
      context.showToast('余额不足，请前往“我的”充值', 'error');
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: 'ORD' + Date.now(),
        restaurantName: context.cart[0].restaurantName,
        items: [...context.cart],
        totalPrice: finalTotal,
        status: 'completed',
        timestamp: Date.now()
      };
      context.addOrder(newOrder);
      context.clearCart();
      setIsPaying(false);
      navigate('/orders');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-40 animate__animated animate__fadeIn relative">
      {/* Top Bar */}
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-10 flex items-center gap-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-bold">提交订单</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Address Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-1 text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                <MapPin size={12} />
                <span>收货地址</span>
              </div>
              <h3 className="font-bold text-base text-gray-800">{context.address}</h3>
              <p className="text-xs text-gray-500 mt-1">张先生 (先生) 138****0000</p>
            </div>
            <ChevronRight size={20} className="text-gray-300 self-center" />
          </div>
          <div className="h-px bg-gray-50 my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-500">
              <Clock size={16} />
              <span className="text-xs font-bold">送达时间</span>
            </div>
            <span className="text-xs text-blue-500 font-bold">尽快送达 (约30分钟)</span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-50 pb-3">
            {context.cart[0].restaurantName}
          </h2>
          <div className="space-y-4 mb-4">
            {context.cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-3">
                  <img src={item.image} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
                    <span className="text-xs text-gray-400">数量: x{item.quantity}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-800">￥{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex justify-between text-xs text-gray-500">
              <span>包装费</span>
              <span className="text-gray-800">￥{packageFee}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>配送费</span>
              <span className="text-gray-800">￥{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-xs text-red-500">
              <span className="flex items-center gap-1 font-bold">红包抵扣</span>
              <span className="font-bold">-￥{discount}</span>
            </div>
            <div className="flex justify-end pt-2 text-gray-800">
              <div className="text-right">
                <span className="text-xs text-gray-400 mr-2">已优惠￥{discount}</span>
                <span className="text-xs font-medium">小计</span>
                <span className="text-xl font-bold text-red-500 ml-1">￥{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-blue-500" />
                <span className="text-sm font-bold">余额支付</span>
              </div>
              <span className="text-xs text-gray-400">当前余额: ￥{context.walletBalance.toFixed(2)}</span>
           </div>
           {context.walletBalance < finalTotal && (
             <p className="text-[10px] text-red-500 bg-red-50 p-2 rounded">余额不足，请先前往“我的”页面进行充值。</p>
           )}
        </div>
      </div>

      {/* Footer Payment Action - FIXED POSITION & HEIGHT */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-6 safe-bottom z-[60] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-400">合计</span>
            <span className="text-2xl font-bold text-red-500">￥{finalTotal}</span>
          </div>
          <span className="text-[10px] text-gray-400">为您节省￥{discount}</span>
        </div>
        <button 
          onClick={handlePay}
          disabled={isPaying || context.walletBalance < finalTotal}
          className={`px-12 py-3 rounded-full font-bold text-base shadow-lg active:scale-95 transition-all flex items-center gap-2 ${
            context.walletBalance < finalTotal ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-blue-500 text-white shadow-blue-200'
          }`}
        >
          {isPaying ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>正在支付...</span>
            </>
          ) : (
            '确认支付'
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
