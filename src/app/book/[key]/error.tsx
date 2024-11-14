"use client" // Error boundaries must be Client Components

import Container from "@/components/Container"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronLeft, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Container>
      <h2>Something went wrong!</h2>
      <div className="flex gap-4 justify-between">
        <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
          <ChevronLeft className="h-[1.2rem] w-[1.2rem]" />
          Back to start
        </Link>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          <RefreshCcw className="h-[1.2rem] w-[1.2rem]" />
          Try again
        </Button>
      </div>
    </Container>
  )
}
