'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface StatusData {
  name: string;
  value: number;
}

interface TimeData {
  name: string;
  estimated: number;
  actual: number;
}

interface DashboardChartsProps {
  statusData: StatusData[];
  timeData: TimeData[];
}

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function DashboardCharts({ statusData, timeData }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution */}
      <div className="bg-white rounded-2xl border border-surface-200/60 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 mb-6">Task Status Distribution</h3>
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-surface-400">
            No task data available
          </div>
        )}
      </div>

      {/* Time Comparison */}
      <div className="bg-white rounded-2xl border border-surface-200/60 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-surface-900 mb-6">Estimated vs Actual Time</h3>
        {timeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={timeData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#94a3b8' } }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Legend />
              <Bar dataKey="estimated" fill="#93c5fd" name="Estimated" radius={[6, 6, 0, 0]} />
              <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-surface-400">
            No time tracking data available
          </div>
        )}
      </div>
    </div>
  );
}