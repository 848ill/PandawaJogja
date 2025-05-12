'use client';

import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';

interface InsightProps {
  stats: {
    complaintTrend: Array<{ name: string; count: number }>;
    categoryDistribution: Array<{ name: string; value: number }>;
    statusBreakdown: Array<{ name: string; value: number }>;
    responseTimeAvg: number;
    resolutionTimeAvg: number;
    totalComplaints: number;
    satisfactionRate: number;
  } | null;
  timeframe: string;
}

const AnalyticsInsights: React.FC<InsightProps> = ({ stats, timeframe }) => {
  if (!stats) return null;

  // Calculate insights
  const totalComplaints = stats.totalComplaints;
  const avgResponseTime = stats.responseTimeAvg;
  const avgResolutionTime = stats.resolutionTimeAvg;
  const satisfactionRate = stats.satisfactionRate;

  // Find most common category
  const topCategory = [...stats.categoryDistribution].sort((a, b) => b.value - a.value)[0];
  
  // Calculate pending cases
  const pendingCases = stats.statusBreakdown
    .filter(status => ['Submitted', 'Under Review', 'In Progress'].includes(status.name))
    .reduce((sum, status) => sum + status.value, 0);

  // Calculate trend
  const trendData = stats.complaintTrend;
  const currentPeriod = trendData[trendData.length - 1].count;
  const previousPeriod = trendData[trendData.length - 2].count;
  const trendPercentage = ((currentPeriod - previousPeriod) / previousPeriod) * 100;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Analytics Insights & Recommendations
        </h2>
        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          {timeframe === 'week' ? 'Weekly Analysis' : 'Monthly Analysis'}
        </span>
      </div>
      
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Volume Trend Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">Volume Trend Analysis</h3>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-2xl font-bold ${trendPercentage >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {Math.abs(trendPercentage).toFixed(1)}%
            </span>
            {trendPercentage >= 0 ? (
              <ArrowUpIcon className="w-6 h-6 text-red-500" />
            ) : (
              <ArrowDownIcon className="w-6 h-6 text-green-500" />
            )}
          </div>
          <p className="text-gray-600">
            {timeframe === 'week' ? 'This week' : 'This month'} shows 
            {trendPercentage >= 0 ? ' increase' : ' decrease'} in complaints compared to the previous period.
            {trendPercentage > 10 && (
              <span className="flex items-center gap-1 mt-2 text-red-500">
                <ExclamationTriangleIcon className="w-5 h-5" />
                Significant increase requires attention
              </span>
            )}
          </p>
        </div>

        {/* Category Focus Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <UserGroupIcon className="w-8 h-8 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-800">Category Focus</h3>
          </div>
          <div className="mb-3">
            <span className="text-2xl font-bold text-green-500">{topCategory.name}</span>
          </div>
          <p className="text-gray-600">
            Highest volume with <span className="font-semibold">{topCategory.value}</span> complaints 
            (<span className="font-semibold">{((topCategory.value / totalComplaints) * 100).toFixed(1)}%</span> of total cases)
          </p>
          <div className="mt-3 flex items-center gap-2 text-green-600">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm">Prioritize resource allocation</span>
          </div>
        </div>

        {/* Response Time Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon className="w-8 h-8 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-800">Response Time Analysis</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500">Response Time</p>
              <span className="text-2xl font-bold text-yellow-500">{avgResponseTime}h</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Resolution Time</p>
              <span className="text-2xl font-bold text-yellow-500">{avgResolutionTime}h</span>
            </div>
          </div>
          {avgResponseTime > 20 && (
            <div className="mt-3 flex items-center gap-2 text-yellow-600">
              <ExclamationCircleIcon className="w-5 h-5" />
              <span className="text-sm">Response times above target</span>
            </div>
          )}
        </div>

        {/* Satisfaction Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <UserGroupIcon className="w-8 h-8 text-purple-500" />
            <h3 className="text-xl font-semibold text-gray-800">Satisfaction Metrics</h3>
          </div>
          <div className="relative mb-4">
            <div className="text-3xl font-bold text-purple-500">{satisfactionRate}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className={`h-2.5 rounded-full ${satisfactionRate >= 75 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${satisfactionRate}%` }}
              ></div>
            </div>
          </div>
          {satisfactionRate < 75 ? (
            <div className="flex items-center gap-2 text-yellow-600">
              <ExclamationCircleIcon className="w-5 h-5" />
              <span className="text-sm">Below target - Review needed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircleIcon className="w-5 h-5" />
              <span className="text-sm">Above target - Good performance</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <ExclamationCircleIcon className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Priority Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendPercentage > 10 && (
            <div className="bg-white/80 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span className="font-semibold">High Priority</span>
              </div>
              <p className="text-gray-700">Investigate increased complaint volume</p>
            </div>
          )}
          {avgResponseTime > 20 && (
            <div className="bg-white/80 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                <ClockIcon className="w-5 h-5" />
                <span className="font-semibold">Response Time</span>
              </div>
              <p className="text-gray-700">Review staff allocation during peak hours</p>
            </div>
          )}
          {pendingCases > totalComplaints * 0.6 && (
            <div className="bg-white/80 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-semibold">Workload</span>
              </div>
              <p className="text-gray-700">Consider temporary staff augmentation</p>
            </div>
          )}
          {satisfactionRate < 75 && (
            <div className="bg-white/80 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-purple-500 mb-2">
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-semibold">Training</span>
              </div>
              <p className="text-gray-700">Schedule customer service training</p>
            </div>
          )}
          <div className="bg-white/80 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <ChartBarIcon className="w-5 h-5" />
              <span className="font-semibold">Resource Focus</span>
            </div>
            <p className="text-gray-700">Prioritize {topCategory.name} department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInsights; 