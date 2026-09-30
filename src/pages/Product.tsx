import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img } from '../components/Img'
import { Price, ProductCard, Rating } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { getMood } from '../data/moods'
import { featuredVariant, getProduct, products } from '../data/products'
import { useShop } from '../store/shop'
import NotFound from './NotFound'
import './pages.css'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { add, toggleWish, isWished } = useShop()
  const [ml, setMl] = useState(() => (product ? featuredVariant(product).ml : 0))

  useEffect(() => {
    if (product) {
      setMl(featuredVariant(product).ml)
      document.title = `${product.name} — ${product.brand} | MOODS Fragrances`
    }
  }, [product])

  if (!product) return <NotFound />

  const variant = product.variants.find((v) => v.ml === ml) ?? product.variants[0]
  const wished = isWished(product.id)
  const related = products.filter((p) => p.id !== product.id && p.moods.some((m) => product.moods.includes(m))).slice(0, 4)

  return (
    <div className="page pdp">
      <div className="pdp__grid wrap">
        <nav className="pdp__crumbs micro muted" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?mood=${product.moods[0]}`}>{getMood(product.moods[0])?.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp__gallery">
          <Reveal variant="mask" className="pdp__img">
            <Img k={product.image} sizes="(min-width: 900px) 55vw, 100vw" priority />
          </Reveal>
          <Reveal variant="mask" className="pdp__img pdp__img--second">
            <Img k={product.altImage} sizes="(min-width: 900px) 30vw, 60vw" />
          </Reveal>
        </div>

        <div className="pdp__info">
          <div className="pdp__sticky">
            <p className="micro muted">{product.brand}</p>
            <h1 className="display pdp__name">{product.name}</h1>
            <p className="pdp__type">
              {product.concentration} · {product.family}
            </p>
            <div className="pdp__rating">
              <Rating value={product.rating} count={product.reviews} />
            </div>

            <div className="pdp__price">
              <Price amount={variant.price} compareAt={variant.compareAt} />
            </div>

            <fieldset className="sizes">
              <legend className="micro muted">Size</legend>
              <div className="sizes__opts">
                {product.variants.map((v) => (
                  <label key={v.ml} className={v.ml === ml ? 'is-on' : ''}>
                    <input type="radio" name="size" value={v.ml} checked={v.ml === ml} onChange={() => setMl(v.ml)} />
                    {v.ml}ml
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="pdp__actions">
              <button type="button" className="button button--block" onClick={() => add(product.id, variant.ml)}>
                Add to bag
              </button>
              <button type="button" className="link link--quiet" aria-pressed={wished} onClick={() => toggleWish(product.id)}>
                {wished ? 'Saved to wishlist' : 'Save to wishlist'}
              </button>
            </div>

            <p className="pdp__desc">{product.description}</p>

            <dl className="notes">
              {(['top', 'heart', 'base'] as const).map((tier) => (
                <div key={tier} className="notes__row">
                  <dt className="micro muted">{tier} notes</dt>
                  <dd>{product.notes[tier].join(', ')}</dd>
                </div>
              ))}
            </dl>

            <div className="pdp__moods">
              <span className="micro muted">Feels</span>
              {product.moods.map((m) => (
                <Link key={m} to={`/moods/${m}`} className="pdp__mood">
                  {getMood(m)?.name}
                </Link>
              ))}
            </div>

            <details className="pdp__more">
              <summary className="micro">Delivery &amp; returns</summary>
              <p className="muted">
                Same-day delivery within Nairobi for orders placed before 2pm; one to three days countrywide. Complimentary on orders
                over KSh 15,000. Unopened fragrances may be returned within 14 days.
              </p>
            </details>
            <details className="pdp__more">
              <summary className="micro">Authenticity</summary>
              <p className="muted">Every bottle is sourced from the house or its appointed regional distributor, and arrives sealed.</p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related wrap" aria-labelledby="related-title">
          <h2 id="related-title" className="display related__title">
            In the same <em>mood</em>
          </h2>
          <div className="related__grid">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
