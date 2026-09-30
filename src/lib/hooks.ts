import { useEffect, useRef, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Adds `is-in` once the element scrolls into view. One-shot. */
export function useInView<T extends Element>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.12 } = options

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, rootMargin, threshold])

  return [ref, inView] as const
}

export function useScrolledPast(px: number): boolean {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > px)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [px])
  return past
}

/** Locks page scroll while an overlay is open. */
export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [locked])
}

/** Closes an overlay on Escape and returns focus to whatever opened it. */
export function useDialog(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    requestAnimationFrame(() => {
      const target = panelRef.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panelRef.current
      target?.focus({ preventScroll: true })
    })
    return () => {
      document.removeEventListener('keydown', onKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])
  useBodyLock(open)
  return panelRef
}
