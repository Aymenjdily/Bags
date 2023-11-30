import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const getYear = new Date().getFullYear();
  return (
    <footer>
      <Flex
        py="6"
        className="text-center max-w-7xl mx-auto font-bold"
        align={"center"}
        justify={"center"}
        px="5"
      >
        <p>
          &copy;{getYear}{" "}
          <Link href="https://www.aymenjdily.com" className="underline text-redColor">Aymen.</Link> - All Rights
          Reserved.
        </p>
      </Flex>
    </footer>
  );
};

export default Footer;
