'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LightBulbIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const data = [
  { name: 'Healthcare', value: 35 },
  { name: 'Transportation', value: 25 },
  { name: 'Education', value: 18 },
  { name: 'Infrastructure', value: 15 },
  { name: 'Other', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CategoriesPage() {
  // Calculate insights
  const totalComplaints = data.reduce((sum, category) => sum + category.value, 0);
  const topCategory = data.reduce((max, category) => category.value > max.value ? category : max);
  const bottomCategory = data.reduce((min, category) => category.value < min.value ? category : min);
  const topThreeCategories = [...data].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Category Distribution</h1>
        <p className="text-sm text-gray-500">Distribution of complaints across different categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="dashboard-card">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Details</h3>
            <div className="space-y-4">
              {data.map((category, index) => (
                <div key={category.name} className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {category.value} complaints
                      </span>
                    </div>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                          width: `${(category.value / totalComplaints) * 100}%`,
                        }}
                      />
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
              <h3 className="font-semibold text-gray-800">Category Insights</h3>
              <p className="text-sm text-gray-500 mt-1">Analysis and recommendations</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Distribution Overview</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {topCategory.name} leads with {((topCategory.value / totalComplaints) * 100).toFixed(1)}% of total complaints.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Key Focus Areas</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Top 3 categories account for {((topThreeCategories.reduce((sum, cat) => sum + cat.value, 0) / totalComplaints) * 100).toFixed(1)}% of all complaints.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Prioritize resources for {topCategory.name} department</li>
                <li>• Investigate root causes in top categories</li>
                <li>• Review {bottomCategory.name} category for potential improvements</li>
                <li>• Consider specialized training for high-volume areas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 