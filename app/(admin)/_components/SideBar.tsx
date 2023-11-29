"use client";

import { AdminNavigationLinks } from "@/constants";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdLogout } from "react-icons/md";

const SideBar = () => {
  const pathName = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsSubmitting(true);
      const repsonse = await axios.get("/api/user/logout");
      if (repsonse.status === 201) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="lg:flex hidden">
        <Flex
          p="6"
          direction={"column"}
          gap="6"
          className="min-h-screen bg-gray-50 shadow-lg border-r"
        >
          <Flex align={"center"} justify={"center"} gap="2">
            <Image src="/assets/logo.png" alt="bags" width={30} height={30} />
            <h1 className="font-bold text-xl">Bags</h1>
          </Flex>
          <Flex
            direction={"column"}
            align={"start"}
            gap="3"
            py="5"
            className="border-y"
          >
            {AdminNavigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={classnames({
                  "px-5 py-3 rounded-xl capitalize hover:bg-greenColor duration-300 hover:text-black transition-colors outline-none w-full":
                    true,
                  "-ghost": link.href !== pathName,
                  "bg-greenColor border-none text-black":
                    link.href === pathName,
                })}
              >
                <Flex align={"center"} gap="2">
                  <link.icon />
                  <span className="font-medium">{link.label}</span>
                </Flex>
              </Link>
            ))}
          </Flex>
          <Flex>
            <button
              onClick={handleLogout}
              className="btn btn-error text-white w-full"
            >
              <MdLogout className="text-xl" />
              <span>
                Log out{" "}
                {isSubmitting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </span>
            </button>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default SideBar;
