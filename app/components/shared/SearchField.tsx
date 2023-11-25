"use client";

import { Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  placeHolder: string;
  search: string;
  onValueChange: any
};

const SearchField = ({ placeHolder, search, onValueChange }: Props) => {
  return (
    <Flex className="w-full">
      <TextField.Root size="3" className="w-full">
        <TextField.Input value={search} onChange={(e) => onValueChange(e.target.value)} type="text" placeholder={placeHolder} />
      </TextField.Root>
    </Flex>
  );
};

export default SearchField;
