import prisma from "@/prisma/client";
import React from "react";
import ProductForm from "../../_components/Form";

interface Props {
  params: {
    id: string;
  };
}

const EditProductPage = async ({ params: { id } }: Props) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <>
      <ProductForm product={product!} />
    </>
  );
};

export default EditProductPage;
