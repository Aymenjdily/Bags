import { BagsCategories } from "@/constants";
import { product } from "@prisma/client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { LuBox } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";

interface Props {
  products: product[]
}

const Cards = ({ products }: Props) => {
  const InStockProducts = products.filter((product) => {
    return product.isInStock === true
  })

  return (
    <section>
      <Flex align={"center"} gap="3">
        <Card style={{ maxWidth: 240 }}>
          <Flex gap="3" align="center" p="5" className="bg-gray-50">
            <Flex>
              <MdOutlineShoppingCart className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                {products.length}
              </Text>
              <Text as="div" size="2" color="gray">
                Products
              </Text>
            </Box>
          </Flex>
        </Card>
        <Card style={{ maxWidth: 240 }}>
          <Flex gap="3" align="center" p="5" className="bg-gray-50">
            <Flex>
              <LuBox className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                {InStockProducts.length}
              </Text>
              <Text as="div" size="2" color="gray">
                In stock
              </Text>
            </Box>
          </Flex>
        </Card>
        <Card style={{ maxWidth: 240 }}>
          <Flex gap="3" align="center" p="5" className="bg-gray-50">
            <Flex>
              <SlHandbag className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                {BagsCategories.length}
              </Text>
              <Text as="div" size="2" color="gray">
                Categories
              </Text>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </section>
  );
};

export default Cards;
