import { Check, ArrowRight } from 'lucide-react';
import {
  CURRENCIES,
  CurrencyCode,
  PilgrimageType,
  TIER_PROGRAMS,
  TierId,
  formatCurrencyValue,
  getDisplayPackageMetrics,
} from '../data/pilgrimageData';

export type InstallmentMode = 'full' | 'six_months' | 'twelve_months';

interface TierExplorerProps {
  selectedTierId: TierId;
  onSelectTier: (tierId: TierId) => void;
  pilgrimageType: PilgrimageType;
  onChangePilgrimageType: (type: PilgrimageType) => void;
  currency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
  installmentMode: InstallmentMode;
  onChangeInstallmentMode: (mode: InstallmentMode) => void;
  onProceedToApply: (tierId: TierId) => void;
}

export function TierExplorer({
  selectedTierId,
  onSelectTier,
  pilgrimageType,
  onChangePilgrimageType,
  currency,
  onChangeCurrency,
  installmentMode,
  onChangeInstallmentMode,
  onProceedToApply,
}: TierExplorerProps) {
  const activeTier =
    TIER_PROGRAMS.find((t) => t.id === selectedTierId) ?? TIER_PROGRAMS[0];
  const metrics = getDisplayPackageMetrics(activeTier, pilgrimageType, currency);
  const inclusions =
    pilgrimageType === 'hajj'
      ? activeTier.inclusionsHajj
      : activeTier.inclusionsUmrah;
  const durationDays =
    pilgrimageType === 'hajj'
      ? activeTier.hajjDurationDays
      : activeTier.umrahDurationDays;

  const divisor =
    installmentMode === 'six_months'
      ? 6
      : installmentMode === 'twelve_months'
        ? 12
        : 1;
  const perInstallment =
    activeTier.contributionAmount === 0
      ? 0
      : Math.ceil(activeTier.contributionAmount / divisor);

  const contributionRatioPercent =
    metrics.basePackageValue > 0
      ? Math.min(
          100,
          Math.round((metrics.pilgrimPays / metrics.basePackageValue) * 100)
        )
      : 0;

  return (
    <section
      id="programs"
      className="py-16 sm:py-20 border-t border-[#E5DFD3] bg-[#FAF8F4]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section header + controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD3]">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-[#6B665D]">
              Four Pathways · 2026–2027 Allocation
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1A1917] tracking-tight text-balance">
              Transparent Hajj &amp; Umrah Pathways
            </h2>
            <p className="mt-3 text-base text-[#4A463E] leading-relaxed">
              Select the Free Waqf Scholarship or a fixed contribution tier of
              1,000, 5,000, or 10,000. Endowment matching bridges the real cost
              of airfare, Nusuk permits, and Haramain lodging with zero interest.
            </p>
          </div>

          {/* Functional Segmented Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Hajj / Umrah toggle */}
            <div
              role="group"
              aria-label="Pilgrimage type"
              className="inline-flex items-center p-1 bg-[#EFEAE0] rounded-lg border border-[#E5DFD3]"
            >
              <button
                type="button"
                onClick={() => onChangePilgrimageType('hajj')}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  pilgrimageType === 'hajj'
                    ? 'bg-white text-[#1A1917] shadow-xs'
                    : 'text-[#5A554C] hover:text-[#1A1917]'
                }`}
              >
                Hajj ({activeTier.hajjDurationDays} Days)
              </button>
              <button
                type="button"
                onClick={() => onChangePilgrimageType('umrah')}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  pilgrimageType === 'umrah'
                    ? 'bg-white text-[#1A1917] shadow-xs'
                    : 'text-[#5A554C] hover:text-[#1A1917]'
                }`}
              >
                Umrah ({activeTier.umrahDurationDays} Days)
              </button>
            </div>

            {/* Currency selector */}
            <label className="sr-only" htmlFor="currency-select">
              Select contribution currency
            </label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => onChangeCurrency(e.target.value as CurrencyCode)}
              className="px-3.5 py-2.5 text-xs font-medium bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] cursor-pointer hover:border-[#C9BFA9] transition-colors"
            >
              {Object.values(CURRENCIES).map((cfg) => (
                <option key={cfg.code} value={cfg.code}>
                  {cfg.code} ({cfg.symbol.trim()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tier Selector Tabs */}
        <div
          role="tablist"
          aria-label="Pilgrimage contribution tiers"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8"
        >
          {TIER_PROGRAMS.map((tier) => {
            const isActive = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onSelectTier(tier.id)}
                className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#144D3A] shadow-sm'
                    : 'bg-[#F5F1E9] border-[#E5DFD3] hover:bg-white hover:border-[#C9BFA9]'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-medium text-[#6B665D] tabular-nums">
                    {tier.indexLabel}. {tier.shortTitle}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      isActive ? 'text-[#144D3A]' : 'text-[#6B665D]'
                    }`}
                  >
                    {tier.remainingSeats2026} seats left
                  </span>
                </div>
                <div className="mt-2 font-mono text-2xl font-medium text-[#1A1917] tabular-nums">
                  {tier.contributionAmount === 0
                    ? 'Free (0)'
                    : formatCurrencyValue(tier.contributionAmount, currency)}
                </div>
                <p className="mt-1.5 text-xs text-[#5A554C] truncate">
                  {tier.allocationShare}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Tier Detailed Breakdown Panel */}
        <div
          id="breakdown"
          className="mt-6 bg-white border border-[#E5DFD3] rounded-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-12">
            {/* Left 7 columns: Narrative + Inclusions */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:border-r border-b lg:border-b-0 border-[#E5DFD3]">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B665D]">
                <span>{activeTier.indexLabel}. Pathway Specification</span>
                <span aria-hidden="true">·</span>
                <span className="uppercase font-medium text-[#144D3A]">
                  {pilgrimageType}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{durationDays} Days</span>
                <span aria-hidden="true">·</span>
                <span>{activeTier.groupRatio}</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#1A1917]">
                {activeTier.name}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4A463E] leading-relaxed max-w-2xl">
                {activeTier.summary}
              </p>

              {/* Key accommodation & proximity facts */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6 py-5 border-y border-[#E5DFD3]">
                <div>
                  <p className="text-xs text-[#6B665D]">Makkah Hospitality</p>
                  <p className="mt-1 text-sm font-medium text-[#1A1917]">
                    {activeTier.makkahHotelDistance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B665D]">Madinah Hospitality</p>
                  <p className="mt-1 text-sm font-medium text-[#1A1917]">
                    {activeTier.madinahHotelDistance}
                  </p>
                </div>
              </div>

              {/* Inclusions list */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-[#1A1917]">
                  Included in this {pilgrimageType === 'hajj' ? 'Hajj' : 'Umrah'} Allocation
                </h4>
                <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#3F3B34]"
                    >
                      <Check
                        className="w-4 h-4 text-[#144D3A] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 5 columns: Financial & Endowment Match Breakdown */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FAF8F4] flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-[#6B665D]">
                  Cost &amp; Endowment Match
                </p>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-sm text-[#4A463E]">Your Contribution</span>
                  <span className="font-mono text-3xl font-medium text-[#1A1917] tabular-nums">
                    {activeTier.contributionAmount === 0
                      ? formatCurrencyValue(0, currency)
                      : formatCurrencyValue(activeTier.contributionAmount, currency)}
                  </span>
                </div>

                {/* Installment schedule selector for paid tiers */}
                {activeTier.contributionAmount > 0 && (
                  <div className="mt-5">
                    <p className="text-xs text-[#6B665D] mb-2">
                      Interest-Free Payment Schedule
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#EFEAE0] rounded-lg border border-[#E5DFD3]">
                      <button
                        type="button"
                        onClick={() => onChangeInstallmentMode('full')}
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          installmentMode === 'full'
                            ? 'bg-white text-[#1A1917] shadow-xs'
                            : 'text-[#5A554C] hover:text-[#1A1917]'
                        }`}
                      >
                        Single Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeInstallmentMode('six_months')}
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          installmentMode === 'six_months'
                            ? 'bg-white text-[#1A1917] shadow-xs'
                            : 'text-[#5A554C] hover:text-[#1A1917]'
                        }`}
                      >
                        6 Months
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeInstallmentMode('twelve_months')}
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          installmentMode === 'twelve_months'
                            ? 'bg-white text-[#1A1917] shadow-xs'
                            : 'text-[#5A554C] hover:text-[#1A1917]'
                        }`}
                      >
                        12 Months
                      </button>
                    </div>
                    {installmentMode !== 'full' && (
                      <p className="mt-2.5 text-xs text-[#144D3A] font-medium tabular-nums">
                        {formatCurrencyValue(perInstallment, currency)} / month for{' '}
                        {divisor} months (0% markup)
                      </p>
                    )}
                  </div>
                )}

                {/* Visual funding bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-[#5A554C] mb-1.5 tabular-nums">
                    <span>Pilgrim ({contributionRatioPercent}%)</span>
                    <span>
                      Waqf Match ({100 - contributionRatioPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E5DFD3] rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#144D3A] h-full transition-all duration-300"
                      style={{ width: `${contributionRatioPercent}%` }}
                    />
                  </div>
                </div>

                {/* Line-item ledger */}
                <dl className="mt-6 space-y-3 text-sm border-t border-[#E5DFD3] pt-5">
                  <div className="flex items-center justify-between">
                    <dt className="text-[#5A554C]">Full Pilgrimage Value</dt>
                    <dd className="font-mono text-[#1A1917] tabular-nums">
                      {formatCurrencyValue(metrics.basePackageValue, currency)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[#5A554C]">Waqf Endowment Coverage</dt>
                    <dd className="font-mono text-[#144D3A] font-medium tabular-nums">
                      {metrics.waqfSubsidy > 0
                        ? `-${formatCurrencyValue(metrics.waqfSubsidy, currency)}`
                        : formatCurrencyValue(0, currency)}
                    </dd>
                  </div>
                  {metrics.sponsorSurplus > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-[#5A554C]">Free Seat Patronage Fund</dt>
                      <dd className="font-mono text-[#8A6528] font-medium tabular-nums">
                        +{formatCurrencyValue(metrics.sponsorSurplus, currency)}
                      </dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5DFD3] font-semibold">
                    <dt className="text-[#1A1917]">Net Pilgrim Contribution</dt>
                    <dd className="font-mono text-base text-[#1A1917] tabular-nums">
                      {formatCurrencyValue(metrics.pilgrimPays, currency)}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-xs text-[#6B665D] leading-relaxed">
                  {activeTier.costBreakdownNote}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E5DFD3]">
                <button
                  type="button"
                  onClick={() => onProceedToApply(activeTier.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#144D3A] rounded-lg hover:bg-[#0F3B2C] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Select {activeTier.shortTitle} &amp; Apply</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <p className="mt-2.5 text-center text-xs text-[#6B665D] tabular-nums">
                  {activeTier.remainingSeats2026} of {activeTier.quotaSeats2026} quota seats
                  remaining for 2026–2027
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
