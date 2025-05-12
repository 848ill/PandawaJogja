'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LightBulbIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const data = [
  { name: 'Mon', count: 21 },
  { name: 'Tue', count: 18 },
  { name: 'Wed', count: 24 },
  { name: 'Thu', count: 16 },
  { name: 'Fri', count: 26 },
  { name: 'Sat', count: 12 },
  { name: 'Sun', count: 8 },
];

export default function TrendsPage() {
  // Calculate insights
  const totalComplaints = data.reduce((sum, day) => sum + day.count, 0);
  const avgComplaints = totalComplaints / data.length;
  const maxDay = data.reduce((max, day) => day.count > max.count ? day : max);
  const minDay = data.reduce((min, day) => day.count < min.count ? day : min);

  return (
    <div className="space-y-4">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Complaint Trends</h1>
        <p className="text-sm text-gray-500">Analyze complaint patterns over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 dashboard-card">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <LightBulbIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Key Insights</h3>
              <p className="text-sm text-gray-500 mt-1">Analysis based on weekly data</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Peak Volume</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Highest number of complaints ({maxDay.count}) received on {maxDay.name}. Consider increasing staff on these peak days.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowTrendingDownIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Low Volume</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Lowest activity ({minDay.count}) on {minDay.name}. Opportunity to schedule maintenance or training.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Adjust staffing levels based on daily patterns</li>
                <li>• Plan maintenance during low-volume periods</li>
                <li>• Average of {avgComplaints.toFixed(1)} complaints per day - plan resources accordingly</li>
                <li>• Consider pre-emptive measures for high-volume days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 