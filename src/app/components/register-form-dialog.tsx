"use client"

import { CREATOR_FACTORY_CONTRACT_ABI } from "@/config/consts"
import { CREATOR_FACTORY_ADDRESS } from "@/config/consts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useReadContract } from "wagmi"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useCreator } from "@/lib/hooks/use-creator"
import { useCreatorFactory } from "@/lib/hooks/use-creator-factory"
import { useWallet } from "@/lib/hooks/use-wallet"

const registerCreatorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required").optional(),
  avatar: z.string().url().min(1, "Avatar is required").optional(),
  links: z
    .array(
      z.object({
        url: z.string().url(),
        label: z.string().min(1, "Label is required")
      })
    )
    .optional()
})

type RegisterCreatorSchema = z.infer<typeof registerCreatorSchema>

export default function RegisterForm() {
  const { address } = useWallet()
  const { data: creatorContractAddress } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getCreatorContract",
    args: [address!],
    query: {
      retry: 100,
      retryDelay: 2000,
      enabled: !!address
    }
  })

  const { registerCreator, registerCreatorError } = useCreatorFactory()
  const { updateBio, updateAvatar, addLink } = useCreator(
    creatorContractAddress
  )

  const form = useForm<RegisterCreatorSchema>({
    resolver: zodResolver(registerCreatorSchema)
  })

  const { fields, append, remove } = useFieldArray<RegisterCreatorSchema>({
    name: "links" as never,
    control: form.control
  })

  function onSubmit(values: RegisterCreatorSchema) {
    registerCreator(values.name)
  }

  useEffect(() => {
    if (
      creatorContractAddress &&
      creatorContractAddress !== "0x0000000000000000000000000000000000000000"
    ) {
      return
    }

    if (
      creatorContractAddress &&
      creatorContractAddress !== "0x0000000000000000000000000000000000000000"
    ) {
      const values = form.getValues()
      if (values.bio) {
        updateBio(values.bio)
      }
      if (values.avatar) {
        updateAvatar(values.avatar)
      }
      if (values.links) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addLink(values.links as any)
      }
      form.reset()
    }
    if (registerCreatorError) {
      toast.error(registerCreatorError.message)
    }
  }, [creatorContractAddress, registerCreatorError])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Register as a Creator</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Register to become a creator and start accepting donations.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => <Input placeholder="Name" {...field} />}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => <Textarea placeholder="Bio" {...field} />}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => <Input placeholder="Avatar" {...field} />}
            />
            <div className="flex flex-col gap-2 w-full">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2 w-full">
                  <div className="w-full flex gap-2">
                    <Input
                      {...field}
                      {...form.register(`links.${index}.label`)}
                      placeholder="e.g. YouTube"
                      className="w-full"
                    />
                    <Input
                      {...field}
                      {...form.register(`links.${index}.url`)}
                      placeholder="https://www.youtube.com"
                      className="w-full"
                    />
                    <Button
                      onClick={() => remove(index)}
                      size="icon"
                      className="self-end w-full max-w-10"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => append({ url: "", label: "" })}
                size="icon"
                className="self-end w-full max-w-10"
                variant="outline"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
