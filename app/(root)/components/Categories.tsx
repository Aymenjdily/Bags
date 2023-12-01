"use client";

import { BagsCategories } from "@/constants";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Categories = () => {
  const searchPathname = useSearchParams();
  const [category, setCategory] = useState(
    searchPathname.get("category") || "all"
  );
  const router = useRouter();

  useEffect(() => {
    const handleClick = () => {
      const params = new URLSearchParams();
      if (category) {
        params.append("category", category);
      }
      const query = params.size ? "?" + params.toString() : "";
      router.push("/" + query);
    };
    handleClick();
  }, [category, router]);

  return (
    <Flex
      px="5"
      className="max-w-7xl mx-auto py-6"
      direction={"column"}
      gap="5"
    >
      <h1 className="text-center text-xl font-bold">Browse Categories</h1>
      <Flex align={"center"} gap="4" wrap={"wrap"}>
        <button
          type="button"
          className={classNames({
            "flex-1 btn btn-ghost hover:bg-redColor hover:text-white transition-colors duration-250":
              true,
            "bg-gray-100": category !== "all",
            "bg-redColor text-white": category === "all",
          })}
          onClick={() => {
            setCategory("all");
          }}
        >
          All
        </button>
        {BagsCategories.map((item) => (
          <button
            type="button"
            key={item.value}
            className={classNames({
              "flex-1 btn btn-ghost hover:bg-redColor hover:text-white transition-colors duration-250":
                true,
              "bg-gray-100": category !== item.value,
              "bg-redColor text-white": category === item.value,
            })}
            onClick={() => {
              setCategory(item.value);
            }}
          >
            {item.label}
          </button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Categories;
