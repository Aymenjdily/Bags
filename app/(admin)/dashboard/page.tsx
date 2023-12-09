import React from "react";
import Header from "./_components/Header";
import { Flex } from "@radix-ui/themes";
import LatestOrders from "./_components/LatestOrders";
import OrdersChart from "./_components/OrdersChart";
import prisma from "@/prisma/client";

const DashboardPage = async () => {
  const deliverd = await prisma.order.count({
    where: {
      state: "DELIVERED"
    }
  })

  const canceled = await prisma.order.count({
    where: {
      state: "CANCELED"
    }
  })

  const pending = await prisma.order.count({
    where: {
      state: "PENDING"
    }
  })

  return (
    <Flex gap="5">
      <Flex direction={"column"} gap="5">
        <Header />
        <OrdersChart delivered={deliverd} pending={pending} canceled={canceled} />
      </Flex>
      <LatestOrders />
    </Flex>
  );
};

export const dynamic = 'force-dynamic'

export default DashboardPage;
