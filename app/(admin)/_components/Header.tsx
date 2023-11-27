"use client";

import { DropdownMenu, Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSettings, MdLogout } from "react-icons/md";

const Header = () => {
  
  return (
    <header className="">
      <Flex justify={"between"} align={"center"}>
        <Flex align="center" gap="1">
          <h1 className="font-bold">Welcome back,</h1>
          <p className="text-redColor font-semibold capitalize">
            Aymen Jdily
          </p>
        </Flex>
        <Flex>
          <button className="btn btn-error btn-sm text-white">
            <MdLogout />
            <span>Log out</span>
          </button>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
