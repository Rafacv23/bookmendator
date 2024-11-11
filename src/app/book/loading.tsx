import Container from "@/components/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center max-w-4xl">
        <Skeleton className="h-[280px] w-[180px] rounded shadow-xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[40px] w-[385px]" />
          <Skeleton className="h-[28px] w-[385px]" />
          <Skeleton className="h-[24px] w-[385px]" />
          <ul className="flex flex-wrap gap-2 max-w-[385px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className="flex items-center gap-4">
                <Skeleton className="h-[21px] w-[75px]" />
              </li>
            ))}
          </ul>
          <Skeleton className="h-[36px] w-96 md:w-[385px]" />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="max-w-4xl">
          <Skeleton className="h-[300px] w-96 md:w-[603px]" />
        </div>
        <div className="max-w-4xl">
          <Skeleton className="h-[300px] w-96 md:w-[603px]" />
        </div>
      </div>
    </Container>
  )
}
