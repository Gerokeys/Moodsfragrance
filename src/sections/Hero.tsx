import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { Lines, Reveal } from '../components/Reveal'
import './Hero.css'

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section className={`hero ${ready ? 'is-in' : ''}`} aria-labelledby="hero-title">
      <div className="hero__copy">
        <Reveal show={ready} delay={300} className="hero__kicker">
          <span className="micro">Autumn / 2026</span>
          <span className="hero__rule" aria-hidden="true" />
          <span className="micro muted">A fragrance house, Nairobi</span>
        </Reveal>

        <h1 id="hero-title" className="display hero__title">
          <Lines
            lines={[
              'Find the',
              'fragrance',
              <>
                that <em>feels</em>
              </>,
              'like you.',
            ]}
          />
        </h1>

        <Reveal show={ready} delay={900} className="hero__actions">
          <Link to="/shop" className="button">
            Discover the collection
          </Link>
          <a href="#moods" className="link">
            Explore your mood <span className="arrow">↓</span>
          </a>
        </Reveal>
      </div>

      <figure className="hero__media">
        <div className={`hero__frame reveal-mask ${ready ? 'is-in' : ''}`}>
          <Img k="shadowTravertine" sizes="(min-width: 900px) 60vw, 100vw" priority />
        </div>
        <Reveal as="figcaption" show={ready} delay={1300} className="hero__caption micro">
          <span>No. 01</span>
          <span>Shadow on travertine</span>
        </Reveal>
      </figure>

      <Reveal show={ready} delay={1500} className="hero__scroll micro" aria-hidden="true">
        Scroll
        <span />
      </Reveal>
    </section>
  )
}
