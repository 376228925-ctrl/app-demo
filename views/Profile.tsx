
import React from 'react';
import { Settings, ChevronRight, Wallet, Ticket, Gift, CreditCard, HelpCircle, MapPin, Smartphone } from 'lucide-react';

const Profile: React.FC = () => {
  const stats = [
    { label: '红包/抵用券', value: '12' },
    { label: '金币', value: '850' },
    { label: '津贴', value: '￥20' },
  ];

  const menuItems = [
    { icon: <MapPin className="text-blue-400" size={20} />, label: '我的地址' },
    { icon: <Ticket className="text-orange-400" size={20} />, label: '红包卡券' },
    { icon: <Wallet className="text-green-400" size={20} />, label: '我的钱包' },
    { icon: <Smartphone className="text-purple-400" size={20} />, label: '绑定手机' },
    { icon: <HelpCircle className="text-gray-400" size={20} />, label: '帮助反馈' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 pt-10 pb-20 px-4">
        <div className="flex justify-end text-white mb-6">
          <Settings size={22} />
        </div>
        <div className="flex items-center gap-4">
          <img src="https://picsum.photos/200/200?random=100" className="w-16 h-16 rounded-full border-4 border-white/20" />
          <div className="text-white">
            <h1 className="text-xl font-bold">美食探险家</h1>
            <p className="text-xs opacity-80 mt-1">账号: 138****0000</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-12">
        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex justify-around mb-4">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-bold text-lg">{s.value}</span>
              <span className="text-[10px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Assets Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <Wallet className="text-blue-500 mb-1" size={22} />
            <span className="text-[10px]">我的钱包</span>
          </div>
          <div className="flex flex-col items-center">
            <Ticket className="text-red-400 mb-1" size={22} />
            <span className="text-[10px]">我的红包</span>
          </div>
          <div className="flex flex-col items-center">
            <Gift className="text-orange-400 mb-1" size={22} />
            <span className="text-[10px]">我的礼品</span>
          </div>
          <div className="flex flex-col items-center">
            <CreditCard className="text-indigo-400 mb-1" size={22} />
            <span className="text-[10px]">我的卡包</span>
          </div>
        </div>

        {/* List Menu */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-4 ${i !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-gray-400">SmartEats v1.0.0 - Powered by AI</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
