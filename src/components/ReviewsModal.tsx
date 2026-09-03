import React from 'react';
import { X, Sparkles, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { VERIFIED_REVIEWS } from '../data/mockData';
import { AppLanguage } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  practitionerName: string;
  language?: AppLanguage;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ 
  isOpen, 
  onClose, 
  practitionerName,
  language = 'en'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#faf7f2] rounded-xl border border-[#c8a97e]/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#dfcdb5] flex items-center justify-between bg-[#171513] text-[#faf7f2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#221e1a] flex items-center justify-center text-[#b89058] border border-[#b89058]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-normal text-[#dfcdb5]">
                {language === 'zh' ? 'AI 真实点评综合分析' : 'LLM AI Review Synthesis'}
              </h3>
              <p className="text-xs text-[#dfcdb5]/60">
                {language === 'zh' ? `280+ 真实预约评价 • ${practitionerName}` : `280+ verified appointments • ${practitionerName}`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-sm bg-[#221e1a] hover:bg-[#332e29] flex items-center justify-center text-[#dfcdb5] transition-colors border border-[#b89058]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 no-scrollbar">
          {/* Executive Synthesis Box */}
          <div className="p-4 rounded-lg bg-white border border-[#c8a97e]/35 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b] px-2 py-0.5 rounded-sm bg-[#f3ece0] border border-[#c8a97e]/30">
                {language === 'zh' ? '临床核心发现' : 'Key Clinical Findings'}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#171513] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                99.4% {language === 'zh' ? '复约意愿' : 'Repeat Intent'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5e564e] leading-relaxed font-sans">
              {language === 'zh'
                ? '用户对极具法式优雅的徒手淋巴重塑手法与温和修护配方赞誉有加。在乌节路与百丽宫医疗中心的独立私密套房体验中，99.4% 会员对隐私保护与疗程后即刻光泽度给予满分评价。'
                : 'Consistently praised for bespoke precision, serene French lymphatic sculpting technique, and transformative post-procedure epidermal barrier resilience. Clients highlight strict discretion in Singapore private suites.'}
            </p>
          </div>

          {/* Sentiment Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-lg bg-white border border-[#c8a97e]/35 shadow-xs">
              <span className="block text-base font-serif font-normal text-[#171513]">99.8%</span>
              <span className="text-[9px] text-[#8c6d3b] uppercase tracking-widest font-bold">
                {language === 'zh' ? '手法精湛' : 'Manual Touch'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#c8a97e]/35 shadow-xs">
              <span className="block text-base font-serif font-normal text-[#171513]">100%</span>
              <span className="text-[9px] text-[#8c6d3b] uppercase tracking-widest font-bold">
                {language === 'zh' ? '私密严谨' : 'Discretion'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#c8a97e]/35 shadow-xs">
              <span className="block text-base font-serif font-normal text-[#171513]">98.9%</span>
              <span className="text-[9px] text-[#8c6d3b] uppercase tracking-widest font-bold">
                {language === 'zh' ? '屏障光泽' : 'Barrier Glow'}
              </span>
            </div>
          </div>

          {/* Client Verbatim Reviews */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <h4 className="font-serif text-sm font-normal text-[#171513]">
                {language === 'zh' ? '最新真实宾客证言' : 'Recent Verified Testimonials'}
              </h4>
            </div>
            {VERIFIED_REVIEWS.map((rev, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-white border border-[#c8a97e]/35 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-xs font-normal text-[#171513]">{rev.author}</span>
                    <span className="text-[11px] text-[#5e564e]">• {rev.location}</span>
                  </div>
                  <div className="flex items-center text-[#b89058]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#b89058]" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#8c6d3b] font-mono">
                  <CheckCircle2 className="w-3 h-3 text-[#b89058]" />
                  <span>Verified Booking ({rev.treatment})</span>
                </div>
                <p className="text-xs text-[#5e564e] leading-relaxed italic font-sans">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#dfcdb5] bg-white flex justify-between items-center text-xs text-[#5e564e]">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#8c6d3b]">
            <ShieldCheck className="w-4 h-4 text-[#b89058]" />
            {language === 'zh' ? '区块链加密核验记录' : 'Encrypted Verified Records'}
          </span>
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-[#171513] text-[#dfcdb5] hover:bg-[#8c6d3b] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all border border-[#b89058]/35"
          >
            {language === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
