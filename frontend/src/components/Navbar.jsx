export default function Navbar({ onLogout, isLoggedIn }) {
  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-[#111827]/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-extrabold shadow">
            R
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Resu<span className="text-blue-600">Mate</span>
          </h1>
        </div>

        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}



