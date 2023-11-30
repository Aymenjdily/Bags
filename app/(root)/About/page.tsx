import { Flex } from '@radix-ui/themes'
import React from 'react'
import { Overview } from '../components'

const AboutPage = () => {
  return (
    <Flex px="5" className='max-w-7xl mx-auto py-12' direction={"column"} gap={"5"}>
        <Overview />
    </Flex>
  )
}

export default AboutPage