import Container from "@/components/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Container>
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-16">
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className="flex items-center gap-4">
            <div className="flex flex-col space-y-3">
              <Skeleton className="rounded-xl max-w-sm w-96 h-64" />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}
