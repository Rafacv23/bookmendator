export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col pt-20 items-center justify-items-center min-h-screen p-4 sm:p-20 pb-16 sm:pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 sm:gap-8 row-start-2 items-center max-w-full sm:max-w-7xl">
        {children}
      </main>
    </div>
  )
}
