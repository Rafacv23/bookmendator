import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  BookCheck,
  Library,
  BookX,
  Heart,
  HeartOff,
  MessageSquareMore,
  BookOpen,
  Settings,
} from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"

export interface BookCardProps {
  id: string
  cover: string
  title: string
  author: string
  isLibrary: boolean
}

export default function BookCard({
  id,
  cover,
  title,
  author,
  isLibrary,
}: BookCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all hover:scale-105 hover:cursor-pointer max-w-sm w-96 h-auto">
      <Link href={`/book/${id}`}>
        <CardHeader className="flex flex-row items-center gap-4">
          {cover && (
            <img
              loading="lazy"
              src={cover}
              alt={`${title} cover`}
              className="w-20 h-28 rounded object-cover aspect-auto"
            />
          )}
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{author}</CardDescription>
          </div>
        </CardHeader>
      </Link>
      {isLibrary ? (
        <CardFooter className="flex justify-between">
          <Drawer>
            <DrawerTrigger asChild>
              <Button>
                <Settings /> Edit
              </Button>
            </DrawerTrigger>
            <Button>
              <MessageSquareMore /> Leave a comment
            </Button>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Edit your book</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex flex-col items-center justify-center space-x-2 gap-4">
                    <h3>Status</h3>
                    <RadioGroup defaultValue="toRead">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="readed" id="readed" />
                        <Label
                          htmlFor="readed"
                          className="flex items-center gap-2"
                        >
                          Readed <BookCheck />
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reading" id="reading" />
                        <Label
                          htmlFor="reading"
                          className="flex items-center gap-2"
                        >
                          Reading <BookOpen />
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="toRead" id="toRead" />
                        <Label
                          htmlFor="toRead"
                          className="flex items-center gap-2"
                        >
                          In library <Library />
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dropped" id="dropped" />
                        <Label
                          htmlFor="dropped"
                          className="flex items-center gap-2"
                        >
                          Dropped <BookX />
                        </Label>
                      </div>
                    </RadioGroup>
                    <h3>Rate the book</h3>
                    <RadioGroup defaultValue="unrated">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="like" id="like" />
                        <Label
                          htmlFor="like"
                          className="flex items-center gap-2"
                        >
                          Like <Heart />
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dislike" id="dislike" />
                        <Label
                          htmlFor="dislike"
                          className="flex items-center gap-2"
                        >
                          Dislike <HeartOff />
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unrated" id="unrated" />
                        <Label
                          htmlFor="unrated"
                          className="flex items-center gap-2"
                        >
                          Unrated <Library />
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Save</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      ) : null}
    </Card>
  )
}
