import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { articles } from '../data/journal'
import { longDate } from '../lib/format'
import './pages.css'

export function About() {
  return (
    <div className="page about">
      <header className="page-head wrap">
        <p className="micro muted">About</p>
        <h1 className="display page-head__title about__title">
          We don’t sell perfume by the name on the bottle. <em>We sell it by the feeling.</em>
        </h1>
      </header>

      <div className="about__pair wrap">
        <Reveal variant="mask" className="about__img about__img--a">
          <Img k="skinBW" sizes="(min-width: 900px) 38vw, 90vw" />
        </Reveal>
        <Reveal variant="mask" delay={150} className="about__img about__img--b">
          <Img k="pampas" sizes="(min-width: 900px) 24vw, 60vw" />
        </Reveal>
      </div>

      <section className="about__text wrap">
        <Reveal className="about__col">
          <p className="index">I.</p>
          <h2 className="display">A house, not a shop</h2>
          <p className="muted">
            MOODS began in Nairobi with a simple frustration: fragrance counters that sold by brand, by price, by whatever was on
            promotion — and never by how a scent actually made you feel. We wanted somewhere quieter. A place to sit with a
            fragrance, wear it for an afternoon, and decide slowly.
          </p>
        </Reveal>
        <Reveal className="about__col" delay={150}>
          <p className="index">II.</p>
          <h2 className="display">Chosen for our climate</h2>
          <p className="muted">
            Perfume behaves differently at 1,795 metres, in dry heat and in long rains. Every fragrance we keep has been worn here,
            by us, through a full day — so we can tell you honestly how it opens, how it lasts, and how it will feel on you.
          </p>
        </Reveal>
        <Reveal className="about__col" delay={300}>
          <p className="index">III.</p>
          <h2 className="display">Always authentic</h2>
          <p className="muted">
            Every bottle is sourced from the house itself or its appointed regional distributor, and arrives sealed. If we cannot
            verify a fragrance, we do not stock it.
          </p>
        </Reveal>
      </section>

      <section id="boutique" className="boutique">
        <div className="boutique__grid wrap">
          <Reveal variant="mask" className="boutique__img">
            <Img k="stoneVase" sizes="(min-width: 900px) 45vw, 100vw" />
          </Reveal>
          <Reveal className="boutique__info">
            <p className="micro muted">Visit the boutique</p>
            <h2 className="display">Westlands, Nairobi</h2>
            <dl>
              <div>
                <dt className="micro muted">Address</dt>
                <dd>
                  Ground floor, 14 Mpaka Road
                  <br />
                  Westlands, Nairobi
                </dd>
              </div>
              <div>
                <dt className="micro muted">Hours</dt>
                <dd>
                  Monday – Saturday, 10:00 – 19:00
                  <br />
                  Sunday, 12:00 – 17:00
                </dd>
              </div>
              <div>
                <dt className="micro muted">Consultations</dt>
                <dd>Private fragrance consultations by appointment — forty-five minutes, complimentary.</dd>
              </div>
            </dl>
            <a href="mailto:hello@moods.co.ke" className="link">
              Book a consultation <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export function Journal() {
  const [lead, ...rest] = articles
  return (
    <div className="page journal">
      <header className="page-head wrap">
        <p className="micro muted">Journal</p>
        <h1 className="display page-head__title">
          Notes on scent, <em>skin and memory.</em>
        </h1>
      </header>

      <div className="wrap">
        <Reveal as="article" className="journal__lead">
          <div className="journal__lead-img">
            <Img k={lead.image} sizes="(min-width: 900px) 58vw, 100vw" />
          </div>
          <div className="journal__lead-text">
            <p className="micro muted">
              {lead.category} · {longDate(lead.date)} · {lead.readMinutes} min read
            </p>
            <h2 className="display">{lead.title}</h2>
            <p className="muted">{lead.excerpt}</p>
            <span className="link">Read the story →</span>
          </div>
        </Reveal>

        <div className="journal__grid">
          {rest.map((a, i) => (
            <Reveal as="article" key={a.id} delay={i * 120} className="journal__card">
              <div className="journal__card-img">
                <Img k={a.image} sizes="(min-width: 900px) 40vw, 100vw" />
              </div>
              <p className="micro muted">
                {a.category} · {longDate(a.date)}
              </p>
              <h2 className="display">{a.title}</h2>
              <p className="muted">{a.excerpt}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Account() {
  return (
    <div className="page account">
      <div className="account__grid wrap">
        <div className="account__img">
          <Img k="roseWhite" sizes="(min-width: 900px) 40vw, 1px" alt="" />
        </div>
        <div className="account__forms">
          <p className="micro muted">Account</p>
          <h1 className="display page-head__title">Welcome back.</h1>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label>
              <span className="micro muted">Email</span>
              <input type="email" autoComplete="email" required />
            </label>
            <label>
              <span className="micro muted">Password</span>
              <input type="password" autoComplete="current-password" required />
            </label>
            <button type="submit" className="button button--block">
              Sign in
            </button>
            <p className="micro muted">Sign-in connects to the account service. New here? Create an account at checkout.</p>
          </form>
          <Link to="/shop" className="link">
            Continue shopping <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
