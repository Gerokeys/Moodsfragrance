import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../lib/hooks'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** `fade` rises and fades in; `mask` wipes an image open */
  variant?: 'fade' | 'mask' | 'none'
  delay?: number
  className?: string
  style?: CSSProperties
  /** Force the in-state (e.g. hero content gated by the preloader) */
  show?: boolean
  [key: string]: unknown
}

export function Reveal({ children, as: Tag = 'div', variant = 'fade', delay = 0, className = '', style, show, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  const visible = show ?? inView
  const base = variant === 'mask' ? 'reveal-mask' : variant === 'fade' ? 'reveal' : ''
  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? 'is-in' : ''} ${className}`}
      style={{ ...style, '--delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Headline revealed line by line. Pass each visual line as an array item. */
export function Lines({ lines, className = '' }: { lines: ReactNode[]; className?: string }) {
  return (
    <span className={`lines ${className}`}>
      {lines.map((line, i) => (
        <span key={i}>
          <span style={{ '--i': i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </span>
  )
}
