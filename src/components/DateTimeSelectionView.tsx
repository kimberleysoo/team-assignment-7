import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Star, 
  Verified, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Sunrise, 
  Sun, 
  Moon, 
  Sparkles, 
  Eye, 
  Flower2, 
  Check, 
  Plus, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Practitioner, TreatmentService, AddOnItem, BookingState, AppLanguage } from '../types';
import { BESPOKE_ADDONS, CALENDAR_DAYS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

interface DateTimeSelectionViewProps {
  practitioner: Practitioner;
  selectedService: TreatmentService;
  selectedDate: string;
  selectedDateLabel: string;
  selectedTime: string;
  selectedAddOns: AddOnItem[];
  intakeNotes: string[];
  customIntakeNote: string;
  onUpdateBooking: (updates: Partial<BookingState>) => void;
  onProceedToCheckout: () => void;
  onBack: () => void;
  language?: AppLanguage;
}

export const DateTimeSelectionView: React.FC<DateTimeSelectionViewProps> = ({
  practitioner,
  selectedService,
  selectedDate,
  selectedDateLabel,
  selectedTime,
  selectedAddOns,
  intakeNotes,
  customIntakeNote,
  onUpdateBooking,
  onProceedToCheckout,
  onBack,
  language: propLanguage
}) => {
  const { language: contextLang, t } = useLanguage();
  const language = propLanguage || contextLang;
  const [activeDate, setActiveDate] = useState(selectedDate || '2024-10-24');
  const [activeDateLabel, setActiveDateLabel] = useState(selectedDateLabel || 'Thu, Oct 24');
  const [activeTime, setActiveTime] = useState(selectedTime || '3:30 PM');
  const [showCustomNoteInput, setShowCustomNoteInput] = useState(false);
  const [noteText, setNoteText] = useState(customIntakeNote || '');

  // Calculate base price + add-ons
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalMinutes = selectedService.durationMinutes + selectedAddOns.reduce((sum, item) => sum + item.durationMinutes, 0);
  const subtotal = selectedService.price + addOnsTotal;
  const installment = (subtotal / 3).toFixed(2);

  const toggleAddOn = (addon: AddOnItem) => {
    const exists = selectedAddOns.some((a) => a.id === addon.id);
    let updated: AddOnItem[];
    if (exists) {
      updated = selectedAddOns.filter((a) => a.id !== addon.id);
    } else {
      updated = [...selectedAddOns, addon];
    }
    onUpdateBooking({ selectedAddOns: updated });
  };

  const toggleIntakeNote = (note: string) => {
    let updated: string[];
    if (intakeNotes.includes(note)) {
      updated = intakeNotes.filter((n) => n !== note);
    } else {
      updated = [...intakeNotes, note];
    }
    onUpdateBooking({ intakeNotes: updated });
  };

  const handleDaySelect = (day: typeof CALENDAR_DAYS[0]) => {
    if (!day.isAvailable) return;
    const label = `${day.dayName}, Oct ${day.dateNum}`;
    setActiveDate(day.fullDate);
    setActiveDateLabel(label);
    onUpdateBooking({
      selectedDate: day.fullDate,
      selectedDateLabel: label
    });
  };

  const handleTimeSelect = (timeStr: string) => {
    setActiveTime(timeStr);
    onUpdateBooking({ selectedTime: timeStr });
  };

  const saveCustomNote = () => {
    onUpdateBooking({ customIntakeNote: noteText });
    setShowCustomNoteInput(false);
  };

  const intakeTags = [
    { id: 'sensitive', label: t.sensitiveSkin },
    { id: 'pregnancy', label: t.pregnancySafe },
    { id: 'pigment', label: t.targetPigmentation }
  ];

  return (
    <div className="relative w-full max-w-[720px] mx-auto min-h-screen pb-40">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#c8a97e]/25">
        <div className="flex justify-between items-center w-full px-5 py-3 max-w-[720px] mx-auto">
          <button 
            onClick={onBack}
            aria-label="Back" 
            className="w-9 h-9 rounded-full bg-white border border-[#c8a97e]/35 flex items-center justify-center text-[#171513] hover:text-[#8c6d3b] transition-colors active:scale-[0.985] shadow-xs" 
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="font-serif text-lg font-normal tracking-[0.18em] text-[#171513]">
              ÉLAN
            </span>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#8c6d3b] font-bold -mt-0.5">
              {language === 'zh' ? '预约档期选择' : 'Atelier Calendar'}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#f3ece0] border border-[#c8a97e]/35 flex items-center justify-center text-[#8c6d3b]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Booking Canvas */}
      <main className="px-5 pt-4 space-y-6">
        {/* Progress Indicator */}
        <section>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span className="text-[9px] text-[#8c6d3b] font-bold tracking-[0.2em] uppercase">
                {language === 'zh' ? '第 1 步 • 甄选私密服务时段' : 'Step 01 • Dispatch Slot Scheduling'}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6d3b]">50% Completed</span>
          </div>
          <div className="w-full h-1 bg-[#dfcdb5]/50 rounded-full overflow-hidden">
            <div className="h-full bg-[#b89058] rounded-full w-1/2 transition-all duration-500"></div>
          </div>
        </section>

        {/* Selected Service Summary Card */}
        <section className="bg-white rounded-xl p-4 border border-[#c8a97e]/35 shadow-xs">
          <div className="flex items-start gap-4">
            {/* Practitioner & Treatment Visual Frame */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e8e4db] border border-[#c8a97e]/30">
              <img 
                className="w-full h-full object-cover" 
                alt={practitioner.name}
                src={practitioner.heroImage}
              />
              <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-xs rounded-sm px-1.5 py-0.5 flex items-center gap-0.5 border border-[#dfcdb5] shadow-xs">
                <Star className="w-2.5 h-2.5 text-[#b89058] fill-[#b89058]" />
                <span className="text-[8px] font-bold text-[#171513]">{practitioner.rating}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89058]"></span>
                <span className="text-[9px] text-[#8c6d3b] uppercase tracking-[0.2em] font-bold">
                  {language === 'zh' ? '特选定制疗程' : 'Atelier Ritual'}
                </span>
              </div>
              <h1 className="font-serif text-base font-normal text-[#171513] leading-tight truncate mb-1">
                {selectedService.name}
              </h1>
              <p className="text-xs text-[#5e564e] flex items-center gap-1 mb-2 font-sans">
                <Verified className="w-3.5 h-3.5 text-[#8c6d3b]" />
                {practitioner.name} • {practitioner.location.split(',')[0]}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#5e564e] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8c6d3b]" /> {totalMinutes} min
                </span>
                <span className="text-xs text-[#171513] font-bold uppercase tracking-wider font-serif">
                  S${subtotal} direct
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Interactive Calendar Strip */}
        <section>
          <div className="flex items-baseline justify-between mb-3 border-b border-[#dfcdb5] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <h2 className="font-serif text-base font-normal text-[#171513]">
                {language === 'zh' ? '2024 年 10 月' : 'October 2024'}
              </h2>
              <span className="px-2 py-0.5 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35 text-[8px] font-bold uppercase tracking-widest">
                Singapore SGT (GMT+8)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                aria-label="Previous Month" 
                className="w-7 h-7 rounded-sm border border-[#dfcdb5] flex items-center justify-center text-[#8c6d3b] hover:text-[#171513] hover:border-[#b89058] transition-all bg-white" 
                type="button"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                aria-label="Next Month" 
                className="w-7 h-7 rounded-sm border border-[#dfcdb5] flex items-center justify-center text-[#8c6d3b] hover:text-[#171513] hover:border-[#b89058] transition-all bg-white" 
                type="button"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Horizontal Day Strip */}
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 -mx-5 px-5">
            {CALENDAR_DAYS.map((day) => {
              const isSelected = activeDate === day.fullDate;
              if (day.isFull) {
                return (
                  <div 
                    key={day.dateNum}
                    className="shrink-0 w-16 py-3 rounded-lg border border-[#dfcdb5]/50 bg-[#e8e4db]/40 flex flex-col items-center justify-center opacity-40 cursor-not-allowed"
                  >
                    <span className="text-[9px] uppercase tracking-wider text-[#5e564e] font-bold">{day.dayName}</span>
                    <span className="font-serif text-base text-[#5e564e] my-1">{day.dateNum}</span>
                    <span className="text-[8px] uppercase tracking-widest text-[#8c6d3b] font-bold">
                      {language === 'zh' ? '已满' : 'Full'}
                    </span>
                  </div>
                );
              }

              return (
                <button
                  key={day.dateNum}
                  onClick={() => handleDaySelect(day)}
                  className={`shrink-0 w-16 py-3 rounded-lg flex flex-col items-center justify-center transition-all active:scale-[0.985] ${
                    isSelected
                      ? 'border-2 border-[#b89058] bg-[#171513] text-[#dfcdb5] shadow-sm'
                      : 'border border-[#c8a97e]/35 bg-white text-[#171513] hover:border-[#b89058]'
                  }`}
                  type="button"
                >
                  <span className={`text-[9px] tracking-widest uppercase font-bold ${isSelected ? 'text-[#dfcdb5]' : 'text-[#8c6d3b]'}`}>
                    {day.dayName}
                  </span>
                  <span className={`font-serif text-base my-0.5 ${isSelected ? 'text-[#dfcdb5] font-normal' : 'text-[#171513] font-normal'}`}>
                    {day.dateNum}
                  </span>
                  <div className="flex gap-1 items-center h-2">
                    {[...Array(day.slotsCount)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#b89058]' : 'bg-[#b89058]/50'}`}
                      ></span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-3 justify-center text-xs text-[#5e564e]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b89058]"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d3b]">
                {language === 'zh' ? '可预约时段' : 'Available Slots'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfcdb5]"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e564e]">
                {language === 'zh' ? '席位紧张' : 'Limited'}
              </span>
            </div>
          </div>
        </section>

        {/* Available Time Slots */}
        <section>
          <div className="flex items-baseline justify-between mb-3 border-b border-[#dfcdb5] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <h2 className="font-serif text-base font-normal text-[#171513]">
                {language === 'zh' ? '可选时段' : 'Available Time Slots'}
              </h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6d3b]">
              {activeDateLabel}
            </span>
          </div>

          <div className="space-y-3">
            {/* Morning Group */}
            <div className="bg-white rounded-xl p-4 border border-[#c8a97e]/35 shadow-xs">
              <div className="flex items-center gap-1.5 mb-3 text-[#8c6d3b]">
                <Sunrise className="w-3.5 h-3.5 text-[#b89058]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                  {language === 'zh' ? '上午时段 (Morning)' : 'Morning Dispatches'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {['10:00 AM', '11:30 AM'].map((timeStr) => {
                  const isSelected = activeTime === timeStr;
                  return (
                    <button
                      key={timeStr}
                      onClick={() => handleTimeSelect(timeStr)}
                      className={`h-10 px-4 rounded-sm flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.985] ${
                        isSelected 
                          ? 'border-2 border-[#b89058] bg-[#171513] text-[#dfcdb5] shadow-xs' 
                          : 'border border-[#c8a97e]/35 bg-[#f8f5ee] text-[#171513] hover:border-[#b89058]'
                      }`}
                      type="button"
                    >
                      {timeStr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon Group */}
            <div className="bg-white rounded-xl p-4 border border-[#c8a97e]/35 shadow-xs">
              <div className="flex items-center gap-1.5 mb-3 text-[#8c6d3b]">
                <Sun className="w-3.5 h-3.5 text-[#b89058]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                  {language === 'zh' ? '下午时段 (Afternoon)' : 'Afternoon Dispatches'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleTimeSelect('2:00 PM')}
                  className={`h-10 px-4 rounded-sm flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.985] ${
                    activeTime === '2:00 PM'
                      ? 'border-2 border-[#b89058] bg-[#171513] text-[#dfcdb5] shadow-xs'
                      : 'border border-[#c8a97e]/35 bg-[#f8f5ee] text-[#171513] hover:border-[#b89058]'
                  }`}
                  type="button"
                >
                  2:00 PM
                </button>

                <button
                  onClick={() => handleTimeSelect('3:30 PM')}
                  className={`h-10 px-4 rounded-sm flex items-center justify-between text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.985] ${
                    activeTime === '3:30 PM'
                      ? 'border-2 border-[#b89058] bg-[#171513] text-[#dfcdb5] shadow-xs'
                      : 'border border-[#c8a97e]/35 bg-[#f8f5ee] text-[#171513] hover:border-[#b89058]'
                  }`}
                  type="button"
                >
                  <span>3:30 PM</span>
                  <span className="text-[8px] bg-[#f3ece0] text-[#8c6d3b] px-2 py-0.5 rounded-sm uppercase tracking-tight font-bold border border-[#c8a97e]/30">
                    {language === 'zh' ? '热门' : 'Popular'}
                  </span>
                </button>
              </div>
            </div>

            {/* Evening Group */}
            <div className="bg-white rounded-xl p-4 border border-[#c8a97e]/35 shadow-xs">
              <div className="flex items-center gap-1.5 mb-3 text-[#8c6d3b]">
                <Moon className="w-3.5 h-3.5 text-[#b89058]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                  {language === 'zh' ? '傍晚时段 (Evening)' : 'Evening Dispatches'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleTimeSelect('5:00 PM')}
                  className={`h-10 px-4 rounded-sm flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.985] ${
                    activeTime === '5:00 PM'
                      ? 'border-2 border-[#b89058] bg-[#171513] text-[#dfcdb5] shadow-xs'
                      : 'border border-[#c8a97e]/35 bg-[#f8f5ee] text-[#171513] hover:border-[#b89058]'
                  }`}
                  type="button"
                >
                  5:00 PM
                </button>

                <div className="h-10 px-4 rounded-sm border border-[#dfcdb5]/50 bg-[#e8e4db]/40 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-[#5e564e]/50 cursor-not-allowed">
                  6:30 PM ({language === 'zh' ? '已订满' : 'Booked'})
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bespoke Add-Ons */}
        <section>
          <div className="flex items-baseline justify-between mb-3 border-b border-[#dfcdb5] pb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b]">
                  {language === 'zh' ? '尊享升级' : 'Enhancements'}
                </span>
              </div>
              <h2 className="font-serif text-base font-normal text-[#171513]">
                {language === 'zh' ? '定制专属加选项目' : 'Bespoke Add-Ons'}
              </h2>
            </div>
            <span className="text-[9px] text-[#8c6d3b] uppercase font-bold tracking-widest">
              {language === 'zh' ? '自选' : 'Optional'}
            </span>
          </div>

          <div className="space-y-2.5">
            {BESPOKE_ADDONS.map((addon) => {
              const isChecked = selectedAddOns.some((a) => a.id === addon.id);
              return (
                <div 
                  key={addon.id}
                  onClick={() => toggleAddOn(addon)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between shadow-xs ${
                    isChecked
                      ? 'border-2 border-[#b89058] bg-white ring-1 ring-[#b89058]/20 shadow-sm'
                      : 'border-[#c8a97e]/35 bg-white hover:border-[#b89058]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#f3ece0] flex items-center justify-center text-[#8c6d3b] shrink-0 border border-[#c8a97e]/35">
                      {addon.iconName === 'flare' && <Sparkles className="w-4 h-4" />}
                      {addon.iconName === 'visibility' && <Eye className="w-4 h-4" />}
                      {addon.iconName === 'spa' && <Flower2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-normal text-[#171513] leading-snug">
                        {addon.name}
                      </h3>
                      <p className="text-xs text-[#5e564e] font-sans">{addon.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-normal text-[#171513] font-serif">
                      +S${addon.price}
                    </span>
                    <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#171513] border-[#b89058]'
                        : 'border-[#dfcdb5] bg-white'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-[#dfcdb5]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Consultation Intake Notes */}
        <section className="pb-6">
          <div className="mb-3 border-b border-[#dfcdb5] pb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b]">
                {language === 'zh' ? '皮肤问诊备忘' : 'Atelier Intake'}
              </span>
            </div>
            <h2 className="font-serif text-base font-normal text-[#171513]">
              {language === 'zh' ? '咨询与肤质特质' : 'Consultation Intake Notes'}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {intakeTags.map((tag) => {
              const isSelected = intakeNotes.includes(tag.label);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleIntakeNote(tag.label)}
                  className={`h-8 px-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-[0.985] ${
                    isSelected
                      ? 'border border-[#b89058] bg-[#171513] text-[#dfcdb5]'
                      : 'border border-[#c8a97e]/35 bg-white text-[#5e564e] hover:border-[#b89058]'
                  }`}
                  type="button"
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#b89058]" />}
                  {tag.label}
                </button>
              );
            })}

            <button 
              onClick={() => setShowCustomNoteInput(!showCustomNoteInput)}
              className="h-8 px-3.5 rounded-full border border-dashed border-[#b89058]/60 text-[#8c6d3b] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:border-[#b89058] transition-colors" 
              type="button"
            >
              <Plus className="w-3 h-3" />
              {noteText ? (language === 'zh' ? '编辑备注' : 'Edit Note') : (language === 'zh' ? '添加自拟备注' : 'Add Custom Note')}
            </button>
          </div>

          {/* Custom Note input drawer */}
          {showCustomNoteInput && (
            <div className="mt-3 p-4 rounded-xl bg-white border border-[#c8a97e]/35 space-y-2 animate-in fade-in">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#171513] block">
                {language === 'zh' ? '特殊需求或过敏史：' : 'Special Requests or Skin Sensitivities:'}
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={language === 'zh' ? '例如：轻微红血丝敏感，请避免强烈薄荷脑或高浓度果酸...' : 'e.g. Mild rosacea flare-up on cheeks, avoid heavy eucalyptus or menthol essential oils...'}
                className="w-full h-20 p-2.5 text-xs bg-[#f8f5ee] border border-[#dfcdb5] rounded-sm focus:outline-none focus:border-[#b89058] font-sans"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowCustomNoteInput(false)}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#5e564e] hover:text-[#171513]"
                >
                  {language === 'zh' ? '取消' : 'Cancel'}
                </button>
                <button
                  onClick={saveCustomNote}
                  className="px-4 py-1.5 rounded-sm bg-[#171513] text-[#dfcdb5] text-[10px] font-bold uppercase tracking-widest border border-[#b89058]/40"
                >
                  {language === 'zh' ? '保存备注' : 'Save Note'}
                </button>
              </div>
            </div>
          )}

          {noteText && !showCustomNoteInput && (
            <div className="mt-2 p-3 rounded-md bg-[#f3ece0]/60 border border-[#c8a97e]/35 text-xs text-[#171513] flex items-center justify-between font-serif italic">
              <span className="truncate">"{noteText}"</span>
              <button 
                onClick={() => setShowCustomNoteInput(true)} 
                className="text-[9px] text-[#8c6d3b] font-bold uppercase tracking-widest border-b border-[#b89058] pb-0.5 shrink-0 ml-2 font-sans not-italic"
              >
                {language === 'zh' ? '修改' : 'Edit'}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Sticky Bottom Action Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#faf7f2]/95 backdrop-blur-lg border-t border-[#c8a97e]/30 shadow-[0_-8px_30px_rgba(23,21,19,0.08)]">
        <div className="max-w-[720px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b89058] animate-pulse"></span>
              <span className="text-[9px] text-[#8c6d3b] uppercase tracking-[0.2em] font-bold">
                {language === 'zh' ? '席位锁定中 (15:00)' : 'Slot Locked (15:00)'}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#171513]">
              {activeDateLabel} • {activeTime}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-normal text-[#171513] leading-none">
                S${subtotal}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#8c6d3b] border border-[#c8a97e]/35 rounded-sm px-1.5 py-0.5 bg-[#f3ece0]">
                {language === 'zh' ? `或分 3 期每期 S$${installment}` : `or 3x S$${installment} with Atome`}
              </span>
            </div>
          </div>

          <button 
            onClick={onProceedToCheckout}
            className="h-11 px-7 rounded-sm bg-[#171513] hover:bg-[#8c6d3b] text-[#dfcdb5] hover:text-white flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-xs active:scale-[0.985] transition-all shrink-0 border border-[#b89058]/40" 
          >
            <span>{t.proceedToPayment}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#b89058]" />
          </button>
        </div>
      </aside>
    </div>
  );
};
