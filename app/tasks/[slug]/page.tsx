// app/tasks/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTaskBySlug, getMetafieldValue } from '@/lib/cosmic';
import PriorityBadge from '@/components/PriorityBadge';
import StatusBadge from '@/components/StatusBadge';

export const revalidate = 60;

export default async function TaskDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const task = await getTaskBySlug(slug);

  if (!task) {
    notFound();
  }

  const priority = getMetafieldValue(task.metadata?.priority);
  const status = getMetafieldValue(task.metadata?.status);
  const categoryTitle = task.metadata?.category?.title || 'Uncategorized';
  const categorySlug = task.metadata?.category?.slug;
  const categoryColor = task.metadata?.category?.metadata?.color || '#3b82f6';
  const categoryIcon = task.metadata?.category?.metadata?.icon || '📁';
  const dueDate = task.metadata?.due_date;
  const completedDate = task.metadata?.completed_date;
  const estimatedMinutes = task.metadata?.estimated_minutes;
  const actualMinutes = task.metadata?.actual_minutes;
  const isRecurring = task.metadata?.is_recurring;

  const formatDate = (date: string | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatMinutes = (mins: number | undefined) => {
    if (!mins) return null;
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remaining = mins % 60;
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/tasks" className="hover:text-brand-600 transition-colors">Tasks</Link>
        <span>/</span>
        <span className="text-surface-700 font-medium">{task.title}</span>
      </nav>

      <div className="bg-white rounded-3xl border border-surface-200/60 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-surface-100">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {categorySlug ? (
                <Link href={`/categories/${categorySlug}`} className="flex items-center gap-2 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
                  >
                    {categoryIcon}
                  </div>
                  <span className="text-sm font-medium text-surface-500 group-hover:text-brand-600 transition-colors">
                    {categoryTitle}
                  </span>
                </Link>
              ) : (
                <span className="text-sm text-surface-500">{categoryTitle}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <PriorityBadge priority={priority} />
              <StatusBadge status={status} />
              {isRecurring && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700">
                  🔁 Recurring
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900">{task.title}</h1>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Description */}
          {task.metadata?.description && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
                Description
              </h2>
              <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">
                {task.metadata.description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dueDate && (
              <DetailItem label="Due Date" value={formatDate(dueDate) || ''} icon="📅" />
            )}
            {completedDate && (
              <DetailItem label="Completed Date" value={formatDate(completedDate) || ''} icon="✅" />
            )}
            {estimatedMinutes && (
              <DetailItem label="Estimated Time" value={formatMinutes(estimatedMinutes) || ''} icon="⏱️" />
            )}
            {actualMinutes && (
              <DetailItem label="Actual Time" value={formatMinutes(actualMinutes) || ''} icon="⏳" />
            )}
          </div>

          {/* Time Comparison */}
          {estimatedMinutes && actualMinutes && (
            <div className="mt-8 p-5 bg-surface-50 rounded-2xl">
              <h3 className="text-sm font-semibold text-surface-600 mb-3">Time Analysis</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-surface-500 mb-1.5">
                    <span>Estimated: {formatMinutes(estimatedMinutes)}</span>
                    <span>Actual: {formatMinutes(actualMinutes)}</span>
                  </div>
                  <div className="h-3 bg-surface-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        actualMinutes <= estimatedMinutes ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{
                        width: `${Math.min((actualMinutes / estimatedMinutes) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-surface-500 mt-2">
                    {actualMinutes <= estimatedMinutes
                      ? `✅ ${estimatedMinutes - actualMinutes} minutes under estimate`
                      : `⚠️ ${actualMinutes - estimatedMinutes} minutes over estimate`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back */}
      <div className="mt-6">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          ← Back to Tasks
        </Link>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-medium text-surface-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-surface-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}