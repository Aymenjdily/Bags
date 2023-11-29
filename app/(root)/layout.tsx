import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Theme } from '@radix-ui/themes';
import Navbar from './Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bags',
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
          <Navbar />
          <main>
            {children}
          </main>
        </Theme>
      </body>
    </html>
  )
}
