import React from 'react';
import { Compass, Calendar, Bookmark, User } from 'lucide-react';
import { ActiveScreen } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavBarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  bookingCount?: number;
  savedCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  onNavigate,
  bookingCount = 1,
  savedCount = 1
}) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-3 left-0 right-0 max-w-[720px] mx-auto z-40 px-4">
      <div className="bg-[#181614]/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-[#c8a97e]/30 rounded-full flex justify-around items-center px-4 py-2 text-[#FAF8F5]">
        {/* Discover */}
        <button
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center transition-all active:scale-[0.985] relative py-1 px-3 ${
            activeScreen === 'discover'
              ? 'text-[#dfcdb5] font-bold'
              : 'text-[#FAF8F5]/50 hover:text-[#dfcdb5]'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeScreen === 'discover' ? 'stroke-[#c8a97e] stroke-[2.2]' : 'stroke-1.5'}`} />
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold mt-1">{t.navDiscover}</span>
          {activeScreen === 'discover' && (
            <span className="w-4 h-0.5 bg-[#c8a97e] rounded-full mt-0.5 shadow-[0_0_8px_#c8a97e]"></span>
          )}
        </button>

        {/* Bookings */}
        <button
          onClick={() => onNavigate('bookings')}
          className={`flex flex-col items-center justify-center transition-all active:scale-[0.985] relative py-1 px-3 ${
            activeScreen === 'bookings'
              ? 'text-[#dfcdb5] font-bold'
              : 'text-[#FAF8F5]/50 hover:text-[#dfcdb5]'
          }`}
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 ${activeScreen === 'bookings' ? 'stroke-[#c8a97e] stroke-[2.2]' : 'stroke-1.5'}`} />
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#c8a97e] text-[#141210] text-[8px] flex items-center justify-center font-bold">
                {bookingCount}
              </span>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold mt-1">{t.navBookings}</span>
          {activeScreen === 'bookings' && (
            <span className="w-4 h-0.5 bg-[#c8a97e] rounded-full mt-0.5 shadow-[0_0_8px_#c8a97e]"></span>
          )}
        </button>

        {/* Saved */}
        <button
          onClick={() => onNavigate('saved')}
          className={`flex flex-col items-center justify-center transition-all active:scale-[0.985] relative py-1 px-3 ${
            activeScreen === 'saved'
              ? 'text-[#dfcdb5] font-bold'
              : 'text-[#FAF8F5]/50 hover:text-[#dfcdb5]'
          }`}
        >
          <div className="relative">
            <Bookmark className={`w-5 h-5 ${activeScreen === 'saved' ? 'stroke-[#c8a97e] stroke-[2.2]' : 'stroke-1.5'}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#c8a97e] shadow-[0_0_6px_#c8a97e]"></span>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold mt-1">{t.navSaved}</span>
          {activeScreen === 'saved' && (
            <span className="w-4 h-0.5 bg-[#c8a97e] rounded-full mt-0.5 shadow-[0_0_8px_#c8a97e]"></span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center transition-all active:scale-[0.985] relative py-1 px-3 ${
            activeScreen === 'profile'
              ? 'text-[#dfcdb5] font-bold'
              : 'text-[#FAF8F5]/50 hover:text-[#dfcdb5]'
          }`}
        >
          <User className={`w-5 h-5 ${activeScreen === 'profile' ? 'stroke-[#c8a97e] stroke-[2.2]' : 'stroke-1.5'}`} />
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold mt-1">{t.navProfile}</span>
          {activeScreen === 'profile' && (
            <span className="w-4 h-0.5 bg-[#c8a97e] rounded-full mt-0.5 shadow-[0_0_8px_#c8a97e]"></span>
          )}
        </button>
      </div>
    </nav>
  );
};

