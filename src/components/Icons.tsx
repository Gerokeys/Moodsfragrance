/* Hairline icons, used only where a word would be clumsy. */

interface IconProps {
  className?: string
}

export function HeartIcon({ filled, className }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.3s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.5-7.5 10.1-7.5 10.1Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function Star({ fill = 1 }: { fill?: number }) {
  const id = `s${Math.round(fill * 100)}`
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={fill} stopColor="currentColor" />
          <stop offset={fill} stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path d="M12 2.5l2.9 6.4 7 .7-5.2 4.7 1.5 6.9L12 17.6l-6.2 3.6 1.5-6.9L2.1 9.6l7-.7L12 2.5z" fill={`url(#${id})`} />
    </svg>
  )
}
