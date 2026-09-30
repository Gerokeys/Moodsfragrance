import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { ProductCard } from '../components/ProductCard'
import { Lines, Reveal } from '../components/Reveal'
import { articles } from '../data/journal'
import { moods } from '../data/moods'
import { getProduct, products, signatureIds, type Product } from '../data/products'
import { longDate, pad } from '../lib/format'
import { useInView } from '../lib/hooks'
import './home.css'

/* A — Large editorial image, tiny typography */
export function HouseIntro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro__grid wrap">
        <Reveal className="intro__text">
          <p className="index">01</p>
          <h2 id="intro-title" className="micro">The house</h2>
          <p className="intro__body">
            MOODS is a fragrance house in Nairobi for people who choose scent the way they choose a word — carefully. We keep a small,
            considered collection of the world’s great perfumes, and help you find the one that sounds like you.
          </p>
          <Link to="/about" className="link">
            Our story <span className="arrow">→</span>
          </Link>
        </Reveal>

        <Reveal variant="mask" className="intro__main">
          <Img k="magnolia" sizes="(min-width: 900px) 45vw, 90vw" />
        </Reveal>

        <div className="intro__aside">
          <Reveal variant="mask" delay={200} className="intro__small">
            <Img k="windowLight" sizes="(min-width: 900px) 18vw, 50vw" />
          </Reveal>
          <Reveal delay={400} as="p" className="intro__caption micro muted">
            Six in the evening, Lavington
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* B — Large typography with an image set into the line */
export function IntimacyStatement() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <section className="intimacy" aria-label="On scent">
      <div ref={ref} className={`intimacy__inner wrap ${inView ? 'is-in' : ''}`}>
        <p className="display intimacy__text">
          <Lines
            lines={[
              <>Scent is the most</>,
              <>
                <span className="intimacy__inline" aria-hidden="true">
                  <Img k="palmShadow" sizes="240px" alt="" />
                </span>
                intimate thing
              </>,
              <>
                you will <em>ever</em> wear.
              </>,
            ]}
          />
        </p>
        <Reveal delay={500} className="intimacy__note">
          <p className="muted">
            So we don’t sort our shelves by brand or price. We sort them by feeling — how a fragrance moves on warm skin, how it
            lingers in a room, who you become when you wear it.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* C — Signature scents, a staggered four-column grid */
export function SignatureScents() {
  const list = signatureIds.map(getProduct).filter(Boolean) as Product[]
  return (
    <section className="signature" aria-labelledby="signature-title">
      <div className="wrap">
        <header className="section-head">
          <Reveal className="section-head__title">
            <p className="index">02</p>
            <h2 id="signature-title" className="display">
              Shop our <em>signature</em> scents
            </h2>
          </Reveal>
          <Reveal delay={150} className="section-head__aside">
            <p className="muted">Eight fragrances we return to, season after season. Each chosen for how it wears in our climate.</p>
            <Link to="/shop" className="link">
              View all fragrances <span className="arrow">→</span>
            </Link>
          </Reveal>
        </header>

        <div className="signature__grid">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 90} className="signature__item">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* D — Full-width campaign, minimal text */
export function Campaign() {
  return (
    <section className="campaign" aria-labelledby="campaign-title">
      <Reveal variant="mask" className="campaign__media">
        <Img k="linenShadow" sizes="100vw" />
      </Reveal>
      <div className="campaign__copy wrap">
        <Reveal>
          <p className="micro">The Evening Edit</p>
          <h2 id="campaign-title" className="display campaign__title">
            After dark,
            <br />
            <em>everything is closer.</em>
          </h2>
          <Link to="/moods/seductive" className="link">
            Shop the edit <span className="arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={200} className="campaign__meta micro">
          <span>Oud</span>
          <span>Amber</span>
          <span>Smoke</span>
          <span>Skin</span>
        </Reveal>
      </div>
    </section>
  )
}

/* E — Find your mood. The section takes on each mood's colour story. */
export function MoodSelector() {
  const [active, setActive] = useState(0)
  const mood = moods[active]
  const style = {
    '--mood-ground': mood.tone.ground,
    '--mood-ink': mood.tone.ink,
    '--mood-muted': mood.tone.muted,
  } as CSSProperties

  return (
    <section id="moods" className="moods" style={style} aria-labelledby="moods-title">
      <div className="moods__inner wrap">
        <header className="moods__head">
          <p className="index">03</p>
          <h2 id="moods-title" className="display moods__title">
            Find your <em>mood</em>
          </h2>
          <p className="moods__lede">Find a scent that matches the way you want to feel.</p>
        </header>

        <ol className="moods__list">
          {moods.map((m, i) => (
            <li key={m.id} className={i === active ? 'is-active' : ''}>
              <Link
                to={`/moods/${m.id}`}
                className="moods__item"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="moods__num">{pad(i + 1)}</span>
                <span className="moods__name display">{m.name}</span>
                <span className="moods__line">{m.line}</span>
                <span className="moods__go micro" aria-hidden="true">
                  Explore →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="moods__stage" aria-hidden="true">
          {moods.map((m, i) => (
            <div key={m.id} className={`moods__img ${i === active ? 'is-active' : ''}`}>
              <Img k={m.image} sizes="(min-width: 900px) 34vw, 1px" alt="" />
            </div>
          ))}
          <p className="moods__families micro">{mood.families.join(' · ')}</p>
        </div>

        {/* Small screens: a swipeable rail instead of the hover stage */}
        <div className="moods__rail">
          {moods.map((m, i) => (
            <Link key={m.id} to={`/moods/${m.id}`} className="moods__card">
              <span className="moods__card-img">
                <Img k={m.image} sizes="72vw" />
              </span>
              <span className="moods__num">{pad(i + 1)}</span>
              <span className="moods__name display">{m.name}</span>
              <span className="moods__line">{m.line}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* F — Most loved: a portrait held in place beside a product grid */
export function MostLoved() {
  // Ranked by reviews, skipping what the signature grid already shows
  const loved = products
    .filter((p) => !signatureIds.includes(p.id))
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4)
  return (
    <section className="loved" aria-labelledby="loved-title">
      <div className="loved__grid wrap">
        <div className="loved__portrait">
          <Reveal variant="mask" className="loved__frame">
            <Img k="skinLight" sizes="(min-width: 900px) 42vw, 100vw" />
          </Reveal>
          <p className="micro loved__caption">
            <span>Worn close</span>
            <span className="muted">Campaign, 2026</span>
          </p>
        </div>

        <div className="loved__products">
          <Reveal as="header" className="loved__head">
            <p className="index">04</p>
            <h2 id="loved-title" className="display">
              Most <em>loved</em>
            </h2>
            <p className="muted">The fragrances our clients come back for — ranked by the people who wear them.</p>
          </Reveal>
          <div className="loved__cards">
            {loved.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 120}>
                <ProductCard product={p} sizes="(min-width: 900px) 24vw, 45vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* G — Brand statement and the service promise */
export function BrandStatement() {
  const [ref, inView] = useInView<HTMLQuoteElement>()
  return (
    <section className="statement" aria-label="Our promise">
      <div className="wrap">
        <blockquote ref={ref} className={`statement__quote display ${inView ? 'is-in' : ''}`}>
          <Lines
            lines={[
              <>A fragrance is the last thing</>,
              <>
                you put on, and the <em>first</em>
              </>,
              <>thing they remember.</>,
            ]}
          />
        </blockquote>

        <ul className="promise">
          {[
            ['Authentic, always', 'Sourced directly from houses and their appointed distributors.'],
            ['Two samples, every order', 'Try something new alongside the fragrance you chose.'],
            ['Same-day in Nairobi', 'Order before 2pm. Countrywide in one to three days.'],
            ['M-Pesa or card', 'Pay the way you prefer, securely, at checkout.'],
          ].map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 90}>
              <span className="index">{pad(i + 1)}</span>
              <p className="promise__title">{title}</p>
              <p className="muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* H — Journal: one lead story, two quieter ones */
export function JournalTeaser() {
  const [lead, ...rest] = articles
  return (
    <section className="journal-teaser" aria-labelledby="journal-title">
      <div className="wrap">
        <header className="section-head">
          <Reveal className="section-head__title">
            <p className="index">05</p>
            <h2 id="journal-title" className="display">
              From the <em>journal</em>
            </h2>
          </Reveal>
          <Reveal delay={150} className="section-head__aside">
            <Link to="/journal" className="link">
              All stories <span className="arrow">→</span>
            </Link>
          </Reveal>
        </header>

        <div className="jt__grid">
          <Reveal as="article" className="jt__lead">
            <Link to="/journal" className="jt__link">
              <span className="jt__img jt__img--lead">
                <Img k={lead.image} sizes="(min-width: 900px) 55vw, 100vw" />
              </span>
              <span className="micro muted">
                {lead.category} · {lead.readMinutes} min
              </span>
              <span className="jt__title display">{lead.title}</span>
              <span className="muted jt__excerpt">{lead.excerpt}</span>
            </Link>
          </Reveal>

          <div className="jt__rest">
            {rest.map((a, i) => (
              <Reveal as="article" key={a.id} delay={150 + i * 120}>
                <Link to="/journal" className="jt__row">
                  <span className="jt__img">
                    <Img k={a.image} sizes="(min-width: 900px) 14vw, 36vw" />
                  </span>
                  <span>
                    <span className="micro muted">
                      {a.category} · {longDate(a.date)}
                    </span>
                    <span className="jt__title jt__title--sm display">{a.title}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
