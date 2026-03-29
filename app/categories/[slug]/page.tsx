// app/categories/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTaskCategoryBySlug, getTasks } from '@/lib/cosmic';
import TaskCard from '@/components/TaskCard';

export const revalidate = 60;

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getTaskCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allTasks = await getTasks();
  const categoryTasks = allTasks.filter(
    (t) => t.metadata?.category?.slug === category.slug
  );

  const color = category.metadata?.color || '#3b82f6';
  const icon = category.metadata?.icon || '📁';
  const description = category.metadata?.description || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-brand-600 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-surface-700 font-medium">{category.title}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-white rounded-3xl border border-surface-200/60 shadow-sm p-8 mb-8">
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 mb-2">
              {category.title}
            </h1>
            {description && (
              <p className="text-surface-500 leading-relaxed max-w-2xl">{description}</p>
            )}
            <p className="text-sm text-surface-400 mt-3">
              <span className="font-semibold text-surface-700">{categoryTasks.length}</span> tasks in this category
            </p>
          </div>
        </div>
      </div>

      {/* Tasks */}
      {categoryTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200/60">
          <span className="text-4xl mb-4 block">📋</span>
          <h3 className="text-lg font-semibold text-surface-700 mb-2">No tasks in this category</h3>
          <p className="text-sm text-surface-400">Add tasks to this category in Cosmic to see them here.</p>
        </div>
      )}

      <div className="mt-6">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}