import prisma from "@/prisma/client";
import { Badge, Card, Flex } from "@radix-ui/themes";
import React from "react";

const OrderDetails = async ({ params }: { params: { id: string } }) => {
  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      products: true,
    },
  });

  return (
    <Flex direction={"column"}>
      <h1 className="font-bold text-xl">Order informations</h1>
      <Card className="max-w-xl px-5" mt="5">
        <Flex py="4" direction={"column"} gap="5">
          <Flex gap="5" wrap="wrap">
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">Full Name</h1>
              <span className="font-bold">
                {order?.firstName} {order?.secondName}
              </span>
            </Flex>
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">Email</h1>
              <span className="font-bold">{order?.email}</span>
            </Flex>
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">Phone</h1>
              <span className="font-bold">{order?.phone}</span>
            </Flex>
          </Flex>
        </Flex>
        <Flex py="4" direction={"column"} gap="5">
          <Flex gap="5" wrap="wrap">
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">City</h1>
              <span className="font-bold">
                {order?.firstName} {order?.city}
              </span>
            </Flex>
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">address</h1>
              <span className="font-bold">{order?.address}</span>
            </Flex>
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">Order State</h1>
              {order?.state === "PENDING" && (
                <Badge color="gray">Pending</Badge>
              )}
              {order?.state === "DELIVERED" && (
                <Badge color="green">Delivered</Badge>
              )}
              {order?.state === "CANCELED" && (
                <Badge color="red">Canceled</Badge>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex py="4" direction={"column"} gap="5">
          <Flex gap="5" wrap="wrap" direction={"column"}>
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">Total</h1>
              <span className="font-bold">
                {order?.total} MAD
              </span>
            </Flex>
            <Flex direction={"column"} gap="1">
              <h1 className="text-sm">Products</h1>
              <Flex direction={"column"} gap="2" className="font-bold">{order?.products.map((product:any) => (
                <span key={product.id}>
                  {product.name}
                </span>
              ))}</Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default OrderDetails;
