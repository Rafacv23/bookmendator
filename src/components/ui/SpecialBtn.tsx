export default function SpecialBtn({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button>
      <span className="relative inline-block overflow-hidden rounded-lg p-[1px] h-9">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
        <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-lg bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200 h-9 px-4 py-2">
          {children}
        </div>
      </span>
    </button>
  )
}
