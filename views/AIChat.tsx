
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';
import { getSmartFoodRecommendation } from '../services/gemini';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: '嗨！我是你的智能美食助手。今天想吃点什么？我可以根据你的心情和口味帮你挑选附件最棒的餐厅。' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const result = await getSmartFoodRecommendation(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: result || "我不确定该如何回答，换个问题试试？" }]);
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
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> 实时在线
            </p>
          </div>
        </div>
        <button className="text-gray-400"><Bot size={20} /></button>
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
      </div>

      <div className="p-4 bg-white border-t flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
          <ImageIcon size={22} />
        </button>
        <input
          type="text"
          placeholder="例如：想吃辣的，不要太贵"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none border border-transparent focus:border-blue-300 transition-all"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim()}
          className={`p-2 rounded-full transition-all ${
            input.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
