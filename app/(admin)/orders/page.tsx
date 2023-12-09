import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import Cards from "./_components/Cards";
import OrdersTable from "./_components/Table";
import { Status } from "@prisma/client";
import Pagination from "../_components/Pagination";

export interface OrdersQuery {
  page: string;
  status: Status;
  name: string;
}

interface Props {
  searchParams: OrdersQuery;
}

const OrdersPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const pageSize = 4;
  const orders = await prisma.order.findMany({
    where: {
      state: status,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      products: true,
    },
  });

  const ordersCount = await prisma.order.count({
    where: {
      state: status,
    },
  });

  return (
    <section>
      <Flex direction={"column"} gap="5">
        <h1 className="font-bold text-gray-600">Orders List</h1>
        <Cards orders={orders} />
        <OrdersTable orders={orders} />
        <Pagination
          itemCount={ordersCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </section>
  );
};

export const dynamic = 'force-dynamic'

export default OrdersPage;
