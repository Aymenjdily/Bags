import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import React from 'react'
import Cards from './_components/Cards'
import OrdersTable from './_components/Table'

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: {
      products: true
    }
  })

  return (
    <section>
      <Flex direction={"column"} gap="5">
        <h1 className='font-bold text-gray-600'>
          Orders List
        </h1>
        <Cards orders={orders} />
        <OrdersTable orders={orders} />
      </Flex>
    </section>
  )
}

export default OrdersPage