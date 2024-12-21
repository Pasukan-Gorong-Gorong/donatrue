import "./globals.css"
import Providers from "./providers"
import type { Metadata } from "next"
import localFont from "next/font/local"

const myFont = localFont({
  src: "../../public/font/0xProtoNerdFont-Regular.ttf",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    template: "%s | Donatrue",
    absolute: "Donatrue",
    default: "Donatrue"
  },
  description: "Donate with trust!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
