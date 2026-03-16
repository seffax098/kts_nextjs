import Navbar from "@/shared/components/Navbar"
import { Providers } from "./providers"
import { ReactNode } from "react"
import { Roboto } from 'next/font/google'
import "./globals.scss"
import { getCartPageInitialState } from "@/api/cart-page";

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Lalasia',
  description: 'An online store with a wide range of products and a user-friendly shopping interface.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialState = await getCartPageInitialState()

  return (
    <html lang="ru" className={roboto.className}>
      <body>
        <Providers initialState={initialState}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}