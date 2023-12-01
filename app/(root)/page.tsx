import Image from 'next/image'
import { Categories, Intro, Products } from './components'
import { Fragment } from 'react'
import prisma from '@/prisma/client';
import { BagsCategories } from '../../constants/index';

type CATEGORIES = "event" | "large" | "shoulder" | "back"

interface ProductsQuery {
  category: CATEGORIES
}

interface Props {
  searchParams: ProductsQuery
}

export default async function Home({ searchParams }: Props) {
  const categories = Object.values(BagsCategories.map((item) => item.value))
  const categorie = categories.includes(searchParams.category) ? searchParams.category : undefined
  const products = await prisma.product.findMany({
    where: {
      category: categorie
    }
  });

  return (
    <Fragment>
      <Intro />
      <Categories />
      <Products products={products} />
    </Fragment>
  )
}
