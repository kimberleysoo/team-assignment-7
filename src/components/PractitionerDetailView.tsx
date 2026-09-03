import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Star, 
  History, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  Check, 
  Zap, 
  Shield, 
  ChevronLeft, 
  Building2, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { Practitioner, TreatmentService, AppLanguage } from '../types';
import { PORTFOLIO_CASES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

interface PractitionerDetailViewProps {
  practitioner: Practitioner;
  selectedService: TreatmentService;
  onSelectService: (service: TreatmentService) => void;
  onProceedToDateTime: () => void;
  onBack: () => void;
  onOpenReviewsModal: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  language?: AppLanguage;
}

export const PractitionerDetailView: React.FC<PractitionerDetailViewProps> = ({
  practitioner,
  selectedService,
  onSelectService,
  onProceedToDateTime,
  onBack,
  onOpenReviewsModal,
  isSaved,
  onToggleSave,
  language: propLanguage
}) => {
  const { language: contextLang, t } = useLanguage();
  const language = propLanguage || contextLang;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedCaseModal, setSelectedCaseModal] = useState<typeof PORTFOLIO_CASES[0] | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const installmentAmount = (selectedService.price / 3).toFixed(2);

  return (
    <div className="relative w-full max-w-[720px] mx-auto min-h-screen pb-40">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md transition-all duration-200 border-b border-[#c8a97e]/25">
        <div className="flex justify-between items-center w-full px-5 py-3 max-w-[720px] mx-auto">
          <button 
            onClick={onBack}
            aria-label="Go Back" 
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#171513] hover:text-[#8c6d3b] active:scale-[0.985] transition-all shadow-xs border border-[#c8a97e]/35"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="font-serif text-lg font-normal tracking-[0.18em] text-[#171513]">
              ÉLAN
            </span>
            <span className="text-[8px] text-[#8c6d3b] font-bold tracking-[0.25em] uppercase -mt-0.5">
              {language === 'zh' ? '名家专属主页' : 'Master Atelier Dossier'}
            </span>
          </div>

          <button 
            onClick={onToggleSave}
            aria-label="Save Practitioner" 
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#171513] hover:text-[#8c6d3b] active:scale-[0.985] transition-all shadow-xs border border-[#c8a97e]/35"
          >
            <Bookmark className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#b89058] text-[#b89058]' : 'text-[#8c6d3b]/60'}`} />
          </button>
        </div>
      </header>

      {/* Top Hero Section */}
      <section className="px-5 pt-3">
        <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-xs border border-[#c8a97e]/40 bg-[#e8e4db] group">
          <img 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out" 
            alt={practitioner.name}
            src={practitioner.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/30 to-transparent"></div>
          
          {/* Floating Location & Verified Pill */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/95 backdrop-blur-md text-[#171513] border border-[#c8a97e]/35 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#8c6d3b]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{practitioner.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#141210]/95 text-[#dfcdb5] border border-[#b89058]/50 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-[#b89058]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
                {t.verifiedPractitioner}
              </span>
            </div>
          </div>

          {/* Practitioner Identity overlay */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1 text-[9px] uppercase tracking-[0.2em] font-bold text-[#dfcdb5]">
              <span className="w-5 h-[1.5px] bg-[#b89058]"></span>
              <span>{practitioner.specialty}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white drop-shadow-xs">
              {practitioner.name}
            </h1>
            <p className="text-xs sm:text-[13px] text-[#dfcdb5] mt-1 font-sans italic">
              {practitioner.title}
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 mt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#c8a97e]/35 text-[#8c6d3b] text-[10px] uppercase tracking-wider font-bold shrink-0 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#b89058]" />
            {language === 'zh' ? '新加坡医学会认证' : 'Board Certified'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#f3ece0] border border-[#c8a97e]/35 text-[#8c6d3b] text-[10px] uppercase tracking-wider font-bold shrink-0 shadow-xs">
            <Star className="w-3.5 h-3.5 text-[#b89058] fill-[#b89058]" />
            {language === 'zh' ? '前 1% 极奢评分' : 'Top 1% Rated'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#c8a97e]/35 text-[#8c6d3b] text-[10px] uppercase tracking-wider font-bold shrink-0 shadow-xs">
            <History className="w-3.5 h-3.5 text-[#b89058]" />
            {language === 'zh' ? '12+ 年专科临床经验' : '12+ Yrs Experience'}
          </span>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="px-5 mt-1">
        <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-[#c8a97e]/35 shadow-xs divide-x divide-[#dfcdb5]">
          <div className="flex flex-col items-center justify-center text-center pr-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#b89058] fill-[#b89058]" />
              <span className="font-serif text-lg font-normal text-[#171513]">{practitioner.rating}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8c6d3b] mt-0.5">
              {language === 'zh' ? '好评评分' : 'Rating'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2">
            <span className="font-serif text-lg font-normal text-[#171513]">{practitioner.clientCount}</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8c6d3b] mt-0.5">
              {language === 'zh' ? '服务贵宾' : 'Clients'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center pl-2">
            <div className="flex items-center gap-1 text-[#8c6d3b]">
              <CheckCircle2 className="w-4 h-4 text-[#b89058]" />
              <span className="font-serif text-lg font-normal text-[#171513]">{practitioner.verifiedRate}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8c6d3b] mt-0.5">
              {language === 'zh' ? '真实认证' : 'Verified'}
            </span>
          </div>
        </div>
      </section>

      {/* AI Review Synthesis */}
      <section className="px-5 mt-5">
        <div className="relative overflow-hidden rounded-xl bg-[#f8f4ed] p-5 border border-[#c8a97e]/35 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#8c6d3b] uppercase">
                {language === 'zh' ? 'AI 贵宾临床评价精萃' : 'LLM Editorial Review Synthesis'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35 text-[8px] font-bold uppercase tracking-wider">
              {language === 'zh' ? '实时提炼' : 'Realtime Dispatches'}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#5e564e] leading-relaxed font-sans">
            <span className="font-serif italic font-normal text-[#171513]">
              {language === 'zh' ? `基于 ${practitioner.reviewCount}+ 位实名预约贵宾综合提炼：` : `Synthesized from ${practitioner.reviewCount}+ verified appointments:`}
            </span>{' '}
            {language === 'zh'
              ? '乌节路私密套房环境优雅静谧，面部淋巴排毒与筋膜提升手法纯熟，疗程后皮肤屏障光泽感与紧致度持续显著。'
              : 'Exceptional lymphatic drainage technique, immaculately sanitized private suite in Orchard, and lasting radiant skin barrier improvement.'}
          </p>

          <div className="mt-4 pt-3 border-t border-[#dfcdb5] flex items-center justify-between text-xs text-[#5e564e]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b89058] shadow-[0_0_6px_#b89058]"></span>
              <span className="text-[11px] font-medium text-[#171513]">
                {language === 'zh' ? '99.4% 贵宾复购意向' : '99.4% Client Repeat Intent'}
              </span>
            </div>
            <button 
              onClick={onOpenReviewsModal}
              className="text-[#8c6d3b] text-[10px] font-bold uppercase tracking-wider border-b border-[#b89058] pb-0.5 flex items-center gap-1 hover:text-[#171513] transition-colors"
            >
              {language === 'zh' ? '查看全部评价' : 'View All Reviews'}
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Curated Treatment Menu */}
      <section className="px-5 mt-7">
        <div className="flex items-baseline justify-between mb-3 border-b border-[#dfcdb5] pb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b]">
                {language === 'zh' ? '名家专属疗程' : 'Atelier Protocols'}
              </span>
            </div>
            <h2 className="font-serif text-lg font-normal text-[#171513]">
              {language === 'zh' ? '精选奢享疗程菜单' : 'Curated Treatment Menu'}
            </h2>
          </div>
          <span className="text-[9px] text-[#8c6d3b] font-bold tracking-[0.2em] uppercase">
            {practitioner.services.length} {language === 'zh' ? '项疗程' : 'Offerings'}
          </span>
        </div>

        <div className="space-y-3">
          {practitioner.services.map((service) => {
            const isSelected = selectedService.id === service.id;
            return (
              <div 
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 shadow-xs ${
                  isSelected
                    ? 'border-2 border-[#b89058] bg-white ring-2 ring-[#b89058]/20 shadow-md'
                    : 'border border-[#c8a97e]/35 bg-white hover:border-[#b89058]/60'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-base font-normal text-[#171513]">
                        {service.name}
                      </h3>
                      {service.highlightBadge && (
                        <span className="px-2 py-0.5 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35 text-[8px] font-bold uppercase tracking-wider">
                          {service.highlightBadge}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-[#5e564e] mt-1 leading-relaxed font-sans">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#5e564e]">
                        <Clock className="w-3 h-3 text-[#8c6d3b]" />
                        {service.durationMinutes} min
                      </span>
                      {service.tagline && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#8c6d3b] font-medium">
                          <Check className="w-3 h-3 text-[#b89058]" />
                          {service.tagline}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-normal text-[#171513] block font-serif">
                      S${service.price}
                    </span>
                    <span className="text-[9px] text-[#8c6d3b] uppercase tracking-wider block mt-0.5 font-bold">
                      3x S${(service.price / 3).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Studio Case Portfolio */}
      <section className="mt-8">
        <div className="px-5 flex items-baseline justify-between mb-3 border-b border-[#dfcdb5] pb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b]">
                {language === 'zh' ? '真实临床档案' : 'Clinical Documentation'}
              </span>
            </div>
            <h2 className="font-serif text-lg font-normal text-[#171513]">
              {language === 'zh' ? '美肤调理真实案例' : 'Studio Case Portfolio'}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => scrollCarousel('left')}
              aria-label="Previous portfolio" 
              className="w-7 h-7 rounded-sm border border-[#dfcdb5] flex items-center justify-center text-[#8c6d3b] hover:text-[#171513] hover:border-[#b89058] transition-all bg-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              aria-label="Next portfolio" 
              className="w-7 h-7 rounded-sm border border-[#dfcdb5] flex items-center justify-center text-[#8c6d3b] hover:text-[#171513] hover:border-[#b89058] transition-all bg-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-5 snap-x scroll-smooth pb-2"
        >
          {PORTFOLIO_CASES.map((c) => (
            <div 
              key={c.id}
              onClick={() => setSelectedCaseModal(c)}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-xl overflow-hidden bg-white border border-[#c8a97e]/35 shadow-xs cursor-pointer hover:border-[#b89058] transition-all group"
            >
              <div className="relative h-48 w-full bg-[#e8e4db]">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                  alt={c.title}
                  src={c.imageUrl}
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-[#141210] text-[#dfcdb5] border border-[#b89058]/40 text-[9px] font-bold uppercase tracking-wider">
                  {c.sessionBadge}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-white/95 backdrop-blur-md text-[#171513] text-[9px] font-bold uppercase tracking-wider border border-[#dfcdb5]">
                  {c.treatmentName}
                </div>
              </div>
              <div className="p-3.5">
                <h4 className="font-serif text-sm font-normal text-[#171513]">{c.title}</h4>
                <p className="text-xs text-[#5e564e] mt-1 line-clamp-2 font-sans">{c.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clinic & Suite Atmosphere */}
      <section className="px-5 mt-7">
        <div className="p-5 rounded-xl bg-white border border-[#c8a97e]/35 shadow-xs flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden shrink-0 bg-[#e8e4db] border border-[#dfcdb5]">
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-all duration-500" 
              alt={practitioner.clinicName}
              src={practitioner.clinicImage}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#8c6d3b]">
              <Building2 className="w-3.5 h-3.5 text-[#b89058]" />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase">
                {language === 'zh' ? '私密奢享空间' : 'Private Sanctuary'}
              </span>
            </div>
            <h4 className="font-serif text-base font-normal text-[#171513] mt-1">
              {practitioner.clinicName}
            </h4>
            <p className="text-xs text-[#5e564e] mt-1 leading-relaxed font-sans">
              {practitioner.clinicDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#faf7f2]/95 backdrop-blur-lg border-t border-[#c8a97e]/30 shadow-[0_-8px_30px_rgba(23,21,19,0.08)]">
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Pricing Info */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[9px] text-[#8c6d3b] uppercase tracking-[0.2em] font-bold">
                  {language === 'zh' ? '标准礼遇价' : 'Standard Rate'}
                </span>
                <span className="font-serif text-xl font-normal text-[#171513]">
                  S${selectedService.price}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#f3ece0] border border-[#c8a97e]/35 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89058] shadow-[0_0_6px_#b89058]"></span>
                <span className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold">
                  {language === 'zh' ? `或分 3 期每期 S$${installmentAmount} (免利息)` : `Or 3 x S$${installmentAmount} with Atome (0% APR)`}
                </span>
              </div>
            </div>
            
            <div className="sm:hidden">
              <span className="text-[10px] text-[#8c6d3b] uppercase font-bold tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#b89058]" /> {language === 'zh' ? '实时确认' : 'Instant Pass'}
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <button 
            onClick={onProceedToDateTime}
            className="w-full sm:w-auto flex-1 sm:flex-initial px-8 py-3.5 rounded-sm bg-[#171513] text-[#dfcdb5] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8c6d3b] hover:text-white active:scale-[0.985] transition-all flex items-center justify-center gap-2 border border-[#b89058]/40 shadow-md"
          >
            <span>{language === 'zh' ? `立即预约 ${selectedService.name.split(' ')[0]} — S$${selectedService.price}` : `Reserve ${selectedService.name.split(' ')[0]} — S$${selectedService.price}`}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#b89058]" />
          </button>
        </div>
      </div>

      {/* Case Lightbox Modal */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-xl overflow-hidden border border-black/10 shadow-2xl">
            <div className="relative h-64 w-full bg-black">
              <img 
                src={selectedCaseModal.imageUrl} 
                alt={selectedCaseModal.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedCaseModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em]">
                  {selectedCaseModal.treatmentName} • {selectedCaseModal.sessionBadge}
                </span>
              </div>
              <h3 className="font-serif text-lg font-normal text-[#1a1a1a]">
                {selectedCaseModal.title}
              </h3>
              <p className="text-xs text-[#1a1a1a]/70 leading-relaxed font-sans">
                {selectedCaseModal.subtitle}
              </p>
              <p className="text-xs text-[#1a1a1a]/80 bg-[#f5f2ed] p-3 rounded-md border border-black/10 font-sans">
                {selectedCaseModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
