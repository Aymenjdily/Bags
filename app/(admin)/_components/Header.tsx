"use client";

import { DropdownMenu, Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSettings, MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <header className="">
      <Flex justify={"between"} align={"center"} gap="5">
        <Flex align="center" gap="1">
          <h1 className="font-bold">
            Welcome back,{" "}
          </h1>
        </Flex>
        
      </Flex>
    </header>
  );
};

export default Header;
