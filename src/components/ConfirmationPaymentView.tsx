import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Lock, 
  Headphones, 
  ShieldCheck, 
  Star, 
  Calendar, 
  MapPin, 
  Receipt, 
  CheckCircle2, 
  Gift, 
  CreditCard, 
  Check, 
  RotateCcw, 
  Shield, 
  Download,
  CalendarCheck,
  Sparkles
} from 'lucide-react';
import { BookingState, AppLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmationPaymentViewProps {
  booking: BookingState;
  onConfirmSuccess: (bookingRef: string) => void;
  onBack: () => void;
  language?: AppLanguage;
}

export const ConfirmationPaymentView: React.FC<ConfirmationPaymentViewProps> = ({
  booking,
  onConfirmSuccess,
  onBack,
  language: propLanguage
}) => {
  const { language: contextLang, t } = useLanguage();
  const language = propLanguage || contextLang;
  const [selectedPlan, setSelectedPlan] = useState<'bnpl' | 'full' | 'stripe'>(booking.paymentPlan || 'bnpl');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string | null>(null);

  const { practitioner, selectedService, selectedAddOns, selectedDateLabel, selectedTime } = booking;

  // Pricing math
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const rawSubtotal = selectedService.price;
  const serviceFee = 0.0;
  const loyaltyDiscount = 25.0; // Noir Privilège tier
  const totalDue = Math.max(0, rawSubtotal + addOnsTotal - loyaltyDiscount);
  const installmentPerMonth = (totalDue / 3).toFixed(2);
  const totalDuration = selectedService.durationMinutes + selectedAddOns.reduce((s, a) => s + a.durationMinutes, 0);

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const refCode = `SG-ELAN-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedBookingRef(refCode);
      onConfirmSuccess(refCode);
    }, 1500);
  };

  if (confirmedBookingRef) {
    return (
      <div className="relative w-full max-w-[720px] mx-auto min-h-screen px-5 py-8 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-3 pt-6">
          <div className="w-14 h-14 rounded-full bg-[#171513] border-2 border-[#b89058] text-[#dfcdb5] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7 text-[#b89058]" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
            <span className="text-[9px] font-bold text-[#8c6d3b] tracking-[0.2em] uppercase">
              {language === 'zh' ? '预订已锁定' : 'Reservation Secured'}
            </span>
            <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#171513]">
            {language === 'zh' ? '私享护理行程已确认' : 'Sanctuary Itinerary Confirmed'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5e564e] max-w-md mx-auto font-sans">
            {language === 'zh'
              ? `您与 ${practitioner.name} 的私密专属护理室预约已成功确认。加密凭证已同步发送至您的会员档案。`
              : `Your private suite with ${practitioner.name} has been reserved. Encrypted confirmation dispatched to atelier records.`}
          </p>
          <div className="inline-block px-3 py-1 rounded-sm bg-[#f3ece0] border border-[#c8a97e]/40 text-xs font-mono text-[#8c6d3b]">
            Ref: {confirmedBookingRef}
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-xl border border-[#c8a97e]/35 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 pb-3 border-b border-[#dfcdb5]">
            <img 
              src={practitioner.avatarImage} 
              alt={practitioner.name} 
              className="w-12 h-12 rounded-full object-cover border border-[#c8a97e]/35"
            />
            <div>
              <h3 className="font-serif text-base font-normal text-[#171513]">{practitioner.name}</h3>
              <p className="text-xs text-[#5e564e]">{selectedService.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold block">
                {language === 'zh' ? '预约时段' : 'Schedule'}
              </span>
              <strong className="text-[#171513] font-normal font-serif text-sm">{selectedDateLabel} at {selectedTime}</strong>
              <span className="text-[10px] text-[#5e564e] block">({totalDuration} {language === 'zh' ? '分钟' : 'Minutes'})</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold block">
                {language === 'zh' ? '护理会所' : 'Venue Suite'}
              </span>
              <strong className="text-[#171513] font-normal font-serif text-sm">{practitioner.location.split(',')[0]}</strong>
              <span className="text-[10px] text-[#5e564e] block">
                {language === 'zh' ? '新加坡私人贵宾入口' : 'Private Valet Concierge, Singapore'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#dfcdb5] flex justify-between items-center text-xs">
            <span className="text-[#5e564e]">{language === 'zh' ? '支付方式' : 'Payment Mode'}</span>
            <span className="font-bold text-[#171513] uppercase tracking-wider text-[11px] font-serif">
              {selectedPlan === 'bnpl' 
                ? (language === 'zh' ? `3 期 x S$${installmentPerMonth} (Atome 0% 免息)` : `3 x S$${installmentPerMonth} (Atome 0% APR)`) 
                : `S$${totalDue.toFixed(2)} Paid in Full`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button 
            onClick={() => window.print()}
            className="w-full h-11 rounded-sm bg-[#171513] text-[#dfcdb5] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8c6d3b] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#b89058]/40"
          >
            <Download className="w-3.5 h-3.5" />
            {language === 'zh' ? '下载入场券与日历凭证' : 'Download Pass & Calendar File'}
          </button>
          <button 
            onClick={onBack}
            className="w-full h-10 rounded-sm bg-[#f3ece0] hover:bg-[#e8dec9] text-[#171513] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#c8a97e]/35"
          >
            {language === 'zh' ? '返回探索主页' : 'Return to Atelier Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto min-h-screen pb-44 flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#c8a97e]/25">
        <div className="max-w-[720px] mx-auto px-5 py-3 flex items-center justify-between">
          <button 
            onClick={onBack}
            aria-label="Go back" 
            className="w-9 h-9 rounded-full bg-white border border-[#c8a97e]/35 flex items-center justify-center text-[#171513] hover:text-[#8c6d3b] transition-all shadow-xs" 
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center">
            <span className="font-serif text-lg font-normal tracking-[0.18em] text-[#171513]">
              ÉLAN
            </span>
            <div className="flex items-center gap-1 text-[#8c6d3b] mt-0.5">
              <Lock className="w-2.5 h-2.5 text-[#b89058]" />
              <span className="text-[8px] text-[#8c6d3b] uppercase tracking-[0.2em] font-bold">
                {language === 'zh' ? '256 位安全加密' : '256-Bit Encrypted'}
              </span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#f3ece0] border border-[#c8a97e]/35 flex items-center justify-center text-[#8c6d3b]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Luxury Checkout Canvas */}
      <main className="px-5 pt-4 space-y-6">
        {/* Page Title & Escrow Guarantee */}
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3ece0] border border-[#c8a97e]/35 text-[#8c6d3b] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b89058]" />
            <span className="text-[9px] text-[#8c6d3b] font-bold uppercase tracking-widest">
              {language === 'zh' ? '尊享礼宾托管保障 • 新加坡' : 'Bespoke Concierge Escrow • Singapore'}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#171513] tracking-tight font-normal">
            {t.bookingConfirmation}
          </h1>
          <p className="text-xs text-[#5e564e] font-sans">
            {language === 'zh' ? '核对您的私密护理行程并选择尊享分期方案。' : 'Review your sanctuary itinerary and select your tailored installment schedule.'}
          </p>
        </div>

        {/* Booking Summary Card */}
        <section className="bg-white rounded-xl border border-[#c8a97e]/35 shadow-xs overflow-hidden">
          <div className="relative h-44 w-full overflow-hidden bg-[#e8e4db]">
            <img 
              className="w-full h-full object-cover contrast-105" 
              alt={selectedService.name} 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/85 via-[#171513]/25 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#dfcdb5] bg-[#171513]/80 backdrop-blur-md px-2.5 py-0.5 rounded-sm font-bold border border-[#b89058]/40">
                  {language === 'zh' ? '经典招牌疗程' : 'Signature Ritual'}
                </span>
                <h2 className="font-serif text-base sm:text-lg font-normal text-white mt-1">
                  {selectedService.name}
                </h2>
              </div>
              <div className="bg-white/95 backdrop-blur-md text-[#171513] px-2.5 py-1 rounded-sm flex items-center gap-1 shadow-xs border border-[#dfcdb5]">
                <Star className="w-3 h-3 text-[#b89058] fill-[#b89058]" />
                <span className="text-xs font-bold">{practitioner.rating}</span>
                <span className="text-[10px] text-[#5e564e] font-normal">({practitioner.reviewCount}+)</span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3.5 divide-y divide-[#dfcdb5]">
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    className="w-12 h-12 rounded-full object-cover border border-[#c8a97e]/40" 
                    alt={practitioner.name} 
                    src={practitioner.avatarImage} 
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#b89058] rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8c6d3b] font-bold">
                    {language === 'zh' ? '主理医师 / 专家' : 'Lead Practitioner'}
                  </p>
                  <h3 className="font-serif text-sm font-normal text-[#171513]">{practitioner.name}</h3>
                  <p className="text-xs text-[#5e564e]">{practitioner.title}</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#b89058]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold">
                    {language === 'zh' ? '日期与时间' : 'Date & Time'}
                  </p>
                  <p className="text-xs font-bold text-[#171513]">{selectedDateLabel}</p>
                  <p className="text-xs text-[#5e564e]">{selectedTime} ({totalDuration} {language === 'zh' ? '分钟' : 'Minutes'})</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[#8c6d3b] font-bold">
                    {language === 'zh' ? '会所位置' : 'Sanctuary Venue'}
                  </p>
                  <p className="text-xs font-bold text-[#171513]">{practitioner.location.split(',')[0]}</p>
                  <p className="text-xs text-[#5e564e]">
                    {language === 'zh' ? '乌节路尊享贵宾入口 • 新加坡' : 'Orchard Road Private Valet Entrance, SG'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparent Pricing Breakdown */}
        <section className="bg-white rounded-xl border border-[#c8a97e]/35 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#dfcdb5]">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#8c6d3b]" />
              <h2 className="font-serif text-sm sm:text-base font-normal text-[#171513]">
                {t.pricingBreakdown}
              </h2>
            </div>
            <span className="text-[9px] text-[#8c6d3b] uppercase tracking-wider bg-[#f3ece0] px-2.5 py-0.5 rounded-sm border border-[#c8a97e]/35 font-bold">
              {language === 'zh' ? '无隐藏费用' : 'No Hidden Fees'}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-[#171513]">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium block">{t.subtotal}</span>
                <span className="text-[11px] text-[#5e564e]">{selectedService.name} ({selectedService.durationMinutes} min)</span>
              </div>
              <span className="font-serif text-sm">S${rawSubtotal.toFixed(2)}</span>
            </div>

            {/* Bespoke Add-ons */}
            {selectedAddOns.length > 0 && selectedAddOns.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-[11px] text-[#5e564e] block">{addon.description}</span>
                </div>
                <span className="font-serif text-sm">+S${addon.price.toFixed(2)}</span>
              </div>
            ))}

            {/* Service Guarantee */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium flex items-center gap-1">
                  {t.sanitizationFee}
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b89058]" />
                </span>
                <span className="text-[11px] text-[#5e564e]">
                  {language === 'zh' ? '纯净私密环境保障' : 'Transparent Pricing Guarantee'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif text-sm">S$0.00</span>
                <span className="block text-[10px] text-[#5e564e]/50 line-through">S$30.00 Waived</span>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-[#f3ece0]/60 border border-[#c8a97e]/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#171513] flex items-center justify-center text-[#dfcdb5]">
                  <Gift className="w-3 h-3 text-[#b89058]" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#171513]">{t.loyaltyReward}</p>
                  <p className="text-[10px] text-[#5e564e]">
                    {language === 'zh' ? '等级：Noir Privilège 黑卡尊享 (已抵扣 2,500 积分)' : 'Tier: Noir Privilège (2,500 Pts redeemed)'}
                  </p>
                </div>
              </div>
              <span className="font-serif text-xs text-[#8c6d3b] font-bold">-S${loyaltyDiscount.toFixed(2)}</span>
            </div>

            {/* Total Due */}
            <div className="pt-2 border-t border-[#dfcdb5] flex items-baseline justify-between">
              <div>
                <p className="font-serif text-sm sm:text-base font-normal text-[#171513]">{t.totalDue}</p>
                <p className="text-[11px] text-[#5e564e]">
                  {language === 'zh' ? '已含所有新加坡消费税 (GST) 及专属服务礼遇' : 'Inclusive of all Singapore GST & amenities'}
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#171513]">
                  S${totalDue.toFixed(2)}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-[#8c6d3b]">SGD Direct Atelier Rate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Flexible Payment Options */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between border-b border-[#dfcdb5] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
              <h2 className="font-serif text-base font-normal text-[#171513]">
                {t.flexiblePayment}
              </h2>
            </div>
            <CreditCard className="w-4 h-4 text-[#8c6d3b]" />
          </div>

          <div className="space-y-2.5">
            {/* Option 1: BNPL Installments */}
            <div 
              onClick={() => setSelectedPlan('bnpl')}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedPlan === 'bnpl'
                  ? 'border-2 border-[#b89058] bg-white ring-1 ring-[#b89058]/20 shadow-sm'
                  : 'border border-[#c8a97e]/35 bg-white hover:border-[#b89058]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm bg-[#f3ece0] text-[#8c6d3b] border border-[#c8a97e]/35">
                      {language === 'zh' ? '推荐方案' : 'Preferred Plan'}
                    </span>
                    <span className="text-[9px] font-bold text-[#b89058] uppercase tracking-wider">
                      {language === 'zh' ? '0% 真实免息分期' : '0% APR Guaranteed'}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-normal text-[#171513] pt-0.5">
                    {language === 'zh'
                      ? `分 3 期免息付款，每期 S$${installmentPerMonth}`
                      : `Pay in 3 Installments of S$${installmentPerMonth} / month`}
                  </h3>
                  <p className="text-xs text-[#5e564e]">
                    {language === 'zh'
                      ? '轻松分摊至 3 个月，无需额外手续费、隐形利息或信用影响。'
                      : 'Split effortlessly over 3 months without added fees, hidden interest, or credit penalties.'}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 rounded-sm bg-[#f3ece0]/60 border border-[#c8a97e]/30">
                      <span className="block text-[9px] uppercase tracking-wider text-[#8c6d3b]">
                        {language === 'zh' ? '今日首付' : 'Today'}
                      </span>
                      <span className="font-serif text-xs text-[#171513]">S${installmentPerMonth}</span>
                    </div>
                    <div className="p-2 rounded-sm bg-[#f8f5ee] border border-[#dfcdb5]">
                      <span className="block text-[9px] uppercase tracking-wider text-[#5e564e]">
                        {language === 'zh' ? '11月24日' : 'Nov 24'}
                      </span>
                      <span className="font-serif text-xs text-[#5e564e]">S${installmentPerMonth}</span>
                    </div>
                    <div className="p-2 rounded-sm bg-[#f8f5ee] border border-[#dfcdb5]">
                      <span className="block text-[9px] uppercase tracking-wider text-[#5e564e]">
                        {language === 'zh' ? '12月24日' : 'Dec 24'}
                      </span>
                      <span className="font-serif text-xs text-[#5e564e]">S${installmentPerMonth}</span>
                    </div>
                  </div>

                  {/* Partner badges */}
                  <div className="pt-2 flex items-center gap-2 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8c6d3b]">
                      {language === 'zh' ? '支持渠道:' : 'Partners:'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white border border-[#c8a97e]/35 text-[#171513] text-[9px] font-bold">
                      Atome
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white border border-[#c8a97e]/35 text-[#171513] text-[9px] font-bold">
                      GrabPay Later
                    </span>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 mt-1 ${
                  selectedPlan === 'bnpl' ? 'border-[#b89058] bg-[#171513]' : 'border-[#dfcdb5] bg-white'
                }`}>
                  {selectedPlan === 'bnpl' && <Check className="w-2.5 h-2.5 text-[#dfcdb5]" />}
                </div>
              </div>
            </div>

            {/* Option 2: Pay in Full */}
            <div 
              onClick={() => setSelectedPlan('full')}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedPlan === 'full'
                  ? 'border-2 border-[#b89058] bg-white ring-1 ring-[#b89058]/20 shadow-sm'
                  : 'border border-[#c8a97e]/35 bg-white hover:border-[#b89058]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-normal text-[#171513]">
                    {language === 'zh' ? `全额支付 (S$${totalDue.toFixed(2)})` : `Pay in Full (S$${totalDue.toFixed(2)})`}
                  </h3>
                  <p className="text-xs text-[#5e564e]">
                    {language === 'zh' ? '支持信用卡、借记卡、PayNow 或 Apple Pay 即时确认。' : 'Instant confirmation via Credit Card, PayNow, Debit, or Apple Pay.'}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[#8c6d3b] text-xs">
                    <CreditCard className="w-3.5 h-3.5 text-[#b89058]" />
                    <span>Visa • Mastercard • Amex • PayNow • Apple Pay</span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 mt-1 ${
                  selectedPlan === 'full' ? 'border-[#b89058] bg-[#171513]' : 'border-[#dfcdb5] bg-white'
                }`}>
                  {selectedPlan === 'full' && <Check className="w-2.5 h-2.5 text-[#dfcdb5]" />}
                </div>
              </div>
            </div>

            {/* Option 3: Stripe 1-Click Pay */}
            <div 
              onClick={() => setSelectedPlan('stripe')}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedPlan === 'stripe'
                  ? 'border-2 border-[#b89058] bg-white ring-1 ring-[#b89058]/20 shadow-sm'
                  : 'border border-[#c8a97e]/35 bg-white hover:border-[#b89058]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-sm font-normal text-[#171513]">
                      Stripe 1-Click Pay
                    </h3>
                    <span className="text-[8px] text-[#8c6d3b] font-bold uppercase tracking-wider bg-[#f3ece0] px-2 py-0.5 rounded-sm border border-[#c8a97e]/35">
                      Link Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#5e564e]">
                    {language === 'zh' ? '一键快速完成验证与支付，安全快捷。' : 'Instant checkout with saved billing credentials for Singapore.'}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-[#8c6d3b] font-mono">
                    <span className="font-bold">STRIPE LINK</span>
                    <span>•</span>
                    <span>Auto-fills Singapore card ending in 8832</span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 mt-1 ${
                  selectedPlan === 'stripe' ? 'border-[#b89058] bg-[#171513]' : 'border-[#dfcdb5] bg-white'
                }`}>
                  {selectedPlan === 'stripe' && <Check className="w-2.5 h-2.5 text-[#dfcdb5]" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Policy Highlight */}
        <section className="p-4 rounded-xl bg-[#f3ece0]/60 border border-[#c8a97e]/35 flex items-start gap-3">
          <div className="p-2 rounded-sm bg-white border border-[#c8a97e]/35 text-[#8c6d3b] shrink-0 mt-0.5">
            <RotateCcw className="w-4 h-4 text-[#b89058]" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-serif text-xs sm:text-sm font-normal text-[#171513]">
              {language === 'zh' ? '预约前 24 小时内可尊享免费取消与改期' : 'Free cancellation up to 24h prior'}
            </h4>
            <p className="text-xs text-[#5e564e] leading-relaxed font-sans">
              {language === 'zh'
                ? '需要调整时间？您可在疗程开始前 24 小时免费修改或取消，费用将原路即时全额退回。'
                : 'Need to reschedule? Modify or cancel free of charge until 24h before. Instant refund directly to your original payment schedule.'}
            </p>
          </div>
        </section>

        {/* Sanctuary Hospitality Guarantee Note */}
        <div className="text-center pb-2">
          <p className="text-[9px] text-[#8c6d3b] uppercase tracking-[0.2em] font-bold">
            {language === 'zh' ? '极度私密 • 专属独立套房 • 权威医学认证' : 'Discreet Service • Private Suites • Certified Medical Esthetics Singapore'}
          </p>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#faf7f2]/95 backdrop-blur-lg border-t border-[#c8a97e]/30 shadow-[0_-8px_30px_rgba(23,21,19,0.08)]">
        <div className="max-w-[720px] mx-auto px-5 py-3 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5e564e]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#b89058]" />
              <span className="text-[10px]">
                {language === 'zh' ? '银行账单将私密显示为 "ELAN SANCTUARY SG"' : 'Discreet billing on bank statement as "ELAN SANCTUARY SG"'}
              </span>
            </div>
            <span className="text-[10px] text-[#8c6d3b] font-bold uppercase tracking-wider font-mono">
              {language === 'zh' ? '无任何刷卡附加费' : 'Zero Surcharge'}
            </span>
          </div>

          <button 
            disabled={isProcessing}
            onClick={handleConfirmAndPay}
            className="w-full h-11 rounded-sm bg-[#171513] hover:bg-[#8c6d3b] active:scale-[0.985] text-[#dfcdb5] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xs transition-all border border-[#b89058]/40"
          >
            <Lock className="w-3.5 h-3.5 text-[#b89058]" />
            {isProcessing ? (
              <span>{t.securingEscrow}</span>
            ) : selectedPlan === 'bnpl' ? (
              <span>{language === 'zh' ? `确认并分期支付 S$${installmentPerMonth} / 月 (Atome)` : `Confirm & Pay S$${installmentPerMonth} / mo with Atome`}</span>
            ) : selectedPlan === 'stripe' ? (
              <span>{language === 'zh' ? `使用 1-Click Link 支付 S$${totalDue.toFixed(2)}` : `Pay S$${totalDue.toFixed(2)} with 1-Click Link`}</span>
            ) : (
              <span>{language === 'zh' ? `全额确认并支付 S$${totalDue.toFixed(2)}` : `Confirm & Pay S$${totalDue.toFixed(2)} in Full`}</span>
            )}
          </button>

          <div className="flex justify-center items-center gap-4 text-[#8c6d3b] text-[9px] uppercase tracking-wider font-bold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#b89058]" />
              {language === 'zh' ? '认证执业专家' : 'Verified Practitioner'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CalendarCheck className="w-3 h-3 text-[#b89058]" />
              {language === 'zh' ? '即时行程确认' : 'Immediate Itinerary'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
