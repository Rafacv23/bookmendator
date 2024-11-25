import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import Footer from "@/components/Footer"
import { META_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/site/config"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: META_DESCRIPTION,
  creator: "@rafacv23",
  authors: { name: "Rafa Canosa" },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: META_DESCRIPTION,
    images: [
      {
        url: `favicon.ico`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
    },
  },
  keywords: ["Books", "AI", "Recommendations", "Bookmendator", "Open source"],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@rafacanosa",
    creator: "@rafacanosa",
    title: SITE_TITLE,
    description: META_DESCRIPTION,
    images: [
      {
        url: `favicon.ico`,
        width: 1200,
        alt: SITE_TITLE,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
