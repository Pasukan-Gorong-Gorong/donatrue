"use client"

import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white text-white">
      <h1 className="text-4xl md:text-6xl font-bold text-black text-center mb-4">
        Welcome to the Web3 Donation Platform!
      </h1>

      <p className="text-lg md:text-xl text-gray-600 text-center mb-8">
        Experience a new era of giving with security, transparency, and
        decentralization powered by blockchain technology.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/pages/Donate"
          className={buttonVariants({ size: "lg", variant: "default" })}
        >
          Explore
        </Link>
        <Link
          href="/pages/Profile"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Profile
        </Link>
      </div>
    </section>
  )
}
