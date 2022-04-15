import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { Card, CardsSlider, AdHeader, SliderButton, UserHeader } from '../components/ui'
import { SectionContainer } from '../components/ui'
import { categories } from '../data'


const Home: NextPage = () => {
  return (
    <Layout title="Pancho's Villa">
      <header className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
        <AdHeader />
        <UserHeader />
      </header>
      <SectionContainer title='Categoría'>
        <CardsSlider>
          {categories.map((category) => <SliderButton onSelect={() => { }} key={category} title={category} selected={false} />)}
        </CardsSlider>
      </SectionContainer>
      <SectionContainer title='Destacados'>
        <div className='grid grid-cols-2 md:grid-cols-6 gap-x-4 top-0 gap-y-6'>
          {categories.map((category) => <Card key={category} title={category} />)}
        </div>
      </SectionContainer>
    </Layout>
  )
}

export default Home
