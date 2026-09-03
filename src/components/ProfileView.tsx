import React from 'react';
import { 
  Shield, 
  Award, 
  CreditCard, 
  ChevronRight, 
  Sparkles, 
  Lock, 
  Globe, 
  MapPin, 
  Check, 
  CheckCircle2, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProfileViewProps {
  onOpenInstallmentsModal: () => void;
  onOpenJournalModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenInstallmentsModal,
  onOpenJournalModal
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  return (
    <div className="flex-1 w-full max-w-[720px] mx-auto pb-32 px-5 space-y-6 pt-4">
      {/* Profile Header & VIP Member Card */}
      <div className="bg-white rounded-xl border border-[#c8a97e]/35 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#141210] text-[#dfcdb5] flex items-center justify-center font-serif text-xl font-normal border border-[#b89058]/50 shadow-xs">
            ÉP
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-normal text-[#171513]">Éléonore de Parme</h2>
              <span className="text-[8px] bg-[#141210] text-[#dfcdb5] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest border border-[#b89058]/40">
                VIP
              </span>
            </div>
            <p className="text-xs text-[#5e564e]">{t.memberSince}</p>
            <span className="text-[11px] text-[#8c6d3b] font-mono mt-0.5 inline-block">
              eleonore.parme@elan.sg
            </span>
          </div>
        </div>

        {/* Noir Privilège Tier Card - Luxury Caviar & Gold */}
        <div className="p-5 rounded-lg bg-[#141210] text-[#faf7f2] space-y-3 shadow-md border border-[#b89058]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#b89058]/20 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#b89058]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#dfcdb5]">
                {t.noirPrivilege}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#b89058] font-bold">
              2,500 {t.pointsLabel}
            </span>
          </div>

          <p className="text-xs text-[#dfcdb5]/85 leading-relaxed font-sans relative z-10">
            {t.noirBenefits}
          </p>

          <div className="pt-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#b89058] border-t border-[#b89058]/20 relative z-10">
            <span className="text-[#dfcdb5]/70">
              {language === 'zh' ? '下一级别需达到 3,000 积分' : 'Next reward tier at 3,000 pts'}
            </span>
            <span 
              onClick={onOpenInstallmentsModal}
              className="border-b border-[#b89058] pb-0.5 cursor-pointer hover:text-white transition-colors"
            >
              {language === 'zh' ? '特权权益细则' : 'Benefits Overview'}
            </span>
          </div>
        </div>
      </div>

      {/* Language & Regional Preferences (Singapore Specific) */}
      <div className="bg-white rounded-xl border border-[#c8a97e]/35 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
          <h3 className="font-serif text-base font-normal text-[#171513]">
            {t.languageAndRegion}
          </h3>
        </div>

        {/* Language Selection */}
        <div className="p-4 rounded-lg bg-[#fbf8f3] border border-[#c8a97e]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#8c6d3b]" />
              <span className="text-xs font-bold text-[#171513]">
                {t.languagePreference}
              </span>
            </div>
            <span className="text-[10px] text-[#8c6d3b] uppercase tracking-wider font-bold">
              {language === 'en' ? 'English (Active)' : '中文 (当前生效)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setLanguage('en')}
              className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                language === 'en'
                  ? 'bg-[#141210] text-[#dfcdb5] border-[#b89058] shadow-xs'
                  : 'bg-white text-[#171513] border-[#c8a97e]/30 hover:border-[#b89058]'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">English</span>
                <span className={`text-[10px] block ${language === 'en' ? 'text-[#dfcdb5]/70' : 'text-[#5e564e]'}`}>
                  Singapore Atelier Standard
                </span>
              </div>
              {language === 'en' && <Check className="w-4 h-4 text-[#b89058]" />}
            </button>

            <button
              onClick={() => setLanguage('zh')}
              className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                language === 'zh'
                  ? 'bg-[#141210] text-[#dfcdb5] border-[#b89058] shadow-xs'
                  : 'bg-white text-[#171513] border-[#c8a97e]/30 hover:border-[#b89058]'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">中文 (Mandarin)</span>
                <span className={`text-[10px] block ${language === 'zh' ? 'text-[#dfcdb5]/70' : 'text-[#5e564e]'}`}>
                  华语界面与专属礼宾
                </span>
              </div>
              {language === 'zh' && <Check className="w-4 h-4 text-[#b89058]" />}
            </button>
          </div>
        </div>

        {/* Singapore Region & Currency */}
        <div className="p-3.5 rounded-lg bg-[#fbf8f3] border border-[#c8a97e]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#8c6d3b]" />
            <div>
              <span className="font-serif text-xs text-[#171513] block">
                {language === 'zh' ? '服务地区与货币' : 'Territory & Currency'}
              </span>
              <span className="text-[10px] text-[#5e564e]">
                Singapore (SGD S$) • Orchard Road District
              </span>
            </div>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#8c6d3b] bg-[#f3ece0] px-2.5 py-1 rounded-sm border border-[#c8a97e]/40">
            Singapore S$
          </span>
        </div>
      </div>

      {/* Skin Diagnostics & Preferences */}
      <div className="bg-white rounded-xl border border-[#c8a97e]/35 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
          <h3 className="font-serif text-base font-normal text-[#171513]">{t.skinProfile}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-[#fbf8f3] border border-[#c8a97e]/30">
            <span className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold block mb-0.5">
              {t.primaryFocus}
            </span>
            <span className="font-serif text-xs font-normal text-[#171513]">
              {language === 'zh' ? '屏障强韧修复与提拉' : 'Barrier Recovery & Firmness'}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-[#fbf8f3] border border-[#c8a97e]/30">
            <span className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold block mb-0.5">
              {t.skinSensitivity}
            </span>
            <span className="font-serif text-xs font-normal text-[#171513]">
              {language === 'zh' ? '轻敏脆弱肌 (Type II)' : 'Reactive (Type II)'}
            </span>
          </div>
        </div>
        <button 
          onClick={onOpenJournalModal}
          className="text-[10px] text-[#8c6d3b] font-bold uppercase tracking-wider border-b border-[#b89058] pb-0.5 flex items-center gap-1.5 hover:text-[#171513] pt-1 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>{language === 'zh' ? '查阅术前护肤准则与准备' : 'Review Pre-treatment Guidelines'}</span>
        </button>
      </div>

      {/* Payment & Installment Accounts */}
      <div className="bg-white rounded-xl border border-[#c8a97e]/35 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
            <h3 className="font-serif text-base font-normal text-[#171513]">{t.paymentMethods}</h3>
          </div>
          <button 
            onClick={onOpenInstallmentsModal}
            className="text-[10px] uppercase tracking-wider font-bold text-[#8c6d3b] border-b border-[#b89058] pb-0.5 hover:text-[#171513] transition-colors"
          >
            {language === 'zh' ? '免息分期介绍' : 'How BNPL Works'}
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3.5 rounded-lg bg-white border border-[#c8a97e]/35 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-[#8c6d3b]" />
              <div>
                <span className="font-serif text-xs font-normal text-[#171513] block">Stripe 1-Click Link</span>
                <span className="text-[10px] text-[#5e564e]">Auto-fills Mastercard ending in 8832 (SGD)</span>
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#141210] bg-[#dfcdb5] px-2 py-0.5 rounded-sm">
              {language === 'zh' ? '已绑定' : 'Active'}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#c8a97e]/35 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#b89058]"></div>
              <div>
                <span className="font-serif text-xs font-normal text-[#171513] block">
                  Atome Singapore PayLater
                </span>
                <span className="text-[10px] text-[#5e564e]">
                  {language === 'zh' ? '享 3 期 0% 利率免息分期资格' : '0% APR 3-Month Installment Eligible'}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#141210] bg-[#dfcdb5] px-2 py-0.5 rounded-sm">
              {language === 'zh' ? '已授权' : 'Connected'}
            </span>
          </div>
        </div>
      </div>

      {/* Security & Discretion Protocol */}
      <div className="p-4 rounded-lg bg-[#fbf8f3] border border-[#c8a97e]/30 flex items-center justify-between text-xs text-[#5e564e] font-sans">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#8c6d3b]" />
          <span>{t.medicalDiscretion}</span>
        </div>
        <Shield className="w-4 h-4 text-[#8c6d3b]" />
      </div>
    </div>
  );
};
