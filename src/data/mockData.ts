import { Practitioner, PortfolioCase, AddOnItem } from '../types';

export const PRACTITIONER_DR_VANCE: Practitioner = {
  id: 'dr-helene-vance',
  name: 'Dr. Hélène Vance',
  title: 'Senior Medical Aesthetician & Dermal Health Director',
  specialty: 'Couture Dermatology & Bespoke Formulations',
  location: 'Paragon Medical, Orchard Road',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDht3OIyBUW3MyNT24it9PUdEnZ6-M6B9s0bh0t2YB39_JNniyB1e6gEpwuP8rb32OAkSL3hpmqGvOw3PIkXMsQfJ6e-sMCsATQ5rwkeUkPvi3dnUjIFeso7IpbST0v9dCfKGOk6Lqc_tL6HCBX2DPFbeWKkBgGhJ0v_qZqwrhwYkctdeulG8a-ff-1d6r3Yv3bquKCNgR2Iql7KL6aXhCqi8B7m7rgYmQ0sD0YifeBZ0yOmsst68iLnQ',
  avatarImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfuSqVaplPUMn0zg76Xh6m-8GGlP6chaljbukBA1Xe5GhA-5uRiARk_OwZwdRaZVsRbeR_P4WNC2H6Vn8bF0UrLP4Cy1aUw_6ZGmmC0xIUTy0KUZxJNCD3VfZN5DJH_MdHaxjNHXiyyrox8E54s3YJA9UzdBLeaP9agw5ivbn2ty9EaWin9BLs1d-PBkM-Ecilv9owLDAxSglF57_Oi4JKOKfFtVTY8XGJqqiySWPJDkZqe13NpMJ-NA',
  rating: 4.99,
  reviewCount: 280,
  clientCount: '1.4k',
  verifiedRate: '100%',
  experienceYears: '12+ Yrs',
  startingPrice: 280,
  durationMinutes: 75,
  nextSlot: 'Thu, Oct 24 • 3:30 PM',
  tags: ['CIDESCO Certified', 'Top 1% Rated', '12+ Yrs Experience'],
  clinicName: 'The Paragon Medical Suite 14-08',
  clinicAddress: '14-08 Paragon Medical Centre, 290 Orchard Road, Singapore 238859',
  clinicDescription: 'Premier private sanctuary overlooking Orchard Road. Strict single-client private scheduling policy, HEPA-14 medical clean air filtration, and direct valet arrival lift.',
  clinicImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF_p1oJVWB--ZklGnHs-OuEb19t-ZAte25GdDMxuTAbMOtQS8ObuD3Jau9tb4sIgJl9zSSE9l9MmLLCVEWepyoOPg0IbK6Jh3WOmdPnR_5hgnA7Pwyq6kfOW3ZGVaAcFubiwaa86f99BUZfYVyFM8J1B-a3i3w-ICoknduVlnEqAWD9YaeEmeTkzZGEdSSzs0blD8OF2rW-YQSLuK350xZwuyVI3y_9LwfRq9cXpfLZUdfIiHw-nbfUQ',
  services: [
    {
      id: 'service-1',
      name: 'Haute Couture Bespoke Facial',
      description: 'Multi-layered sonic exfoliation followed by bespoke peptide infusion, LED photorejuvenation, and French sculpt massage.',
      durationMinutes: 75,
      price: 280,
      includesDiagnostic: true,
      tagline: 'Includes Skin Diagnostic'
    },
    {
      id: 'service-2',
      name: 'Cryo Sculpt & Microcurrent Lift',
      description: 'Cryogenic thermal shock paired with medical microcurrent to define jawline contours and stimulate deep muscular collagen tone.',
      durationMinutes: 60,
      price: 240,
      highlightBadge: 'Most Popular',
      tagline: 'Immediate Contouring'
    },
    {
      id: 'service-3',
      name: 'Deep Cellular Renewal Peel',
      description: 'Medical grade botanical TCA-blend resurfacing with bioactive growth factor soothing mask for deep pigmentation and texture renewal.',
      durationMinutes: 90,
      price: 340,
      tagline: 'Post-care Kit Included'
    }
  ]
};

export const PRACTITIONER_CAMILLE: Practitioner = {
  id: 'camille-laurent',
  name: 'Camille Laurent, LE',
  title: 'Master Aesthetician & Cellular Biologist',
  specialty: 'Cellular Remodeling & Biologique VIP O2',
  location: 'Palais Renaissance, Orchard',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGe9B0rmaikuJMnyytWaQTWTBgvdXUHWh8GwF6uS5v6bfk_kk9qqRezZHLQOEyxMsTmrGEis18Js3ctIwmULR5CaEFvoZZ93Jzt37zvaZL8LmTgyqK2iRT7UGW7KG_OfyypuXjy4d6U0UsnfsweONzps8RCvEhq0Xcg3UMBOiixT9fOdVuSBWTMTKOat0U2cq6-N60fLuod0Wh9fzc8Ptc5kFGjo0ZYErlxfJkWwgyIJnsgytpCBKHOQ',
  avatarImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGe9B0rmaikuJMnyytWaQTWTBgvdXUHWh8GwF6uS5v6bfk_kk9qqRezZHLQOEyxMsTmrGEis18Js3ctIwmULR5CaEFvoZZ93Jzt37zvaZL8LmTgyqK2iRT7UGW7KG_OfyypuXjy4d6U0UsnfsweONzps8RCvEhq0Xcg3UMBOiixT9fOdVuSBWTMTKOat0U2cq6-N60fLuod0Wh9fzc8Ptc5kFGjo0ZYErlxfJkWwgyIJnsgytpCBKHOQ',
  rating: 4.98,
  reviewCount: 142,
  clientCount: '980',
  verifiedRate: '100%',
  experienceYears: '9+ Yrs',
  startingPrice: 220,
  durationMinutes: 75,
  nextSlot: 'Today 3:30 PM',
  tags: ['Vetted Top 1%', 'Biologique Ambassadrice', 'Fast Track'],
  clinicName: 'The Palais Skin Atelier',
  clinicAddress: '03-12 Palais Renaissance, 390 Orchard Road, Singapore 238871',
  clinicDescription: 'Quiet luxury atelier located in Palais Renaissance Orchard, specializing in hyper-customized French biological serums, lymphatic sculpting, and pure cold oxygenation.',
  clinicImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKlrZesH-g4Bvl58jgrLBTRx85EI67l16BavLxhirL4KpXKRNKO1ygBvxxTLffMl7HqOmS5biDf27Sy-G4X7AWy5Ro5a_dl-bXMboa-2UWXUQWTze0y3cB4sW6BPFzDhgsUDeXnJc2bJGL9ZjFxbllYhuulhoofhKvxxDFJS7HUP38GUOcGf4M0xxvFlwRXSRhu71JJ3lWv4_M8mKAZM9qY85IBJypMUsy-hWkS_fVu6vfNnopLBeHVQ',
  services: [
    {
      id: 'camille-1',
      name: 'Biologique Recherche Remodeling Facial',
      description: 'Electrotherapy currents paired with state-of-the-art biological cold serums to re-energize tired cellular matrix.',
      durationMinutes: 75,
      price: 220,
      includesDiagnostic: true,
      tagline: 'VIP O2 Oxygen Boost'
    },
    {
      id: 'camille-2',
      name: 'Cryo Collagen Restorative Infusion',
      description: 'Chilled cryo-sticks with pure Marine Collagen sheets for immediate glass skin clarity and vascular soothing.',
      durationMinutes: 60,
      price: 250,
      tagline: 'Immediate Glass Skin'
    }
  ]
};

export const PRACTITIONER_STERLING: Practitioner = {
  id: 'dr-julian-sterling',
  name: 'Dr. Julian Sterling, MD',
  title: 'Cosmetic Physician & Facial Sculptor',
  specialty: 'Non-Surgical Buccal & Ultrasound Lift',
  location: 'Dempsey Hill, Loewen Road',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGNBKwWwdPi45CWq9Bn-sS-VfXiJ9WFhk2ZAAmaKZIc_PA6W_gYjMpmDaBtUnMP96NpHTzIYWqoB7GcCseeMKBJfO56dw5CElf2bAErQDRow2jMMMpXZJEuFieXQUAXGn3cXs_H7L18ZXfWStXPd0cZCN95kHHtTX4mw03gx5kf6Y8IAK5TErtS03CQ_Lpiw1CXSPLZFir5iTEFsFhKHLus3DTT_IXJSE0qIFl5QQgQf2Q-gy9whPYXw',
  avatarImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGNBKwWwdPi45CWq9Bn-sS-VfXiJ9WFhk2ZAAmaKZIc_PA6W_gYjMpmDaBtUnMP96NpHTzIYWqoB7GcCseeMKBJfO56dw5CElf2bAErQDRow2jMMMpXZJEuFieXQUAXGn3cXs_H7L18ZXfWStXPd0cZCN95kHHtTX4mw03gx5kf6Y8IAK5TErtS03CQ_Lpiw1CXSPLZFir5iTEFsFhKHLus3DTT_IXJSE0qIFl5QQgQf2Q-gy9whPYXw',
  rating: 4.99,
  reviewCount: 208,
  clientCount: '2.1k',
  verifiedRate: '100%',
  experienceYears: '15+ Yrs',
  startingPrice: 340,
  durationMinutes: 90,
  nextSlot: 'Tomorrow 10:15 AM',
  tags: ['Vetted Top 1%', 'Board Certified MD', 'Garden Suite'],
  clinicName: 'The Loewen Medical Sanctuary',
  clinicAddress: '25 Loewen Road, Tanglin / Dempsey Hill, Singapore 249676',
  clinicDescription: 'Lush green heritage sanctuary in Dempsey Hill. High-privacy garden suite integrating clinical ultrasound biomechanics with intra-oral buccal tension release.',
  clinicImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF_p1oJVWB--ZklGnHs-OuEb19t-ZAte25GdDMxuTAbMOtQS8ObuD3Jau9tb4sIgJl9zSSE9l9MmLLCVEWepyoOPg0IbK6Jh3WOmdPnR_5hgnA7Pwyq6kfOW3ZGVaAcFubiwaa86f99BUZfYVyFM8J1B-a3i3w-ICoknduVlnEqAWD9YaeEmeTkzZGEdSSzs0blD8OF2rW-YQSLuK350xZwuyVI3y_9LwfRq9cXpfLZUdfIiHw-nbfUQ',
  services: [
    {
      id: 'sterling-1',
      name: 'Non-Surgical Buccal & Microcurrent Sculpt',
      description: 'Intra-oral muscular sculpting relieving TMJ tension coupled with targeted low-frequency microcurrent for razor-sharp jawline contouring.',
      durationMinutes: 90,
      price: 340,
      highlightBadge: 'Signature Procedure',
      tagline: 'Deep Muscular Release'
    },
    {
      id: 'sterling-2',
      name: 'High-Density Ultrasound Tightening',
      description: 'Focused clinical ultrasound pulses targeting the SMAS facial layer for long-term neo-collagenesis without downtime.',
      durationMinutes: 60,
      price: 450,
      tagline: 'Collagen Architecture'
    }
  ]
};

export const ALL_PRACTITIONERS: Practitioner[] = [
  PRACTITIONER_DR_VANCE,
  PRACTITIONER_CAMILLE,
  PRACTITIONER_STERLING
];

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: 'case-1',
    title: 'Epidermal Barrier Repair',
    subtitle: '4-week interval recovery focusing on chronic inflammation and redness alleviation.',
    treatmentName: 'Bespoke Facial',
    sessionBadge: 'Session 3 of 4',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRguhCrG-ug_fiIJ_eqUGwZVFGR-6h1JQWC4cyqC9NU1IzIUHGZIy5JWjwf5M_cB6NH-zWOQyiPrPhf_xNJlfFjhChsBog4nZCr8aHJwkYNstO4dJANAx2Qj2i3DPBp_8-O5UDyu8gcJcyGSjawfft3YgZOsV1P4Fsz9ruRSMpElCbzwmFSjtX5xxL9Y7MBzolnnNWDe5pLkEHWmaVST805uDcvyaC7bjY3zSkqLMzk9X0iWX6LUGC5Q',
    description: 'Split polarized comparison showing marked reduction in telangiectasia and restored lipid layer luminosity.'
  },
  {
    id: 'case-2',
    title: 'Submental Definition & Lift',
    subtitle: 'Microcurrent stimulation with lymphatic reduction yielding immediate sculpt definition.',
    treatmentName: 'Cryo Sculpt',
    sessionBadge: 'Immediate Post-Lift',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM4OshlEHSlJ3HX4uFU7xmPx2TL-s664Z9sBZDGb-bA_dj8IffC1TxpxIzlYl6BRuu5jnDrMZ9ibsfMaNUJFPWN0zn17FvLQWOYngLUOXhqOOR5FomWHtoXOuTkbkRrf3HZPWX-iSKTldjkTRBxxKsYZEOL5prtV5jIFhM9Yjc4D1exWGgrdlzgDZ7gxroA0lE2bgUtfCnhY8_TsIRikP_8iLE8EmYwkAREJ2CDMc80eEmpxGD0Lo2ZQ',
    description: 'High-definition clinical capture demonstrating immediate elevation of the jawline angle and softened marionette shadows.'
  },
  {
    id: 'case-3',
    title: 'Hyperpigmentation Clearance',
    subtitle: 'Controlled bio-acid infusion targeting persistent UV damage with cellular hydration.',
    treatmentName: 'Cellular Peel',
    sessionBadge: 'Day 14 Post-Peel',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3HkPmez0p6bmpJpxjzFvCA8Oz8fxdm3ZOO63GJJF4wdPrGi4mgaQpZD6ZT3mFM1qrN03DiFqz3Q-6ucN9AKrGZvSy4bPf-SFgs-lMAyDqSUIofiEoboW5ygyEW1fMcjVVWWAXtTAzJZV7pw2Dru5GrRcY-P2ifmH209WaFs53P-Q_75vtcR36GAMSvBw_CuAvZoE3-aUWWIt3WbriSaQdu25v6T_bCRkDqcCqNW-vabeZeEgxTvHfAA',
    description: 'Even skin tone restoration across malar ridges with zero post-inflammatory hyperpigmentation or barrier compromise.'
  }
];

export const BESPOKE_ADDONS: AddOnItem[] = [
  {
    id: 'addon-led',
    name: 'LED Light Therapy',
    description: '+15 min • Deep dermal collagen boost',
    durationMinutes: 15,
    price: 45,
    iconName: 'flare'
  },
  {
    id: 'addon-eye',
    name: 'De-Puffing Eye Sculpt',
    description: '+10 min • Microcurrent lymphatic drainage',
    durationMinutes: 10,
    price: 35,
    iconName: 'visibility'
  },
  {
    id: 'addon-neck',
    name: 'Neck & Décolleté Booster',
    description: '+20 min • Peptide restorative firming',
    durationMinutes: 20,
    price: 60,
    iconName: 'spa'
  }
];

export const CALENDAR_DAYS = [
  { dayName: 'Tue', dateNum: '22', isAvailable: true, slotsCount: 1, fullDate: '2024-10-22' },
  { dayName: 'Wed', dateNum: '23', isAvailable: true, slotsCount: 2, fullDate: '2024-10-23' },
  { dayName: 'Thu', dateNum: '24', isAvailable: true, slotsCount: 3, fullDate: '2024-10-24', isDefault: true },
  { dayName: 'Fri', dateNum: '25', isAvailable: true, slotsCount: 1, fullDate: '2024-10-25' },
  { dayName: 'Sat', dateNum: '26', isAvailable: true, slotsCount: 2, fullDate: '2024-10-26' },
  { dayName: 'Sun', dateNum: '27', isAvailable: false, slotsCount: 0, fullDate: '2024-10-27', isFull: true }
];

export const VERIFIED_REVIEWS = [
  {
    author: 'Evelyn Tan',
    location: 'Nassim Road, Singapore',
    rating: 5,
    date: '2 weeks ago',
    treatment: 'Haute Couture Bespoke Facial',
    comment: 'Dr. Vance’s private suite at Paragon is serene, impeccably clean, and deeply private. Zero redness after the bespoke peel—my skin barrier has never looked more radiant.',
    verified: true
  },
  {
    author: 'Cheryl Lim',
    location: 'Marina Bay Sands',
    rating: 5,
    date: '1 month ago',
    treatment: 'Cryo Sculpt & Microcurrent Lift',
    comment: 'The facial contouring at Palais Renaissance was remarkable. The jawline lift was immediate for my gala at Marina Bay. Worth every single dollar.',
    verified: true
  },
  {
    author: 'Jonathan S.',
    location: 'Tanglin & Dempsey',
    rating: 5,
    date: '1 month ago',
    treatment: 'Deep Cellular Renewal Peel',
    comment: 'The Loewen Road sanctuary at Dempsey is unmatched for privacy. No crowded reception, just world-class medical sculpting with calm lush greenery.',
    verified: true
  }
];
