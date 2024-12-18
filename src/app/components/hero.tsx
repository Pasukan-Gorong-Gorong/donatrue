"use client"

import { buttonVariants } from "@/components/ui/button"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import Link from "next/link"

export function Hero() {
  const words = [
    {
      text: "Donate",
      className: "text-white"
    },
    {
      text: "without",
      className: "text-white"
    },
    {
      text: "worry",
      className: "text-white"
    },
    {
      text: "with",
      className: "text-white"
    },
    {
      text: "Donatrue.",
      className: "text-blue-500 dark:text-blue-500"
    }
  ]
  return (
    <section className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-4 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link
          href="/c"
          className={buttonVariants({ size: "lg", variant: "default" })}
        >
          Donate now
        </Link>
        <Link
          href="/onboard"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Be a Creator
        </Link>
      </div>
    </section>
  )
}
