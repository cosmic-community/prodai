// app/insights/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAIInsightBySlug, getMetafieldValue } from '@/lib/cosmic';

export const revalidate = 60;

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getAIInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const insightType = getMetafieldValue(insight.metadata?.insight_type);
  const priority = getMetafieldValue(insight.metadata?.priority);
  const summary = insight.metadata?.summary || '';
  const detail = insight.metadata?.detail || '';
  const dataSnapshot = insight.metadata?.data_snapshot || '';
  const categoryTitle = insight.metadata?.related_category?.title;
  const categorySlug = insight.metadata?.related_category?.slug;
  const categoryColor = insight.metadata?.related_category?.metadata?.color || '#3b82f6';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/insights" className="hover:text-brand-600 transition-colors">AI Insights</Link>
        <span>/</span>
        <span className="text-surface-700 font-medium">{insight.title}</span>
      </nav>

      <div className="bg-white rounded-3xl border border-surface-200/60 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-surface-100">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${typeColor}`}>
              {icon} {insightType || 'Insight'}
            </span>
            {priority && (
              <span className="text-xs font-medium text-surface-400 bg-surface-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {priority} priority
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900">{insight.title}</h1>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Summary */}
          {summary && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
                Summary
              </h2>
              <div className="bg-brand-50 rounded-2xl p-5 border border-brand-100">
                <p className="text-brand-800 leading-relaxed">{summary}</p>
              </div>
            </div>
          )}

          {/* Detail */}
          {detail && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
                Detailed Analysis
              </h2>
              <div className="text-surface-700 leading-relaxed whitespace-pre-wrap">
                {detail}
              </div>
            </div>
          )}

          {/* Data Snapshot */}
          {dataSnapshot && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
                Data Snapshot
              </h2>
              <div className="bg-surface-50 rounded-2xl p-5 border border-surface-200">
                <pre className="text-sm text-surface-600 whitespace-pre-wrap font-mono">
                  {dataSnapshot}
                </pre>
              </div>
            </div>
          )}

          {/* Related Category */}
          {categoryTitle && (
            <div className="pt-6 border-t border-surface-100">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">
                Related Category
              </h2>
              {categorySlug ? (
                <Link
                  href={`/categories/${categorySlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-surface-200 hover:border-brand-300 hover:text-brand-600 transition-all group"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: categoryColor }}
                  />
                  <span className="text-sm font-medium text-surface-700 group-hover:text-brand-600">
                    {categoryTitle}
                  </span>
                </Link>
              ) : (
                <span className="text-sm text-surface-600">{categoryTitle}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          ← Back to AI Insights
        </Link>
      </div>
    </div>
  );
}