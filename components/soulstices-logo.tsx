interface SoulsticesLogoProps {
  className?: string
  size?: number
}

export function SoulsticesLogo({ className = "", size = 32 }: SoulsticesLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle representing the cycle */}
      <circle cx="16" cy="16" r="15" fill="url(#darkGradient)" stroke="url(#borderGradient)" strokeWidth="1" />

      {/* Horizon line - representing the solstice moment */}
      <line x1="4" y1="16" x2="28" y2="16" stroke="url(#horizonGradient)" strokeWidth="1.5" />

      {/* Sun (upper half) */}
      <circle cx="12" cy="10" r="4" fill="url(#sunGradient)" />
      <g stroke="url(#sunRays)" strokeWidth="1" strokeLinecap="round">
        <line x1="12" y1="4" x2="12" y2="5.5" />
        <line x1="16.83" y1="5.17" x2="15.77" y2="6.23" />
        <line x1="17.66" y1="10" x2="16.16" y2="10" />
        <line x1="16.83" y1="14.83" x2="15.77" y2="13.77" />
        <line x1="7.17" y1="14.83" x2="8.23" y2="13.77" />
        <line x1="6.34" y1="10" x2="7.84" y2="10" />
        <line x1="7.17" y1="5.17" x2="8.23" y2="6.23" />
      </g>

      {/* Moon (lower half) */}
      <circle cx="20" cy="22" r="3.5" fill="url(#moonGradient)" />
      {/* Moon crescent shadow */}
      <circle cx="21.5" cy="22" r="3" fill="url(#moonShadow)" />

      {/* Stars in the dark area */}
      <circle cx="8" cy="24" r="0.5" fill="url(#starGradient)" />
      <circle cx="25" cy="8" r="0.5" fill="url(#starGradient)" />
      <circle cx="6" cy="20" r="0.3" fill="url(#starGradient)" />

      <defs>
        {/* Dark background gradient */}
        <radialGradient id="darkGradient" cx="0.5" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Border gradient */}
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        {/* Horizon gradient */}
        <linearGradient id="horizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        {/* Sun gradient */}
        <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>

        {/* Sun rays gradient */}
        <linearGradient id="sunRays" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Moon gradient */}
        <radialGradient id="moonGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>

        {/* Moon shadow */}
        <radialGradient id="moonShadow" cx="0.5" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Star gradient */}
        <radialGradient id="starGradient" cx="0.5" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>
    </svg>
  )
}
