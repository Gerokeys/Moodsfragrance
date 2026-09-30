import { Hero } from '../sections/Hero'
import {
  BrandStatement,
  Campaign,
  HouseIntro,
  IntimacyStatement,
  JournalTeaser,
  MoodSelector,
  MostLoved,
  SignatureScents,
} from '../sections/HomeSections'
import { useIntro } from '../store/intro'

export default function Home() {
  const ready = useIntro()
  return (
    <>
      <Hero ready={ready} />
      <HouseIntro />
      <IntimacyStatement />
      <SignatureScents />
      <Campaign />
      <MoodSelector />
      <MostLoved />
      <BrandStatement />
      <JournalTeaser />
    </>
  )
}
