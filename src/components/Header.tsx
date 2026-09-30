import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { moods } from '../data/moods'
import { useDialog } from '../lib/hooks'
import { useShop } from '../store/shop'
import { CloseIcon } from './Icons'
import './Header.css'

const primary = [
  { to: '/shop', label: 'Shop' },
  { to: '/moods', label: 'Moods' },
  { to: '/about', label: 'About' },
  { to: '/journal', label: 'Journal' },
]

/** Solid once scrolled; slides away while scrolling down, returns on scroll up. */
function useHeaderState() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 24)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.6)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { solid, hidden }
}

export function Header() {
  const { count, wishlist, panel, open, close } = useShop()
  const { solid, hidden } = useHeaderState()
  const menuOpen = panel === 'menu'

  return (
    <>
      <header className={`header ${solid ? 'is-solid' : ''} ${hidden && !panel ? 'is-hidden' : ''}`}>
        <div className="header__inner">
          <nav className="header__nav" aria-label="Primary">
            {primary.map((item) => (
              <NavLink key={item.to} to={item.to} className="header__link label">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="header__menu-btn label"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => open('menu')}
          >
            Menu
          </button>

          <Link to="/" className="header__logo" aria-label="MOODS Fragrances — home">
            <span className="logo-mark" aria-hidden="true" />
            <span className="header__logo-text">
              <span className="header__logo-word">MOODS</span>
              <span className="header__logo-sub">Fragrances</span>
            </span>
          </Link>

          <div className="header__utils">
            <button type="button" className="header__link label hide-sm" onClick={() => open('search')}>
              Search
            </button>
            <NavLink to="/account" className="header__link label hide-sm">
              Account
            </NavLink>
            <NavLink to="/wishlist" className="header__link label hide-sm">
              Wishlist{wishlist.length > 0 && <sup className="header__sup">{wishlist.length}</sup>}
            </NavLink>
            <button type="button" className="header__link label" onClick={() => open('bag')} aria-label={`Bag, ${count} items`}>
              Bag <span className="header__count">({count})</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={close} />
    </>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { open: openPanel, wishlist } = useShop()
  const panelRef = useDialog(open, onClose)
  const { pathname } = useLocation()

  // Close when navigating
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <div
      id="mobile-menu"
      className={`menu ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="menu__top">
        <span className="header__logo">
          <span className="logo-mark" aria-hidden="true" />
          <span className="header__logo-word">MOODS</span>
        </span>
        <button type="button" className="menu__close label" onClick={onClose} data-autofocus>
          Close <CloseIcon />
        </button>
      </div>

      <nav className="menu__primary" aria-label="Mobile">
        {primary.map((item, i) => (
          <Link key={item.to} to={item.to} className="menu__link" style={{ '--i': i } as CSSProperties}>
            <span className="index">{String(i + 1).padStart(2, '0')}</span>
            <span className="display">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="menu__moods">
        <p className="micro muted">Shop by mood</p>
        <ul>
          {moods.map((m) => (
            <li key={m.id}>
              <Link to={`/moods/${m.id}`}>{m.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="menu__utils">
        <button type="button" className="link link--quiet" onClick={() => openPanel('search')}>
          Search
        </button>
        <Link to="/account" className="link link--quiet">
          Account
        </Link>
        <Link to="/wishlist" className="link link--quiet">
          Wishlist ({wishlist.length})
        </Link>
      </div>
    </div>
  )
}
