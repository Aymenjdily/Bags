import { product } from "@prisma/client";
import { Button, DropdownMenu, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineClose  } from "react-icons/md";
import DeleteModal from "../../_components/DeleteModal";

type Props = {
  products: product[];
};

const ProductsTable = ({ products }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>createdAt</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => {
          const creationDate = new Date(product.createdAt);
          return (
            <Table.Row key={product.id} align={"center"}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{creationDate.toDateString()}</Table.Cell>
              <Table.Cell>
                <Flex align={"center"} gap="2">
                  <Link href="" className="btn btn-sm btn-neutral text-white">
                    <FaEye />
                  </Link>
                  <Link href={`/products/edit/${product.id}`} className="btn btn-sm btn-info text-white">
                    <FaPencil />
                  </Link>
                  <DeleteModal />
                </Flex>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default ProductsTable;
