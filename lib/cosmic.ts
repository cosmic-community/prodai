import { createBucketClient } from '@cosmicjs/sdk';
import type { TaskCategory, Task, AIInsight } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getTaskCategories(): Promise<TaskCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'task-categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as TaskCategory[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch task categories');
  }
}

export async function getTaskCategoryBySlug(slug: string): Promise<TaskCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'task-categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as TaskCategory;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch task category');
  }
}

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tasks' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    const tasks = response.objects as Task[];
    return tasks.sort((a, b) => {
      const dateA = new Date(a.metadata?.due_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.due_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tasks');
  }
}

export async function getTaskBySlug(slug: string): Promise<Task | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'tasks', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as Task;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch task');
  }
}

export async function getAIInsights(): Promise<AIInsight[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ai-insights' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as AIInsight[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch AI insights');
  }
}

export async function getAIInsightBySlug(slug: string): Promise<AIInsight | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'ai-insights', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as AIInsight;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch AI insight');
  }
}