"use client"

import { ChevronUp } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

const isBrowser = () => typeof window !== "undefined"

function scrollToTop() {
  if (!isBrowser()) return
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function GoingUpBtn() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Button
      className={`${
        isVisible
          ? "fixed bottom-0 right-0 rounded-s-full px-4 py-2 mr-6 mb-[71px] z-50 items-center text-xs flex gap-2"
          : "opacity-100"
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp />
    </Button>
  )
}
