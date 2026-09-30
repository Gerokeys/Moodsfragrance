import type { PhotoKey } from './images'

export interface Article {
  id: string
  category: string
  title: string
  excerpt: string
  image: PhotoKey
  date: string
  readMinutes: number
}

export const articles: Article[] = [
  {
    id: 'wearing-scent-in-the-heat',
    category: 'Ritual',
    title: 'Wearing scent in the Nairobi heat',
    excerpt: 'Why the same perfume smells different at noon than it does after the rain — and where to apply it so it lasts the day.',
    image: 'handLinen',
    date: '2026-09-18',
    readMinutes: 5,
  },
  {
    id: 'a-fragrance-wardrobe',
    category: 'Guide',
    title: 'Building a fragrance wardrobe of three',
    excerpt: 'One for the morning, one for the evening, one that is only yours. A quiet case for owning less, and wearing it better.',
    image: 'stillVase',
    date: '2026-08-29',
    readMinutes: 7,
  },
  {
    id: 'scent-and-memory',
    category: 'Essay',
    title: 'Scent is the last thing we forget',
    excerpt: 'On the strange intimacy of smell, and the perfumes that carry a person long after they have left the room.',
    image: 'skinBW',
    date: '2026-08-02',
    readMinutes: 4,
  },
]
