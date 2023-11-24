"use client";

import { DropdownMenu, Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSettings, MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <header>
      <Flex justify={"between"} align={"center"}>
        <Flex align="center" gap="1">
          <h1 className="font-bold">Welcome back,</h1>
          <p className="text-redColor font-semibold text-xl capitalize">
            user name
          </p>
        </Flex>
        <Flex>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="outline-none">
                <Image
                  src="/assets/user.svg"
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content color="gray">
              <Flex p="4" direction={"column"} gap="2">
                <DropdownMenu.Item>
                  <Link href="/">
                    <Flex align={"center"} gap="2">
                      <MdOutlineSettings className="text-lg" />
                      <span className="font-medium">Settings</span>
                    </Flex>
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link href="/">
                    <Flex align={"center"} gap="2">
                      <MdLogout className="text-lg" />
                      <span className="font-medium">Logout</span>
                    </Flex>
                  </Link>
                </DropdownMenu.Item>
              </Flex>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
