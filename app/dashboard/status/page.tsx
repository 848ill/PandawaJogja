'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LightBulbIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const data = [
  { name: 'Submitted', value: 42 },
  { name: 'Under Review', value: 28 },
  { name: 'In Progress', value: 37 },
  { name: 'Resolved', value: 19 },
  { name: 'Closed', value: 12 },
];

export default function StatusPage() {
  // Calculate insights
  const totalComplaints = data.reduce((sum, status) => sum + status.value, 0);
  const openComplaints = data.filter(s => ['Submitted', 'Under Review', 'In Progress'].includes(s.name))
    .reduce((sum, status) => sum + status.value, 0);
  const resolvedRate = ((data.find(s => s.name === 'Resolved')?.value || 0) / totalComplaints * 100).toFixed(1);
  const submittedCount = data.find(s => s.name === 'Submitted')?.value || 0;

  return (
    <div className="space-y-4">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Status Breakdown</h1>
        <p className="text-sm text-gray-500">Overview of complaints by their current status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
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
                  <Bar
                    dataKey="value"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.map((status) => (
              <div key={status.name} className="metric-card">
                <div className="text-sm text-gray-500 mb-1">{status.name}</div>
                <div className="text-2xl font-semibold text-gray-800">{status.value}</div>
                <div className="mt-1 text-xs text-gray-400">Total cases</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <LightBulbIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Status Analysis</h3>
              <p className="text-sm text-gray-500 mt-1">Current state and recommendations</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Attention Needed</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {openComplaints} complaints still open. {submittedCount} new submissions require initial review.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Resolution Rate</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {resolvedRate}% resolution rate achieved. Focus on moving 'In Progress' cases to resolution.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Action Items:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Prioritize review of {submittedCount} new submissions</li>
                <li>• Investigate cases stuck in 'Under Review'</li>
                <li>• Follow up on {data.find(s => s.name === 'In Progress')?.value} in-progress cases</li>
                <li>• Consider process improvements for faster resolution</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 