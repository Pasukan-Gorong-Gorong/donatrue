"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { parseEther } from "viem"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useCreator } from "@/lib/hooks/use-creator"
import { useWallet } from "@/lib/hooks/use-wallet"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long")
})

export function DonationForm() {
  const params = useParams()
  const { isConnected } = useWallet()
  const { donate, isPending } = useCreator(params.address as `0x${string}`)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      message: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const amountInWei = parseEther(values.amount)
      await donate(values.message, amountInWei)
      form.reset()
    } catch (error) {
      console.error("Failed to donate:", error)
    }
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-center text-gray-500">
          Please connect your wallet to donate
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-xl font-semibold">Make a Donation</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (ETH)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.000000000000000001"
                    placeholder="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a message to the creator..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Donating..." : "Donate"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
