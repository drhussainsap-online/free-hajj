import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onApplyClick: () => void;
}

export function Header({ onApplyClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Programs', href: '#programs' },
    { label: 'Breakdown', href: '#breakdown' },
    { label: 'Eligibility', href: '#eligibility' },
    { label: 'Apply', href: '#apply' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E5DFD3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1917] whitespace-nowrap shrink-0"
        >
          Al-Mawaddah Waqf
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A463E]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#144D3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onApplyClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#144D3A] rounded-lg hover:bg-[#0F3B2C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Apply for Seat
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E5DFD3] text-[#1A1917] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5DFD3] bg-[#FAF8F4] px-4 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[#1A1917] rounded-lg hover:bg-[#EFEAE0] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onApplyClick();
              }}
              className="mt-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-[#144D3A] rounded-lg hover:bg-[#0F3B2C] transition-colors cursor-pointer whitespace-nowrap"
            >
              Apply for Seat
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
