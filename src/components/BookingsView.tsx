import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, QrCode } from 'lucide-react';
import { BookingState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BookingsViewProps {
  currentBooking: BookingState;
  onNavigateToBookingDetail: () => void;
  onExploreSanctuary: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  currentBooking,
  onNavigateToBookingDetail,
  onExploreSanctuary
}) => {
  const { language, t } = useLanguage();
  const { practitioner, selectedService, selectedDateLabel, selectedTime } = currentBooking;

  return (
    <div className="flex-1 w-full max-w-[720px] mx-auto pb-32 px-5 space-y-6 pt-4">
      <div className="flex items-baseline justify-between border-b border-[#dfcdb5] pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#8c6d3b]">
              {language === 'zh' ? '预约行程日程' : 'Singapore Itinerary'}
            </span>
          </div>
          <h1 className="font-serif text-2xl font-normal text-[#171513]">
            {t.upcomingAppointments}
          </h1>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#f3ece0] border border-[#c8a97e]/35 text-[#8c6d3b] font-bold">
          1 {language === 'zh' ? '已确认' : 'Confirmed'}
        </span>
      </div>

      {/* Confirmed Ritual Card - Luxury Caviar & Gold */}
      <div className="bg-white rounded-xl border border-[#c8a97e]/35 p-5 space-y-4 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold text-[#dfcdb5] bg-[#141210] px-2.5 py-1 rounded-sm uppercase tracking-[0.2em] border border-[#b89058]/40 shadow-xs">
            {t.confirmedBadge}
          </span>
          <span className="text-xs font-mono text-[#8c6d3b]">Ref: ELAN-SG8492</span>
        </div>

        <div className="flex items-start gap-4 pt-1">
          <img 
            src={practitioner.avatarImage} 
            alt={practitioner.name}
            className="w-16 h-16 rounded-lg object-cover border border-[#c8a97e]/40 shrink-0 shadow-xs" 
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base font-normal text-[#171513]">{practitioner.name}</h3>
            <p className="text-xs text-[#5e564e] truncate font-sans">{selectedService.name}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#171513] font-medium">
              <Clock className="w-3.5 h-3.5 text-[#8c6d3b]" />
              <span>{selectedDateLabel} • {selectedTime}</span>
            </div>
          </div>
        </div>

        {/* Singapore Location Details */}
        <div className="p-3.5 rounded-lg bg-[#fbf8f3] border border-[#c8a97e]/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#171513] font-bold uppercase tracking-wider text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#8c6d3b]" />
              <span>Paragon Medical Suite 14-08</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#8c6d3b] font-bold">
              {language === 'zh' ? '专属礼宾代客泊车' : 'Valet Concierge'}
            </span>
          </div>
          <p className="text-[11px] text-[#5e564e] font-sans">
            {language === 'zh' 
              ? '乌节路290号百丽宫医疗大楼14楼。请提前10分钟抵达，享用迎宾东方花茶与量身定制皮肤诊断。'
              : '290 Orchard Road, Paragon Medical #14-08, Singapore 238859. Please arrive 10 minutes prior for welcome botanical tea and diagnostic formulation.'}
          </p>
        </div>

        {/* Digital Sanctuary Key / QR Pass */}
        <div className="p-3.5 rounded-lg bg-white border border-[#c8a97e]/35 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-sm bg-[#141210] text-[#dfcdb5] border border-[#b89058]/40">
              <QrCode className="w-4 h-4 text-[#b89058]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#171513] block">
                {t.discreetPass}
              </span>
              <span className="text-[10px] text-[#5e564e]">
                {language === 'zh' ? '到店出示即可直达私密诊室' : 'Present upon arrival for private suite entry'}
              </span>
            </div>
          </div>
          <span 
            onClick={onNavigateToBookingDetail}
            className="text-[10px] font-bold uppercase tracking-widest text-[#8c6d3b] border-b border-[#b89058] pb-0.5 cursor-pointer hover:text-[#171513] transition-colors"
          >
            {t.viewPass}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button 
            onClick={onNavigateToBookingDetail}
            className="flex-1 h-11 rounded-sm bg-[#141210] text-[#dfcdb5] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8c6d3b] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#b89058]/40"
          >
            <span>{t.reviewItinerary}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Past Sanctuary History */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-[1.5px] bg-[#b89058]"></span>
          <h3 className="font-serif text-base font-normal text-[#171513]">
            {t.pastTreatments}
          </h3>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#c8a97e]/35 space-y-2 text-xs shadow-xs">
          <div className="flex justify-between items-center text-[#5e564e]">
            <span className="font-mono text-[11px]">August 14, 2024</span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-[#8c6d3b] bg-[#f3ece0] px-2 py-0.5 rounded-sm border border-[#c8a97e]/35">
              {t.completed}
            </span>
          </div>
          <h4 className="font-serif text-sm font-normal text-[#171513]">
            Cellular Remodeling & Biologique VIP O2
          </h4>
          <p className="text-[#5e564e]">
            with Camille Laurent, LE • Palais Renaissance Atelier, Orchard Road
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={onExploreSanctuary}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c6d3b] border-b border-[#b89058] pb-0.5 hover:text-[#171513] transition-colors"
        >
          {language === 'zh' ? '预订其他名医私享疗程' : 'Book Another Master Practitioner Session'}
        </button>
      </div>
    </div>
  );
};
