import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, Loader2 } from 'lucide-react';
import { Habitation } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitations: Habitation[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, habitations }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello, I am सुरक्षित धरा AI (SURAKSHIT DHARA AI Assistant). I can analyze multi-hazard risks, explain relocation priorities, evaluate candidate safe sites, or run climate scenario simulations for Maharashtra. How can I assist your disaster management review today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const samplePrompts = [
    'Which villages have the highest modeled relocation priority?',
    'Why is Talien Wadi (Village A) considered high risk?',
    'Find candidate relocation sites within 10 km of Raigad.',
    'What happens to landslide risk if rainfall increases by 20%?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend, context: { habitations } })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error communicating with AI service. Please verify your GEMINI_API_KEY.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#17221D]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#DCE7E1] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden text-[#17221D]">
        {/* Header (Light green background) */}
        <div className="px-6 py-4 border-b border-[#DCE7E1] flex items-center justify-between bg-[#E7F6EF]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-white text-[#087F5B] border border-[#B8E5D2] shadow-2xs">
              <Sparkles className="w-5 h-5 text-[#087F5B]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#07543F] flex items-center space-x-2">
                <span>सुरक्षित धरा AI • SURAKSHIT DHARA AI</span>
                <span className="text-[10px] bg-[#087F5B] text-white px-2 py-0.5 rounded-full font-bold">Model 3.8 Flash</span>
              </h2>
              <p className="text-xs text-[#66736D]">Natural-language GIS query & decision-support reasoning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/80 rounded-lg text-[#66736D] hover:text-[#17221D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F6F9F7]">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-[#087F5B] text-white' : 'bg-white border border-[#B8E5D2] text-[#087F5B]'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-white border border-[#DCE7E1] text-[#17221D] rounded-tr-none shadow-2xs'
                  : 'bg-[#E7F6EF] border border-[#B8E5D2] text-[#07543F] rounded-tl-none shadow-2xs'
              }`}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white border border-[#B8E5D2] flex items-center justify-center text-[#087F5B]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#E7F6EF] border border-[#B8E5D2] rounded-2xl px-4 py-3 text-xs text-[#07543F] flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#087F5B]" />
                <span>Analyzing GIS models and hazard telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-2 bg-white border-t border-[#DCE7E1] flex gap-2 overflow-x-auto scrollbar-none">
          {samplePrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap bg-[#F6F9F7] hover:bg-[#E7F6EF] border border-[#DCE7E1] text-[#17221D] hover:text-[#07543F] px-3 py-1.5 rounded-lg text-[11px] transition-colors flex items-center space-x-1 shrink-0 font-medium"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-[#087F5B]" />
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#DCE7E1] flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask about habitation risk, safe sites, or simulation scenarios..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl px-4 py-2.5 text-xs text-[#17221D] placeholder-[#66736D] focus:outline-none focus:border-[#087F5B] transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-2.5 bg-[#087F5B] hover:bg-[#07543F] disabled:opacity-50 text-white font-semibold rounded-xl transition-colors shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
