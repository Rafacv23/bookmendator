"use client"

import { MessageSquareMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"
import comment from "@/app/library/services/comment"

const formSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "You need to write a comment.",
    })
    .max(240),
})

interface CommentDrawerProps {
  bookId: string
  userId: string
}

export default function CommentDrawer({ bookId, userId }: CommentDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    setIsDrawerOpen(false)
    comment({ bookId, userId, message: data.comment })
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button>
          <MessageSquareMore /> Leave a comment
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Comment</DrawerTitle>
            <DrawerDescription>
              Leave a comment about this book.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Comment</FormLabel>
                      <Textarea
                        placeholder="Write your comment here"
                        {...field}
                        autoFocus
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter>
                  <Button type="submit">Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </FormProvider>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
