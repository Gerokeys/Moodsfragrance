# MOODS Fragrances — frontend

Editorial storefront for MOODS, a Nairobi fragrance house. Frontend only: product, mood and journal data are local mocks.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build
```

## Structure

| Path | What lives there |
| --- | --- |
| `src/styles/tokens.css` | Design tokens: colour, type scale, spacing, motion |
| `src/styles/base.css` | Reset, type utilities, buttons/links, reveal animations |
| `src/data/` | Mock catalogue (`products`, `moods`, `journal`) and the photography registry (`images`) |
| `src/store/shop.tsx` | Bag, wishlist and overlay state (persisted to localStorage) |
| `src/components/` | Header + mobile menu, preloader, product card, bag drawer, search, footer |
| `src/sections/` | Homepage sections |
| `src/pages/` | Shop, product, moods index/mood pages, about, journal, wishlist, account, checkout |

## Connecting a backend

- **Catalogue:** replace the arrays in `src/data/products.ts` / `moods.ts` with API calls. Components only depend on the `Product` / `Mood` types.
- **Images:** every image is referenced by key through `src/data/images.ts`. Swap `photoUrl()` to point at your CDN. Images are currently hot-linked from Unsplash (credited in the registry).
- **Cart:** each action in `src/store/shop.tsx` (`add`, `setQty`, `remove`, `toggleWish`) maps onto a single cart/wishlist endpoint.
- **Checkout / account:** `/checkout` and `/account` are UI only. Their forms only simulate submission; wire M-Pesa (STK push), card payments and auth there.
