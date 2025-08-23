export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#ffffff]/70 dark:bg-[#111827]/70 backdrop-blur supports-[backdrop-filter]:bg-[#ffffff]/60 dark:supports-[backdrop-filter]:bg-[#111827]/60 border-b border-[#e5e7eb]/70 dark:border-[#1f2937]">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-[#ffffff] font-extrabold shadow">
            R
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111827] dark:text-[#f3f4f6]">
            Resu<span className="text-[#2563eb]">Mate</span>
          </h1>
        </div>
      </nav>
    </header>
  );
}


