'use client';

import { useState, useMemo } from 'react';
import type { Task, TaskCategory } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import TaskCard from '@/components/TaskCard';

interface TaskFiltersProps {
  tasks: Task[];
  categories: TaskCategory[];
}

export default function TaskFilters({ tasks, categories }: TaskFiltersProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const status = getMetafieldValue(task.metadata?.status).toLowerCase();
      const priority = getMetafieldValue(task.metadata?.priority).toLowerCase();
      const categorySlug = task.metadata?.category?.slug || '';

      const matchesStatus = statusFilter === 'all' || status === statusFilter.toLowerCase();
      const matchesPriority = priorityFilter === 'all' || priority === priorityFilter.toLowerCase();
      const matchesCategory = categoryFilter === 'all' || categorySlug === categoryFilter;
      const matchesSearch =
        searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.metadata?.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
    });
  }, [tasks, statusFilter, priorityFilter, categoryFilter, searchQuery]);

  const statuses = ['all', 'To Do', 'In Progress', 'Completed', 'Overdue'];
  const priorities = ['all', 'High', 'Medium', 'Low'];

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-800 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Status:</span>
          <div className="flex gap-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  statusFilter === s
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white text-surface-600 border border-surface-200 hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Priority:</span>
          <div className="flex gap-1">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  priorityFilter === p
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white text-surface-600 border border-surface-200 hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                {p === 'all' ? 'All' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-surface-600 border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-surface-400">
          Showing <span className="font-semibold text-surface-700">{filteredTasks.length}</span> of{' '}
          {tasks.length} tasks
        </p>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-surface-200/60">
          <span className="text-4xl mb-4 block">🔍</span>
          <h3 className="text-lg font-semibold text-surface-700 mb-2">No tasks found</h3>
          <p className="text-sm text-surface-400">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}