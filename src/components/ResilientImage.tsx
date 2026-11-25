import { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Sacred Sanctuary View',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFEAE0] via-[#E5DFD3] to-[#DCD4C4] text-[#4A463E] p-6 text-center ${className}`}
      >
        <Compass className="w-8 h-8 text-[#144D3A] mb-3 stroke-[1.5]" aria-hidden="true" />
        <p className="font-serif text-lg font-semibold text-[#1A1917]">{fallbackTitle}</p>
        <p className="text-xs text-[#6B665D] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
