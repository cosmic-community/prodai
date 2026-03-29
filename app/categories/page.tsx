import Link from 'next/link';
import { getTaskCategories, getTasks } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata = {
  title: 'Categories | ProdAI',
  description: 'Browse task categories to organize your work.',
};

export default async function CategoriesPage() {
  const [categories, tasks] = await Promise.all([
    getTaskCategories(),
    getTasks(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🗂️</span>
          <h1 className="text-3xl font-bold text-surface-900">Categories</h1>
        </div>
        <p className="text-surface-500 max-w-2xl">
          Organize your tasks into meaningful categories. You have{' '}
          <span className="font-semibold text-surface-700">{categories.length}</span> categories.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const color = cat.metadata?.color || '#3b82f6';
            const icon = cat.metadata?.icon || '📁';
            const description = cat.metadata?.description || '';
            const taskCount = tasks.filter(
              (t) => t.metadata?.category?.slug === cat.slug
            ).length;

            return (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="group">
                <div className="bg-white rounded-2xl border border-surface-200/60 p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {icon}
                    </div>
                    <span className="text-xs font-medium text-surface-400 bg-surface-50 px-2.5 py-1 rounded-full">
                      {taskCount} tasks
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {cat.title}
                  </h2>
                  {description && (
                    <p className="text-sm text-surface-500 leading-relaxed line-clamp-2">
                      {description}
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-surface-100">
                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: taskCount > 0 ? '100%' : '0%',
                          backgroundColor: color,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200/60">
          <span className="text-4xl mb-4 block">📂</span>
          <h3 className="text-lg font-semibold text-surface-700 mb-2">No categories yet</h3>
          <p className="text-sm text-surface-400">Categories will appear here once they are created in Cosmic.</p>
        </div>
      )}
    </div>
  );
}