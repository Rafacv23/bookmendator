"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Settings } from "lucide-react"
import { useState } from "react"
import editBookStatus from "@/app/library/services/editBookStatus"
import { Button } from "./ui/button"
import { BookReview, BookStatus } from "@prisma/client"

interface BookSettingsFormProps {
  bookId: string
  libraryId?: number
  bookStatus?: BookStatus
  bookReview?: BookReview
}

const formSchema = z.object({
  status: z.enum(["readed", "reading", "toRead", "dropped"], {
    required_error: "You need to pick a status.",
  }),
  rating: z.enum(["like", "dislike", "unrated"], {
    required_error: "You need to pick a rating.",
  }),
})

export default function BookSettingsForm({
  bookId,
  libraryId,
  bookStatus,
  bookReview,
}: BookSettingsFormProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "toRead",
      rating: "unrated",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    setIsDrawerOpen(false)
    editBookStatus({
      bookId,
      libraryId,
      bookReview: data.rating,
      bookStatus: data.status,
    })
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Settings /> Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm hu">
          <DrawerHeader>
            <DrawerTitle>Edit your book</DrawerTitle>
            <DrawerDescription>
              Set your preferences about this bookId.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={bookStatus}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="readed" />
                          </FormControl>
                          <FormLabel>Readed</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="reading" />
                          </FormControl>
                          <FormLabel>Reading</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="toRead" />
                          </FormControl>
                          <FormLabel>In library</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dropped" />
                          </FormControl>
                          <FormLabel>Dropped</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Rate the book</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={bookReview}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="like" />
                          </FormControl>
                          <FormLabel>Like</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dislike" />
                          </FormControl>
                          <FormLabel>Dislike</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="unrated" />
                          </FormControl>
                          <FormLabel>Unrated</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit">Save</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
