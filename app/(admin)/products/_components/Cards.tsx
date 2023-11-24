import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { LuBox } from "react-icons/lu";

const Cards = () => {
  return (
    <section>
      <Flex>
        <Card style={{ maxWidth: 240 }}>
          <Flex gap="3" align="center" p="5">
            <Flex>
              <LuBox className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                5
              </Text>
              <Text as="div" size="2" color="gray">
                In stock
              </Text>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </section>
  );
};

export default Cards;
