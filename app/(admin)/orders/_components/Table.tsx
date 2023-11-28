"use client";

import { order } from "@prisma/client";
import { Badge, Flex, Table } from "@radix-ui/themes";
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import DeleteModal from "../../_components/DeleteModal";
import Link from "next/link";
import { useState } from "react";
import Filters from "./Filters";

type Props = {
  orders: order[];
};

const OrdersTable = ({ orders }: Props) => {
  const [search, setSearch] = useState("");
  const filteredOrders = orders.filter((order) => {
    if (search) {
      return order.firstName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    }
    return order;
  });
  return (
    <>
      <Filters search={search} setSearch={setSearch} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width={"40%"}>
              client
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>products</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>total</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredOrders.map((order) => {
            return (
              <Table.Row key={order.id} align={"center"}>
                <Table.Cell>
                  {order.firstName} {order.secondName}
                </Table.Cell>
                <Table.Cell>
                  {order.city}, {order.address}
                </Table.Cell>
                <Table.Cell>
                  {/* @ts-ignore */}
                  {order.products.length}
                </Table.Cell>
                <Table.Cell>{order.total} MAD</Table.Cell>
                <Table.Cell>
                  {order.state === "PENDING" && (
                    <Badge color="gray">Pending</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Flex align={"center"} gap="2">
                    <Link href="" className="btn btn-sm btn-neutral text-white">
                      <Flex align={"center"} gap="2">
                        <FaEye />
                        <span className="text-sm">View</span>
                      </Flex>
                    </Link>
                    <DeleteModal
                      id={order.id}
                      api={"/api/product"}
                      route={"/products"}
                    />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default OrdersTable;
