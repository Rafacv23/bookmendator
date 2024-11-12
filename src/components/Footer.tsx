import {
  SITE_NAME,
  PORTFOLIO_URL,
  AUTHOR,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/site/config"
import { Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-card text-primary-content p-10">
      <nav className="flex flex-col items-center gap-4 mb-4">
        <h4 className="font-bold">
          <Link href={"/"}>{SITE_NAME}</Link>
        </h4>
        <div className="grid grid-flow-col gap-4">
          <Link
            href={GITHUB_URL}
            title="Github Repository"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            <Github />
          </Link>
          <Link
            href={LINKEDIN_URL}
            title="Linkedin Profile"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            <Linkedin />
          </Link>
        </div>
      </nav>
      <aside className="flex flex-col items-center gap-4">
        <p>
          Created by
          <Link
            href={PORTFOLIO_URL}
            target="_blank"
            title="rafacanosa.dev"
            className={buttonVariants({ variant: "link" })}
          >
            {AUTHOR}.
          </Link>
        </p>
      </aside>
    </footer>
  )
}
