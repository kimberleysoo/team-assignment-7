import React from 'react';
import { X, BookOpen, CheckCircle2 } from 'lucide-react';
import { AppLanguage } from '../types';

interface ConciergeJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: AppLanguage;
}

export const ConciergeJournalModal: React.FC<ConciergeJournalModalProps> = ({ 
  isOpen, 
  onClose,
  language = 'en'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#faf7f2] rounded-xl border border-[#c8a97e]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#dfcdb5] flex items-center justify-between bg-[#171513] text-[#faf7f2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#221e1a] flex items-center justify-center text-[#b89058] border border-[#b89058]/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-[#b89058] uppercase tracking-[0.2em] block">
                {language === 'zh' ? '每日礼宾医美期刊' : 'Daily Concierge Journal'}
              </span>
              <h3 className="font-serif text-base font-normal text-[#dfcdb5]">
                {language === 'zh' ? '术前肌肤充盈保湿与院线准备指南' : 'Pre-treatment Hydration & Protocol Guide'}
              </h3>
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

        <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#5e564e] leading-relaxed no-scrollbar font-sans">
          <div className="p-4 rounded-lg bg-white border border-[#c8a97e]/35 space-y-2 shadow-xs">
            <h4 className="font-serif text-sm font-normal text-[#171513]">
              {language === 'zh' ? '皮肤科医学指引：72小时细胞预备法则' : 'Medical Directive: The 72-Hour Cellular Primer'}
            </h4>
            <p>
              {language === 'zh'
                ? '为了在超声波空化及深层细胞重塑中实现最佳透皮吸收，新加坡资深皮肤学顾问建议您在到店前 72 小时内暂停高浓度视黄醇与高浓度酸类产品。'
                : 'To maximize ultrasound cavitation and deep dermal peeling results, board dermatologists advise pausing active retinol and AHA/BHA formulations 72 hours prior to your session.'}
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-[#171513] uppercase text-[10px] tracking-[0.2em]">
              {language === 'zh' ? '核心护理准备清单：' : 'Key Preparation Checklist:'}
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#c8a97e]/35 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#b89058] shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'zh' ? '脂质屏障修护：' : 'Lipid Barrier Reinforcement:'} </strong>
                  {language === 'zh' ? '早晚使用仿生神经酰胺，防止表皮水分流失。' : 'Apply bio-identical ceramides morning and evening to prevent transepidermal water loss.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#c8a97e]/35 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#b89058] shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'zh' ? '体内深层补水：' : 'Internal Hydration:'} </strong>
                  {language === 'zh' ? '每日饮用 2.5L 矿物质水；充盈的细胞基质对微电流吸收率提升 34%。' : 'Consume 2.5L of mineral-rich water daily; hydrated cellular matrices respond 34% better to microcurrent frequencies.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#c8a97e]/35 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#b89058] shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'zh' ? '避免物理磨砂：' : 'No Harsh Mechanical Scrubs:'} </strong>
                  {language === 'zh' ? '保留天然角质层厚度，便于到店后由超声波精细剥脱。' : 'Allow natural stratum corneum thickness for sonic ultrasonic exfoliation.'}
                </span>
              </li>
            </ul>
          </div>

          <p className="italic text-[#8c6d3b] bg-[#f3ece0]/70 p-3.5 rounded-lg border border-[#c8a97e]/35 font-serif">
            {language === 'zh'
              ? '“平静且充分滋养的角质屏障能使活性多肽纳米小分子渗透加倍，且不引发敏感性组胺反应。” —— Dr. Hélène Vance 博士'
              : '"A calm, primed skin barrier allows active peptide nano-molecules to penetrate twice as deep without triggering reactive mast cell histamine release." — Dr. Hélène Vance'}
          </p>
        </div>

        <div className="p-4 border-t border-[#dfcdb5] bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-[#171513] text-[#dfcdb5] hover:bg-[#8c6d3b] hover:text-white font-bold text-[11px] uppercase tracking-[0.2em] transition-all border border-[#b89058]/35"
          >
            {language === 'zh' ? '完成阅读' : 'Done Reading'}
          </button>
        </div>
      </div>
    </div>
  );
};
