import prisma from "@/prisma/client";
import { Badge, Flex } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { product } from '@prisma/client';
import ProductDetails from "./_components/ProductDetails";
import Products from "./_components/Products";
import ProductsList from "../../components/ProductsList";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  const products = await prisma.product.findMany()

  return (
    <Flex px="5" className="mx-auto max-w-7xl" align={"center"} justify={"center"} py="9" direction={"column"} gap="9">
      <Flex gap="5" wrap={{ md:"nowrap", initial:"wrap" }} justify={"center"} align={"center"}>
        <Image src={product?.photo!} alt={product?.name!} width={400} height={0} quality={100} className="rounded-2xl" />
       <ProductDetails product={product!}/>
      </Flex>
      <ProductsList products={products}/>
    </Flex>
  );
};

export default ProductDetail;
