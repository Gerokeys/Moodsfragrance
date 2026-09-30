import { useEffect, useRef, useState } from 'react'
import { photo, photoUrl } from '../data/images'
import { usePrefersReducedMotion } from '../lib/hooks'
import './Preloader.css'

const SEEN_KEY = 'moods.intro.seen'
const MIN_MS = 1500
const MAX_MS = 4000

function seen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Wordmark + hairline progress. Waits for fonts and the hero photograph
 * (capped at MAX_MS), then lifts away. Shown once per browser session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [skip] = useState(seen)
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(skip)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (skip) {
      doneRef.current()
      return
    }
    document.body.classList.add('is-locked')
    const start = performance.now()
    let ready = false
    let raf = 0
    let shown = 0

    const heroSrc = photoUrl(photo('shadowTravertine'), window.innerWidth > 900 ? 1600 : 960)
    const img = new Image()
    const imageReady = new Promise<void>((resolve) => {
      img.onload = img.onerror = () => resolve()
      img.src = heroSrc
    })
    const timeout = new Promise<void>((r) => setTimeout(r, MAX_MS))
    Promise.race([Promise.all([document.fonts?.ready, imageReady]), timeout]).then(() => {
      ready = true
    })

    const minMs = reduced ? 300 : MIN_MS
    const tick = (now: number) => {
      const t = Math.min((now - start) / minMs, 1)
      // Ease toward 90% while waiting, then complete once everything is in
      const target = ready ? t : Math.min(t, 0.9)
      shown += (target - shown) * 0.12
      if (ready && t >= 1 && shown > 0.995) shown = 1
      setProgress(shown)
      if (shown < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        try {
          sessionStorage.setItem(SEEN_KEY, '1')
        } catch {
          /* ignore */
        }
        document.body.classList.remove('is-locked')
        doneRef.current()
        setTimeout(() => setGone(true), reduced ? 400 : 1300)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('is-locked')
    }
  }, [skip, reduced])

  if (gone) return null

  return (
    <div className={`preloader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="preloader__mark">
        <span className="preloader__word" aria-hidden="true">
          {'MOODS'.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${120 + i * 70}ms` }}>
              {ch}
            </span>
          ))}
        </span>
        <span className="preloader__sub micro" aria-hidden="true">
          Fragrances
        </span>
        <span className="sr-only">Loading MOODS Fragrances</span>
      </div>

      <div className="preloader__foot" aria-hidden="true">
        <span className="micro">Nairobi</span>
        <span className="preloader__line">
          <span style={{ transform: `scaleX(${progress})` }} />
        </span>
        <span className="micro preloader__count">{String(Math.round(progress * 100)).padStart(3, '0')}</span>
      </div>
    </div>
  )
}
