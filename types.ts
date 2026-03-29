export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface TaskCategory extends CosmicObject {
  type: 'task-categories';
  metadata: {
    name?: string;
    color?: string;
    icon?: string;
    description?: string;
  };
}

export interface Task extends CosmicObject {
  type: 'tasks';
  metadata: {
    description?: string;
    category?: TaskCategory;
    priority?: string;
    status?: string;
    due_date?: string;
    estimated_minutes?: number;
    actual_minutes?: number;
    completed_date?: string;
    is_recurring?: boolean;
  };
}

export interface AIInsight extends CosmicObject {
  type: 'ai-insights';
  metadata: {
    insight_type?: string;
    summary?: string;
    detail?: string;
    data_snapshot?: string;
    priority?: string;
    related_category?: TaskCategory;
  };
}

export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed' | 'Overdue';
export type InsightType = 'Productivity' | 'Time Management' | 'Focus' | 'Recommendation';