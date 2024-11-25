"use client"

import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
  TelegramShareButton,
  RedditIcon,
  RedditShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailIcon,
  EmailShareButton,
} from "next-share"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FacebookIcon, LinkedinIcon, Share2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { SITE_URL } from "@/site/config"

const socials = [
  {
    name: "X | Twitter",
    button: TwitterShareButton,
    icon: TwitterIcon,
  },
  {
    name: "Whatsapp",
    button: WhatsappShareButton,
    icon: WhatsappIcon,
  },
  {
    name: "Telegram",
    button: TelegramShareButton,
    icon: TelegramIcon,
  },
  {
    name: "Reddit",
    button: RedditShareButton,
    icon: RedditIcon,
  },
  {
    name: "Facebook",
    button: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    name: "Linkedin",
    button: LinkedinShareButton,
    icon: LinkedinIcon,
  },
  {
    name: "Mail",
    button: EmailShareButton,
    icon: EmailIcon,
  },
]

export default function ShareBtn() {
  const pathname = usePathname()

  const url = `${SITE_URL}${pathname}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "default" })}>
        <Share2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share on socials</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {socials.map((rrss) => (
          <DropdownMenuItem key={rrss.name}>
            <rrss.button url={url} title={url}>
              <span className="flex items-center gap-2">
                <rrss.icon size={32} /> {rrss.name}
              </span>
            </rrss.button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
