import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <span className="text-6xl mb-6 block">🔍</span>
      <h1 className="text-4xl font-bold text-surface-900 mb-4">Page Not Found</h1>
      <p className="text-surface-500 max-w-md mx-auto mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}