import { BagsCategories } from "@/constants";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { LuBox } from "react-icons/lu";
import { MdOutlineShoppingCart, MdOutlineTimer } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { SlHandbag } from "react-icons/sl";

const Header = async () => {
  const orders = await prisma.order.findMany();
  const products = await prisma.product.findMany();

  const pendingOrders = orders.filter((order) => {
    return order.state === "PENDING";
  });

  const deliveredOrders = orders.filter((order) => {
    return order.state === "DELIVERED";
  });

  const canceledOrders = orders.filter((order) => {
    return order.state === "CANCELED";
  });

  const InStockProducts = products.filter((product) => {
    return product.isInStock === true;
  });

  return (
    <Flex align={"start"} gap="5" wrap="wrap">
      <Flex direction={"column"} gap="2">
        <h1 className="font-bold">About Orders</h1>
        <Flex align={"center"} gap="3" wrap="wrap">
          <Card className="w-full">
            <Flex gap="3" align="center" p="5" className="bg-gray-50">
              <Flex>
                <RiFileList3Line className="text-3xl" />
              </Flex>
              <Box>
                <Text as="div" size="2" weight="bold">
                  {orders.length}
                </Text>
                <Text as="div" size="2" color="gray">
                  Orders
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card className="w-full">
            <Flex gap="3" align="center" p="5" className="bg-orangeColor/50">
              <Flex>
                <MdOutlineTimer className="text-3xl" />
              </Flex>
              <Box>
                <Text as="div" size="2" weight="bold">
                  {pendingOrders.length}
                </Text>
                <Text as="div" size="2" color="gray">
                  Pending
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card className=" w-full">
            <Flex gap="3" align="center" p="5" className="bg-greenColor">
              <Flex>
                <FaCheck className="text-3xl" />
              </Flex>
              <Box>
                <Text as="div" size="2" weight="bold">
                  {deliveredOrders.length}
                </Text>
                <Text as="div" size="2" color="gray">
                  Delivered
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card className=" w-full">
            <Flex gap="3" align="center" p="5" className="bg-redColor">
              <Flex>
                <ImCancelCircle className="text-3xl" />
              </Flex>
              <Box>
                <Text as="div" size="2" weight="bold">
                  {canceledOrders.length}
                </Text>
                <Text as="div" size="2" color="gray">
                  Canceled
                </Text>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
