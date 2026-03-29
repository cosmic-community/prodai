import Link from 'next/link';
import { getTasks, getAIInsights, getTaskCategories, getMetafieldValue } from '@/lib/cosmic';
import MetricCard from '@/components/MetricCard';
import TaskCard from '@/components/TaskCard';
import InsightCard from '@/components/InsightCard';
import DashboardCharts from '@/components/DashboardCharts';

export const revalidate = 60;

export default async function HomePage() {
  const [tasks, insights, categories] = await Promise.all([
    getTasks(),
    getAIInsights(),
    getTaskCategories(),
  ]);

  // Compute metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => getMetafieldValue(t.metadata?.status).toLowerCase() === 'completed'
  ).length;
  const inProgressTasks = tasks.filter(
    (t) => getMetafieldValue(t.metadata?.status).toLowerCase() === 'in progress'
  ).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalEstimated = tasks.reduce((sum, t) => sum + (t.metadata?.estimated_minutes || 0), 0);
  const totalActual = tasks.reduce((sum, t) => sum + (t.metadata?.actual_minutes || 0), 0);
  const timeEfficiency = totalEstimated > 0 ? Math.round((totalActual / totalEstimated) * 100) : 0;

  // Chart data: status distribution
  const statusCounts: Record<string, number> = {};
  tasks.forEach((t) => {
    const status = getMetafieldValue(t.metadata?.status) || 'Unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Chart data: time by category
  const categoryTimeMap: Record<string, { estimated: number; actual: number }> = {};
  tasks.forEach((t) => {
    const catName = t.metadata?.category?.title || 'Other';
    if (!categoryTimeMap[catName]) {
      categoryTimeMap[catName] = { estimated: 0, actual: 0 };
    }
    const entry = categoryTimeMap[catName];
    if (entry) {
      entry.estimated += t.metadata?.estimated_minutes || 0;
      entry.actual += t.metadata?.actual_minutes || 0;
    }
  });
  const timeData = Object.entries(categoryTimeMap).map(([name, data]) => ({
    name,
    estimated: data.estimated,
    actual: data.actual,
  }));

  // Recent tasks and insights
  const recentTasks = tasks.slice(0, 4);
  const recentInsights = insights.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-10 animate-fade-in">
        <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRWMGg0djM0aDIwdjRIMzZWMzR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧠</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Welcome to ProdAI
              </h1>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl leading-relaxed">
              Your AI-powered productivity assistant. Track tasks, analyze performance, 
              and get intelligent insights to optimize your workflow.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-sm"
              >
                ✅ View Tasks
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors text-sm backdrop-blur-sm border border-white/20"
              >
                🤖 AI Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-10 animate-slide-up">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Tasks" value={totalTasks} icon="📋" color="brand" />
          <MetricCard
            label="Completed"
            value={completedTasks}
            icon="✅"
            trend={`${completionRate}%`}
            color="green"
          />
          <MetricCard label="In Progress" value={inProgressTasks} icon="🔄" color="amber" />
          <MetricCard
            label="Time Efficiency"
            value={`${timeEfficiency}%`}
            icon="⏱️"
            color="purple"
          />
        </div>
      </section>

      {/* Charts */}
      <section className="mb-10">
        <DashboardCharts statusData={statusData} timeData={timeData} />
      </section>

      {/* Categories Overview */}
      {categories.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-surface-900">Categories</h2>
            <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const color = cat.metadata?.color || '#3b82f6';
              const icon = cat.metadata?.icon || '📁';
              const taskCount = tasks.filter(
                (t) => t.metadata?.category?.slug === cat.slug
              ).length;

              return (
                <Link key={cat.id} href={`/categories/${cat.slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-surface-200/60 p-5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 text-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mx-auto mb-3"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {icon}
                    </div>
                    <h3 className="text-sm font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-surface-400 mt-1">{taskCount} tasks</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent Tasks */}
      {recentTasks.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-surface-900">Recent Tasks</h2>
            <Link href="/tasks" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      )}

      {/* AI Insights */}
      {recentInsights.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-surface-900">Latest AI Insights</h2>
            <Link href="/insights" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}