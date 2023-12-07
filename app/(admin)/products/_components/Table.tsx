"use client"

import { product } from "@prisma/client";
import { Badge, Button, DropdownMenu, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineClose  } from "react-icons/md";
import DeleteModal from "../../_components/DeleteModal";
import Filters from "./Filters";
import { useState } from 'react'

type Props = {
  products: product[];
};

const ProductsTable = ({ products }: Props) => {
  const [search, setSearch] = useState("")
  const filteredProducts = products.filter((product) => {
    if(search){
      return product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    }
    return product
  })
  
  return (
    <>
      <Filters search={search} setSearch={setSearch} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width={"40%"}>name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>createdAt</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredProducts.map((product) => {
            const creationDate = new Date(product.createdAt);
            return (
              <Table.Row key={product.id} align={"center"}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.price} MAD</Table.Cell>
                <Table.Cell>{creationDate.toDateString()}</Table.Cell>
                <Table.Cell>
                  {product.isInStock ? (
                    <Badge color="green">
                      In stock
                    </Badge>
                  ) : (
                    <Badge color="red">
                      Out of stock
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Flex align={"center"} gap="2">
                    <Link href={`/Details/${product.id}`} className="btn btn-sm btn-neutral text-white">
                      <Flex align={"center"} gap="2">
                        <FaEye />
                        <span className="text-sm">
                          View
                        </span>
                      </Flex>
                    </Link>
                    <Link href={`/products/edit/${product.id}`} className="btn btn-sm btn-info text-white">
                      <Flex align={"center"} gap="2">
                        <FaPencil />
                        <span className="text-sm">
                          Edit
                        </span>
                      </Flex>
                    </Link>
                    <DeleteModal id={product.id} api={"/api/product"} route={"/products"} />
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

export default ProductsTable;
