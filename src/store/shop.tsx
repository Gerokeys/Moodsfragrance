import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { getProduct, type Product, type Variant } from '../data/products'
import { load, save } from '../lib/storage'

/*
 * Client-side shop state: bag, wishlist and the overlays that show them.
 * Shaped so each action maps onto a future API call (POST /cart/items etc.)
 * — swap the setters for requests and keep the component contract.
 */

export interface BagLine {
  productId: string
  ml: number
  qty: number
}

export interface ResolvedLine extends BagLine {
  product: Product
  variant: Variant
}

type Panel = 'bag' | 'search' | 'menu' | null

interface ShopState {
  lines: ResolvedLine[]
  count: number
  subtotal: number
  wishlist: string[]
  panel: Panel
  notice: string | null
  add: (productId: string, ml: number, qty?: number) => void
  setQty: (productId: string, ml: number, qty: number) => void
  remove: (productId: string, ml: number) => void
  toggleWish: (productId: string) => void
  isWished: (productId: string) => boolean
  open: (panel: Exclude<Panel, null>) => void
  close: () => void
}

const ShopContext = createContext<ShopState | null>(null)

const BAG_KEY = 'moods.bag.v1'
const WISH_KEY = 'moods.wishlist.v1'

export function ShopProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>(() => load(BAG_KEY, []))
  const [wishlist, setWishlist] = useState<string[]>(() => load(WISH_KEY, []))
  const [panel, setPanel] = useState<Panel>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const noticeTimer = useRef<number>(undefined)

  useEffect(() => save(BAG_KEY, bag), [bag])
  useEffect(() => save(WISH_KEY, wishlist), [wishlist])

  const flash = useCallback((message: string) => {
    window.clearTimeout(noticeTimer.current)
    setNotice(message)
    noticeTimer.current = window.setTimeout(() => setNotice(null), 3200)
  }, [])

  const add = useCallback(
    (productId: string, ml: number, qty = 1) => {
      setBag((prev) => {
        const hit = prev.find((l) => l.productId === productId && l.ml === ml)
        if (hit) return prev.map((l) => (l === hit ? { ...l, qty: Math.min(l.qty + qty, 9) } : l))
        return [...prev, { productId, ml, qty }]
      })
      const p = getProduct(productId)
      if (p) flash(`${p.name}, ${ml}ml — added to your bag`)
    },
    [flash],
  )

  const setQty = useCallback((productId: string, ml: number, qty: number) => {
    setBag((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.productId === productId && l.ml === ml))
        : prev.map((l) => (l.productId === productId && l.ml === ml ? { ...l, qty: Math.min(qty, 9) } : l)),
    )
  }, [])

  const remove = useCallback((productId: string, ml: number) => setQty(productId, ml, 0), [setQty])

  const toggleWish = useCallback(
    (productId: string) => {
      const on = wishlist.includes(productId)
      setWishlist((prev) => (on ? prev.filter((id) => id !== productId) : [...prev, productId]))
      const p = getProduct(productId)
      if (p) flash(on ? `${p.name} removed from your wishlist` : `${p.name} saved to your wishlist`)
    },
    [wishlist, flash],
  )

  const close = useCallback(() => setPanel(null), [])

  const lines = useMemo<ResolvedLine[]>(
    () =>
      bag.flatMap((l) => {
        const product = getProduct(l.productId)
        const variant = product?.variants.find((v) => v.ml === l.ml)
        return product && variant ? [{ ...l, product, variant }] : []
      }),
    [bag],
  )

  const value = useMemo<ShopState>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.variant.price, 0),
      wishlist,
      panel,
      notice,
      add,
      setQty,
      remove,
      toggleWish,
      isWished: (id) => wishlist.includes(id),
      open: setPanel,
      close,
    }),
    [lines, wishlist, panel, notice, add, setQty, remove, toggleWish, close],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop(): ShopState {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>')
  return ctx
}
