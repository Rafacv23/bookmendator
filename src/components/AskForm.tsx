"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { redirect } from "next/navigation"
import TextareaAutosize from "react-textarea-autosize"

const formSchema = z.object({
  question: z.string().min(1, {
    message: "Please enter a question",
  }),
})
type FormSchemaType = z.infer<typeof formSchema>

function onSubmit(values: FormSchemaType) {
  sessionStorage.setItem("question", values.question)
  redirect(`/chat`)
}

export default function AskForm({ dialog }: { dialog: boolean }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <TextareaAutosize
                  placeholder="Ask something..."
                  {...field}
                  className="bg-card overflow-hidden resize-none flex min-h-[36px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormDescription>
                The AI will try to answer your question as best as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {dialog ? (
          <DialogClose
            type="submit"
            aria-label="close"
            className={buttonVariants({ variant: "default" })}
          >
            Search
          </DialogClose>
        ) : (
          <Button type="submit">Ask</Button>
        )}
      </form>
    </Form>
  )
}
