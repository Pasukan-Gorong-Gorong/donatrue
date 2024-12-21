import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#200B4C] text-white hover:bg-purple-800 hover:shadow-lg focus:ring-purple-500",
        outline:
          "border border-gray-300 text-black hover:bg-gray-200 hover:shadow-md focus:ring-gray-400"
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)
