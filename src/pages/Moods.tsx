import { useEffect, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img } from '../components/Img'
import { ProductCard } from '../components/ProductCard'
import { Lines, Reveal } from '../components/Reveal'
import { getMood, moods } from '../data/moods'
import { products } from '../data/products'
import { pad } from '../lib/format'
import { useIntro } from '../store/intro'
import NotFound from './NotFound'
import './pages.css'

/** Dark mood grounds need a light header until the page scrolls. */
function useHeaderTone(light: boolean) {
  useEffect(() => {
    const root = document.documentElement
    if (light) root.dataset.header = 'light'
    return () => {
      delete root.dataset.header
    }
  }, [light])
}

function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16)
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)
  return lum < 110
}

/* /moods — an alternating editorial index of the six moods */
export function MoodsIndex() {
  return (
    <div className="page moods-index">
      <header className="page-head wrap">
        <p className="micro muted">Shop by mood</p>
        <h1 className="display page-head__title">
          How do you want <em>to feel?</em>
        </h1>
        <p className="page-head__lede lede">Six moods, each with its own colour, material and memory. Begin with a feeling.</p>
      </header>

      <ol className="mi__list wrap">
        {moods.map((m, i) => (
          <li key={m.id} className={`mi__item ${i % 2 ? 'mi__item--flip' : ''}`}>
            <Link to={`/moods/${m.id}`} className="mi__link">
              <Reveal variant="mask" className="mi__img">
                <Img k={m.image} sizes="(min-width: 900px) 40vw, 90vw" />
              </Reveal>
              <Reveal className="mi__text" delay={150}>
                <span className="index">{pad(i + 1)}</span>
                <span className="mi__name display">{m.name}</span>
                <span className="mi__line lede">{m.line}</span>
                <span className="mi__swatch" aria-hidden="true" style={{ background: m.tone.ground }} />
                <span className="link">
                  Explore {m.name.toLowerCase()} <span className="arrow">→</span>
                </span>
              </Reveal>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* /moods/:id — the mood's colour story, then its fragrances */
export function MoodPage() {
  const { id } = useParams()
  const mood = getMood(id)
  const ready = useIntro()
  const dark = mood ? isDark(mood.tone.ground) : false
  useHeaderTone(dark)

  useEffect(() => {
    if (mood) document.title = `${mood.name} — MOODS Fragrances`
  }, [mood])

  if (!mood) return <NotFound />

  const list = products.filter((p) => p.moods.includes(mood.id))
  const index = moods.indexOf(mood)
  const next = moods[(index + 1) % moods.length]
  const style = { '--mood-ground': mood.tone.ground, '--mood-ink': mood.tone.ink, '--mood-muted': mood.tone.muted } as CSSProperties

  return (
    <div className="mood-page" style={style}>
      <section className={`mp__hero ${ready ? 'is-in' : ''}`} key={mood.id}>
        <div className="mp__copy">
          <p className="micro mp__muted">
            Mood {pad(index + 1)} / {pad(moods.length)}
          </p>
          <h1 className="display mp__title">
            <Lines lines={[mood.name]} />
          </h1>
          <p className="mp__line">{mood.line}</p>
          <p className="mp__story">{mood.story}</p>
          <p className="micro mp__muted">{mood.families.join(' · ')}</p>
        </div>
        <div className={`mp__media reveal-mask ${ready ? 'is-in' : ''}`}>
          <Img k={mood.image} sizes="(min-width: 900px) 55vw, 100vw" priority />
        </div>
      </section>

      <section className="mp__products wrap" aria-label={`${mood.name} fragrances`}>
        <div className="mp__bar">
          <p className="micro">
            {list.length} {mood.name.toLowerCase()} fragrances
          </p>
          <Link to={`/shop?mood=${mood.id}`} className="link link--quiet">
            Filter in shop
          </Link>
        </div>
        <div className="mp__grid">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <ProductCard product={p} sizes="(min-width: 1024px) 30vw, 45vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <Link to={`/moods/${next.id}`} className="mp__next">
        <span className="wrap mp__next-inner">
          <span className="micro mp__muted">Next mood</span>
          <span className="display mp__next-name">{next.name} →</span>
        </span>
      </Link>
    </div>
  )
}
