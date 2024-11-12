"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RotateCcw } from "lucide-react"
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
import { redirect } from "next/navigation"
import { DialogClose } from "@/components/ui/dialog"
import TextareaAutosize from "react-textarea-autosize"

const formSchema = z.object({
  query: z.string().min(1, {
    message: "Please enter a query",
  }),
})
type FormSchemaType = z.infer<typeof formSchema>

function onSubmit(values: FormSchemaType) {
  //save the query to the recent searches in localStorage

  const recentSearchs = localStorage.getItem("recentSearchs")
    ? JSON.parse(localStorage.getItem("recentSearchs")!)
    : []

  if (recentSearchs.length > 5) {
    recentSearchs.shift()
  }
  recentSearchs.push(values.query)
  localStorage.setItem("recentSearchs", JSON.stringify(recentSearchs))

  redirect(`/search/${values.query}`)
}

export default function SearchForm({ dialog }: { dialog: boolean }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  const recentSearches = localStorage.getItem("recentSearchs")
    ? JSON.parse(localStorage.getItem("recentSearchs") as string)
    : []

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
                <TextareaAutosize
                  placeholder="Search something..."
                  {...field}
                  autoFocus
                  className="bg-card overflow-hidden resize-none flex min-h-[36px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormDescription>
                We will search in our database for the book or author that you
                want.
              </FormDescription>
              <div>
                <FormLabel>Recent Searchs</FormLabel>
                <ul className="flex flex-col items-start space-y-2 mt-4">
                  {recentSearches.map((search: string) => (
                    <li key={search}>
                      <a
                        href={`/search/${search}`}
                        className={buttonVariants({
                          variant: "outline",
                          className: "p-0 m-0",
                        })}
                      >
                        <RotateCcw /> {search}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
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
