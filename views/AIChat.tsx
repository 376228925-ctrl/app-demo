
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Image as ImageIcon, Settings } from 'lucide-react';
import { getSmartFoodRecommendation } from '../services/gemini';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: '嗨！我是你的智能美食助手。今天想吃点什么？我可以根据你的心情和口味帮你挑选附近最棒的餐厅。' }
  ]);
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(!!process.env.API_KEY);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 检查 API Key 是否已选择
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected || !!process.env.API_KEY);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOpenKeyDialog = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // 假设选择成功，更新状态
      setHasKey(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    if (!hasKey && !process.env.API_KEY) {
      setMessages(prev => [...prev, { role: 'bot', content: '请先点击右上角的设置按钮，配置您的 API 密钥以启动 AI 服务。' }]);
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const result = await getSmartFoodRecommendation(userMsg);
    
    if (result === "ERROR_KEY_NOT_FOUND") {
      setHasKey(false);
      setMessages(prev => [...prev, { role: 'bot', content: '当前的 API 密钥无效或已过期，请重新设置。' }]);
    } else {
      setMessages(prev => [...prev, { role: 'bot', content: result || "我不确定该如何回答，换个问题试试？" }]);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-1.5 rounded-lg text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="font-bold text-sm">AI美食推荐官</h1>
            <p className="text-[9px] text-green-500 flex items-center gap-1">
              <span className={`w-1 h-1 rounded-full animate-pulse ${hasKey ? 'bg-green-500' : 'bg-orange-500'}`} />
              {hasKey ? '服务就绪' : '等待设置'}
            </p>
          </div>
        </div>
        <button 
          onClick={handleOpenKeyDialog}
          className={`p-2 rounded-full transition-colors ${hasKey ? 'text-gray-400' : 'text-blue-500 bg-blue-50 animate-pulse'}`}
        >
          <Settings size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-sm leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        
        {!hasKey && (
          <div className="flex justify-center my-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 text-center max-w-xs">
              <Bot size={40} className="mx-auto text-orange-400 mb-2" />
              <h3 className="font-bold text-sm mb-1">AI 助理未激活</h3>
              <p className="text-xs text-gray-400 mb-4">为了提供智能推荐服务，您需要先关联一个 Google Gemini API 密钥。</p>
              <button 
                onClick={handleOpenKeyDialog}
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md active:scale-95 transition-transform"
              >
                立即配置服务
              </button>
              <p className="text-[10px] text-gray-300 mt-3">需绑定已启用计费的 Google Cloud 项目</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
          <ImageIcon size={22} />
        </button>
        <input
          type="text"
          placeholder={hasKey ? "例如：想吃辣的，不要太贵" : "请先配置 API 密钥..."}
          disabled={!hasKey}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none border border-transparent focus:border-blue-300 transition-all disabled:opacity-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || !hasKey}
          className={`p-2 rounded-full transition-all ${
            (input.trim() && hasKey) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
