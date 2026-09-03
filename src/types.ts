export type ActiveScreen = 'discover' | 'practitioner' | 'datetime' | 'confirmation' | 'bookings' | 'saved' | 'profile';

export type AppLanguage = 'en' | 'zh';

export interface TreatmentService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  includesDiagnostic?: boolean;
  highlightBadge?: string;
  tagline?: string;
}

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  specialty: string;
  location: string;
  heroImage: string;
  avatarImage: string;
  rating: number;
  reviewCount: number;
  clientCount: string;
  verifiedRate: string;
  experienceYears: string;
  startingPrice: number;
  durationMinutes: number;
  nextSlot: string;
  tags: string[];
  clinicName: string;
  clinicAddress: string;
  clinicDescription: string;
  clinicImage: string;
  services: TreatmentService[];
}

export interface PortfolioCase {
  id: string;
  title: string;
  subtitle: string;
  treatmentName: string;
  sessionBadge: string;
  imageUrl: string;
  description: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  iconName: string;
}

export interface BookingState {
  practitioner: Practitioner;
  selectedService: TreatmentService;
  selectedDate: string; // e.g., '2024-10-24'
  selectedDateLabel: string; // e.g., 'Thu, Oct 24'
  selectedTime: string; // e.g., '3:30 PM'
  selectedAddOns: AddOnItem[];
  intakeNotes: string[];
  customIntakeNote: string;
  paymentPlan: 'bnpl' | 'full' | 'stripe';
  loyaltyDiscountApplied: boolean;
  serviceFeeWaived: boolean;
  confirmedAt?: string;
  bookingRef?: string;
}
