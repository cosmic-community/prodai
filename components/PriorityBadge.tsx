interface PriorityBadgeProps {
  priority: string;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const lower = priority.toLowerCase();

  const styles: Record<string, string> = {
    high: 'bg-red-50 text-red-700 border border-red-200',
    medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    low: 'bg-green-50 text-green-700 border border-green-200',
  };

  const icons: Record<string, string> = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  const style = styles[lower] || 'bg-surface-100 text-surface-600 border border-surface-200';
  const icon = icons[lower] || '⚪';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {icon} {priority}
    </span>
  );
}