import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CurrencyCode,
  TIER_PROGRAMS,
  TierId,
  formatCurrencyValue,
} from '../data/pilgrimageData';

interface EligibilityCheckerProps {
  currency: CurrencyCode;
  onSelectRecommendedTier: (tierId: TierId) => void;
}

type FirstTimeAnswer = 'yes' | 'no';
type BudgetAnswer = 'need_free' | 'can_1000' | 'can_5000' | 'can_10000';
type PassportAnswer = 'ready' | 'renewing';

export function EligibilityChecker({
  currency,
  onSelectRecommendedTier,
}: EligibilityCheckerProps) {
  const [firstTime, setFirstTime] = useState<FirstTimeAnswer>('yes');
  const [budget, setBudget] = useState<BudgetAnswer>('can_1000');
  const [passport, setPassport] = useState<PassportAnswer>('ready');

  const getRecommendation = (): {
    tierId: TierId;
    title: string;
    explanation: string;
    documents: string[];
  } => {
    if (budget === 'need_free') {
      if (firstTime === 'yes') {
        return {
          tierId: 'free',
          title: 'Free Waqf Scholarship Recommended',
          explanation:
            'As a first-time pilgrim seeking financial assistance, you qualify to apply for a 100% Waqf-funded Hajj or Umrah seat with full airfare and lodging covered.',
          documents: [
            'Valid passport (6+ months) or national ID for conditional hold',
            'Household income declaration or local Masjid endorsement letter',
            'First-time pilgrimage declaration form',
          ],
        };
      }
      return {
        tierId: 'tier_1000',
        title: '1,000 Essential Access Tier Recommended',
        explanation:
          'Free Waqf seats prioritize first-time pilgrims. Repeat travelers can still access up to 91% endowment matching through the 1,000 Essential Access plan with 12-month installments.',
        documents: [
          'Passport valid for at least 6 months past return date',
          'Standard Nusuk vaccination & travel readiness record',
        ],
      };
    }

    if (budget === 'can_1000') {
      return {
        tierId: 'tier_1000',
        title: '1,000 Essential Access Tier Recommended',
        explanation: `Your ${formatCurrencyValue(1000, currency)} contribution locks in subsidized Umrah direct departure or a subsidized Hajj seat with interest-free monthly installments.`,
        documents: [
          'Passport valid for 6+ months',
          'Preferred departure hub and installment selection (single, 6, or 12 months)',
        ],
      };
    }

    if (budget === 'can_5000') {
      return {
        tierId: 'tier_5000',
        title: '5,000 Guided Sanctuary Tier Recommended',
        explanation: `Your ${formatCurrencyValue(5000, currency)} contribution provides 250m walking proximity to Masjid al-Haram, double/triple lodging, and co-sponsors a Free Waqf seat.`,
        documents: [
          'Passport valid for 6+ months',
          'Rooming preference (double or triple family grouping)',
        ],
      };
    }

    return {
      tierId: 'tier_10000',
      title: '10,000 Complete Haramain & Patron Tier Recommended',
      explanation: `Your ${formatCurrencyValue(10000, currency)} enrollment secures Haram-frontage private hospitality and directly sponsors 1 complete Free Waqf pilgrim seat.`,
      documents: [
        'Passport valid for 6+ months',
        'Optional naming dedication for the sponsored Free Waqf seat',
      ],
    };
  };

  const result = getRecommendation();

  return (
    <section
      id="eligibility"
      className="py-16 sm:py-20 border-t border-[#E5DFD3] bg-[#FAF8F4]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-[#6B665D]">
            Verification &amp; Fair Allocation
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1A1917] tracking-tight text-balance">
            Check Your Pathway Eligibility
          </h2>
          <p className="mt-3 text-base text-[#4A463E] leading-relaxed">
            Answer three practical questions to confirm which tier matches your
            circumstances and what documentation is needed for Nusuk visa
            processing.
          </p>
        </div>

        {/* Interactive 2-column Eligibility Advisor */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* Questions */}
          <div className="lg:col-span-7 bg-white border border-[#E5DFD3] rounded-xl p-6 sm:p-8 space-y-7">
            <div>
              <p className="text-sm font-semibold text-[#1A1917]">
                01. Is this your first Hajj or Umrah pilgrimage?
              </p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFirstTime('yes')}
                  className={`px-4 py-3 text-left text-sm rounded-lg border transition-colors cursor-pointer ${
                    firstTime === 'yes'
                      ? 'border-[#144D3A] bg-[#144D3A]/5 text-[#144D3A] font-medium'
                      : 'border-[#E5DFD3] text-[#4A463E] hover:border-[#C9BFA9]'
                  }`}
                >
                  Yes, first-time pilgrim
                </button>
                <button
                  type="button"
                  onClick={() => setFirstTime('no')}
                  className={`px-4 py-3 text-left text-sm rounded-lg border transition-colors cursor-pointer ${
                    firstTime === 'no'
                      ? 'border-[#144D3A] bg-[#144D3A]/5 text-[#144D3A] font-medium'
                      : 'border-[#E5DFD3] text-[#4A463E] hover:border-[#C9BFA9]'
                  }`}
                >
                  Returning pilgrim
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1A1917]">
                02. Which contribution level fits your household?
              </p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'need_free' as BudgetAnswer, label: '0 · Request Free Waqf Seat' },
                  {
                    id: 'can_1000' as BudgetAnswer,
                    label: `${formatCurrencyValue(1000, currency)} · Essential Access`,
                  },
                  {
                    id: 'can_5000' as BudgetAnswer,
                    label: `${formatCurrencyValue(5000, currency)} · Guided Sanctuary`,
                  },
                  {
                    id: 'can_10000' as BudgetAnswer,
                    label: `${formatCurrencyValue(10000, currency)} · Haramain & Patron`,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBudget(opt.id)}
                    className={`px-4 py-3 text-left text-sm rounded-lg border transition-colors tabular-nums cursor-pointer ${
                      budget === opt.id
                        ? 'border-[#144D3A] bg-[#144D3A]/5 text-[#144D3A] font-medium'
                        : 'border-[#E5DFD3] text-[#4A463E] hover:border-[#C9BFA9]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1A1917]">
                03. What is your current passport readiness?
              </p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPassport('ready')}
                  className={`px-4 py-3 text-left text-sm rounded-lg border transition-colors cursor-pointer ${
                    passport === 'ready'
                      ? 'border-[#144D3A] bg-[#144D3A]/5 text-[#144D3A] font-medium'
                      : 'border-[#E5DFD3] text-[#4A463E] hover:border-[#C9BFA9]'
                  }`}
                >
                  Valid passport (6+ months)
                </button>
                <button
                  type="button"
                  onClick={() => setPassport('renewing')}
                  className={`px-4 py-3 text-left text-sm rounded-lg border transition-colors cursor-pointer ${
                    passport === 'renewing'
                      ? 'border-[#144D3A] bg-[#144D3A]/5 text-[#144D3A] font-medium'
                      : 'border-[#E5DFD3] text-[#4A463E] hover:border-[#C9BFA9]'
                  }`}
                >
                  Applying or renewing now
                </button>
              </div>
            </div>
          </div>

          {/* Live Recommendation Card */}
          <div className="lg:col-span-5 bg-white border border-[#E5DFD3] rounded-xl p-6 sm:p-8">
            <p className="text-xs font-medium tracking-widest uppercase text-[#144D3A]">
              Assessment Result
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1A1917]">
              {result.title}
            </h3>
            <p className="mt-3 text-sm text-[#4A463E] leading-relaxed">
              {result.explanation}
            </p>

            {passport === 'renewing' && (
              <p className="mt-4 p-3.5 text-xs text-[#4A463E] bg-[#FAF8F4] border border-[#E5DFD3] rounded-lg leading-relaxed">
                You may submit your seat application immediately for a
                conditional 30-day hold while your passport renewal completes.
              </p>
            )}

            <div className="mt-6 pt-5 border-t border-[#E5DFD3]">
              <p className="text-xs font-semibold text-[#1A1917]">
                Required Documentation
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#4A463E]">
                {result.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <span className="text-[#144D3A] font-medium" aria-hidden="true">
                      —
                    </span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectRecommendedTier(result.tierId)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#144D3A] rounded-lg hover:bg-[#0F3B2C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Apply with Recommended Tier</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Comparison Table with Tabular Numerals */}
        <div className="mt-12 bg-white border border-[#E5DFD3] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5DFD3] bg-[#FAF8F4]">
            <h3 className="font-serif text-xl font-semibold text-[#1A1917]">
              Side-by-Side Pathway Comparison
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E5DFD3] text-xs text-[#6B665D]">
                  <th className="py-3.5 px-6 font-medium">Pathway</th>
                  <th className="py-3.5 px-6 font-medium">Contribution</th>
                  <th className="py-3.5 px-6 font-medium">Haram Distance</th>
                  <th className="py-3.5 px-6 font-medium">Scholar Ratio</th>
                  <th className="py-3.5 px-6 font-medium text-right">
                    2026 Quota
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {TIER_PROGRAMS.map((tier) => (
                  <tr
                    key={tier.id}
                    className="hover:bg-[#FAF8F4] transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-[#1A1917]">
                      {tier.indexLabel}. {tier.name}
                    </td>
                    <td className="py-4 px-6 font-mono text-[#144D3A] font-medium tabular-nums">
                      {tier.contributionAmount === 0
                        ? 'Free (0)'
                        : formatCurrencyValue(tier.contributionAmount, currency)}
                    </td>
                    <td className="py-4 px-6 text-[#4A463E]">
                      {tier.makkahHotelDistance}
                    </td>
                    <td className="py-4 px-6 text-[#4A463E] tabular-nums">
                      {tier.groupRatio}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-[#1A1917] tabular-nums">
                      {tier.remainingSeats2026} / {tier.quotaSeats2026}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
