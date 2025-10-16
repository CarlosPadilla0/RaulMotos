
import React from 'react';

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-3.25 3.25-1.5-1.5a.75.75 0 0 0-1.06 1.06L8.19 14.25l3.25-3.25a.75.75 0 0 0-1.06-1.06l-3.25 3.25L7.69 12.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5Z" clipRule="evenodd" />
    </svg>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

export const MotorcycleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.036 11.712a9 9 0 0 1 13.928 0M1.788 8.388a12.75 12.75 0 0 1 20.424 0M12 21.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.586 2.257-2.629 2.629a.75.75 0 0 1-1.06 0L9.268 2.257C8.618 1.607 7.72 2.062 7.72 2.93v2.04c0 .414.336.75.75.75h6.06c.414 0 .75-.336.75-.75v-2.04c0-.868-.898-1.323-1.54- .673Z" />
    </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h4.5m0 0V3.545M2.25 10.75h7.5" />
    </svg>
);

export const StoreIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.25a.75.75 0 0 1-.75-.75V5.25c0-.414.336-.75.75-.75h19.5c.414 0 .75.336.75.75v15a.75.75 0 0 1-.75.75H13.5m-4.5 0h4.5" />
    </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


export const CoppelIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#0070c0" />
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="#ffc107" />
    </svg>
);

export const CreditCardIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.375m-3.375 0h3.375m6.75 0h.008v.008h-.008v-.008Zm0 0h.008v.008h-.008v-.008Zm0 0h.008v.008h-.008v-.008Zm0 0h.008v.008h-.008v-.008ZM2.25 12V6.75A2.25 2.25 0 0 1 4.5 4.5h15A2.25 2.25 0 0 1 21.75 6.75v5.25M2.25 12h19.5m-19.5 0V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-6Z" />
    </svg>
);

export const CashIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 0h.008v.008H15v-.008Z" />
    </svg>
);

export const PayPalIcon: React.FC<{ className?: string }> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="#003087"
      d="M7.48 21H4.44a.5.5 0 01-.49-.58l2.04-13A.5.5 0 016.48 7h6.6c3.47 0 5.9 1.65 5.9 4.97 0 3.73-2.95 5.59-6.58 5.59H9.77l-.46 3.05a.5.5 0 01-.49.39z"
    />
    <path
      fill="#009CDE"
      d="M15.54 9.2c.35-.1.69-.24 1-.4-.4-2.06-2.18-2.8-4.55-2.8H7.26a.5.5 0 00-.49.42l-2.03 13a.5.5 0 00.49.58h3.04a.5.5 0 00.49-.42l.59-3.9h2.42c3.17 0 5.66-1.25 6.22-4.52.4-2.2-.75-3.8-2.45-4.37z"
    />
    <path
      fill="#012169"
      d="M14.27 8.6H9.35a.5.5 0 00-.49.42l-.6 3.9-.25 1.64a.5.5 0 00.49.58h2.43c2.28 0 4.24-.93 4.76-3.55.44-2.28-.87-3.99-2.42-3.99z"
    />
  </svg>
);

export const CoppelLogo: React.FC<{ className?: string }> = ({
  className = 'w-36 h-auto',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 128"
    className={className}
  >
    
    {/* Círculos amarillos */}
    <circle cx="55" cy="68" r="16" fill="#FFCC00" />
    <circle cx="87" cy="68" r="8" fill="#FFCC00" />
    <circle cx="107" cy="68" r="6" fill="#FFCC00" />

    {/* Texto "Coppel" */}
    <text
      x="140"
      y="80"
      fill="Blue"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="48"
      fontWeight="bold"
    >
      Coppel
    </text>
  </svg>
);
export const HomeIcon2: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12L12 3l9.75 9M4.5 10.5v9a1.5 1.5 0 001.5 1.5H9.75v-4.5h4.5V21h3.75a1.5 1.5 0 001.5-1.5v-9"
    />
  </svg>
);
