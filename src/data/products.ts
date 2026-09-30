import type { PhotoKey } from './images'
import type { MoodId } from './moods'

export type Concentration = 'Eau de Parfum' | 'Eau de Toilette' | 'Cologne' | 'Parfum'

export interface Variant {
  ml: number
  price: number
  /** Original price when discounted */
  compareAt?: number
}

export interface Product {
  id: string
  brand: string
  name: string
  concentration: Concentration
  variants: Variant[]
  moods: MoodId[]
  family: string
  notes: { top: string[]; heart: string[]; base: string[] }
  description: string
  rating: number
  reviews: number
  image: PhotoKey
  /** Revealed on hover — usually a material or mood still-life */
  altImage: PhotoKey
  tag?: 'New' | 'Bestseller' | 'Limited'
}

export const products: Product[] = [
  {
    id: 'coco-mademoiselle',
    brand: 'Chanel',
    name: 'Coco Mademoiselle',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 50, price: 17800 }, { ml: 100, price: 24500 }],
    moods: ['romantic', 'elegant'],
    family: 'Floral Chypre',
    notes: { top: ['Orange', 'Bergamot'], heart: ['Rose', 'Jasmine'], base: ['Patchouli', 'White musk', 'Vetiver'] },
    description: 'A modern chypre with a clear, bright opening that dries down to patchouli and soft musk. Confident and very easy to wear.',
    rating: 4.9,
    reviews: 86,
    image: 'coco',
    altImage: 'roseBlush',
    tag: 'Bestseller',
  },
  {
    id: 'byredo-bibliotheque',
    brand: 'Byredo',
    name: 'Bibliothèque',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 50, price: 32000 }, { ml: 100, price: 46500 }],
    moods: ['mysterious', 'elegant'],
    family: 'Woody Leather',
    notes: { top: ['Plum', 'Peach'], heart: ['Peony', 'Violet'], base: ['Leather', 'Vanilla', 'Patchouli'] },
    description: 'The smell of a quiet library — soft leather bindings, ripe fruit and dust in the afternoon light.',
    rating: 4.8,
    reviews: 31,
    image: 'byredo',
    altImage: 'stoneVase',
  },
  {
    id: 'mfk-oud',
    brand: 'Maison Francis Kurkdjian',
    name: 'Oud',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 70, price: 44000 }],
    moods: ['seductive', 'mysterious'],
    family: 'Woody Oriental',
    notes: { top: ['Saffron', 'Elemi'], heart: ['Laotian oud', 'Cedar'], base: ['Patchouli', 'Vetiver'] },
    description: 'A luminous oud, polished rather than heavy. Saffron and cedar wrapped around a warm, resinous heart.',
    rating: 4.9,
    reviews: 18,
    image: 'mfkOud',
    altImage: 'amberDark',
    tag: 'Limited',
  },
  {
    id: 'jo-malone-wood-sage',
    brand: 'Jo Malone London',
    name: 'Wood Sage & Sea Salt',
    concentration: 'Cologne',
    variants: [{ ml: 30, price: 9800 }, { ml: 100, price: 19800, compareAt: 22000 }],
    moods: ['fresh'],
    family: 'Aromatic',
    notes: { top: ['Ambrette'], heart: ['Sea salt'], base: ['Sage', 'Grapefruit'] },
    description: 'Wind off the ocean and mineral-rich sea spray. Clean, a little salty, entirely unforced.',
    rating: 4.7,
    reviews: 54,
    image: 'joMalone',
    altImage: 'windowLight',
  },
  {
    id: 'miss-dior',
    brand: 'Dior',
    name: 'Miss Dior Blooming Bouquet',
    concentration: 'Eau de Toilette',
    variants: [{ ml: 50, price: 13900 }, { ml: 100, price: 18500 }],
    moods: ['romantic', 'fresh'],
    family: 'Floral',
    notes: { top: ['Sicilian mandarin'], heart: ['Peony', 'Damask rose'], base: ['White musk'] },
    description: 'Peony and rose with a light touch of mandarin — tender, sheer and made for daylight.',
    rating: 4.8,
    reviews: 42,
    image: 'missDior',
    altImage: 'petals',
  },
  {
    id: 'bleu-de-chanel',
    brand: 'Chanel',
    name: 'Bleu de Chanel',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 50, price: 15600 }, { ml: 100, price: 21500, compareAt: 23900 }],
    moods: ['boss-energy', 'elegant'],
    family: 'Woody Aromatic',
    notes: { top: ['Grapefruit', 'Lemon', 'Mint'], heart: ['Ginger', 'Nutmeg', 'Jasmine'], base: ['Sandalwood', 'Cedar', 'Incense'] },
    description: 'Citrus and cedar with a slow, smoky finish. Assured without ever raising its voice.',
    rating: 4.9,
    reviews: 112,
    image: 'bleu',
    altImage: 'handBleu',
    tag: 'Bestseller',
  },
  {
    id: 'replica-fireplace',
    brand: 'Maison Margiela',
    name: 'Replica By the Fireplace',
    concentration: 'Eau de Toilette',
    variants: [{ ml: 30, price: 8900 }, { ml: 100, price: 18900 }],
    moods: ['mysterious', 'seductive'],
    family: 'Woody Gourmand',
    notes: { top: ['Clove', 'Pink pepper'], heart: ['Chestnut', 'Guaiac wood'], base: ['Vanilla', 'Cashmeran'] },
    description: 'Chestnuts roasting, woodsmoke caught in wool. A winter evening you can carry.',
    rating: 4.7,
    reviews: 39,
    image: 'replica',
    altImage: 'woodBlock',
    tag: 'New',
  },
  {
    id: 'mon-paris',
    brand: 'Yves Saint Laurent',
    name: 'Mon Paris',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 50, price: 13500, compareAt: 15000 }, { ml: 90, price: 18200 }],
    moods: ['romantic', 'seductive'],
    family: 'Fruity Chypre',
    notes: { top: ['Strawberry', 'Raspberry', 'Pear'], heart: ['Datura', 'Peony'], base: ['White musk', 'Patchouli'] },
    description: 'A love story in red fruit and white flowers, grounded by patchouli. Sweet, but never naïve.',
    rating: 4.6,
    reviews: 27,
    image: 'monParis',
    altImage: 'monParisAlt',
  },
  {
    id: 'sauvage',
    brand: 'Dior',
    name: 'Sauvage',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 60, price: 13800 }, { ml: 100, price: 18500 }],
    moods: ['boss-energy', 'fresh'],
    family: 'Aromatic Fougère',
    notes: { top: ['Calabrian bergamot'], heart: ['Sichuan pepper', 'Lavender'], base: ['Ambroxan', 'Vanilla'] },
    description: 'Raw and fresh, with a warm ambery trail. The open sky, rendered in bergamot and pepper.',
    rating: 4.8,
    reviews: 140,
    image: 'sauvage',
    altImage: 'silkBlack',
  },
  {
    id: 'givenchy-gentleman',
    brand: 'Givenchy',
    name: 'Gentleman',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 60, price: 12400 }, { ml: 100, price: 15800 }],
    moods: ['boss-energy', 'mysterious'],
    family: 'Woody Floral',
    notes: { top: ['Black pepper', 'Pear'], heart: ['Iris', 'Lavender'], base: ['Black vanilla', 'Patchouli'] },
    description: 'Iris and black vanilla in a sharp black suit. Refined, a little dangerous.',
    rating: 4.6,
    reviews: 22,
    image: 'gentleman',
    altImage: 'jasmineNight',
  },
  {
    id: 'ysl-lhomme',
    brand: 'Yves Saint Laurent',
    name: "L'Homme",
    concentration: 'Eau de Toilette',
    variants: [{ ml: 60, price: 11200 }, { ml: 100, price: 14500 }],
    moods: ['elegant', 'fresh'],
    family: 'Woody Aromatic',
    notes: { top: ['Ginger', 'Bergamot'], heart: ['Violet leaf', 'White pepper'], base: ['Cedar', 'Vetiver'] },
    description: 'Ginger and cedar in clean, easy balance. The white shirt of a fragrance wardrobe.',
    rating: 4.5,
    reviews: 33,
    image: 'ysl',
    altImage: 'silkIvory',
  },
  {
    id: 'acqua-di-gio-absolu',
    brand: 'Giorgio Armani',
    name: 'Acqua di Giò Absolu',
    concentration: 'Eau de Parfum',
    variants: [{ ml: 75, price: 14200, compareAt: 16500 }, { ml: 125, price: 19900 }],
    moods: ['fresh', 'boss-energy'],
    family: 'Aquatic Woody',
    notes: { top: ['Bergamot', 'Pear'], heart: ['Marine notes', 'Rosemary'], base: ['Patchouli', 'Labdanum'] },
    description: 'Sun on salt water, with a deeper woody undertow than the original. Warm light at the end of the day.',
    rating: 4.7,
    reviews: 48,
    image: 'gio',
    altImage: 'rockAmber',
  },
]

export function getProduct(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id)
}

export function lowestVariant(p: Product): Variant {
  return p.variants.reduce((a, b) => (b.price < a.price ? b : a))
}

/** The variant shown on cards: prefer a discounted one so the offer is visible. */
export function featuredVariant(p: Product): Variant {
  return p.variants.find((v) => v.compareAt) ?? lowestVariant(p)
}

export const signatureIds = [
  'coco-mademoiselle',
  'byredo-bibliotheque',
  'bleu-de-chanel',
  'miss-dior',
  'mfk-oud',
  'jo-malone-wood-sage',
  'replica-fireplace',
  'mon-paris',
]
