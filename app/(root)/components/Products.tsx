import { Flex } from "@radix-ui/themes";
import React from "react";
import ProductsList from "./ProductsList";
import prisma from "@/prisma/client";
import { BagsCategories } from "@/constants";
import { product } from "@prisma/client";

interface Props {
  products: product[]
}


const Products = async ({ products }: Props) => {
  const filteredProducts = products.filter((product) => product.isInStock)

  return (
    <Flex
      px="5"
      className="max-w-7xl mx-auto py-10"
      direction={"column"}
      gap="6"
      id="collection"
    >
      <h1 className="text-lg font-semibold">
        {`"${filteredProducts.length} Results"`}
      </h1>
      <ProductsList products={filteredProducts} />
    </Flex>
  );
};

export default Products;
