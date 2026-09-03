import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ChevronDown, 
  Bell, 
  Search, 
  SlidersHorizontal, 
  Star, 
  Clock, 
  ArrowRight, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2, 
  Bookmark,
  Languages,
  ShieldCheck
} from 'lucide-react';
import { Practitioner, AppLanguage } from '../types';
import { ALL_PRACTITIONERS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

interface DiscoverViewProps {
  onSelectPractitioner: (p: Practitioner) => void;
  onOpenInstallmentsModal: () => void;
  onOpenJournalModal: () => void;
  savedPractitionerIds: string[];
  onToggleSave: (id: string) => void;
  language?: AppLanguage;
  onSetLanguage?: (lang: AppLanguage) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onSelectPractitioner,
  onOpenInstallmentsModal,
  onOpenJournalModal,
  savedPractitionerIds,
  onToggleSave,
  language: propLanguage,
  onSetLanguage: propSetLanguage
}) => {
  const { language: contextLang, setLanguage: contextSetLang, t } = useLanguage();
  const language = propLanguage || contextLang;
  const onSetLanguage = propSetLanguage || contextSetLang;

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'facial', label: t.filterFacial },
    { id: 'lift', label: t.filterLift },
    { id: 'cellular', label: t.filterCellular },
    { id: 'peel', label: t.filterPeel }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(
    language === 'zh' ? '新加坡 • 乌节路百丽宫' : 'Orchard Road, Singapore'
  );
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locations = [
    { en: 'Orchard Road, Singapore', zh: '新加坡 • 乌节路百丽宫' },
    { en: 'Paragon Medical Centre', zh: '百丽宫医疗大楼 (Paragon)' },
    { en: 'Palais Renaissance, Orchard', zh: '文艺复兴广场 (Palais)' },
    { en: 'Marina Bay Sands, Bayfront', zh: '滨海湾 (Marina Bay)' },
    { en: 'Dempsey Hill, Loewen Road', zh: '登布西山 (Dempsey Hill)' }
  ];

  const filteredPractitioners = ALL_PRACTITIONERS.filter(p => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.specialty.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.services.some(s => s.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex-1 w-full max-w-[720px] mx-auto pb-32 px-5 space-y-6">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md -mx-5 px-5 py-3 border-b border-[#c8a97e]/25">
        <div className="flex justify-between items-center w-full max-w-[720px] mx-auto gap-2">
          {/* Brand Emblem & Wordmark */}
          <div className="flex items-center gap-2.5">
            <button 
              aria-label="Brand Emblem" 
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#8c6d3b] bg-[#f3ece0] border border-[#c8a97e]/40 shadow-xs hover:border-[#b89058] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#8c6d3b]" />
            </button>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-normal tracking-[0.18em] text-[#171513]">
                ÉLAN
              </span>
              <span className="text-[8px] uppercase tracking-[0.22em] text-[#8c6d3b] font-sans font-bold -mt-0.5">
                {language === 'zh' ? '新加坡奢享工坊' : 'Singapore Sanctuary'}
              </span>
            </div>
          </div>

          {/* Right Actions: Language Switcher & Location Selector */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Pill */}
            {onSetLanguage && (
              <div className="flex items-center bg-[#f3ece0] border border-[#c8a97e]/40 rounded-full p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => onSetLanguage('en')}
                  className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${
                    language === 'en'
                      ? 'bg-[#171513] text-[#dfcdb5] shadow-xs'
                      : 'text-[#5e564e] hover:text-[#171513]'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onSetLanguage('zh')}
                  className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${
                    language === 'zh'
                      ? 'bg-[#171513] text-[#dfcdb5] shadow-xs'
                      : 'text-[#5e564e] hover:text-[#171513]'
                  }`}
                >
                  中文
                </button>
              </div>
            )}

            {/* Location Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#c8a97e]/35 text-[#171513] hover:border-[#b89058] transition-colors shadow-2xs active:scale-[0.985]" 
                type="button"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8c6d3b]" />
                <span className="text-[10px] font-bold uppercase tracking-wider truncate max-w-[110px] sm:max-w-[160px]">
                  {selectedLocation}
                </span>
                <ChevronDown className="w-3 h-3 text-[#8c6d3b]" />
              </button>

              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white border border-[#c8a97e]/40 shadow-xl py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[9px] uppercase font-bold text-[#8c6d3b] tracking-[0.2em] border-b border-[#dfcdb5]/60">
                    {language === 'zh' ? '选择新加坡街区' : 'Select Singapore District'}
                  </div>
                  {locations.map((loc) => {
                    const locLabel = language === 'zh' ? loc.zh : loc.en;
                    const isCurrent = selectedLocation === locLabel;
                    return (
                      <button
                        key={loc.en}
                        onClick={() => {
                          setSelectedLocation(locLabel);
                          setShowLocationDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#f8f5ee] transition-colors ${
                          isCurrent ? 'font-bold text-[#8c6d3b]' : 'text-[#171513]/80'
                        }`}
                      >
                        <span>{locLabel}</span>
                        {isCurrent && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6d3b]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Concierge Search Bar */}
      <section className="pt-1">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-[#8c6d3b] w-4 h-4 pointer-events-none" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-12 bg-white border border-[#c8a97e]/35 rounded-full text-xs text-[#171513] placeholder:text-[#5e564e]/60 focus:outline-none focus:border-[#b89058] transition-all shadow-[0_2px_16px_rgba(184,144,88,0.06)]" 
            placeholder={t.searchPlaceholder}
            type="text"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-[10px] font-bold uppercase tracking-wider text-[#8c6d3b] hover:text-[#171513]"
            >
              {language === 'zh' ? '清空' : 'Clear'}
            </button>
          ) : (
            <button 
              aria-label="Filters" 
              className="absolute right-2 w-8 h-8 rounded-full bg-[#f3ece0] flex items-center justify-center text-[#8c6d3b] hover:text-[#171513] transition-colors" 
              type="button"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Category Pill Carousel */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`h-8 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap active:scale-[0.985] transition-all ${
                  isSelected
                    ? 'bg-[#171513] text-[#dfcdb5] border border-[#b89058]/50 shadow-sm'
                    : 'bg-white/90 border border-[#c8a97e]/30 text-[#5e564e] hover:text-[#171513] hover:border-[#b89058]'
                }`}
                type="button"
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Hero Editorial Spotlight Card */}
      <section>
        <div 
          onClick={() => onSelectPractitioner(ALL_PRACTITIONERS[0])}
          className="relative overflow-hidden rounded-xl bg-white border border-[#c8a97e]/40 shadow-[0_8px_30px_rgba(23,21,19,0.06)] group cursor-pointer transition-all hover:border-[#b89058]"
        >
          <div className="relative h-64 w-full overflow-hidden bg-[#e8e4db]">
            <img 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out" 
              alt="Luxury high-end spa sanctuary treatment suite in Orchard Singapore"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4tWB0bZPUFTnHlIMHdBs6Uj940TVKew8x_g6em_6wJWEp8U0A_WidWbzSLAc0bBytHQ38UZV70o66ZqhdObuklEk-wyHQOM_dGDzlOKbJDH85laEeAzCrLrXY_qFwD5YN-2S4UL6aJqaOQpXpKTkt8G7GucuxZ6XDIN93J4oO_SLIAPVLKTYxnOjjYT7oqDIUfLaEig3W3aiNr0kuPTu8DA9C0C4ja-1WtKpW4YIG0an2Zy3a8Tjclw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/30 to-transparent"></div>
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#141210]/90 backdrop-blur-md border border-[#b89058]/50 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b89058] shadow-[0_0_8px_#b89058]"></span>
              <span className="text-[9px] font-bold text-[#dfcdb5] tracking-[0.2em] uppercase">
                {t.spotlightBadge}
              </span>
            </div>
          </div>
          
          <div className="p-6 bg-white relative">
            <div className="flex items-center gap-2 mb-2 sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b]">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span>{language === 'zh' ? '乌节路百丽宫医疗私密套房' : 'Paragon Medical Suite, Orchard'}</span>
              <span>•</span>
              <span>{language === 'zh' ? '严格独立预约' : 'HEPA-14 Clean Air'}</span>
            </div>
            
            <h2 className="font-serif text-xl sm:text-2xl text-[#171513] mb-2 font-normal leading-snug">
              {t.spotlightTitle} — <span className="italic text-[#8c6d3b]">{language === 'zh' ? '新加坡特选' : 'Singapore Exclusive'}</span>
            </h2>
            
            <p className="text-xs sm:text-[13px] text-[#5e564e] mb-5 leading-relaxed font-sans">
              {t.spotlightDesc}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-[#dfcdb5]">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8c6d3b] border-b border-[#b89058] pb-0.5">
                {t.spotlightAction}
              </span>
              <button 
                aria-label="Explore Atelier" 
                className="w-9 h-9 rounded-full bg-[#171513] text-[#dfcdb5] flex items-center justify-center border border-[#b89058]/40 group-hover:bg-[#8c6d3b] group-hover:text-white transition-colors active:scale-[0.985] shadow-xs" 
                type="button"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Perks Installment Banner */}
      <section>
        <div 
          onClick={onOpenInstallmentsModal}
          className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#fbf8f2] to-[#f4ede1] border border-[#c8a97e]/40 shadow-xs hover:border-[#b89058] cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#b89058]/15 flex items-center justify-center text-[#8c6d3b] shrink-0 border border-[#b89058]/40">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-sm font-normal text-[#171513]">
                {language === 'zh' ? '轻松分期尊享' : 'Effortless Indulgence'} <span className="italic text-[#8c6d3b]">— 0% APR</span>
              </p>
              <p className="text-[11px] text-[#5e564e]">
                {language === 'zh' ? '支持 Atome 与 GrabPay 分 3 期免息灵活支付' : 'Split into 3 zero-interest disbursements with Atome & GrabPay'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6d3b] border-b border-[#b89058] pb-0.5 hidden sm:inline">
            {t.bnplLearnMore}
          </span>
          <ChevronRight className="w-4 h-4 text-[#8c6d3b] sm:hidden" />
        </div>
      </section>

      {/* Section: Personalized For You */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-[#dfcdb5] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span className="text-[9px] font-bold text-[#8c6d3b] uppercase tracking-[0.2em] block">
                {language === 'zh' ? '新加坡严选名医' : 'Singapore Directory'}
              </span>
            </div>
            <h3 className="font-serif text-xl text-[#171513] font-normal">
              {language === 'zh' ? '专属定制' : 'Personalized For'}{' '}
              <span className="italic text-[#8c6d3b]">{language === 'zh' ? '美肤名家' : 'You'}</span>
            </h3>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8c6d3b]">
            {filteredPractitioners.length} {language === 'zh' ? '位名家' : 'Masters'}
          </span>
        </div>

        {/* Grid of Vetted Practitioner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPractitioners.map((practitioner) => {
            const isSaved = savedPractitionerIds.includes(practitioner.id);
            return (
              <div 
                key={practitioner.id}
                className="rounded-xl bg-white border border-[#c8a97e]/35 p-4 flex flex-col justify-between shadow-[0_4px_20px_rgba(23,21,19,0.04)] hover:border-[#b89058] transition-all group"
              >
                <div>
                  <div className="flex gap-3.5 items-start">
                    <div className="relative shrink-0 cursor-pointer" onClick={() => onSelectPractitioner(practitioner)}>
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#e8e4db] border border-[#c8a97e]/40 shadow-xs">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                          alt={practitioner.name}
                          src={practitioner.heroImage}
                        />
                      </div>
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-sm bg-[#141210] text-[#dfcdb5] text-[8px] font-bold uppercase tracking-wider whitespace-nowrap border border-[#b89058]/50 shadow-xs">
                        Top 1%
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] px-2 py-0.5 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35 font-bold uppercase tracking-wider">
                          {t.verifiedPractitioner}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(practitioner.id);
                          }}
                          aria-label="Save practitioner"
                          className="text-[#8c6d3b]/60 hover:text-[#8c6d3b] transition-colors p-1"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#b89058] text-[#b89058]' : ''}`} />
                        </button>
                      </div>

                      <h4 
                        onClick={() => onSelectPractitioner(practitioner)}
                        className="font-serif text-base font-normal text-[#171513] truncate cursor-pointer hover:text-[#8c6d3b] transition-colors"
                      >
                        {practitioner.name}
                      </h4>
                      <p className="text-xs text-[#5e564e] truncate font-sans">{practitioner.specialty}</p>

                      <div className="flex items-center gap-1.5 mt-1 text-[#8c6d3b]">
                        <Star className="w-3.5 h-3.5 text-[#b89058] fill-[#b89058]" />
                        <span className="text-xs font-bold text-[#171513]">{practitioner.rating}</span>
                        <span className="text-[10px] text-[#5e564e]">({practitioner.reviewCount} {language === 'zh' ? '条好评' : 'reviews'})</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Highlights & Schedule */}
                  <div className="mt-4 p-2.5 rounded-lg bg-[#f8f5ee] border border-[#c8a97e]/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#5e564e]">
                      <Clock className="w-3.5 h-3.5 text-[#8c6d3b]" />
                      <span className="text-[11px]">{t.nextAvailable}: <strong className="text-[#171513] font-bold">{practitioner.nextSlot}</strong></span>
                    </div>
                    <span className="text-[9px] text-[#8c6d3b] uppercase font-bold tracking-widest truncate max-w-[100px]">
                      {practitioner.location.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Pricing & Direct Reserve */}
                <div className="mt-4 pt-3 border-t border-[#dfcdb5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8c6d3b] uppercase tracking-wider block font-bold">
                      {language === 'zh' ? '疗程起价' : 'Direct Rate'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-[#5e564e]">{t.startingFrom}</span>
                      <span className="font-serif text-lg text-[#171513] font-normal">S${practitioner.startingPrice}</span>
                      <span className="text-xs text-[#5e564e]">/ {practitioner.durationMinutes}m</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onSelectPractitioner(practitioner)}
                    className="h-8 px-4 rounded-sm bg-[#171513] text-[#dfcdb5] text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-[#8c6d3b] hover:text-white transition-colors border border-[#b89058]/40 shadow-xs active:scale-[0.985]" 
                    type="button"
                  >
                    {t.bookSession}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Beauty Tip / Concierge Journal Card */}
      <section>
        <div className="p-6 rounded-xl bg-[#f8f4ed] border border-[#c8a97e]/35 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
            <span className="text-[9px] font-bold text-[#8c6d3b] uppercase tracking-[0.2em]">
              {language === 'zh' ? '每日贵宾护肤志 • 第一期' : 'Daily Concierge Journal • Volume I'}
            </span>
          </div>

          <h4 className="font-serif text-base text-[#171513] mb-2 font-normal italic">
            {t.dailyJournalTitle}
          </h4>
          <p className="text-xs sm:text-[13px] text-[#5e564e] leading-relaxed mb-4 font-sans">
            {t.dailyJournalSubtitle}
          </p>

          <button 
            onClick={onOpenJournalModal}
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8c6d3b] border-b border-[#b89058] pb-0.5 hover:text-[#171513] transition-colors inline-flex items-center gap-1.5" 
            type="button"
          >
            <span>{t.openJournal}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>
    </div>
  );
};

