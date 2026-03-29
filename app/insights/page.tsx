import { getAIInsights } from '@/lib/cosmic';
import InsightCard from '@/components/InsightCard';

export const revalidate = 60;

export const metadata = {
  title: 'AI Insights | ProdAI',
  description: 'AI-powered productivity recommendations and insights.',
};

export default async function InsightsPage() {
  const insights = await getAIInsights();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🤖</span>
          <h1 className="text-3xl font-bold text-surface-900">AI Insights</h1>
        </div>
        <p className="text-surface-500 max-w-2xl">
          Personalized recommendations based on your productivity patterns. Our AI analyzes
          your task data to help you work smarter.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl border border-brand-100 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-900 mb-1">How AI Insights Work</h3>
            <p className="text-sm text-brand-700 leading-relaxed">
              ProdAI analyzes your task completion patterns, time tracking data, and productivity
              trends to generate actionable recommendations. Insights are categorized by type and
              prioritized based on potential impact.
            </p>
          </div>
        </div>
      </div>

      {insights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200/60">
          <span className="text-4xl mb-4 block">🤖</span>
          <h3 className="text-lg font-semibold text-surface-700 mb-2">No insights yet</h3>
          <p className="text-sm text-surface-400">
            AI insights will appear here once they are generated and added in Cosmic.
          </p>
        </div>
      )}
    </div>
  );
}