import { Flex } from '@radix-ui/themes'
import React from 'react'
import { SubmitForm } from '../components'

const CheckoutPage = () => {
  return (
    <Flex px="5" className='mx-auto max-w-7xl'>
        <SubmitForm />
    </Flex>
  )
}

export default CheckoutPage