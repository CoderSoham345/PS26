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
      content: 'Hello, I am DisasterGuard Gemini AI Assistant. I can analyze multi-hazard risks, explain relocation priorities, evaluate candidate safe sites, or run climate scenario simulations for Maharashtra. How can I assist your disaster management review today?'
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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1519] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#071216]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span>DisasterGuard Gemini AI Intelligence</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">Model 2.5 Flash</span>
              </h2>
              <p className="text-xs text-slate-400">Natural-language GIS query & decision-support reasoning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-teal-600 text-white' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-[#071216] border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#071216] border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-400 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Analyzing GIS models and hazard telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-2 bg-[#071216]/55 border-t border-slate-800/80 flex gap-2 overflow-x-auto scrollbar-none">
          {samplePrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 px-3 py-1.5 rounded-lg text-[11px] transition-colors flex items-center space-x-1 shrink-0"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#071216] border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask about habitation risk, safe sites, or simulation scenarios..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#0B1519] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
