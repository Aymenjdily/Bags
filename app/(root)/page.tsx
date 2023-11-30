import Image from 'next/image'
import { Categories, Intro, Products } from './components'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Intro />
      <Categories />
      <Products />
    </Fragment>
  )
}
