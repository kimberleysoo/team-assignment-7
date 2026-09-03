import React, { useState } from 'react';
import { ActiveScreen, Practitioner, TreatmentService, BookingState } from './types';
import { 
  PRACTITIONER_DR_VANCE, 
  BESPOKE_ADDONS 
} from './data/mockData';
import { useLanguage } from './context/LanguageContext';
import { Globe } from 'lucide-react';

import { DiscoverView } from './components/DiscoverView';
import { PractitionerDetailView } from './components/PractitionerDetailView';
import { DateTimeSelectionView } from './components/DateTimeSelectionView';
import { ConfirmationPaymentView } from './components/ConfirmationPaymentView';
import { BookingsView } from './components/BookingsView';
import { SavedView } from './components/SavedView';
import { ProfileView } from './components/ProfileView';
import { TalkToUsView } from './components/TalkToUsView';
import { BottomNavBar } from './components/BottomNavBar';
import { ReviewsModal } from './components/ReviewsModal';
import { InstallmentsInfoModal } from './components/InstallmentsInfoModal';
import { ConciergeJournalModal } from './components/ConciergeJournalModal';

export default function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('discover');
  const [activePractitioner, setActivePractitioner] = useState<Practitioner>(PRACTITIONER_DR_VANCE);

  // Initial booking state pre-populated to exactly mirror the user's mockup screens
  const [bookingState, setBookingState] = useState<BookingState>({
    practitioner: PRACTITIONER_DR_VANCE,
    selectedService: PRACTITIONER_DR_VANCE.services[0], // Haute Couture Bespoke Facial ($280)
    selectedDate: '2024-10-24',
    selectedDateLabel: 'Thu, Oct 24',
    selectedTime: '3:30 PM',
    selectedAddOns: [BESPOKE_ADDONS[0]], // LED Light Therapy (+$45) pre-selected as shown in screenshots
    intakeNotes: ['Sensitive/Reactive Skin'],
    customIntakeNote: '',
    paymentPlan: 'bnpl',
    loyaltyDiscountApplied: true,
    serviceFeeWaived: true
  });

  const [savedPractitionerIds, setSavedPractitionerIds] = useState<string[]>([
    'dr-helene-vance'
  ]);

  // Modals state
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isInstallmentsModalOpen, setIsInstallmentsModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);

  // Navigation handlers
  const handleSelectPractitioner = (p: Practitioner) => {
    setActivePractitioner(p);
    setBookingState((prev) => ({
      ...prev,
      practitioner: p,
      selectedService: p.services[0]
    }));
    setActiveScreen('practitioner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: TreatmentService) => {
    setBookingState((prev) => ({
      ...prev,
      selectedService: service
    }));
  };

  const handleUpdateBooking = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({
      ...prev,
      ...updates
    }));
  };

  const handleToggleSave = (id: string) => {
    setSavedPractitionerIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookingConfirmed = (refCode: string) => {
    setBookingState((prev) => ({
      ...prev,
      bookingRef: refCode,
      confirmedAt: new Date().toISOString()
    }));
  };

  // Whether to show bottom floating nav bar (on high-level hubs)
  const showBottomNav = ['discover', 'bookings', 'saved', 'talk-to-us', 'profile'].includes(activeScreen);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#171513] font-sans antialiased selection:bg-[#b89058] selection:text-white">
      
      {/* Luxury Caviar & Gold Verification Bar */}
      <div className="bg-[#141210] text-[#faf7f2] py-2 px-4 sticky top-0 z-50 border-b border-[#b89058]/25 shadow-sm">
        <div className="max-w-[720px] mx-auto flex items-center justify-between text-[10px] uppercase tracking-[0.18em]">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b89058] shadow-[0_0_8px_#b89058]"></span>
            <span className="font-serif text-xs tracking-widest normal-case font-normal text-[#dfcdb5]">
              {language === 'zh' ? 'ÉLAN 艾澜' : 'ÉLAN'}
            </span>
            <span className="text-[#b89058]/50 hidden sm:inline">• Singapore</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar font-bold">
              <button
                onClick={() => {
                  setActiveScreen('discover');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2 py-1 rounded-sm transition-all whitespace-nowrap ${
                  activeScreen === 'discover'
                    ? 'bg-[#b89058] text-[#141210] font-bold shadow-xs'
                    : 'text-[#faf7f2]/60 hover:text-[#dfcdb5]'
                }`}
              >
                {t.stepSanctuary}
              </button>

              <button
                onClick={() => {
                  setActivePractitioner(PRACTITIONER_DR_VANCE);
                  setActiveScreen('practitioner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2 py-1 rounded-sm transition-all whitespace-nowrap ${
                  activeScreen === 'practitioner'
                    ? 'bg-[#b89058] text-[#141210] font-bold shadow-xs'
                    : 'text-[#faf7f2]/60 hover:text-[#dfcdb5]'
                }`}
              >
                {t.stepPractitioner}
              </button>

              <button
                onClick={() => {
                  setActiveScreen('datetime');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2 py-1 rounded-sm transition-all whitespace-nowrap ${
                  activeScreen === 'datetime'
                    ? 'bg-[#b89058] text-[#141210] font-bold shadow-xs'
                    : 'text-[#faf7f2]/60 hover:text-[#dfcdb5]'
                }`}
              >
                {t.stepDateTime}
              </button>

              <button
                onClick={() => {
                  setActiveScreen('confirmation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2 py-1 rounded-sm transition-all whitespace-nowrap ${
                  activeScreen === 'confirmation'
                    ? 'bg-[#b89058] text-[#141210] font-bold shadow-xs'
                    : 'text-[#faf7f2]/60 hover:text-[#dfcdb5]'
                }`}
              >
                {t.stepReserve}
              </button>

              <button
                onClick={() => {
                  setActiveScreen('talk-to-us');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2 py-1 rounded-sm transition-all whitespace-nowrap ${
                  activeScreen === 'talk-to-us'
                    ? 'bg-[#b89058] text-[#141210] font-bold shadow-xs'
                    : 'text-[#faf7f2]/60 hover:text-[#dfcdb5]'
                }`}
              >
                {t.navTalkToUs}
              </button>
            </div>

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch Language (English / 中文)"
              title="Switch Language (English / 中文)"
              className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#221e1a] border border-[#b89058]/40 hover:border-[#b89058] text-[#dfcdb5] hover:text-white transition-all text-[9px] font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-xs active:scale-95"
            >
              <Globe className="w-3 h-3 text-[#b89058]" />
              <span>{language === 'en' ? '中文' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Screen Router */}
      <main>
        {activeScreen === 'discover' && (
          <DiscoverView
            onSelectPractitioner={handleSelectPractitioner}
            onOpenInstallmentsModal={() => setIsInstallmentsModalOpen(true)}
            onOpenJournalModal={() => setIsJournalModalOpen(true)}
            savedPractitionerIds={savedPractitionerIds}
            onToggleSave={handleToggleSave}
            language={language}
          />
        )}

        {activeScreen === 'practitioner' && (
          <PractitionerDetailView
            practitioner={activePractitioner}
            selectedService={bookingState.selectedService}
            onSelectService={handleSelectService}
            onProceedToDateTime={() => {
              setActiveScreen('datetime');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => {
              setActiveScreen('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReviewsModal={() => setIsReviewsModalOpen(true)}
            isSaved={savedPractitionerIds.includes(activePractitioner.id)}
            onToggleSave={() => handleToggleSave(activePractitioner.id)}
            language={language}
          />
        )}

        {activeScreen === 'datetime' && (
          <DateTimeSelectionView
            practitioner={bookingState.practitioner}
            selectedService={bookingState.selectedService}
            selectedDate={bookingState.selectedDate}
            selectedDateLabel={bookingState.selectedDateLabel}
            selectedTime={bookingState.selectedTime}
            selectedAddOns={bookingState.selectedAddOns}
            intakeNotes={bookingState.intakeNotes}
            customIntakeNote={bookingState.customIntakeNote}
            onUpdateBooking={handleUpdateBooking}
            onProceedToCheckout={() => {
              setActiveScreen('confirmation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => {
              setActiveScreen('practitioner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}

        {activeScreen === 'confirmation' && (
          <ConfirmationPaymentView
            booking={bookingState}
            onConfirmSuccess={handleBookingConfirmed}
            onBack={() => {
              setActiveScreen('datetime');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}

        {activeScreen === 'bookings' && (
          <BookingsView
            currentBooking={bookingState}
            onNavigateToBookingDetail={() => {
              setActiveScreen('confirmation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreSanctuary={() => {
              setActiveScreen('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}

        {activeScreen === 'saved' && (
          <SavedView
            savedPractitionerIds={savedPractitionerIds}
            onSelectPractitioner={handleSelectPractitioner}
            onToggleSave={handleToggleSave}
            onExploreSanctuary={() => {
              setActiveScreen('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}

        {activeScreen === 'talk-to-us' && (
          <TalkToUsView
            language={language}
            onExploreSanctuary={() => {
              setActiveScreen('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfileView
            onOpenInstallmentsModal={() => setIsInstallmentsModalOpen(true)}
            onOpenJournalModal={() => setIsJournalModalOpen(true)}
            onNavigateToTalkToUs={() => {
              setActiveScreen('talk-to-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Bottom Navigation (Visible on Discover, Bookings, Saved, Profile) */}
      {showBottomNav && (
        <BottomNavBar
          activeScreen={activeScreen}
          onNavigate={(screen) => {
            setActiveScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          bookingCount={1}
          savedCount={savedPractitionerIds.length}
        />
      )}

      {/* Interactive Modals */}
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        practitionerName={activePractitioner.name}
        language={language}
      />

      <InstallmentsInfoModal
        isOpen={isInstallmentsModalOpen}
        onClose={() => setIsInstallmentsModalOpen(false)}
        samplePrice={bookingState.selectedService.price}
        language={language}
      />

      <ConciergeJournalModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        language={language}
      />
    </div>
  );
}
