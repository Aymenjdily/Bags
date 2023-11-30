import { Gallerie } from "@/constants";
import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const Overview = () => {
  return (
    <Flex gap="5" align={"center"} direction={{ md:"row", initial:"column" }}>
      <Flex className="relative w-full lg:flex-1 lg:h-[80vh] h-[60vh]">
        <Image
          src="/assets/About.jpg"
          alt="Story"
          fill
          quality={100}
          className="object-cover"
        />
      </Flex>
      <Flex direction={"column"} gap="3" className="flex-1">
        <h1 className="font-bold text-3xl text-redColor">
            Discover Your Signature Style: A Bag Emporium for Every Journey
        </h1>
        <p className="text-gray-500">
            Welcome to our bag store, where fashion meets functionality, and quality
            intertwines with style. Our store has been carefully curated to offer an
            exceptional range of bags that cater to the diverse needs and
            preferences of our community. We believe that a bag is more than just an
            accessory; it&apos;s an extension of one&apos;s personality, a statement piece
            that reflects individuality. That&apos;s why our collection encompasses a
            variety of styles, from sleek and trendy to classic and practical,
            ensuring there&apos;s a perfect match for every lifestyle.
        </p>
        <Grid columns={{ initial: "2", md: "3" }} gap="3">
            {
              Gallerie.map((item) => (
                <Image key={item.src} src={item.src} alt="Gallerie" width={300} height={0} />
              ))
            }
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Overview;
