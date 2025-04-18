"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Sample data for metrics and charts
const metricsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  sales: [1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550, 2700, 2850],
  forecast: [null, null, null, null, null, null, null, null, 2400, 2600, 2800, 3000],
  customerAcquisition: [150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 420],
  averageOrderValue: [85, 88, 90, 92, 95, 98, 100, 102, 105, 108, 110, 112],
  conversionRate: [2.5, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7],
  returnRate: [8.5, 8.2, 8.0, 7.8, 7.5, 7.3, 7.0, 6.8, 6.5, 6.3, 6.0, 5.8],
}

const keyMetrics = [
  {
    title: "Customer Acquisition Cost (CAC)",
    value: "$45.20",
    change: "-12%",
    trend: "down",
    description: "Cost to acquire a new customer"
  },
  {
    title: "Customer Lifetime Value (CLV)",
    value: "$325.00",
    change: "+15%",
    trend: "up",
    description: "Average revenue per customer"
  },
  {
    title: "Return on Ad Spend (ROAS)",
    value: "4.2x",
    change: "+0.8x",
    trend: "up",
    description: "Revenue generated per ad dollar"
  },
  {
    title: "Net Revenue Retention",
    value: "112%",
    change: "+5%",
    trend: "up",
    description: "Revenue retained from existing customers"
  }
]

const salesChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(75, 85, 99)',
        font: { size: 12 }
      }
    },
    title: {
      display: true,
      text: 'Sales Trend & Forecast',
      color: 'rgb(17, 24, 39)',
      font: { size: 16, weight: 'bold' as const }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Sales Volume',
        color: 'rgb(75, 85, 99)'
      },
      grid: { color: 'rgba(0, 0, 0, 0.1)' }
    },
    x: {
      grid: { color: 'rgba(0, 0, 0, 0.1)' }
    }
  }
}

const performanceChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(75, 85, 99)',
        font: { size: 12 }
      }
    },
    title: {
      display: true,
      text: 'Key Performance Metrics',
      color: 'rgb(17, 24, 39)',
      font: { size: 16, weight: 'bold' as const }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0, 0, 0, 0.1)' }
    },
    x: {
      grid: { color: 'rgba(0, 0, 0, 0.1)' }
    }
  }
}

const salesChartData = {
  labels: metricsData.labels,
  datasets: [
    {
      label: 'Actual Sales',
      data: metricsData.sales,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2
    },
    {
      label: 'Forecast',
      data: metricsData.forecast,
      borderColor: 'rgb(234, 88, 12)',
      backgroundColor: 'rgba(234, 88, 12, 0.1)',
      borderDash: [5, 5],
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2
    },
  ],
}

const performanceChartData = {
  labels: metricsData.labels,
  datasets: [
    {
      label: 'Conversion Rate (%)',
      data: metricsData.conversionRate,
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    },
    {
      label: 'Average Order Value ($)',
      data: metricsData.averageOrderValue,
      borderColor: 'rgb(139, 92, 246)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4
    }
  ],
}

export default function Sales() {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="h-full overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{metric.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
                    metric.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Sales Trend Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="h-[400px]">
              <Line options={salesChartOptions} data={salesChartData} />
            </div>
          </div>

          {/* Performance Metrics Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="h-[400px]">
              <Line options={performanceChartOptions} data={performanceChartData} />
            </div>
          </div>

          {/* Customer Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Acquisition</h3>
              <div className="h-[300px]">
                <Bar
                  data={{
                    labels: metricsData.labels,
                    datasets: [{
                      label: 'New Customers',
                      data: metricsData.customerAcquisition,
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      borderColor: 'rgb(59, 130, 246)',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    }
                  }}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Return Rate Trend</h3>
              <div className="h-[300px]">
                <Line
                  data={{
                    labels: metricsData.labels,
                    datasets: [{
                      label: 'Return Rate (%)',
                      data: metricsData.returnRate,
                      borderColor: 'rgb(239, 68, 68)',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      tension: 0.4
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 