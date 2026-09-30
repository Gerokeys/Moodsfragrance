import { Link } from 'react-router-dom'
import { featuredVariant, type Product } from '../data/products'
import { discountPercent, price } from '../lib/format'
import { useShop } from '../store/shop'
import { HeartIcon, Star } from './Icons'
import { Img } from './Img'
import './ProductCard.css'

export function Rating({ value, count, compact }: { value: number; count: number; compact?: boolean }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5 from ${count} reviews`}>
      <span className="rating__stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />
        ))}
      </span>
      <span className="rating__count" aria-hidden="true">
        {compact ? `(${count})` : `${count} reviews`}
      </span>
    </span>
  )
}

export function Price({ amount, compareAt }: { amount: number; compareAt?: number }) {
  const off = discountPercent(amount, compareAt)
  return (
    <span className="price">
      <span className={off ? 'price__now is-sale' : 'price__now'}>{price(amount)}</span>
      {off && (
        <>
          <s className="price__was">
            <span className="sr-only">was </span>
            {price(compareAt!)}
          </s>
          <span className="price__off">−{off}%</span>
        </>
      )}
    </span>
  )
}

interface CardProps {
  product: Product
  index?: number
  sizes?: string
  /** Taller frame used in editorial grids */
  tall?: boolean
}

export function ProductCard({ product, index, sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw', tall }: CardProps) {
  const { add, toggleWish, isWished } = useShop()
  const v = featuredVariant(product)
  const wished = isWished(product.id)
  const href = `/fragrance/${product.id}`

  return (
    <article className={`card ${tall ? 'card--tall' : ''}`}>
      <div className="card__media">
        <Link to={href} className="card__frame" tabIndex={-1} aria-hidden="true">
          <Img k={product.image} sizes={sizes} className="card__img" />
          <Img k={product.altImage} sizes={sizes} className="card__img card__img--alt" alt="" />
        </Link>

        {product.tag && <span className="card__tag micro">{product.tag}</span>}

        <button
          type="button"
          className={`card__wish ${wished ? 'is-on' : ''}`}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWish(product.id)}
        >
          <HeartIcon filled={wished} />
        </button>

        <div className="card__quick" role="group" aria-label={`Quick add ${product.name}`}>
          <span className="card__quick-label micro">Quick add</span>
          <span className="card__sizes">
            {product.variants.map((variant) => (
              <button key={variant.ml} type="button" className="micro" onClick={() => add(product.id, variant.ml)}>
                {variant.ml}ml
                <span className="sr-only"> — {price(variant.price)}</span>
              </button>
            ))}
          </span>
        </div>
      </div>

      <div className="card__body">
        {index !== undefined && <span className="card__index index">{String(index + 1).padStart(2, '0')}</span>}
        <p className="card__brand micro">{product.brand}</p>
        <h3 className="card__name">
          <Link to={href}>{product.name}</Link>
        </h3>
        <p className="card__type">
          {product.concentration} · {v.ml}ml
        </p>
        <div className="card__foot">
          <Price amount={v.price} compareAt={v.compareAt} />
          <Rating value={product.rating} count={product.reviews} compact />
        </div>
      </div>
    </article>
  )
}
