import { Fragment, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Img } from '../components/Img'
import { ProductCard } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { moods } from '../data/moods'
import { featuredVariant, products, type Concentration } from '../data/products'
import './pages.css'

const types: Concentration[] = ['Eau de Parfum', 'Eau de Toilette', 'Cologne']
const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'rating', label: 'Most loved' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const mood = params.get('mood')
  const type = params.get('type')
  const sale = params.get('sale') === '1'
  const sort = params.get('sort') ?? 'featured'

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const list = useMemo(() => {
    let out = products.filter(
      (p) =>
        (!mood || p.moods.includes(mood as never)) &&
        (!type || p.concentration === type) &&
        (!sale || p.variants.some((v) => v.compareAt)),
    )
    const price = (p: (typeof products)[number]) => featuredVariant(p).price
    if (sort === 'price-asc') out = [...out].sort((a, b) => price(a) - price(b))
    if (sort === 'price-desc') out = [...out].sort((a, b) => price(b) - price(a))
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    if (sort === 'new') out = [...out].sort((a, b) => Number(b.tag === 'New') - Number(a.tag === 'New'))
    return out
  }, [mood, type, sale, sort])

  const activeMood = moods.find((m) => m.id === mood)
  const filtered = Boolean(mood || type || sale)

  return (
    <div className="page shop">
      <header className="page-head wrap">
        <p className="micro muted">Shop</p>
        <h1 className="display page-head__title">
          {activeMood ? (
            <>
              <em>{activeMood.name}</em> fragrances
            </>
          ) : sale ? (
            'Offers'
          ) : (
            <>
              All <em>fragrances</em>
            </>
          )}
        </h1>
        <p className="page-head__lede lede">
          {activeMood ? activeMood.line + '.' : 'A small, considered collection — chosen for how each fragrance makes you feel.'}
        </p>
      </header>

      <div className="filters wrap" role="region" aria-label="Filter fragrances">
        <div className="filters__group">
          <span className="micro muted">Mood</span>
          <div className="filters__opts">
            <button type="button" className={!mood ? 'is-on' : ''} onClick={() => set('mood', null)}>
              All
            </button>
            {moods.map((m) => (
              <button key={m.id} type="button" className={mood === m.id ? 'is-on' : ''} onClick={() => set('mood', m.id)} aria-pressed={mood === m.id}>
                {m.name}
              </button>
            ))}
          </div>
        </div>
        <div className="filters__group">
          <span className="micro muted">Type</span>
          <div className="filters__opts">
            <button type="button" className={!type ? 'is-on' : ''} onClick={() => set('type', null)}>
              All
            </button>
            {types.map((t) => (
              <button key={t} type="button" className={type === t ? 'is-on' : ''} onClick={() => set('type', t)} aria-pressed={type === t}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="filters__meta">
          <span className="micro muted" aria-live="polite">
            {list.length} {list.length === 1 ? 'fragrance' : 'fragrances'}
          </span>
          {filtered && (
            <button type="button" className="link link--quiet" onClick={() => setParams({}, { replace: true })}>
              Clear
            </button>
          )}
          <label className="filters__sort">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? null : e.target.value)}>
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="shop__grid wrap">
        {list.map((p, i) => (
          <Fragment key={p.id}>
            {/* An editorial pause after the first row */}
            {i === 4 && !filtered && (
              <Reveal variant="none" className="shop__pause" aria-hidden="true">
                <div className="shop__pause-img">
                  <Img k="stillOlive" sizes="(min-width: 1024px) 50vw, 100vw" alt="" />
                </div>
                <p className="display shop__pause-text">
                  <em>“Wear what you want to be remembered by.”</em>
                </p>
              </Reveal>
            )}
            <Reveal delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          </Fragment>
        ))}
        {list.length === 0 && (
          <div className="shop__empty">
            <p className="display">Nothing matches — yet.</p>
            <button type="button" className="link" onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
