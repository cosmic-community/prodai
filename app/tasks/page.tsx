import { getTasks, getTaskCategories, getMetafieldValue } from '@/lib/cosmic';
import TaskCard from '@/components/TaskCard';
import TaskFilters from '@/components/TaskFilters';

export const revalidate = 60;

export const metadata = {
  title: 'Tasks | ProdAI',
  description: 'Manage and track all your tasks in one place.',
};

export default async function TasksPage() {
  const [tasks, categories] = await Promise.all([
    getTasks(),
    getTaskCategories(),
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => getMetafieldValue(t.metadata?.status).toLowerCase() === 'completed'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">✅</span>
          <h1 className="text-3xl font-bold text-surface-900">Tasks</h1>
        </div>
        <p className="text-surface-500 max-w-2xl">
          Manage and track all your tasks. You have{' '}
          <span className="font-semibold text-surface-700">{totalTasks}</span> total tasks with{' '}
          <span className="font-semibold text-green-600">{completedTasks}</span> completed.
        </p>
      </div>

      <TaskFilters tasks={tasks} categories={categories} />
    </div>
  );
}