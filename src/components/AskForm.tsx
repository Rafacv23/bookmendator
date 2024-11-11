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
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@/components/ui/dialog"
import { redirect } from "next/navigation"

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
                <Textarea placeholder="Ask something..." {...field} autoFocus />
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
