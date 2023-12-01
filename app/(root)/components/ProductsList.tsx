"use client"

import { useCart } from '@/context/CartContext'
import { product } from '@prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";

interface Props {
  products: product[]
}

const ProductsList = ({ products }: Props) => {
  const { addToCart } = useCart()
  const [isAdded, setAdded] = useState<any>(null)

  useEffect(() => {
    setTimeout(() => {
      setAdded(null)
    }, 3000);
  }, [isAdded])

  const handleClick = (id:string) => {
    setAdded(id === isAdded ? null: id)
  }
  
  return (
    <>
      <Grid columns={{ md:"3", sm:"2", initial:"1" }} gap="5">
        {
          products.map((product) => (
            <Flex key={product.id} direction={"column"} p="5" className='bg-gray-50 border rounded-2xl'>
              <Box className='relative w-full h-96'>
                <Image
                  src={product.photo}
                  alt={product.name}
                  fill
                  className='object-cover rounded-2xl'
                  quality={100}
                />
              </Box>
              <Flex justify={"between"} align={"start"} gap="3" mt="5">
                <Flex direction={"column"} gap="1" className='flex-1'>
                  <h1 className='font-bold text-xl'>
                    {product.name}
                  </h1>
                  <p>
                    {product.subTitle}
                  </p>
                </Flex>
                <p className='font-bold text-redColor'>
                  {product.price} MAD
                </p>
              </Flex>
              <Flex mt="3" gap="3">
                <Link href="" className='btn flex-1 text-white'>
                  View Details
                </Link>
                <button className='btn flex-1 bg-greenColor text-black hover:bg-greenColor hover:text-black border-none'
                  onClick={() => {
                    addToCart(product)
                    handleClick(product.id)
                  }}
                >
                  { isAdded === product.id && (
                    <FaCheck />
                  )}
                  Add to Cart
                </button>
              </Flex>
            </Flex>
          ))
        }
      </Grid>
    </>
  )
}

export default ProductsList