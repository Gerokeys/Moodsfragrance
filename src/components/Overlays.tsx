import { useDeferredValue, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { moods } from '../data/moods'
import { products } from '../data/products'
import { price } from '../lib/format'
import { useDialog } from '../lib/hooks'
import { useShop } from '../store/shop'
import { CloseIcon } from './Icons'
import { Img } from './Img'
import './Overlays.css'

const FREE_DELIVERY = 15000

export function BagDrawer() {
  const { panel, close, lines, subtotal, count, setQty, remove } = useShop()
  const open = panel === 'bag'
  const panelRef = useDialog(open, close)
  const remaining = Math.max(0, FREE_DELIVERY - subtotal)

  return (
    <div className={`overlay ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="overlay__scrim" onClick={close} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title" ref={panelRef} tabIndex={-1}>
        <div className="drawer__head">
          <h2 id="bag-title" className="label">
            Your bag <span className="muted">({count})</span>
          </h2>
          <button type="button" className="drawer__close" onClick={close} aria-label="Close bag" data-autofocus>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p className="display drawer__empty-title">Your bag is empty.</p>
            <p className="muted">Begin with a feeling — we'll find the fragrance.</p>
            <div className="drawer__empty-actions">
              <Link to="/shop" className="button" onClick={close}>
                Discover the collection
              </Link>
              <Link to="/moods" className="link" onClick={close}>
                Explore your mood
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="drawer__progress">
              <p className="micro">
                {remaining > 0 ? (
                  <>
                    <span className="muted">You are</span> {price(remaining)} <span className="muted">from complimentary delivery</span>
                  </>
                ) : (
                  'Complimentary delivery within Nairobi'
                )}
              </p>
              <span className="drawer__bar">
                <span style={{ transform: `scaleX(${Math.min(1, subtotal / FREE_DELIVERY)})` }} />
              </span>
            </div>

            <ul className="drawer__lines">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.ml}`} className="line">
                  <Link to={`/fragrance/${l.productId}`} className="line__img" onClick={close}>
                    <Img k={l.product.image} sizes="96px" />
                  </Link>
                  <div className="line__body">
                    <p className="micro muted">{l.product.brand}</p>
                    <p className="line__name">{l.product.name}</p>
                    <p className="line__meta">
                      {l.product.concentration} · {l.ml}ml
                    </p>
                    <div className="line__row">
                      <div className="qty" role="group" aria-label={`Quantity of ${l.product.name}`}>
                        <button type="button" onClick={() => setQty(l.productId, l.ml, l.qty - 1)} aria-label="Decrease quantity">
                          −
                        </button>
                        <span aria-live="polite">{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.productId, l.ml, l.qty + 1)} aria-label="Increase quantity">
                          +
                        </button>
                      </div>
                      <span className="line__price">{price(l.variant.price * l.qty)}</span>
                    </div>
                    <button type="button" className="line__remove micro" onClick={() => remove(l.productId, l.ml)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer__foot">
              <div className="drawer__total">
                <span className="label">Subtotal</span>
                <span className="drawer__sum">{price(subtotal)}</span>
              </div>
              <p className="drawer__note muted">Two complimentary samples with every order. Pay by M-Pesa or card.</p>
              <Link to="/checkout" className="button button--block" onClick={close}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export function SearchOverlay() {
  const { panel, close } = useShop()
  const open = panel === 'search'
  const panelRef = useDialog(open, close)
  const [query, setQuery] = useState('')
  const q = useDeferredValue(query.trim().toLowerCase())
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!q) return []
    return products.filter((p) =>
      [p.brand, p.name, p.family, ...p.moods, ...p.notes.top, ...p.notes.heart, ...p.notes.base].join(' ').toLowerCase().includes(q),
    )
  }, [q])

  return (
    <div className={`overlay overlay--search ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="overlay__scrim" onClick={close} />
      <div className="search" role="dialog" aria-modal="true" aria-label="Search" ref={panelRef} tabIndex={-1}>
        <div className="search__inner wrap">
          <form
            className="search__form"
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              if (results[0]) {
                navigate(`/fragrance/${results[0].id}`)
                close()
              }
            }}
          >
            <label htmlFor="search-input" className="sr-only">
              Search fragrances
            </label>
            <input
              id="search-input"
              className="search__input"
              type="search"
              placeholder="Search a name, a note, a feeling"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-autofocus
            />
            <button type="button" className="search__close label" onClick={close}>
              Close <CloseIcon />
            </button>
          </form>

          {!q && (
            <div className="search__suggest">
              <p className="micro muted">Try a mood</p>
              <ul>
                {moods.map((m) => (
                  <li key={m.id}>
                    <button type="button" onClick={() => setQuery(m.id.replace('-', ' '))}>
                      {m.name}
                    </button>
                  </li>
                ))}
                {['Rose', 'Oud', 'Vanilla', 'Vetiver'].map((n) => (
                  <li key={n}>
                    <button type="button" onClick={() => setQuery(n)}>
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {q && (
            <div className="search__results" aria-live="polite">
              <p className="micro muted">
                {results.length} {results.length === 1 ? 'fragrance' : 'fragrances'}
              </p>
              <ul>
                {results.slice(0, 8).map((p) => (
                  <li key={p.id}>
                    <Link to={`/fragrance/${p.id}`} className="result" onClick={close}>
                      <span className="result__img">
                        <Img k={p.image} sizes="64px" />
                      </span>
                      <span>
                        <span className="micro muted">{p.brand}</span>
                        <span className="result__name">{p.name}</span>
                      </span>
                      <span className="result__price">{price(p.variants[0].price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length === 0 && <p className="search__none display">Nothing yet — try a note, like “rose”.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Notice() {
  const { notice, open } = useShop()
  return (
    <div className={`notice ${notice ? 'is-shown' : ''}`} role="status" aria-live="polite">
      {notice && (
        <>
          <span>{notice}</span>
          {notice.includes('bag') && (
            <button type="button" className="link" onClick={() => open('bag')}>
              View bag
            </button>
          )}
        </>
      )}
    </div>
  )
}
