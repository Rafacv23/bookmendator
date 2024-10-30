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
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  question: z.string().min(1, {
    message: "Please enter a question",
  }),
})
type FormSchemaType = z.infer<typeof formSchema>

function onSubmit(values: FormSchemaType) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}

export default function AskForm() {
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
                <Textarea placeholder="Ask something..." {...field} />
              </FormControl>
              <FormDescription>
                The AI will try to answer your question as best as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Ask</Button>
      </form>
    </Form>
  )
}
