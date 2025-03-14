import { HERO_DESCRIPTION, HERO_SUBTITLE, SITE_NAME } from "@/site/config"

export default function Hero() {
  return (
    <div className="pt-8">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <h1 className="text-center text-4xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
          {SITE_NAME} <br />
          <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
            {HERO_SUBTITLE}
          </span>
        </h1>
        <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 max-w-sm my-8">
          {HERO_DESCRIPTION}
        </p>
      </div>
    </div>
  )
}
