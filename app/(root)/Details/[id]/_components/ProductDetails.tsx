"use client";

import { useCart } from "@/context/CartContext";
import { product } from "@prisma/client";
import { Flex, Badge } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  product: product;
}

const ProductDetails = ({ product }: Props) => {
  const { addToCart } = useCart();
  const router = useRouter()

  return (
    <Flex direction={"column"} gap="2">
      <h1 className="font-bold text-2xl">
        {product?.name} <Badge color="gray">{product?.category}</Badge>
      </h1>
      <h3 className="max-w-lg text-gray-500">{product?.subTitle}</h3>
      <span className="font-bold text-2xl text-redColor">
        {product?.price} MAD
      </span>
      <p>{product?.description}</p>
      <Flex align={"start"} justify={"start"} mt="5">
        <button
            className="btn bg-greenColor text-black hover:bg-greenColor hover:text-black border-none"
            onClick={() => {
            addToCart(product);
            router.push('/Checkout')
            }}
        >
            Add to Cart
        </button>
      </Flex>
    </Flex>
  );
};

export default ProductDetails;
