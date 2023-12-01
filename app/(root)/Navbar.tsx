"use client";

import { NavLinks } from "@/constants";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Cart } from "./components";

const Navbar = () => {
  const pathname = usePathname();
  
  return (
    <nav className="py-6">
      <Flex
        className="max-w-7xl mx-auto"
        align={"center"}
        justify={"between"}
        gap="3"
        px="5"
      >
        <Flex align={"center"} gap="2">
          <Image src="/assets/logo.png" alt="logo" width={30} height={30} />
          <h1 className="font-bold text-xl uppercase">Bags</h1>
        </Flex>
        <Flex align={"center"} gap="5">
          <ul className="flex items-center gap-5">
            {NavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={classNames({
                    "font-medium hover:text-redColor transition-colors": true,
                    "text-redColor font-semibold": pathname === link.href
                })}>
                    {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Cart />
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
