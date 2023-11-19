import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Box, Flex, Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bags - Auth",
  description:
    "Discover curated elegance at our online bags emporium! From chic totes to versatile clutches, we bring style to your fingertips. Explore our collection and redefine your fashion statement with every click. Join us on a journey where sophistication meets convenience! 💼✨ #FashionFinesse #OnlineBoutique #BagsForEveryOccasion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
            <main>
              <Flex
                className="w-full relative h-screen"
                align={"center"}
                justify={"center"}
              >
                <Box className="bg-greenColor h-full flex-1" />
                <Box className="bg-beigeColor h-full flex-1" />

                <Flex className="absolute">{children}</Flex>
              </Flex>
            </main>
        </Theme>
      </body>
    </html>
  );
}
