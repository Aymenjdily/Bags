"use client";

import SearchField from "@/app/components/shared/SearchField";
import { Flex, Select } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  search: string;
  setSearch: any
}

const Filters = ({ search, setSearch }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <section className="w-full">
      <h1 className="text-gray-500 mb-2 font-medium">Filters</h1>
      <Flex align={"center"} gap="5" className="w-full">
        <SearchField search={search} onValueChange={setSearch} placeHolder="Search by name..." />
        <Select.Root 
          defaultValue={searchParams.get('status') || "all"}
          onValueChange={(status) => {
            const params = new URLSearchParams()
            if(status){
              params.append('status', status)
            }
            const query = params.size ? "?" + params.toString() : ""
            router.push("/products" + query)
          }}
          size="3"
        >
          <Select.Trigger placeholder="State" />
          <Select.Content color="gray" position="popper">
            <Select.Group>
              <Select.Item value={"all"}>All</Select.Item>
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
