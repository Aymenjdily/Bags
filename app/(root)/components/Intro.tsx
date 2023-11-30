import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Intro = () => {
  return (
    <Flex px="5" className="max-w-7xl mx-auto py-6 rounded-2xl">
      <Box className="relative w-full h-[50vh]">
        <Image
          src="/assets/woman.jpg"
          alt="womanwith"
          fill
          quality={100}
          className="object-cover rounded-2xl"
        />
        <div className="absolute w-full h-full bg-black/50 rounded-2xl" />
        <Flex className="absolute h-full w-full text-center" p="6" align={"center"} justify={"center"} direction={"column"} gap="5">
          <h1 className="text-white font-bold text-4xl">
            <span className="text-redColor">Buying</span> Bags Has Never Been This Easy
          </h1>
          <Link href="#collection" className="btn btn-neutral text-white">
            View Collection
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Intro;
