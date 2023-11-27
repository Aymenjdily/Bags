"use client";

import { AdminNavigationLinks } from "@/constants";
import { Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

const MobileNavigation = () => {
  const pathName = usePathname();
  return (
    <div className="lg:hidden flex">
      <Flex align={"center"} gap="5" wrap={{ sm: "nowrap", initial: "wrap" }}>
        {AdminNavigationLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={classNames({
              "px-5 py-3 rounded-xl capitalize hover:bg-redColor duration-300 hover:text-white transition-colors outline-none":
                true,
              "-ghost": link.href !== pathName,
              "bg-redColor border-none text-white": link.href === pathName,
            })}
          >
            <Flex align={"center"} gap="2">
              <link.icon />
              <span className="font-medium">{link.label}</span>
            </Flex>
          </Link>
        ))}
      </Flex>
    </div>
  );
};

export default MobileNavigation;
