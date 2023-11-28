import React from "react";
import Cards from "./_components/Cards";
import ProductsTable from "./_components/Table";
import { Flex } from "@radix-ui/themes";
import Filters from "./_components/Filters";
import prisma from "@/prisma/client";
import Pagination from "../_components/Pagination";

export interface ProductsQuery {
  page: string;
  status: string;
  name: string;
}

interface Props {
  searchParams: ProductsQuery;
}

const ProductsPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const status =
    searchParams.status === "in"
      ? true
      : searchParams.status === "out"
      ? false
      : undefined;

  const pageSize = 4;
  const products = await prisma.product.findMany({
    where: {
      isInStock: status,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const productsCount = await prisma.product.count({
    where: {
      isInStock: status,
    },
  });

  return (
    <section>
      <Flex direction={"column"} gap="5">
        <h1 className="font-bold text-gray-600">Products LIst</h1>
        <Cards products={products} />
        <ProductsTable products={products} />
        <Pagination
          itemCount={productsCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </section>
  );
};

export default ProductsPage;
