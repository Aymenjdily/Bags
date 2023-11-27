import { order } from '@prisma/client'
import { Flex, Card, Box, Text } from '@radix-ui/themes'
import React from 'react'
import { FaCheck  } from 'react-icons/fa'
import { MdOutlineTimer  } from 'react-icons/md'
import { SlHandbag } from 'react-icons/sl'
import { RiFileList3Line } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";

type Props = {
    orders: order[]
}

const Cards = ({ orders }: Props) => {
    const pendingOrders = orders.filter((order) => {
        return order.state === "PENDING"
    })

    const deliveredOrders = orders.filter((order) => {
        return order.state === "DELIVERED"
    })
  return (
    <section>
      <Flex align={"center"} gap="3" wrap="wrap">
        <Card className="sm:w-[250px] w-full">
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
        <Card className="sm:w-[250px] w-full">
          <Flex gap="3" align="center" p="5" className="bg-gray-50">
            <Flex>
              <MdOutlineTimer className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                {orders.length}
              </Text>
              <Text as="div" size="2" color="gray">
                Pending
              </Text>
            </Box>
          </Flex>
        </Card>
        <Card className="sm:w-[250px] w-full">
          <Flex gap="3" align="center" p="5" className="bg-gray-50">
            <Flex>
              <FaCheck  className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                {orders.length}
              </Text>
              <Text as="div" size="2" color="gray">
                Delivered
              </Text>
            </Box>
          </Flex>
        </Card>
        <Card className="sm:w-[250px] w-full">
          <Flex gap="3" align="center" p="5" className="bg-gray-50">
            <Flex>
              <ImCancelCircle className="text-3xl" />
            </Flex>
            <Box>
              <Text as="div" size="2" weight="bold">
                {orders.length}
              </Text>
              <Text as="div" size="2" color="gray">
                Canceled
              </Text>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </section>
  )
}

export default Cards