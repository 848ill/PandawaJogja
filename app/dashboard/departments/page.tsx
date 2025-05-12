'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LightBulbIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const data = [
  { name: 'Healthcare', responseTime: 12.4, resolutionTime: 72.1, satisfaction: 85 },
  { name: 'Transportation', responseTime: 22.8, resolutionTime: 96.3, satisfaction: 72 },
  { name: 'Education', responseTime: 16.2, resolutionTime: 84.5, satisfaction: 78 },
  { name: 'Infrastructure', responseTime: 18.9, resolutionTime: 106.2, satisfaction: 68 },
];

export default function DepartmentsPage() {
  // Calculate insights
  const avgResponseTime = data.reduce((sum, dept) => sum + dept.responseTime, 0) / data.length;
  const avgSatisfaction = data.reduce((sum, dept) => sum + dept.satisfaction, 0) / data.length;
  
  const bestPerformer = data.reduce((best, dept) => 
    dept.satisfaction > best.satisfaction ? dept : best
  );
  
  const needsImprovement = data.reduce((worst, dept) => 
    dept.satisfaction < worst.satisfaction ? dept : worst
  );

  return (
    <div className="space-y-4">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Department Performance</h1>
        <p className="text-sm text-gray-500">Performance metrics for each department</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="dashboard-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Response & Resolution Times</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={data}
                  margin={{ top: 10, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" />
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
                    dataKey="responseTime"
                    name="Avg. Response (hrs)"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="resolutionTime"
                    name="Avg. Resolution (hrs)"
                    fill="#10b981"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Satisfaction Rates</h3>
            <div className="space-y-4">
              {data.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {dept.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {dept.satisfaction}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${dept.satisfaction}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="text-xs text-gray-500">
                      Response time: {dept.responseTime}h
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      Resolution time: {dept.resolutionTime}h
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <LightBulbIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Performance Analysis</h3>
              <p className="text-sm text-gray-500 mt-1">Key metrics and recommendations</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Response Times</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Average response time is {avgResponseTime.toFixed(1)} hours. {bestPerformer.name} leads with {bestPerformer.responseTime} hours.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Satisfaction Levels</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Overall satisfaction at {avgSatisfaction.toFixed(1)}%. {needsImprovement.name} needs attention at {needsImprovement.satisfaction}%.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Share best practices from {bestPerformer.name}</li>
                <li>• Focus on improving {needsImprovement.name} satisfaction</li>
                <li>• Target response times under {avgResponseTime.toFixed(1)} hours</li>
                <li>• Implement cross-department training programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 