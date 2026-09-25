import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Loader2, 
  ShieldAlert, 
  MapPin, 
  Navigation, 
  Layers, 
  Building,
  RotateCcw
} from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';
import { Language, t } from '../../lib/i18n';

interface DisasterGuardChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  habitation: Habitation;
  site: RelocationSite;
  allSites: RelocationSite[];
  stage: 'before' | 'relocation' | 'after';
  setStage: (stage: 'before' | 'relocation' | 'after') => void;
  setLayersVisibility: React.Dispatch<React.SetStateAction<any>>;
  currentLang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionTriggered?: string;
  timestamp: string;
}

export const DisasterGuardChatbot: React.FC<DisasterGuardChatbotProps> = ({
  isOpen,
  onClose,
  habitation,
  site,
  allSites,
  stage,
  setStage,
  setLayersVisibility,
  currentLang
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting when habitation or site changes
  useEffect(() => {
    setMessages([
      {
        id: 'initial-greeting',
        sender: 'assistant',
        text: `Welcome to DisasterGuard AI Command Support for Maharashtra. I am actively grounded in GIS spatial telemetry for ${habitation.name} (${habitation.district} District) and Candidate Site: ${site.name}. How can I assist your relocation and resilience evaluation today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [habitation.id, site.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Quick Action Buttons
  const quickActions = [
    { label: t('quickWhyRisk', currentLang), query: `Why is ${habitation.name} considered at high risk?` },
    { label: t('quickExplainRedZone', currentLang), query: `Explain the modelled Red Zone conditions for ${habitation.name}.` },
    { label: t('quickWhySite', currentLang), query: `Why was ${site.name} selected as the preferred candidate relocation site?` },
    { label: t('quickExplainCapacity', currentLang), query: `Explain carrying capacity and population allocation at ${site.name}.` },
    { label: t('quickExplainRehab', currentLang), query: `Show and explain the proposed after-rehabilitation settlement layout.` },
    { label: t('quickWhatChanges', currentLang), query: `What infrastructure changes after relocation to ${site.name}?` },
    { label: t('quickDecisionSummary', currentLang), query: `Generate official SDMA decision support summary for ${habitation.name}.` }
  ];

  // Process User Query and detect Map Action Triggers
  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputText('');
    setIsLoading(true);

    // Map Action Trigger parsing
    const lower = textToSend.toLowerCase();
    let actionTriggered = '';

    if (lower.includes('show after') || lower.includes('rehabilitation') || lower.includes('proposed layout')) {
      setStage('after');
      setLayersVisibility((prev: any) => ({ ...prev, candidateSite: true, planningBoundary: true }));
      actionTriggered = 'Activated AFTER stage & proposed rehabilitation settlement layout.';
    } else if (lower.includes('red zone') || lower.includes('hazard')) {
      setStage('before');
      setLayersVisibility((prev: any) => ({ ...prev, modelledRedZone: true, currentVillage: true }));
      actionTriggered = 'Activated BEFORE stage & highlighted Modelled Red Zone polygon.';
    } else if (lower.includes('route') || lower.includes('distance') || lower.includes('transit')) {
      setStage('relocation');
      setLayersVisibility((prev: any) => ({ ...prev, relocationRoute: true, currentVillage: true, candidateSite: true }));
      actionTriggered = 'Activated RELOCATION stage & drew blue transit route.';
    } else if (lower.includes('hospital') || lower.includes('phc') || lower.includes('clinic')) {
      setLayersVisibility((prev: any) => ({ ...prev, hospitalPhc: true }));
      actionTriggered = 'Enabled Hospital / PHC infrastructure telemetry layer.';
    } else if (lower.includes('school') || lower.includes('education')) {
      setLayersVisibility((prev: any) => ({ ...prev, school: true }));
      actionTriggered = 'Enabled ZP School & emergency shelter layer.';
    } else if (lower.includes('candidate site') || lower.includes('safe site') || lower.includes('plateau')) {
      setLayersVisibility((prev: any) => ({ ...prev, candidateSite: true, planningBoundary: true }));
      actionTriggered = 'Centered Candidate Site and highlighted planning boundary.';
    }

    // Call server AI endpoint with rich contextual data
    try {
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: {
            district: habitation.district,
            village: habitation,
            candidateSite: site,
            allDistrictSites: allSites,
            stage: stage,
            riskScore: habitation.riskScore,
            hazards: habitation.primaryHazard,
            redZoneConditions: habitation.redZoneConditions,
            carryingCapacity: site.estimatedCapacity,
            landHa: site.landAvailabilityHa,
            roadAccess: site.roadAccess
          }
        })
      });

      const data = await response.json();
      const reply = data.response || 'Information processed by DisasterGuard Spatial Engine.';

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          actionTriggered: actionTriggered || undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: `[DisasterGuard Decision Engine]: Model analysis for ${habitation.name} (Risk ${habitation.riskScore}/100) indicates high priority for relocation to ${site.name} (${site.suitabilityScore} pts, ${site.estimatedCapacity} capacity).`,
          actionTriggered: actionTriggered || undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-[#0B0F17] border-l border-[#1E293B] shadow-2xl flex flex-col justify-between animate-fadeIn text-[#F8FAFC]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1E293B] bg-[#0F1720] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center text-slate-950 shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#F8FAFC] flex items-center space-x-2">
              <span>{t('chatbotTitle', currentLang)}</span>
              <span className="text-[9px] bg-[#10B981]/20 text-[#34D399] px-2 py-0.5 rounded font-mono font-bold">
                GIS Grounded
              </span>
            </h3>
            <p className="text-[10px] text-[#94A3B8]">
              {t('chatbotPromptHint', currentLang)}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl hover:bg-[#16202B] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Current Context Strip */}
      <div className="px-5 py-2 bg-[#111827] border-b border-[#1E293B] text-[10px] text-[#94A3B8] flex items-center justify-between">
        <div className="truncate">
          Current Context: <strong className="text-[#EF4444]">{habitation.name}</strong> → <strong className="text-[#10B981]">{site.name}</strong>
        </div>
        <span className="font-mono text-[#34D399] shrink-0 uppercase">
          Stage: {stage}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2.5 ${
              m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                m.sender === 'user'
                  ? 'bg-[#16202B] text-[#F8FAFC] border border-[#1E293B]'
                  : 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#10B981] text-slate-950 font-medium rounded-tr-none'
                  : 'bg-[#111827] border border-[#1E293B] text-[#F8FAFC] rounded-tl-none shadow-sm'
              }`}
            >
              <div>{m.text}</div>

              {/* Action Trigger Badge */}
              {m.actionTriggered && (
                <div className="mt-2 pt-2 border-t border-[#1E293B] flex items-center space-x-1.5 text-[10px] text-[#34D399] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Map Action: {m.actionTriggered}</span>
                </div>
              )}

              <span className="block text-[8px] opacity-60 text-right mt-1 font-mono">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2.5 text-xs text-[#94A3B8]">
            <div className="w-7 h-7 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[#111827] border border-[#1E293B] px-3.5 py-2 rounded-2xl flex items-center space-x-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#10B981]" />
              <span>Analyzing GIS telemetry and model outputs...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Action Chips */}
      <div className="px-4 py-2 bg-[#0F1720] border-t border-[#1E293B] flex gap-1.5 overflow-x-auto scrollbar-none">
        {quickActions.map((qa, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qa.query)}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#16202B] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] text-[10px] font-semibold transition-colors shrink-0 flex items-center space-x-1"
          >
            <span>{qa.label}</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#10B981]" />
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3.5 bg-[#0F1720] border-t border-[#1E293B] flex items-center space-x-2">
        <input
          type="text"
          placeholder={t('askChatbotPlaceholder', currentLang)}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-[#111827] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#10B981] transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          className="p-2 bg-gradient-to-r from-[#10B981] to-[#047857] hover:from-[#34D399] hover:to-[#10B981] disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
