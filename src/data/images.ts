/**
 * Photography registry.
 *
 * Every image on the site is referenced by key, never by raw URL, so the
 * source can be swapped for a real CDN / DAM later without touching components.
 * Current source: Unsplash (hot-linked through their imgix CDN, which handles
 * resizing and format negotiation).
 */

export interface Photo {
  /** Unsplash photo path, e.g. `photo-1752520836249-2b8738e12664` */
  src: string
  width: number
  height: number
  alt: string
  credit: string
  /** CSS object-position — keeps the subject framed when cropped */
  focus?: string
}

const photos = {
  // Editorial / campaign
  shadowTravertine: { src: 'photo-1752520836249-2b8738e12664', width: 4000, height: 6000, alt: 'The shadow of a perfume bottle falling across warm travertine', credit: 'mae black', focus: '50% 70%' },
  magnolia: { src: 'photo-1747914252721-8eff13bd9519', width: 3903, height: 5854, alt: 'White magnolia branch in late afternoon light', credit: 'Keila Hötzel', focus: '50% 60%' },
  windowLight: { src: 'photo-1678511446570-5fc2f676e564', width: 3000, height: 3000, alt: 'Evening sun falling through a window onto a pale wall', credit: 'Ezy Wiranda' },
  linenShadow: { src: 'photo-1627823569857-4d8581dc62b2', width: 3500, height: 2333, alt: 'A glass flacon on draped linen, leaf shadows moving across it', credit: 'Camille Brodard', focus: '60% 50%' },
  palmShadow: { src: 'photo-1727348816151-e3fc0089249a', width: 2160, height: 2700, alt: 'A bottle with a wooden cap beside its long shadow and palm leaves', credit: 'Pavlo Talpa' },
  handLinen: { src: 'photo-1600086586698-368d69f00d6e', width: 3072, height: 4608, alt: 'A hand holding a perfume bottle against white linen', credit: 'Laura Chouette', focus: '50% 55%' },
  profileBW: { src: 'photo-1698306815496-a3017e597d1e', width: 5184, height: 3456, alt: 'A woman in profile against a pale grey wall', credit: 'srinivas bandari', focus: '55% 50%' },
  skinLight: { src: 'photo-1666087463681-5d8fe1de3590', width: 4480, height: 6720, alt: 'A woman in darkness, a single band of warm light across her face', credit: 'Amir Kiani', focus: '50% 35%' },
  skinBW: { src: 'photo-1542850348-362d6e414c58', width: 2848, height: 4288, alt: 'Black and white portrait, light on the shoulder and neck', credit: 'Emiliano Vittoriosi' },
  stillVase: { src: 'photo-1638303322573-9e96d39a9cfd', width: 2776, height: 3701, alt: 'A white ceramic vase with red berries against olive drapery', credit: 'Mary Skrynnikova' },
  pampas: { src: 'photo-1719294082942-68cb3d9e31b7', width: 2196, height: 3400, alt: 'A single stem of dried grass in a glass vase', credit: 'Yana Smetana' },
  stillOlive: { src: 'photo-1638303322580-5e6aacd59c0d', width: 2656, height: 3541, alt: 'Ceramic vessels and fruit on a draped table', credit: 'Mary Skrynnikova' },
  stoneVase: { src: 'photo-1667312939934-60fc3bfa4ec0', width: 4317, height: 6476, alt: 'A stone vase beside stacked books on a pale shelf', credit: 'Karolina Grabowska' },

  // Mood materials
  roseBlush: { src: 'photo-1517002152503-aeda5fe2cd36', width: 3149, height: 3935, alt: 'A blush rose in a glass vase', credit: 'Jess Bailey' },
  petals: { src: 'photo-1623077227088-94024ab979c8', width: 4444, height: 2500, alt: 'Soft pink petals, close up', credit: 'Kier in Sight Archives' },
  silkIvory: { src: 'photo-1619043518800-7f14be467dca', width: 4032, height: 3024, alt: 'Ivory silk, softly folded', credit: 'Susan Wilkinson' },
  silkCream: { src: 'photo-1732869415090-179de017b6d6', width: 5600, height: 8400, alt: 'Cream silk draped in long folds', credit: 'Pawel Czerwinski' },
  velvetBurgundy: { src: 'photo-1628973434123-3e956f203dd6', width: 6026, height: 4004, alt: 'Deep burgundy velvet', credit: 'Julissa Santana' },
  silkBlack: { src: 'photo-1686175600613-2093947b8639', width: 4016, height: 6016, alt: 'Black satin in heavy folds', credit: 'Kateryna Hliznitsova' },
  roseDark: { src: 'photo-1580124917341-d318cbacc34f', width: 2000, height: 2640, alt: 'A dark rose emerging from black', credit: 'Salman Khan' },
  amberDark: { src: 'photo-1761329842950-f3551938e4da', width: 5165, height: 7295, alt: 'An amber flacon lit by a slice of orange light', credit: 'One91creative', focus: '50% 65%' },
  stoneBottle: { src: 'photo-1705899853374-d91c048b81d2', width: 3712, height: 5568, alt: 'A white-capped bottle resting on pale stones', credit: 'Content Pixie' },
  whiteSilkBottles: { src: 'photo-1571206508927-2ef3026ada5d', width: 3840, height: 5760, alt: 'Two clear flacons lying in white sheets', credit: 'Kailey Sniffin' },
  jasmineNight: { src: 'photo-1761893678289-8264363e5763', width: 3000, height: 4000, alt: 'White jasmine flowers in deep shadow', credit: 'Asanka Maduranga' },
  handBleu: { src: 'photo-1593323505697-77e2136029aa', width: 2268, height: 4032, alt: 'A hand holding a dark blue bottle in low light', credit: 'A A', focus: '50% 45%' },
  leafShadowGold: { src: 'photo-1661625079424-dc3870671f24', width: 4016, height: 5020, alt: 'A gold flacon half in leaf shadow', credit: 'Kate Tepla' },
  furGrey: { src: 'photo-1666621630026-862eea07236c', width: 3825, height: 4781, alt: 'A bottle nested in soft grey fur', credit: 'Pavlo Talpa' },
  glassMono: { src: 'photo-1663869960499-6866301c0259', width: 3316, height: 4974, alt: 'A clear glass bottle on grey fabric, black and white', credit: 'Ernys' },
  woodBlock: { src: 'photo-1749191745108-c636380b2898', width: 4480, height: 6720, alt: 'A bottle with a carved wooden cap on a dark surface', credit: 'Abhinav M S' },
  rockAmber: { src: 'photo-1743309043742-9b4976a16478', width: 4000, height: 6000, alt: 'An amber bottle wedged between sunlit rocks and driftwood', credit: 'East Graphic' },
  roseWhite: { src: 'photo-1520636004470-fb63ec181d8e', width: 2480, height: 2480, alt: 'A single white rose in a small glass vase', credit: 'Nik' },

  // Product photography
  ysl: { src: 'photo-1588482587611-692b19ee797b', width: 3027, height: 4540, alt: "Yves Saint Laurent L'Homme on a reflective surface", credit: 'Pesce Huang' },
  byredo: { src: 'photo-1664198874730-86cd91c757b7', width: 3808, height: 4760, alt: 'Byredo Bibliothèque on a thin shelf', credit: 'Pavlo Talpa' },
  joMalone: { src: 'photo-1664198891866-8a35b73bb95f', width: 3440, height: 4300, alt: 'Jo Malone London cologne on cracked white plaster', credit: 'Pavlo Talpa' },
  missDior: { src: 'photo-1458538977777-0549b2370168', width: 4288, height: 2848, alt: 'Miss Dior in soft pink light', credit: 'Jessica Weiller', focus: '52% 50%' },
  coco: { src: 'photo-1585218356022-6a53145f56f6', width: 3072, height: 4096, alt: 'Chanel Coco Mademoiselle against coral', credit: 'Laura Chouette' },
  replica: { src: 'photo-1666266677210-2f746a114e84', width: 3877, height: 4846, alt: 'Maison Margiela Replica on a marble plinth', credit: 'Pavlo Talpa' },
  bleu: { src: 'photo-1698793916137-30f994d15133', width: 4342, height: 6513, alt: 'Bleu de Chanel in a slice of light', credit: 'Robert Arnar', focus: '50% 62%' },
  sauvage: { src: 'photo-1767187861728-942f561b7103', width: 2897, height: 3668, alt: 'Dior Sauvage against black', credit: 'Lufefe Ngilana' },
  monParis: { src: 'photo-1676951394482-1e74ba15d703', width: 3840, height: 5760, alt: 'Two bottles of Mon Paris on chocolate satin', credit: 'Ryan Lu' },
  monParisAlt: { src: 'photo-1676950933747-5f886cadf014', width: 3840, height: 5760, alt: 'Mon Paris with dried flowers and a pale moon', credit: 'Ryan Lu' },
  gentleman: { src: 'photo-1780943004195-3bd30f748872', width: 4016, height: 6016, alt: 'Givenchy Gentleman on black rock', credit: 'Ionut Vlad' },
  mfkOud: { src: 'photo-1637645380612-bfd37805442e', width: 6240, height: 4160, alt: 'Maison Francis Kurkdjian Oud held in warm evening light', credit: 'Trung Nhan Tran', focus: '46% 50%' },
  no5: { src: 'photo-1588405748880-12d1d2a59f75', width: 4000, height: 6000, alt: 'A gold flacon glowing on rumpled white sheets', credit: 'Emily Wang' },
  gio: { src: 'photo-1584111703185-efa00bd475f6', width: 6000, height: 4000, alt: "Acqua di Giò Absolu in slatted sunlight", credit: 'Dorrell Tibbs', focus: '70% 50%' },
  nostalgie: { src: 'photo-1668022943654-82c4fef46f83', width: 3471, height: 3471, alt: 'A clear bottle on white, beside glass spheres', credit: 'shahed mufleh' },
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

export function photo(key: PhotoKey): Photo {
  return photos[key]
}

const WIDTHS = [480, 720, 960, 1280, 1600, 2000, 2400]

/** Build a sized URL for a photo. Swap this function when moving to a real CDN. */
export function photoUrl(p: Photo, width: number, quality = 78): string {
  return `https://images.unsplash.com/${p.src}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function photoSrcSet(p: Photo, max = 2400): string {
  return WIDTHS.filter((w) => w <= Math.min(max, p.width))
    .map((w) => `${photoUrl(p, w)} ${w}w`)
    .join(', ')
}
