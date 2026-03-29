import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
              <span className="text-white text-lg">🧠</span>
            </div>
            <span className="text-xl font-bold text-surface-900 tracking-tight">
              Prod<span className="text-brand-600">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" label="Dashboard" />
            <NavLink href="/tasks" label="Tasks" />
            <NavLink href="/categories" label="Categories" />
            <NavLink href="/insights" label="AI Insights" />
          </nav>

          <div className="flex md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-surface-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all duration-200"
    >
      {label}
    </Link>
  );
}

function MobileMenuButton() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-surface-100 transition-colors">
        <svg className="w-6 h-6 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-surface-200 shadow-lg py-2 z-50">
        <Link href="/" className="block px-4 py-2.5 text-sm text-surface-700 hover:bg-brand-50 hover:text-brand-600">Dashboard</Link>
        <Link href="/tasks" className="block px-4 py-2.5 text-sm text-surface-700 hover:bg-brand-50 hover:text-brand-600">Tasks</Link>
        <Link href="/categories" className="block px-4 py-2.5 text-sm text-surface-700 hover:bg-brand-50 hover:text-brand-600">Categories</Link>
        <Link href="/insights" className="block px-4 py-2.5 text-sm text-surface-700 hover:bg-brand-50 hover:text-brand-600">AI Insights</Link>
      </div>
    </details>
  );
}