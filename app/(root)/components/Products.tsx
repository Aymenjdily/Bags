import { Flex } from "@radix-ui/themes";
import React from "react";
import ProductsList from "./ProductsList";
import prisma from "@/prisma/client";

const Products = async () => {
  const products = await prisma.product.findMany();

  return (
    <Flex
      px="5"
      className="max-w-7xl mx-auto mt-10"
      direction={"column"}
      gap="6"
    >
      <h1 className="text-lg font-semibold">
        {`"${products.length} Results"`}
      </h1>
      <ProductsList />
    </Flex>
  );
};

export default Products;
