import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export interface BookCardProps {
  id: string
  cover: string
  title: string
  author: string
}

export default function BookCard({ id, cover, title, author }: BookCardProps) {
  return (
    <Link href={`/book/${id}`}>
      <Card className="hover:shadow-lg transition-all hover:scale-105 hover:cursor-pointer max-w-sm w-96 h-40">
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
      </Card>
    </Link>
  )
}
