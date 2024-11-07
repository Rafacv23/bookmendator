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
import { redirect } from "next/navigation"
import { DialogClose } from "./ui/dialog"

const formSchema = z.object({
  query: z.string().min(1, {
    message: "Please enter a query",
  }),
})
type FormSchemaType = z.infer<typeof formSchema>

function onSubmit(values: FormSchemaType) {
  redirect(`/search/${values.query}`)
}

export default function SearchForm({ dialog }: { dialog: boolean }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Search something..."
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormDescription>
                We will search in our database for the book or author that you
                want.
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
          <Button type="submit">Search</Button>
        )}
      </form>
    </Form>
  )
}
