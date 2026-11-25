import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import {
  CurrencyCode,
  PilgrimageType,
  TIER_PROGRAMS,
  TierId,
  formatCurrencyValue,
} from '../data/pilgrimageData';
import { InstallmentMode } from './TierExplorer';

export interface SubmittedRecord {
  referenceId: string;
  mode: 'pilgrim' | 'sponsor';
  fullName: string;
  email: string;
  phone: string;
  departureCity: string;
  tierId: TierId;
  pilgrimageType: PilgrimageType;
  currency: CurrencyCode;
  installmentMode: InstallmentMode;
  passportStatus: string;
  notes: string;
  submittedAt: string;
}

const STORAGE_KEY = 'al_mawaddah_submissions_v1';

interface ApplicationPortalProps {
  selectedTierId: TierId;
  onChangeTier: (tierId: TierId) => void;
  pilgrimageType: PilgrimageType;
  onChangePilgrimageType: (type: PilgrimageType) => void;
  currency: CurrencyCode;
  installmentMode: InstallmentMode;
}

export function ApplicationPortal({
  selectedTierId,
  onChangeTier,
  pilgrimageType,
  onChangePilgrimageType,
  currency,
  installmentMode,
}: ApplicationPortalProps) {
  const [portalMode, setPortalMode] = useState<'pilgrim' | 'sponsor'>('pilgrim');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [passportStatus, setPassportStatus] = useState('Valid (6+ months)');
  const [localInstallment, setLocalInstallment] =
    useState<InstallmentMode>(installmentMode);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [latestConfirmation, setLatestConfirmation] =
    useState<SubmittedRecord | null>(null);
  const [records, setRecords] = useState<SubmittedRecord[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SubmittedRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setLocalInstallment(installmentMode);
  }, [installmentMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Ignore storage quota errors
    }
  }, [records]);

  const selectedTier =
    TIER_PROGRAMS.find((t) => t.id === selectedTierId) ?? TIER_PROGRAMS[0];

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full legal name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (phone.trim().length < 7) {
      nextErrors.phone = 'Please provide a reachable phone or WhatsApp number.';
    }
    if (portalMode === 'pilgrim' && departureCity.trim().length < 2) {
      nextErrors.departureCity = 'Please enter your departure city and country.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRecord: SubmittedRecord = {
      referenceId: `MWQ-2026-${randomNum}`,
      mode: portalMode,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      departureCity:
        portalMode === 'pilgrim'
          ? departureCity.trim()
          : 'Waqf Endowment Donor',
      tierId: selectedTierId,
      pilgrimageType,
      currency,
      installmentMode:
        selectedTier.contributionAmount === 0 ? 'full' : localInstallment,
      passportStatus,
      notes: notes.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setRecords((prev) => [newRecord, ...prev]);
    setLatestConfirmation(newRecord);
    setFullName('');
    setEmail('');
    setPhone('');
    setDepartureCity('');
    setNotes('');
    setErrors({});
  };

  const handleRemoveRecord = (referenceId: string) => {
    setRecords((prev) => prev.filter((r) => r.referenceId !== referenceId));
    if (latestConfirmation?.referenceId === referenceId) {
      setLatestConfirmation(null);
    }
  };

  return (
    <section
      id="apply"
      className="py-16 sm:py-20 border-t border-[#E5DFD3] bg-[#F5F1E9]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 columns: Form */}
          <div className="lg:col-span-7 bg-white border border-[#E5DFD3] rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD3]">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-[#6B665D]">
                  Seat Registration &amp; Endowment Pledge
                </p>
                <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1A1917]">
                  {portalMode === 'pilgrim'
                    ? 'Apply for Your Pilgrimage Seat'
                    : 'Sponsor a Pilgrim Seat'}
                </h2>
              </div>

              {/* Pilgrim / Sponsor Mode Switch */}
              <div
                role="group"
                aria-label="Application mode"
                className="inline-flex p-1 bg-[#EFEAE0] rounded-lg border border-[#E5DFD3] self-start"
              >
                <button
                  type="button"
                  onClick={() => setPortalMode('pilgrim')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    portalMode === 'pilgrim'
                      ? 'bg-white text-[#1A1917] shadow-xs'
                      : 'text-[#5A554C] hover:text-[#1A1917]'
                  }`}
                >
                  Apply as Pilgrim
                </button>
                <button
                  type="button"
                  onClick={() => setPortalMode('sponsor')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    portalMode === 'sponsor'
                      ? 'bg-white text-[#1A1917] shadow-xs'
                      : 'text-[#5A554C] hover:text-[#1A1917]'
                  }`}
                >
                  Sponsor a Seat
                </button>
              </div>
            </div>

            {latestConfirmation && (
              <div
                role="status"
                className="mt-6 p-5 bg-[#144D3A]/5 border border-[#144D3A]/30 rounded-xl flex items-start gap-3"
              >
                <CheckCircle2
                  className="w-5 h-5 text-[#144D3A] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-sm">
                  <p className="font-semibold text-[#1A1917]">
                    Submission Confirmed · Reference{' '}
                    <span className="font-mono text-[#144D3A]">
                      {latestConfirmation.referenceId}
                    </span>
                  </p>
                  <p className="mt-1 text-[#4A463E]">
                    Recorded for {latestConfirmation.fullName} under the{' '}
                    {
                      TIER_PROGRAMS.find(
                        (t) => t.id === latestConfirmation.tierId
                      )?.name
                    }
                    . A regional Mutawwif coordinator will contact you within 14
                    days for document verification.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* Tier & Pilgrimage Type selectors */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apply-tier"
                    className="block text-xs font-medium text-[#4A463E] mb-1.5"
                  >
                    Selected Pathway
                  </label>
                  <select
                    id="apply-tier"
                    value={selectedTierId}
                    onChange={(e) => onChangeTier(e.target.value as TierId)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E5DFD3] rounded-lg text-[#1A1917]"
                  >
                    {TIER_PROGRAMS.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.name} (
                        {tier.contributionAmount === 0
                          ? 'Free'
                          : formatCurrencyValue(
                              tier.contributionAmount,
                              currency
                            )}
                        )
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="apply-type"
                    className="block text-xs font-medium text-[#4A463E] mb-1.5"
                  >
                    Pilgrimage Cycle
                  </label>
                  <select
                    id="apply-type"
                    value={pilgrimageType}
                    onChange={(e) =>
                      onChangePilgrimageType(e.target.value as PilgrimageType)
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E5DFD3] rounded-lg text-[#1A1917]"
                  >
                    <option value="hajj">Hajj 2026–2027 Allocation</option>
                    <option value="umrah">Umrah Seasonal Departures</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apply-name"
                    className="block text-xs font-medium text-[#4A463E] mb-1.5"
                  >
                    Full Legal Name
                  </label>
                  <input
                    id="apply-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="As printed on passport"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] placeholder:text-[#8C867B]"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#9A3412]">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apply-email"
                    className="block text-xs font-medium text-[#4A463E] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] placeholder:text-[#8C867B]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#9A3412]">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apply-phone"
                    className="block text-xs font-medium text-[#4A463E] mb-1.5"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 014 8820"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] placeholder:text-[#8C867B]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#9A3412]">{errors.phone}</p>
                  )}
                </div>

                {portalMode === 'pilgrim' ? (
                  <div>
                    <label
                      htmlFor="apply-city"
                      className="block text-xs font-medium text-[#4A463E] mb-1.5"
                    >
                      Departure City &amp; Country
                    </label>
                    <input
                      id="apply-city"
                      type="text"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder="e.g., London, UK or Kuala Lumpur"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] placeholder:text-[#8C867B]"
                    />
                    {errors.departureCity && (
                      <p className="mt-1 text-xs text-[#9A3412]">
                        {errors.departureCity}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="sponsor-dedication"
                      className="block text-xs font-medium text-[#4A463E] mb-1.5"
                    >
                      Sponsorship Allocation
                    </label>
                    <input
                      id="sponsor-dedication"
                      type="text"
                      value={
                        selectedTier.contributionAmount === 0
                          ? 'Full Waqf Endowment Pool'
                          : `Sponsor ${formatCurrencyValue(
                              selectedTier.contributionAmount,
                              currency
                            )} Seat Fund`
                      }
                      readOnly
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#E5DFD3] rounded-lg text-[#4A463E]"
                    />
                  </div>
                )}
              </div>

              {portalMode === 'pilgrim' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="apply-passport"
                      className="block text-xs font-medium text-[#4A463E] mb-1.5"
                    >
                      Passport Readiness
                    </label>
                    <select
                      id="apply-passport"
                      value={passportStatus}
                      onChange={(e) => setPassportStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917]"
                    >
                      <option value="Valid (6+ months)">
                        Valid Passport (6+ months)
                      </option>
                      <option value="Renewal in progress">
                        Renewal in progress
                      </option>
                      <option value="First passport application">
                        Applying for first passport
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="apply-installment"
                      className="block text-xs font-medium text-[#4A463E] mb-1.5"
                    >
                      Contribution Schedule
                    </label>
                    <select
                      id="apply-installment"
                      disabled={selectedTier.contributionAmount === 0}
                      value={
                        selectedTier.contributionAmount === 0
                          ? 'full'
                          : localInstallment
                      }
                      onChange={(e) =>
                        setLocalInstallment(e.target.value as InstallmentMode)
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] disabled:bg-[#FAF8F4] disabled:text-[#6B665D]"
                    >
                      {selectedTier.contributionAmount === 0 ? (
                        <option value="full">100% Waqf Funded (0 Due)</option>
                      ) : (
                        <>
                          <option value="full">
                            Single Contribution (
                            {formatCurrencyValue(
                              selectedTier.contributionAmount,
                              currency
                            )}
                            )
                          </option>
                          <option value="six_months">
                            6 Monthly Installments (0% markup)
                          </option>
                          <option value="twelve_months">
                            12 Monthly Installments (0% markup)
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="apply-notes"
                  className="block text-xs font-medium text-[#4A463E] mb-1.5"
                >
                  {portalMode === 'pilgrim'
                    ? 'Elder Mobility, Family Grouping, or Masjid Endorsement Notes (Optional)'
                    : 'Dedication Name or Regional Priority Request (Optional)'}
                </label>
                <textarea
                  id="apply-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    portalMode === 'pilgrim'
                      ? 'Share wheelchair needs, mahram pairing, or local mosque reference...'
                      : 'Optional dedication in memory of a parent or priority region...'
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] rounded-lg text-[#1A1917] placeholder:text-[#8C867B]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#6B665D]">
                  No payment is charged online today. Seats are locked only
                  after document verification.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-[#144D3A] rounded-lg hover:bg-[#0F3B2C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {portalMode === 'pilgrim'
                    ? 'Submit Seat Application'
                    : 'Register Waqf Pledge'}
                </button>
              </div>
            </form>
          </div>

          {/* Right 5 columns: Saved Applications & Active Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5DFD3] rounded-xl p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-[#6B665D]">
                Selected Allocation Summary
              </p>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl font-semibold text-[#1A1917]">
                  {selectedTier.name}
                </h3>
                <span className="font-mono text-xl font-medium text-[#144D3A] tabular-nums shrink-0">
                  {selectedTier.contributionAmount === 0
                    ? 'Free'
                    : formatCurrencyValue(
                        selectedTier.contributionAmount,
                        currency
                      )}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#4A463E] leading-relaxed">
                {selectedTier.eligibilitySummary}
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5DFD3] grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B665D]">Cycle</span>
                  <p className="mt-0.5 font-medium text-[#1A1917] uppercase">
                    {pilgrimageType}
                  </p>
                </div>
                <div>
                  <span className="text-[#6B665D]">Remaining Quota</span>
                  <p className="mt-0.5 font-mono font-medium text-[#1A1917] tabular-nums">
                    {selectedTier.remainingSeats2026} seats
                  </p>
                </div>
              </div>
            </div>

            {/* Saved Applications Ledger */}
            <div className="bg-white border border-[#E5DFD3] rounded-xl p-6">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E5DFD3]">
                <h3 className="font-serif text-xl font-semibold text-[#1A1917]">
                  Submitted Applications &amp; Pledges
                </h3>
                <span className="font-mono text-xs text-[#6B665D] tabular-nums">
                  {records.length} saved
                </span>
              </div>

              {records.length === 0 ? (
                <p className="mt-4 text-sm text-[#6B665D] leading-relaxed">
                  Applications and Waqf pledges you submit appear here with
                  their verification reference code.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-[#E5DFD3]">
                  {records.map((rec) => {
                    const tierInfo = TIER_PROGRAMS.find(
                      (t) => t.id === rec.tierId
                    );
                    return (
                      <li key={rec.referenceId} className="py-3.5 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-[#6B665D]">
                              <span className="font-mono font-medium text-[#144D3A]">
                                {rec.referenceId}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {rec.mode === 'pilgrim'
                                  ? 'Pilgrim Seat'
                                  : 'Waqf Pledge'}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{rec.submittedAt}</span>
                            </div>
                            <p className="mt-1 text-sm font-semibold text-[#1A1917]">
                              {rec.fullName}
                            </p>
                            <p className="text-xs text-[#4A463E] mt-0.5">
                              {tierInfo?.shortTitle} ·{' '}
                              <span className="uppercase">
                                {rec.pilgrimageType}
                              </span>{' '}
                              · {rec.departureCity}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveRecord(rec.referenceId)}
                            aria-label={`Withdraw submission ${rec.referenceId}`}
                            className="p-2 text-[#6B665D] hover:text-[#9A3412] rounded-lg hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
