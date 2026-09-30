import { useCallback, useEffect, useState } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Newsletter } from './components/Footer'
import { Header } from './components/Header'
import { BagDrawer, Notice, SearchOverlay } from './components/Overlays'
import { Preloader } from './components/Preloader'
import { Account, About, Journal } from './pages/Editorial'
import Home from './pages/Home'
import { MoodPage, MoodsIndex } from './pages/Moods'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import Shop from './pages/Shop'
import { Checkout, Wishlist } from './pages/Utility'
import { IntroContext } from './store/intro'
import { ShopProvider } from './store/shop'

const titles: Record<string, string> = {
  '/': 'MOODS Fragrances — Find the fragrance that feels like you',
  '/shop': 'Shop all fragrances — MOODS',
  '/moods': 'Shop by mood — MOODS',
  '/about': 'About — MOODS',
  '/journal': 'Journal — MOODS',
  '/wishlist': 'Wishlist — MOODS',
  '/account': 'Account — MOODS',
  '/checkout': 'Checkout — MOODS',
}

/** Scroll to top (or to a #hash) on navigation; keep titles in step. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (titles[pathname]) document.title = titles[pathname]
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView())
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
      <BagDrawer />
      <SearchOverlay />
      <Notice />
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  return (
    <ShopProvider>
      <IntroContext.Provider value={ready}>
        <Preloader onDone={onDone} />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="fragrance/:id" element={<Product />} />
            <Route path="moods" element={<MoodsIndex />} />
            <Route path="moods/:id" element={<MoodPage />} />
            <Route path="about" element={<About />} />
            <Route path="journal" element={<Journal />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="account" element={<Account />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </IntroContext.Provider>
    </ShopProvider>
  )
}
