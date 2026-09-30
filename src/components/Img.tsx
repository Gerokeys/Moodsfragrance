import { useState } from 'react'
import { photo, photoSrcSet, photoUrl, type PhotoKey } from '../data/images'

interface ImgProps {
  k: PhotoKey
  sizes?: string
  className?: string
  /** Above-the-fold images: eager load, high fetch priority */
  priority?: boolean
  /** Override the photo's default focal point */
  focus?: string
  alt?: string
  onLoad?: () => void
}

export function Img({ k, sizes = '100vw', className = '', priority, focus, alt, onLoad }: ImgProps) {
  const p = photo(k)
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`}
      src={photoUrl(p, 1280)}
      srcSet={photoSrcSet(p)}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ objectPosition: focus ?? p.focus ?? '50% 50%' }}
      ref={(el) => {
        // Cached images can finish before React attaches onLoad
        if (el?.complete && el.naturalWidth && !loaded) {
          setLoaded(true)
          onLoad?.()
        }
      }}
      onLoad={() => {
        setLoaded(true)
        onLoad?.()
      }}
    />
  )
}
