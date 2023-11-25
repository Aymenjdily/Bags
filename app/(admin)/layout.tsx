import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Flex, Theme } from '@radix-ui/themes';
import SideBar from './_components/SideBar';
import Header from './_components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bags - Admin',
  description: 'Discover curated elegance at our online bags emporium! From chic totes to versatile clutches, we bring style to your fingertips. Explore our collection and redefine your fashion statement with every click. Join us on a journey where sophistication meets convenience! 💼✨ #FashionFinesse #OnlineBoutique #BagsForEveryOccasion.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <main>
            <Flex>
              <SideBar />
              <Flex direction={"column"} p="6" gap="6" className='w-full'>
                <Header />
                <div className='w-full bg-gray-300 h-[1px]' />
                {children}
              </Flex>
            </Flex>
          </main>
        </Theme>
      </body>
    </html>
  )
}
