export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200/70 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-extrabold shadow">
            R
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Resu<span className="text-blue-600">Mate</span>
          </h1>
        </div>
      </nav>
    </header>
  );
}
