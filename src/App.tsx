import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { InstallmentMode, TierExplorer } from './components/TierExplorer';
import { EligibilityChecker } from './components/EligibilityChecker';
import { ApplicationPortal } from './components/ApplicationPortal';
import {
  CurrencyCode,
  GALLERY_ITEMS,
  PROGRAM_METRICS,
  PilgrimageType,
  TIER_PROGRAMS,
  TierId,
  formatCurrencyValue,
} from './data/pilgrimageData';

export default function App() {
  const [selectedTierId, setSelectedTierId] = useState<TierId>('tier_1000');
  const [pilgrimageType, setPilgrimageType] = useState<PilgrimageType>('hajj');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [installmentMode, setInstallmentMode] =
    useState<InstallmentMode>('full');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTierFromStrip = (tierId: TierId) => {
    setSelectedTierId(tierId);
    scrollToSection('programs');
  };

  const handleProceedToApply = (tierId: TierId) => {
    setSelectedTierId(tierId);
    scrollToSection('apply');
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1A1917]">
      <Header onApplyClick={() => scrollToSection('apply')} />

      <main className="flex-1">
        {/* Section 1: Hero 2-Column Split + Full-Width 4-Tier Strip */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Narrative Column */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs font-medium text-[#6B665D]">
                  <span>2026–2027 Allocation</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>Waqf Endowment &amp; Subsidized Pilgrimage</span>
                </p>

                <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] font-semibold tracking-tight text-[#1A1917] text-balance">
                  Perform Hajj &amp; Umrah Free or from 1,000, 5,000, or 10,000
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#4A463E] leading-relaxed max-w-xl">
                  Al-Mawaddah Waqf pairs 100% donor-endowed Free Hajj &amp;
                  Umrah scholarships with fixed subsidized tiers at 1,000,
                  5,000, and 10,000—making the sacred journey accessible without
                  debt or interest.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('apply')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#144D3A] rounded-lg hover:bg-[#0F3B2C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Apply for Pilgrimage Seat</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#programs"
                    className="px-4 py-3 text-sm font-medium text-[#1A1917] hover:text-[#144D3A] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                  >
                    Compare All 4 Pathways
                  </a>
                </div>

                <p className="mt-6 text-xs text-[#6B665D]">
                  Shariah-compliant Qard Hasan &amp; Waqf reserve · Licensed
                  Nusuk &amp; Mutawwif coordination
                </p>
              </div>

              {/* Right Visual Column */}
              <div className="lg:col-span-6">
                <figure className="h-full flex flex-col">
                  <div className="flex-1 min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-[#E5DFD3] bg-[#EFEAE0]">
                    <ResilientImage
                      src="/src/assets/images/hero_masjid_haram_1795513569792.jpg"
                      alt="Masjid al-Haram courtyard and the Kaaba in Makkah during peaceful golden hour dawn"
                      fallbackTitle="Masjid al-Haram, Makkah"
                      className="w-full h-full lg:h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-xs font-serif italic text-[#6B665D]">
                    Masjid al-Haram courtyard at Fajr · All pathways include
                    verified Nusuk permits and guided scholar support
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Full-Width 4-Column Tier Summary Strip below Hero Split */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {TIER_PROGRAMS.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleSelectTierFromStrip(tier.id)}
                    className={`text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#144D3A]'
                        : 'bg-white border-[#E5DFD3] hover:border-[#C9BFA9]'
                    }`}
                  >
                    <p className="text-xs text-[#6B665D]">
                      {tier.indexLabel}. {tier.shortTitle}
                    </p>
                    <p className="mt-1.5 font-mono text-2xl sm:text-3xl font-medium text-[#1A1917] tabular-nums">
                      {tier.contributionAmount === 0
                        ? 'Free (0)'
                        : formatCurrencyValue(tier.contributionAmount, currency)}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#144D3A]">
                      {tier.allocationShare}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Tier Explorer & Cost Breakdown */}
        <TierExplorer
          selectedTierId={selectedTierId}
          onSelectTier={setSelectedTierId}
          pilgrimageType={pilgrimageType}
          onChangePilgrimageType={setPilgrimageType}
          currency={currency}
          onChangeCurrency={setCurrency}
          installmentMode={installmentMode}
          onChangeInstallmentMode={setInstallmentMode}
          onProceedToApply={handleProceedToApply}
        />

        {/* Section 3: Hospitality Standards & Proof of Impact (Adjacent Claim-to-Proof) */}
        <section className="py-16 sm:py-20 border-t border-[#E5DFD3] bg-[#FFFFFF]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#E5DFD3]">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium tracking-widest uppercase text-[#6B665D]">
                  Verified Operations &amp; Sanctuaries
                </p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1A1917] tracking-tight text-balance">
                  Dignified Accommodation Across Every Tier
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-[#4A463E] leading-relaxed">
                  Whether attending through a Free Waqf Scholarship or the
                  1,000, 5,000, or 10,000 plans, every pilgrim receives clean
                  lodging, licensed scholar guidance, and full medical support.
                </p>
              </div>
            </div>

            {/* Proof Metrics Row */}
            <div className="grid sm:grid-cols-3 gap-6 py-8 border-b border-[#E5DFD3]">
              {PROGRAM_METRICS.map((metric) => (
                <div key={metric.label}>
                  <p className="font-mono text-3xl font-medium text-[#144D3A] tabular-nums">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1A1917]">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6B665D]">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>

            {/* Editorial 3-Image Grid */}
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item) => (
                <figure key={item.title} className="flex flex-col">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E5DFD3] bg-[#EFEAE0]">
                    <ResilientImage
                      src={item.imagePath}
                      alt={item.alt}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <p className="text-xs font-serif italic text-[#6B665D]">
                      {item.caption}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-[#1A1917]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#4A463E] leading-relaxed">
                      {item.detailLine}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Eligibility Checker & Comparison Table */}
        <EligibilityChecker
          currency={currency}
          onSelectRecommendedTier={handleProceedToApply}
        />

        {/* Section 5: Application & Sponsorship Portal */}
        <ApplicationPortal
          selectedTierId={selectedTierId}
          onChangeTier={setSelectedTierId}
          pilgrimageType={pilgrimageType}
          onChangePilgrimageType={setPilgrimageType}
          currency={currency}
          installmentMode={installmentMode}
        />
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-[#E5DFD3] bg-[#FAF8F4] py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-semibold text-[#1A1917]">
              Al-Mawaddah Waqf
            </p>
            <p className="mt-1 text-xs text-[#6B665D]">
              Non-profit Hajj &amp; Umrah Endowment Portal · Shariah-audited
              zero-interest access
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#4A463E]"
          >
            <a href="#programs" className="hover:text-[#144D3A]">
              Programs
            </a>
            <a href="#breakdown" className="hover:text-[#144D3A]">
              Breakdown
            </a>
            <a href="#eligibility" className="hover:text-[#144D3A]">
              Eligibility
            </a>
            <a href="#apply" className="hover:text-[#144D3A]">
              Apply
            </a>
          </nav>

          <p className="text-xs text-[#6B665D]">
            © 2026 Al-Mawaddah Waqf Trust
          </p>
        </div>
      </footer>
    </div>
  );
}
