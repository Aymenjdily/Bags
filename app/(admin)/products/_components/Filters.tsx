"use client";

import SearchField from "@/app/components/shared/SearchField";
import { Flex, Select } from "@radix-ui/themes";
import Link from "next/link";

const Filters = () => {
  return (
    <section className="w-full">
      <h1 className="text-gray-500 mb-2 font-medium">Filters</h1>
      <Flex align={"center"} gap="5" className="w-full">
        <SearchField placeHolder="Search by name..." />
        <Select.Root size="3">
          <Select.Trigger placeholder="State" />
          <Select.Content color="gray" position="popper">
            <Select.Group>
              <Select.Item value={"in"}>In stock</Select.Item>
              <Select.Item value={"out"}>Out of stock</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Link href="/products/new" className="w-44 bg-redColor btn border-none text-white btn-ghost">New Product</Link>
      </Flex>
    </section>
  );
};

export default Filters;
