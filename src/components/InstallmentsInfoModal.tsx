import React from 'react';
import { X, Check, CreditCard, Sparkles } from 'lucide-react';
import { AppLanguage } from '../types';

interface InstallmentsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  samplePrice?: number;
  language?: AppLanguage;
}

export const InstallmentsInfoModal: React.FC<InstallmentsInfoModalProps> = ({ 
  isOpen, 
  onClose,
  samplePrice = 300,
  language = 'en'
}) => {
  if (!isOpen) return null;

  const installmentAmount = (samplePrice / 3).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#faf7f2] rounded-xl border border-[#c8a97e]/40 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#dfcdb5] flex items-center justify-between bg-[#171513] text-[#faf7f2]">
          <div>
            <div className="flex items-center gap-1.5 text-[9px] text-[#b89058] font-bold uppercase tracking-[0.2em]">
              <span>{language === 'zh' ? '尊享分期' : 'Financial Atelier'}</span>
              <span>•</span>
              <span>0% APR</span>
            </div>
            <h3 className="font-serif text-lg font-normal text-[#dfcdb5]">
              {language === 'zh' ? '0% 真实免息分期' : 'Effortless Indulgence'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-sm bg-[#221e1a] hover:bg-[#332e29] flex items-center justify-center text-[#dfcdb5] transition-colors border border-[#b89058]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-[#5e564e] leading-relaxed font-sans">
            {language === 'zh'
              ? 'ÉLAN 艾澜与新加坡主流金融伙伴（Atome、GrabPay Later、PayNow 等）合作，为您提供 3 期免息分期，零隐藏手续费，轻盈投资您的肌肤与身心健康。'
              : 'ÉLAN partners with premier Singapore financial providers including Atome and GrabPay Later to let you invest in your skin health with zero interest, zero surprise fees, and automated convenience.'}
          </p>

          {/* Example 3-Part Timeline */}
          <div className="p-4 rounded-lg bg-white border border-[#c8a97e]/35 space-y-3 shadow-xs">
            <span className="text-xs font-serif font-normal text-[#171513] block">
              {language === 'zh'
                ? `透明 3 期付款示意 (示例: S$${samplePrice.toFixed(2)})`
                : `Transparent 3-Month Plan (Example: S$${samplePrice.toFixed(2)})`}
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-sm bg-[#f3ece0]/70 border border-[#c8a97e]/40">
                <span className="text-[9px] text-[#8c6d3b] font-bold uppercase tracking-wider block">
                  {language === 'zh' ? '今日' : 'Today'}
                </span>
                <span className="font-serif text-sm font-normal text-[#171513]">S${installmentAmount}</span>
                <span className="text-[9px] text-[#8c6d3b] block mt-0.5 font-mono font-bold">
                  {language === 'zh' ? '预订时支付' : 'At booking'}
                </span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#f8f5ee] border border-[#dfcdb5]">
                <span className="text-[9px] text-[#5e564e] font-bold uppercase tracking-wider block">
                  {language === 'zh' ? '第 30 天' : 'Day 30'}
                </span>
                <span className="font-serif text-sm font-normal text-[#5e564e]">S${installmentAmount}</span>
                <span className="text-[9px] text-[#5e564e] block mt-0.5 font-mono">
                  {language === 'zh' ? '自动扣款' : 'Automatic'}
                </span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#f8f5ee] border border-[#dfcdb5]">
                <span className="text-[9px] text-[#5e564e] font-bold uppercase tracking-wider block">
                  {language === 'zh' ? '第 60 天' : 'Day 60'}
                </span>
                <span className="font-serif text-sm font-normal text-[#5e564e]">S${installmentAmount}</span>
                <span className="text-[9px] text-[#5e564e] block mt-0.5 font-mono">
                  {language === 'zh' ? '最后一期' : 'Final payment'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#5e564e] font-sans">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#b89058] shrink-0" />
              <span>{language === 'zh' ? '100% 零利息，无新加坡信用卡附加费' : '100% Zero Interest and No Credit Card Surcharges'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#b89058] shrink-0" />
              <span>{language === 'zh' ? '尊享礼宾全额资金保障，支持 24 小时前免费取消' : 'Full Atelier Booking Escrow with 24-Hour Free Cancellation'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#b89058] shrink-0" />
              <span>{language === 'zh' ? '适用于乌节路与百丽宫等所有私密医师会所' : 'Eligible across all master estheticians and custom add-ons'}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#dfcdb5] bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="w-full py-2.5 rounded-sm bg-[#171513] text-[#dfcdb5] hover:bg-[#8c6d3b] hover:text-white font-bold text-[11px] uppercase tracking-[0.2em] transition-all border border-[#b89058]/30"
          >
            {language === 'zh' ? '我已了解' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
