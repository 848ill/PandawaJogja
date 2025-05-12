'use client';

import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import AnalyticsInsights from './AnalyticsInsights';

interface Stats {
  complaintTrend: Array<{ name: string; count: number }>;
  categoryDistribution: Array<{ name: string; value: number }>;
  statusBreakdown: Array<{ name: string; value: number }>;
  responseTimeAvg: number;
  resolutionTimeAvg: number;
  totalComplaints: number;
  satisfactionRate: number;
}

interface SampleData {
  [key: string]: Stats;
}

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Sample data - in production, this would come from API
  const sampleData: SampleData = {
    week: {
      complaintTrend: [
        { name: 'Mon', count: 21 },
        { name: 'Tue', count: 18 },
        { name: 'Wed', count: 24 },
        { name: 'Thu', count: 16 },
        { name: 'Fri', count: 26 },
        { name: 'Sat', count: 12 },
        { name: 'Sun', count: 8 },
      ],
      categoryDistribution: [
        { name: 'Healthcare', value: 35 },
        { name: 'Transportation', value: 25 },
        { name: 'Education', value: 18 },
        { name: 'Infrastructure', value: 15 },
        { name: 'Other', value: 7 },
      ],
      statusBreakdown: [
        { name: 'Submitted', value: 42 },
        { name: 'Under Review', value: 28 },
        { name: 'In Progress', value: 37 },
        { name: 'Resolved', value: 19 },
        { name: 'Closed', value: 12 },
      ],
      responseTimeAvg: 18.4,
      resolutionTimeAvg: 84.2,
      totalComplaints: 138,
      satisfactionRate: 76
    },
    month: {
      complaintTrend: [
        { name: 'Week 1', count: 125 },
        { name: 'Week 2', count: 132 },
        { name: 'Week 3', count: 116 },
        { name: 'Week 4', count: 128 },
      ],
      categoryDistribution: [
        { name: 'Healthcare', value: 156 },
        { name: 'Transportation', value: 112 },
        { name: 'Education', value: 85 },
        { name: 'Infrastructure', value: 68 },
        { name: 'Other', value: 30 },
      ],
      statusBreakdown: [
        { name: 'Submitted', value: 82 },
        { name: 'Under Review', value: 114 },
        { name: 'In Progress', value: 152 },
        { name: 'Resolved', value: 76 },
        { name: 'Closed', value: 37 },
      ],
      responseTimeAvg: 20.1,
      resolutionTimeAvg: 92.5,
      totalComplaints: 501,
      satisfactionRate: 72
    }
  };
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      setStats(sampleData[timeframe]);
      setLoading(false);
    }, 800);
  }, [timeframe]);
  
  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="dashboard-card">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="dashboard-title">
                Complaints Dashboard
              </h2>
              <p className="text-sm text-gray-500">Monitor and analyze complaint trends and performance metrics</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setTimeframe('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeframe === 'week' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                This Week
              </button>
              <button 
                onClick={() => setTimeframe('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeframe === 'month' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                This Month
              </button>
            </div>
          </div>
        </div>
        
        {/* Analytics Insights */}
        <AnalyticsInsights stats={stats} timeframe={timeframe} />
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="text-sm text-gray-500 mb-1">Total Complaints</div>
            <div className="text-2xl font-semibold text-gray-800">{stats.totalComplaints}</div>
            <div className="mt-1 text-xs text-gray-400">All reported cases</div>
          </div>
          <div className="metric-card">
            <div className="text-sm text-gray-500 mb-1">Avg. Response Time</div>
            <div className="text-2xl font-semibold text-gray-800">{stats.responseTimeAvg}h</div>
            <div className="mt-1 text-xs text-gray-400">Time to first response</div>
          </div>
          <div className="metric-card">
            <div className="text-sm text-gray-500 mb-1">Avg. Resolution Time</div>
            <div className="text-2xl font-semibold text-gray-800">{stats.resolutionTimeAvg}h</div>
            <div className="mt-1 text-xs text-gray-400">Time to resolution</div>
          </div>
          <div className="metric-card">
            <div className="text-sm text-gray-500 mb-1">Satisfaction Rate</div>
            <div className="text-2xl font-semibold text-gray-800">{stats.satisfactionRate}%</div>
            <div className="mt-1 text-xs text-gray-400">Overall satisfaction</div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Complaints Trend */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Complaints Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.complaintTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
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
          
          {/* Status Breakdown */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.statusBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
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
          
          {/* Category Distribution */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.categoryDistribution.map((entry, index) => (
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
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical"
                  data={[
                    {name: 'Healthcare', responseTime: 12.4, resolutionTime: 72.1},
                    {name: 'Transportation', responseTime: 22.8, resolutionTime: 96.3},
                    {name: 'Education', responseTime: 16.2, resolutionTime: 84.5},
                    {name: 'Infrastructure', responseTime: 18.9, resolutionTime: 106.2},
                  ]}
                  margin={{top: 10, right: 30, left: 100, bottom: 5}}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
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
        </div>
        
        {/* Recent Activity */}
        <div className="dashboard-card overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap text-sm text-gray-900">CP-2023-5482</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Healthcare</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Hospital Waiting Time Issue</td>
                  <td className="whitespace-nowrap">
                    <span className="status-badge status-badge-in-progress">
                      In Progress
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Health Services</td>
                  <td className="whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap text-sm text-gray-900">CP-2023-5481</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Transportation</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Bus Route 72 Schedule Problems</td>
                  <td className="whitespace-nowrap">
                    <span className="status-badge status-badge-resolved">
                      Resolved
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Transport Authority</td>
                  <td className="whitespace-nowrap text-sm text-gray-500">3 hours ago</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap text-sm text-gray-900">CP-2023-5480</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Education</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">School Facility Maintenance</td>
                  <td className="whitespace-nowrap">
                    <span className="status-badge status-badge-open">
                      Under Review
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Education Department</td>
                  <td className="whitespace-nowrap text-sm text-gray-500">5 hours ago</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap text-sm text-gray-900">CP-2023-5479</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Infrastructure</td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Pothole on Main Street</td>
                  <td className="whitespace-nowrap">
                    <span className="status-badge status-badge-closed">
                      Closed
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-900">Public Works</td>
                  <td className="whitespace-nowrap text-sm text-gray-500">8 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 