import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Intro = () => {
  return (
    <Flex px="5" className="max-w-7xl mx-auto py-16 rounded-2xl">
      <Flex className="bg-beigeColor rounded-l-2xl" p="9" direction={"column"} gap="5">
        <h1 className="text-[52px] font-bold leading-[55px]"><span className="text-redColor ">Buying</span> Bags Has <br /> Never Been This Easy</h1>
        <Flex>
            <Link href="" className="btn btn-neutral text-white">
                View Collecton
            </Link>
        </Flex>
      </Flex>
      <Flex>
        <Flex className="bg-greenColor relative flex-1" p="9">
            <Image src="/assets/woman2.png" alt="womanwith" width={200}
             height={0} className="object-contain absolute bottom-0" quality={100} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Intro;
