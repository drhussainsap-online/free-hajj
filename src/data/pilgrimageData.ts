export type TierId = 'free' | 'tier_1000' | 'tier_5000' | 'tier_10000';
export type PilgrimageType = 'hajj' | 'umrah';
export type CurrencyCode = 'USD' | 'SAR' | 'GBP' | 'INR' | 'MYR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Full unsubsidized base cost of Hajj in this currency */
  fullHajjBase: number;
  /** Full unsubsidized base cost of Umrah in this currency */
  fullUmrahBase: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'US Dollar',
    fullHajjBase: 11500,
    fullUmrahBase: 2600,
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR ',
    label: 'Saudi Riyal',
    fullHajjBase: 18500,
    fullUmrahBase: 4800,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'British Pound',
    fullHajjBase: 10800,
    fullUmrahBase: 2200,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    label: 'Indian Rupee',
    fullHajjBase: 425000,
    fullUmrahBase: 95000,
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM ',
    label: 'Malaysian Ringgit',
    fullHajjBase: 26000,
    fullUmrahBase: 7800,
  },
};

export interface TierProgram {
  id: TierId;
  indexLabel: string;
  name: string;
  shortTitle: string;
  contributionAmount: number;
  summary: string;
  allocationShare: string;
  quotaSeats2026: number;
  remainingSeats2026: number;
  makkahHotelDistance: string;
  madinahHotelDistance: string;
  groupRatio: string;
  hajjDurationDays: number;
  umrahDurationDays: number;
  eligibilitySummary: string;
  inclusionsHajj: string[];
  inclusionsUmrah: string[];
  costBreakdownNote: string;
}

export const TIER_PROGRAMS: TierProgram[] = [
  {
    id: 'free',
    indexLabel: '01',
    name: 'Free Waqf Scholarship',
    shortTitle: 'Free Seat',
    contributionAmount: 0,
    summary:
      'Complete 100% endowment-funded Hajj or Umrah for first-time pilgrims facing financial hardship, community elders, and verified nominees.',
    allocationShare: '100% Waqf Covered',
    quotaSeats2026: 420,
    remainingSeats2026: 68,
    makkahHotelDistance: '650m shuttle & walking access to Haram',
    madinahHotelDistance: '450m from Al-Masjid an-Nabawi',
    groupRatio: '18 pilgrims per licensed Mutawwif scholar',
    hajjDurationDays: 16,
    umrahDurationDays: 10,
    eligibilitySummary:
      'First-time pilgrimage, household income verification, and local mosque or charity endorsement.',
    inclusionsHajj: [
      'Official Nusuk Hajj visa & Tasreeh permit processing',
      'Round-trip economy airfare from regional hub',
      'Makkah & Madinah quad-shared hotel stays with daily meals',
      'Air-conditioned Mina & Arafat camp accommodation',
      'Haramain High-Speed Rail transfer between Makkah and Madinah',
      'Pre-departure Fiqh & health orientation with dedicated guide',
    ],
    inclusionsUmrah: [
      'Official Umrah visa & Rawdah permit scheduling',
      'Round-trip economy airfare and airport transfers',
      '10 nights across Makkah and Madinah with breakfast & dinner',
      'Guided Ziyarah historical tours in Makkah and Madinah',
      'Ihram kit and multilingual ritual handbook',
    ],
    costBreakdownNote:
      'Every dollar of visa, airfare, lodging, and ground hospitality is underwritten by pooled Waqf and Zakat-al-Mal donor endowments.',
  },
  {
    id: 'tier_1000',
    indexLabel: '02',
    name: '1,000 Essential Access Tier',
    shortTitle: '1,000 Plan',
    contributionAmount: 1000,
    summary:
      'Accessible entry contribution for working families and youth. Your 1,000 contribution unlocks full Waqf subsidy matching for Umrah or reserves a subsidized Hajj seat.',
    allocationShare: 'Up to 91% Waqf Matched',
    quotaSeats2026: 1200,
    remainingSeats2026: 214,
    makkahHotelDistance: '500m to Masjid al-Haram courtyard',
    madinahHotelDistance: '350m to Al-Masjid an-Nabawi gate',
    groupRatio: '16 pilgrims per licensed scholar guide',
    hajjDurationDays: 16,
    umrahDurationDays: 10,
    eligibilitySummary:
      'Open to first-time and modest-income pilgrims holding a passport valid for 6+ months.',
    inclusionsHajj: [
      'Guaranteed Nusuk Hajj quota allocation with Waqf subsidy match',
      'Round-trip international airfare & Saudi ground coaches',
      'Quad-occupancy 4-star hospitality in Makkah & Madinah',
      'Full board meals in Makkah, Madinah, Mina, and Arafat',
      '24/7 medical nurse & multilingual Mutawwif team',
      'Flexible 6-month or 12-month interest-free installment schedule',
    ],
    inclusionsUmrah: [
      'Direct Umrah seat with full airfare and visa included',
      '5 nights Makkah + 5 nights Madinah close-proximity lodging',
      'Haramain high-speed rail ticket between the two holy cities',
      'Guided Umrah performance & historical Ziyarah',
      'Zero hidden surcharges or interest-bearing financing',
    ],
    costBreakdownNote:
      'Your fixed 1,000 contribution covers core administrative and travel commitment while the endowment fund absorbs remaining airline, hotel, and permit costs.',
  },
  {
    id: 'tier_5000',
    indexLabel: '03',
    name: '5,000 Guided Sanctuary Tier',
    shortTitle: '5,000 Plan',
    contributionAmount: 5000,
    summary:
      'Balanced co-funded pilgrimage offering closer courtyard proximity, double or triple rooming, and a built-in sadaqah contribution that sponsors one free pilgrim seat.',
    allocationShare: 'Subsidized + Co-Sponsor',
    quotaSeats2026: 950,
    remainingSeats2026: 189,
    makkahHotelDistance: '250m direct pedestrian walk to Haram',
    madinahHotelDistance: '180m facing Al-Masjid an-Nabawi courtyard',
    groupRatio: '12 pilgrims per senior scholar guide',
    hajjDurationDays: 18,
    umrahDurationDays: 12,
    eligibilitySummary:
      'Open enrollment for individuals, couples, and elders seeking assisted close-haram walking access.',
    inclusionsHajj: [
      'Priority Nusuk Hajj permit & dedicated fast-track immigration support',
      'Direct flights with checked luggage and Zamzam allowance',
      'Triple or double rooming within 250m of Masjid al-Haram',
      'Upgraded Mina camp zone near Jamarat bridge access',
      'Haramain Business/Comfort rail transfer and private coach fleet',
      'Automatically co-funds 25% of a Free Waqf Scholarship seat',
    ],
    inclusionsUmrah: [
      'Extended 12-night Umrah itinerary with double-occupancy suites',
      'Step-free close proximity for elders and families with children',
      'Daily buffet breakfast & dinner plus private Ziyarah transport',
      'Confirmed Rawdah permit assistance via Nusuk platform',
    ],
    costBreakdownNote:
      'Covers direct travel and close-courtyard accommodation while Waqf partnerships bridge peak-season Hajj tariffs.',
  },
  {
    id: 'tier_10000',
    indexLabel: '04',
    name: '10,000 Complete Haramain & Patron Tier',
    shortTitle: '10,000 Plan',
    contributionAmount: 10000,
    summary:
      'Comprehensive private-comfort Hajj package directly facing the Haram courtyards—and every 10,000 enrollment fully funds an additional Free Waqf pilgrim seat.',
    allocationShare: 'Full Package + 1 Free Seat Sponsored',
    quotaSeats2026: 600,
    remainingSeats2026: 142,
    makkahHotelDistance: 'Direct Haram courtyard frontage (0–120m)',
    madinahHotelDistance: 'Markaziyah courtyard frontage (0–100m)',
    groupRatio: '8 pilgrims per dedicated scholar & concierge',
    hajjDurationDays: 21,
    umrahDurationDays: 14,
    eligibilitySummary:
      'Open enrollment for individuals and families; includes automatic patronage of one Free Waqf seat.',
    inclusionsHajj: [
      'Private double or family suite overlooking Masjid al-Haram & Nabawi',
      'Direct premium flights & VIP airport meet-and-greet transfers',
      'Al-Mashaer upgraded hospitality pavilions in Mina & Arafat',
      'Personal scholar mentorship, medical physician & luggage concierge',
      'Haramain Business Class rail between Makkah and Madinah',
      'Directly funds 1 full Free Waqf Hajj/Umrah seat in your honor',
    ],
    inclusionsUmrah: [
      '14-night Haram-view suite stay with flexible departure dates',
      'Private chauffeur transfers across Jeddah, Makkah, and Madinah',
      'Dedicated religious historian for private Ziyarah excursions',
      'Sponsors 2 complete Free Waqf Umrah seats for underserved elders',
    ],
    costBreakdownNote:
      'Transparently covers full courtyard hospitality while allocating a dedicated Waqf surplus to send an unassisted pilgrim for free.',
  },
];

export interface GalleryCard {
  title: string;
  caption: string;
  imagePath: string;
  alt: string;
  detailLine: string;
}

export const GALLERY_ITEMS: GalleryCard[] = [
  {
    title: 'Al-Masjid an-Nabawi Courtyard',
    caption: 'Fig. 1 · Madinah Munawwarah',
    imagePath: '/src/assets/images/madinah_nabawi_courtyard_1795513569505.jpg',
    alt: 'Courtyard of Al-Masjid an-Nabawi in Madinah with white shading umbrellas at dawn',
    detailLine: '100m–450m courtyard access across all four pathways · Scheduled Rawdah permits',
  },
  {
    title: 'Restful Sanctuary Lodging',
    caption: 'Fig. 2 · Makkah & Madinah Hospitality',
    imagePath: '/src/assets/images/makkah_pilgrim_hotel_1795513569849.jpg',
    alt: 'Calm limestone hospitality room with view of Makkah clock tower and Masjid al-Haram',
    detailLine: 'Inspected lodging partners · Step-free elder access & daily nutrition',
  },
  {
    title: 'Mina & Arafat Camp Readiness',
    caption: 'Fig. 3 · Al-Mashaer Operations',
    imagePath: '/src/assets/images/mina_hospitality_camp_1795513570341.jpg',
    alt: 'Clean orderly pilgrim accommodation pavilions in Mina valley at twilight',
    detailLine: 'Climate-controlled pavilions · On-site medical unit & scholar guidance',
  },
];

export const PROGRAM_METRICS = [
  {
    value: '3,170',
    label: '2026–2027 Allocated Seats',
    context: '420 Free Waqf + 2,750 Subsidized Tiers',
  },
  {
    value: '100%',
    label: 'Interest-Free Shariah Compliance',
    context: 'Audited Waqf & Qard Hasan structure',
  },
  {
    value: '14 Days',
    label: 'Verification Turnaround',
    context: 'From application to conditional seat lock',
  },
];

export function formatCurrencyValue(amount: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency];
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return `${cfg.symbol}${formatted}`;
}

export function getDisplayPackageMetrics(
  tier: TierProgram,
  type: PilgrimageType,
  currency: CurrencyCode
) {
  const cfg = CURRENCIES[currency];
  const basePackageValue = type === 'hajj' ? cfg.fullHajjBase : cfg.fullUmrahBase;

  // Keep the user's exact 0 / 1,000 / 5,000 / 10,000 contribution anchor clear
  const pilgrimPays = tier.contributionAmount;
  const effectiveValue = Math.max(basePackageValue, pilgrimPays);
  const waqfSubsidy = Math.max(0, effectiveValue - pilgrimPays);
  const sponsorSurplus = Math.max(0, pilgrimPays - basePackageValue);

  return {
    pilgrimPays,
    basePackageValue: effectiveValue,
    waqfSubsidy,
    sponsorSurplus,
    subsidyPercent: effectiveValue > 0 ? Math.round((waqfSubsidy / effectiveValue) * 100) : 100,
  };
}
