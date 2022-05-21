import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Search } from 'react-feather'
import { Layout } from '../components/layouts'
import { Card, CardsSlider, AdHeader, SliderButton, UserHeader, SearchInput } from '../components/ui'
import { SectionContainer } from '../components/ui'
import ListButtonsPlaceholder from '../components/ui/ListButtonsPlaceholder'
import { Category } from '../interfaces'

import { useGetCategoriesListQuery, useGetCategoryProductsQuery } from '../services/auth'


const Home: NextPage = () => {

  const router = useRouter()

  const { data: categories, isError: errorCategories, isLoading: isLoadingCategories } = useGetCategoriesListQuery();
  const { data: products, isError: errorProducts, isLoading: isLoadingProducts } = useGetCategoryProductsQuery(1);


  // const { products, isLoadingProducts, errorProducts } = useProducts('http://192.168.0.12:5000', 'categories/1')

  return (
    <Layout title="Pancho's Villa">
      <div className='flex w-full flex-col-reverse md:space-y-0 md:flex-row md:space-x-6'>
        <div className='pt-4 md:pt-0 md:w-8/12 lg:w-9/12 flex-none transition-all'>
          <AdHeader />
          {/* <div className='pt-4'>
            <SearchInput error={false} label='Buscar' Icon={Search} />

          </div> */}
          <SectionContainer title='🔥 Categorías'>
            <CardsSlider>
              {isLoadingCategories || errorCategories ?
                <ListButtonsPlaceholder /> :
                categories!.map((category) =>
                  <SliderButton onSelect={() => router.push(`/menu?category=${category.id}`)} key={category.id} category={category} selected={false} />
                )}
            </CardsSlider>
          </SectionContainer>
          <SectionContainer title='🔥 Populares'>
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-x-4 top-0 gap-y-6 ${isLoadingProducts ? 'h-40' : ''}`}>
              {!isLoadingProducts && !errorProducts && (products! as Category).productsList.map((product) =>
                <Card key={product.id} id={product.id} title={product.name} image={product.image} price={parseFloat(product.price)} />)}
            </div>
          </SectionContainer>
        </div>
        <div className='w-full md:w-4/12 lg:w-3/12'>
          <UserHeader />
        </div>
      </div>
    </Layout>
  )
}

export default Home
