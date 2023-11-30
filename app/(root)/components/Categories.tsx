"use client";

import { BagsCategories } from "@/constants";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useState } from "react";

const Categories = () => {
  const [category, setCategory] = useState("event");
  return (
    <Flex
      px="5"
      className="max-w-7xl mx-auto py-6"
      direction={"column"}
      gap="5"
    >
      <h1 className="text-center text-xl font-bold">Browse Categories</h1>
      <Flex align={"center"} gap="4" wrap={"wrap"}>
        {BagsCategories.map((item) => (
          <button
            key={item.value}
            className={classNames({
              "flex-1 btn btn-ghost hover:bg-redColor hover:text-white transition-colors duration-250":
                true,
              "bg-gray-100": category !== item.value,
              "bg-redColor text-white": category === item.value,
            })}
          >
            {item.label}
          </button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Categories;
