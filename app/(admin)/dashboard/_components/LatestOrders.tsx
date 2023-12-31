import prisma from "@/prisma/client";
import { Badge, Card, Flex, Table, TableBody } from "@radix-ui/themes";
import React from "react";

const LatestOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 12
  });
  return (
    <Card className="w-full">
      <Flex direction={"column"} p="3" className="bg-gray-50 h-full">

      <h1 className="font-bold">Latest Orders</h1>
      <Table.Root mt={"3"} variant="surface">
        <TableBody>
          {orders.map((order: any) => (
            <Table.Row key={order.id}>
              <Table.Cell>
                <Flex direction={"column"}>
                  <h1 className="font-bold">
                    {order.firstName} {order.secondName}
                  </h1>
                </Flex>
              </Table.Cell>
              <Table.Cell>{order.total} MAD</Table.Cell>
              <Table.Cell>
                {order.state === "PENDING" && (
                  <Badge color="gray">Pending</Badge>
                )}
                {order.state === "DELIVERED" && (
                  <Badge color="green">Delivered</Badge>
                )}
                {order.state === "CANCELED" && (
                  <Badge color="red">Canceled</Badge>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
      </Flex>
    </Card>
  );
};

export const dynamic = 'force-dynamic'

export default LatestOrders;
