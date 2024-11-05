import Container from "@/components/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center">
        <Skeleton className="h-[280px] w-[180px] rounded shadow-xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[40px] w-[385px]" />
          <Skeleton className="h-[28px] w-[385px]" />
          <Skeleton className="h-[24px] w-[385px]" />
          <Skeleton className="h-[36px] w-[385px]" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Skeleton className="rounded-xl max-w-sm w-96 h-64" />
        </div>
        <div>
          <ul className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <Skeleton className="h-[25px] w-[167px]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Skeleton className="w-96 h-64" />
      </div>
    </Container>
  )
}
