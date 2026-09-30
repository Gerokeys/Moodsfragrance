import { useState } from 'react'
import { Link } from 'react-router-dom'
import { moods } from '../data/moods'
import './Footer.css'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section className="letters" aria-labelledby="letters-title">
      <div className="letters__inner wrap">
        <div>
          <p className="micro muted">Letters from MOODS</p>
          <h2 id="letters-title" className="display letters__title">
            New arrivals, quiet rituals, <em>and first access.</em>
          </h2>
        </div>
        {sent ? (
          <p className="letters__thanks lede">Thank you. The first letter will find you soon.</p>
        ) : (
          <form
            className="letters__form"
            onSubmit={(e) => {
              e.preventDefault()
              if (email.includes('@')) setSent(true)
            }}
          >
            <label htmlFor="letters-email" className="micro muted">
              Email address
            </label>
            <div className="letters__field">
              <input
                id="letters-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="link">
                Subscribe <span className="arrow">→</span>
              </button>
            </div>
            <p className="micro letters__fine">One letter a month. Unsubscribe any time.</p>
          </form>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__word">MOODS</p>
            <p className="footer__tag display">
              <em>Find the fragrance that feels like you.</em>
            </p>
          </div>

          <nav aria-label="Shop" className="footer__col">
            <p className="micro">Shop</p>
            <ul>
              <li><Link to="/shop">All fragrances</Link></li>
              <li><Link to="/shop?sort=new">New arrivals</Link></li>
              <li><Link to="/shop?type=Eau+de+Parfum">Eau de Parfum</Link></li>
              <li><Link to="/shop?sale=1">Offers</Link></li>
            </ul>
          </nav>

          <nav aria-label="Moods" className="footer__col">
            <p className="micro">Moods</p>
            <ul>
              {moods.map((m) => (
                <li key={m.id}>
                  <Link to={`/moods/${m.id}`}>{m.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="House" className="footer__col">
            <p className="micro">The house</p>
            <ul>
              <li><Link to="/about">About MOODS</Link></li>
              <li><Link to="/journal">Journal</Link></li>
              <li><Link to="/about#boutique">Visit the boutique</Link></li>
              <li><Link to="/account">Account</Link></li>
            </ul>
          </nav>

          <div className="footer__col">
            <p className="micro">Care</p>
            <ul>
              <li>Same-day delivery in Nairobi</li>
              <li>Countrywide in 1–3 days</li>
              <li>M-Pesa, Visa, Mastercard</li>
              <li><a href="mailto:hello@moods.co.ke">hello@moods.co.ke</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <p>© {new Date().getFullYear()} MOODS Fragrances · Westlands, Nairobi</p>
          <p className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
            <a href="https://unsplash.com" target="_blank" rel="noreferrer">Photography via Unsplash</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
