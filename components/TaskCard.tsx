import Link from 'next/link';
import type { Task } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import PriorityBadge from '@/components/PriorityBadge';
import StatusBadge from '@/components/StatusBadge';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const priority = getMetafieldValue(task.metadata?.priority);
  const status = getMetafieldValue(task.metadata?.status);
  const categoryTitle = task.metadata?.category?.title || 'Uncategorized';
  const categoryColor = task.metadata?.category?.metadata?.color || '#3b82f6';
  const dueDate = task.metadata?.due_date;
  const estimatedMinutes = task.metadata?.estimated_minutes;
  const actualMinutes = task.metadata?.actual_minutes;

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <Link href={`/tasks/${task.slug}`} className="block group">
      <div className="bg-white rounded-2xl border border-surface-200/60 p-5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: categoryColor }}
            />
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
              {categoryTitle}
            </span>
          </div>
          <PriorityBadge priority={priority} />
        </div>

        <h3 className="text-base font-semibold text-surface-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {task.title}
        </h3>

        {task.metadata?.description && (
          <p className="text-sm text-surface-500 mb-4 line-clamp-2 leading-relaxed">
            {task.metadata.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-surface-100">
          <StatusBadge status={status} />
          <div className="flex items-center gap-3 text-xs text-surface-400">
            {formattedDueDate && (
              <span className="flex items-center gap-1">
                📅 {formattedDueDate}
              </span>
            )}
            {estimatedMinutes && (
              <span className="flex items-center gap-1">
                ⏱️ {actualMinutes ?? estimatedMinutes}m
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}