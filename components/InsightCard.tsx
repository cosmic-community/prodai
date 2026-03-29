import Link from 'next/link';
import type { AIInsight } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface InsightCardProps {
  insight: AIInsight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  const insightType = getMetafieldValue(insight.metadata?.insight_type);
  const priority = getMetafieldValue(insight.metadata?.priority);
  const summary = insight.metadata?.summary || '';
  const categoryTitle = insight.metadata?.related_category?.title;

  const typeIcons: Record<string, string> = {
    productivity: '📊',
    'time management': '⏰',
    focus: '🎯',
    recommendation: '💡',
  };

  const typeColors: Record<string, string> = {
    productivity: 'bg-blue-50 text-blue-700 border-blue-200',
    'time management': 'bg-purple-50 text-purple-700 border-purple-200',
    focus: 'bg-amber-50 text-amber-700 border-amber-200',
    recommendation: 'bg-green-50 text-green-700 border-green-200',
  };

  const lowerType = insightType.toLowerCase();
  const icon = typeIcons[lowerType] || '🤖';
  const typeColor = typeColors[lowerType] || 'bg-surface-100 text-surface-700 border-surface-200';

  return (
    <Link href={`/insights/${insight.slug}`} className="block group">
      <div className="bg-white rounded-2xl border border-surface-200/60 p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeColor}`}>
            {icon} {insightType || 'Insight'}
          </span>
          {priority && (
            <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
              {priority}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-surface-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {insight.title}
        </h3>

        {summary && (
          <p className="text-sm text-surface-500 mb-4 line-clamp-3 leading-relaxed flex-1">
            {summary}
          </p>
        )}

        {categoryTitle && (
          <div className="pt-3 border-t border-surface-100">
            <span className="text-xs text-surface-400">
              Related: <span className="text-surface-600 font-medium">{categoryTitle}</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}