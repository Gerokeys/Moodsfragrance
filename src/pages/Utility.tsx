import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../components/Img'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { price } from '../lib/format'
import { useShop } from '../store/shop'
import './pages.css'

export function Wishlist() {
  const { wishlist } = useShop()
  const list = products.filter((p) => wishlist.includes(p.id))
  return (
    <div className="page">
      <header className="page-head wrap">
        <p className="micro muted">Wishlist</p>
        <h1 className="display page-head__title">
          Kept for <em>later.</em>
        </h1>
      </header>
      <div className="wrap">
        {list.length ? (
          <div className="shop__grid shop__grid--flush">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="lede">Nothing saved yet. Tap the heart on any fragrance to keep it here.</p>
            <Link to="/shop" className="button">
              Discover the collection
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const DELIVERY = 450
const FREE_OVER = 15000

export function Checkout() {
  const { lines, subtotal } = useShop()
  const [method, setMethod] = useState<'mpesa' | 'card'>('mpesa')
  const [placed, setPlaced] = useState(false)
  const delivery = subtotal >= FREE_OVER ? 0 : DELIVERY

  if (!lines.length && !placed) {
    return (
      <div className="page">
        <div className="wrap empty empty--page">
          <h1 className="display page-head__title">Your bag is empty.</h1>
          <Link to="/shop" className="button">
            Discover the collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page checkout">
      <div className="checkout__grid wrap">
        <div>
          <p className="micro muted">Checkout</p>
          <h1 className="display page-head__title">Delivery</h1>
          {placed ? (
            <p className="lede">This is where the order would be sent to the payments backend. The frontend flow ends here for now.</p>
          ) : (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault()
                setPlaced(true)
              }}
            >
              <div className="form__row">
                <label>
                  <span className="micro muted">First name</span>
                  <input autoComplete="given-name" required />
                </label>
                <label>
                  <span className="micro muted">Last name</span>
                  <input autoComplete="family-name" required />
                </label>
              </div>
              <label>
                <span className="micro muted">Phone</span>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" required />
              </label>
              <label>
                <span className="micro muted">Delivery address</span>
                <input autoComplete="street-address" required />
              </label>
              <label>
                <span className="micro muted">Town</span>
                <select defaultValue="Nairobi">
                  {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Other'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>

              <fieldset className="pay">
                <legend className="micro muted">Payment</legend>
                <label className={method === 'mpesa' ? 'is-on' : ''}>
                  <input type="radio" name="pay" checked={method === 'mpesa'} onChange={() => setMethod('mpesa')} />
                  <span>M-Pesa</span>
                  <span className="micro muted">An STK push is sent to your phone</span>
                </label>
                <label className={method === 'card' ? 'is-on' : ''}>
                  <input type="radio" name="pay" checked={method === 'card'} onChange={() => setMethod('card')} />
                  <span>Card</span>
                  <span className="micro muted">Visa, Mastercard</span>
                </label>
              </fieldset>

              <button type="submit" className="button button--block">
                Place order · {price(subtotal + delivery)}
              </button>
            </form>
          )}
        </div>

        <aside className="summary" aria-label="Order summary">
          <p className="label">Summary</p>
          <ul>
            {lines.map((l) => (
              <li key={`${l.productId}-${l.ml}`}>
                <span className="summary__img">
                  <Img k={l.product.image} sizes="64px" />
                </span>
                <span>
                  <span className="summary__name">{l.product.name}</span>
                  <span className="micro muted">
                    {l.ml}ml × {l.qty}
                  </span>
                </span>
                <span>{price(l.variant.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{price(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{delivery ? price(delivery) : 'Complimentary'}</dd>
            </div>
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{price(subtotal + delivery)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
