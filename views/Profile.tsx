
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronRight, Wallet, Ticket, Gift, CreditCard, HelpCircle, MapPin, Smartphone, LogOut, X, Plus } from 'lucide-react';
import { AppContext } from '../App';

const Profile: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'wallet' | 'coupons' | 'address' | null>(null);
  
  const stats = [
    { label: '红包/抵用券', value: context?.coupons.length || 0, type: 'coupons' },
    { label: '金币', value: '850', type: null },
    { label: '余额', value: `￥${context?.walletBalance.toFixed(2)}`, type: 'wallet' },
  ];

  const handleRecharge = () => {
    context?.setWalletBalance((context?.walletBalance || 0) + 100);
    context?.showToast('充值成功 100元', 'success');
  };

  return (
    <div className="bg-gray-50 min-h-screen animate__animated animate__fadeIn relative">
      <div className="bg-gradient-to-b from-blue-600 to-blue-400 pt-10 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="flex justify-end text-white mb-6 relative z-10">
          <button onClick={() => context?.showToast('设置暂未开放')}><Settings size={22} /></button>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" className="w-16 h-16 rounded-full border-4 border-white/20 shadow-xl" />
            <div className="absolute bottom-0 right-0 bg-yellow-400 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-800">V</div>
          </div>
          <div className="text-white">
            <h1 className="text-xl font-bold">SmartEats 开发者</h1>
            <p className="text-xs opacity-80 mt-1">账号: 138****0000</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-around mb-4 border border-blue-50">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center cursor-pointer" onClick={() => s.type && setActiveModal(s.type as any)}>
              <span className="font-bold text-lg text-gray-800">{s.value}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 grid grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center cursor-pointer active:scale-90" onClick={() => setActiveModal('wallet')}>
            <Wallet className="text-blue-500 mb-2" />
            <span className="text-[10px] text-gray-600">我的钱包</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer active:scale-90" onClick={() => setActiveModal('coupons')}>
            <Ticket className="text-red-400 mb-2" />
            <span className="text-[10px] text-gray-600">我的红包</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer active:scale-90">
            <Gift className="text-orange-400 mb-2" />
            <span className="text-[10px] text-gray-600">我的礼品</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer active:scale-90">
            <CreditCard className="text-indigo-400 mb-2" />
            <span className="text-[10px] text-gray-600">我的卡包</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer active:bg-gray-50 border-b border-gray-50"
            onClick={() => setActiveModal('address')}
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-400" size={20} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">我的地址</span>
                <span className="text-[10px] text-gray-400 truncate max-w-[180px]">{context?.address}</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
          <div className="flex items-center justify-between p-4 cursor-pointer active:bg-gray-50">
            <div className="flex items-center gap-3">
              {/* Fixed the component name here */}
              <Smartphone className="text-purple-400" size={20} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">手机绑定</span>
                <span className="text-[10px] text-gray-400">138****0000</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        <button 
          onClick={() => context?.showToast('已安全退出', 'info')}
          className="w-full bg-white text-red-500 py-3 rounded-2xl text-sm font-bold shadow-sm mb-12 flex items-center justify-center gap-2 active:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span>退出登录</span>
        </button>
      </div>

      {/* MODALS IMPLEMENTATION */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center animate__animated animate__fadeIn">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate__animated animate__slideInUp h-[60vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">
                {activeModal === 'wallet' && '我的钱包'}
                {activeModal === 'coupons' && '我的红包'}
                {activeModal === 'address' && '地址管理'}
              </h2>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {activeModal === 'wallet' && (
                <div className="space-y-6">
                  <div className="bg-blue-500 p-8 rounded-2xl text-white text-center shadow-xl shadow-blue-100">
                    <p className="text-sm opacity-80 mb-2">当前可用余额</p>
                    <h3 className="text-4xl font-bold">￥{context?.walletBalance.toFixed(2)}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleRecharge} className="bg-white border-2 border-blue-500 text-blue-500 py-3 rounded-xl font-bold active:bg-blue-50 transition-colors">充值 100元</button>
                    <button onClick={handleRecharge} className="bg-blue-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-transform">充值 200元</button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">支付由 SmartEats 安全提供支持</p>
                </div>
              )}

              {activeModal === 'coupons' && (
                <div className="space-y-4">
                  {context?.coupons.map(c => (
                    <div key={c.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex justify-between items-center relative overflow-hidden">
                       <div className="absolute -right-4 -top-4 w-12 h-12 bg-red-500/10 rounded-full" />
                       <div>
                         <h4 className="font-bold text-red-600">{c.title}</h4>
                         <p className="text-[10px] text-red-400">满 ￥{c.minSpend} 可用</p>
                         <p className="text-[9px] text-gray-400 mt-1">有效期至: {c.expiry}</p>
                       </div>
                       <div className="text-right">
                         <span className="text-2xl font-bold text-red-500">￥{c.amount}</span>
                       </div>
                    </div>
                  ))}
                  {context?.coupons.length === 0 && <p className="text-center text-gray-400 py-10">暂无可用红包</p>}
                </div>
              )}

              {activeModal === 'address' && (
                <div className="space-y-4">
                  <div className="border border-blue-100 bg-blue-50/30 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{context?.address}</h4>
                      <p className="text-xs text-gray-500 mt-1">张先生 138****0000</p>
                    </div>
                    <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded">默认</span>
                  </div>
                  <button onClick={() => context?.showToast('演示环境暂不支持添加新地址')} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 flex items-center justify-center gap-2">
                    <Plus size={18} />
                    <span className="text-sm">添加新地址</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
