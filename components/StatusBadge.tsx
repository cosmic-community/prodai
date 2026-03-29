interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const lower = status.toLowerCase();

  const styles: Record<string, string> = {
    'completed': 'bg-green-100 text-green-800',
    'in progress': 'bg-blue-100 text-blue-800',
    'to do': 'bg-surface-100 text-surface-600',
    'overdue': 'bg-red-100 text-red-800',
  };

  const icons: Record<string, string> = {
    'completed': '✅',
    'in progress': '🔄',
    'to do': '📋',
    'overdue': '⚠️',
  };

  const style = styles[lower] || 'bg-surface-100 text-surface-600';
  const icon = icons[lower] || '📋';

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${style}`}>
      {icon} {status}
    </span>
  );
}