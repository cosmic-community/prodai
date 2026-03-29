import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-surface-200/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-base">🧠</span>
              </div>
              <span className="text-lg font-bold text-surface-900">
                Prod<span className="text-brand-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-surface-500 leading-relaxed max-w-xs">
              AI-powered productivity assistant that helps you manage tasks, track performance, and optimize your workflow.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">Dashboard</Link></li>
              <li><Link href="/tasks" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">Tasks</Link></li>
              <li><Link href="/categories" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">Categories</Link></li>
              <li><Link href="/insights" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">AI Insights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">
              Powered By
            </h3>
            <ul className="space-y-2.5">
              <li><a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">Cosmic CMS</a></li>
              <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">Next.js</a></li>
              <li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">Tailwind CSS</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-200/60 mt-8 pt-8 text-center">
          <p className="text-sm text-surface-400">
            © {currentYear} ProdAI. Built with Cosmic.
          </p>
        </div>
      </div>
    </footer>
  );
}