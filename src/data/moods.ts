import type { PhotoKey } from './images'

export type MoodId = 'romantic' | 'seductive' | 'elegant' | 'fresh' | 'mysterious' | 'boss-energy'

export interface Mood {
  id: MoodId
  name: string
  /** Short sensory line shown under the mood name */
  line: string
  /** Longer editorial copy for the mood page */
  story: string
  image: PhotoKey
  /** Monochrome colour story — used as a quiet ground, never as a gradient */
  tone: { ground: string; ink: string; muted: string }
  families: string[]
}

export const moods: Mood[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    line: 'Soft, intimate, floral and warm',
    story: 'Rose held close to the skin. Peony, iris and a trace of musk — scents that feel like a hand at the small of the back.',
    image: 'roseBlush',
    tone: { ground: '#efe4de', ink: '#3b2a27', muted: '#8a716b' },
    families: ['Floral', 'Powdery', 'Musk'],
  },
  {
    id: 'seductive',
    name: 'Seductive',
    line: 'Deep, warm, skin-close and unhurried',
    story: 'Oud, amber and dark vanilla. Fragrances that settle into the skin and are noticed only when someone leans in.',
    image: 'amberDark',
    tone: { ground: '#2a1a17', ink: '#f1e6dc', muted: '#b39a8c' },
    families: ['Amber', 'Oud', 'Vanilla'],
  },
  {
    id: 'elegant',
    name: 'Elegant',
    line: 'Polished, luminous, quietly assured',
    story: 'Aldehydes, white florals and clean woods. The scent equivalent of a pressed collar — nothing loud, nothing out of place.',
    image: 'stoneBottle',
    tone: { ground: '#eee8dd', ink: '#2b2824', muted: '#86796a' },
    families: ['Aldehydic', 'White floral', 'Iris'],
  },
  {
    id: 'fresh',
    name: 'Fresh',
    line: 'Clean, airy, green and bright',
    story: 'Sea salt, fig leaf, bergamot and cut grass. Morning scents with the windows open and the day not yet decided.',
    image: 'whiteSilkBottles',
    tone: { ground: '#e9ecea', ink: '#23302c', muted: '#74827c' },
    families: ['Citrus', 'Aquatic', 'Green'],
  },
  {
    id: 'mysterious',
    name: 'Mysterious',
    line: 'Smoky, resinous, shadowed and slow',
    story: 'Incense, old paper, leather and smoke. Fragrances that reveal themselves in the dark, one note at a time.',
    image: 'jasmineNight',
    tone: { ground: '#1d1c1a', ink: '#ece7df', muted: '#8f8a82' },
    families: ['Smoky', 'Leather', 'Incense'],
  },
  {
    id: 'boss-energy',
    name: 'Boss Energy',
    line: 'Sharp, confident, woody and composed',
    story: 'Vetiver, cedar, black pepper and cold spice. For the meeting, the negotiation, the entrance.',
    image: 'handBleu',
    tone: { ground: '#1a1512', ink: '#efe6dc', muted: '#a18f80' },
    families: ['Woody', 'Aromatic', 'Spicy'],
  },
]

export function getMood(id: string | undefined): Mood | undefined {
  return moods.find((m) => m.id === id)
}
