"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface SalesForecast {
  id: string
  product: string
  category: 'apparel' | 'accessories' | 'footwear'
  currentSales: number
  predictedSales: number
  confidence: number
  aiReasoning: string
  recommendedAction: string
  impact: 'high' | 'medium' | 'low'
}

const salesForecasts: SalesForecast[] = [
  {
    id: "SF001",
    product: "Premium Denim Jacket",
    category: "apparel",
    currentSales: 1200,
    predictedSales: 2500,
    confidence: 0.85,
    aiReasoning: "Based on seasonal trends and current market demand, denim jackets show a 108% increase in sales during spring. Social media engagement and influencer partnerships indicate strong potential for this product.",
    recommendedAction: "Increase inventory by 50% and launch targeted social media campaign",
    impact: "high"
  },
  {
    id: "SF002",
    product: "Leather Crossbody Bag",
    category: "accessories",
    currentSales: 800,
    predictedSales: 950,
    confidence: 0.65,
    aiReasoning: "Market analysis shows stable demand for leather accessories. Current inventory levels are sufficient, but a small promotional campaign could boost sales.",
    recommendedAction: "Run a limited-time 15% discount promotion",
    impact: "medium"
  },
  {
    id: "SF003",
    product: "Canvas Sneakers",
    category: "footwear",
    currentSales: 2000,
    predictedSales: 1800,
    confidence: 0.75,
    aiReasoning: "Competitor analysis indicates market saturation for basic canvas sneakers. Consider focusing on premium or limited edition versions.",
    recommendedAction: "Reduce inventory and focus on premium variants",
    impact: "low"
  },
]

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  actual: [1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550, 2700, 2850],
  forecast: [null, null, null, null, null, null, null, null, 2400, 2600, 2800, 3000],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(75, 85, 99)',
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: 'Sales Trend & Forecast',
      color: 'rgb(17, 24, 39)',
      font: {
        size: 16,
        weight: 'bold'
      }
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
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
}

const chartData = {
  labels: salesData.labels,
  datasets: [
    {
      label: 'Actual Sales',
      data: salesData.actual,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2
    },
    {
      label: 'Forecast',
      data: salesData.forecast,
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

const keyMetrics = [
  {
    title: "Total Sales Growth",
    value: "15.2%",
    change: "+2.4%",
    trend: "up",
    description: "Year-over-year growth in total sales"
  },
  {
    title: "Forecast Accuracy",
    value: "92.5%",
    change: "+1.8%",
    trend: "up",
    description: "Accuracy of previous forecasts"
  },
  {
    title: "Inventory Turnover",
    value: "4.8x",
    change: "-0.3x",
    trend: "down",
    description: "Number of times inventory is sold and replaced"
  },
  {
    title: "Customer Acquisition",
    value: "2,450",
    change: "+320",
    trend: "up",
    description: "New customers this quarter"
  }
]

export default function SalesForecast() {
  const [approvedActions, setApprovedActions] = useState<string[]>([])
  const [expandedForecast, setExpandedForecast] = useState<string | null>(null)

  const getCategoryStyles = (category: SalesForecast['category']) => {
    switch (category) {
      case 'apparel':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
      case 'accessories':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
      case 'footwear':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-700/20 dark:text-gray-300'
    }
  }

  const getImpactStyles = (impact: SalesForecast['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'low':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-700/20 dark:text-gray-300'
    }
  }

  const toggleApproval = (forecast: SalesForecast) => {
    if (approvedActions.includes(forecast.id)) {
      setApprovedActions(prev => prev.filter(id => id !== forecast.id))
    } else {
      setApprovedActions(prev => [...prev, forecast.id])
    }
  }

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

          {/* Time Series Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="h-[400px]">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* Existing Grid Layout */}
          <div className="grid grid-cols-1 min-[888px]:grid-cols-[1.2fr,0.8fr] gap-12 auto-rows-min">
            {/* Left Column - Sales Forecast */}
            <div className="space-y-8 min-[888px]:row-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 h-full">
                <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">AI Sales Forecast</h1>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
                  <h2 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">Forecast Overview</h2>
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                    Our AI analyzes market trends, seasonal patterns, and consumer behavior to predict sales performance. 
                    Use these insights to optimize inventory, marketing strategies, and resource allocation for maximum impact.
                  </p>
                </div>
                <div className="overflow-x-auto -mx-8">
                  <div className="inline-block min-w-full align-middle px-8">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-700/50">
                          <TableHead className="w-[60px] text-gray-900 dark:text-gray-100">Approve</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Product</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Category</TableHead>
                          <TableHead className="text-right text-gray-900 dark:text-gray-100">Current Sales</TableHead>
                          <TableHead className="text-right text-gray-900 dark:text-gray-100">Predicted Sales</TableHead>
                          <TableHead className="text-right text-gray-900 dark:text-gray-100">Confidence</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Impact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {salesForecasts.map((forecast) => (
                          <>
                            <TableRow 
                              key={forecast.id}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              onClick={() => setExpandedForecast(expandedForecast === forecast.id ? null : forecast.id)}
                            >
                              <TableCell className="py-4" onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                  checked={approvedActions.includes(forecast.id)}
                                  onCheckedChange={() => toggleApproval(forecast)}
                                />
                              </TableCell>
                              <TableCell className="py-4 text-gray-900 dark:text-gray-100">{forecast.product}</TableCell>
                              <TableCell className="py-4">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize
                                  ${getCategoryStyles(forecast.category)}`}>
                                  {forecast.category}
                                </span>
                              </TableCell>
                              <TableCell className="text-right py-4 text-gray-900 dark:text-gray-100">
                                {forecast.currentSales.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right py-4 text-gray-900 dark:text-gray-100">
                                {forecast.predictedSales.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right py-4 text-gray-900 dark:text-gray-100">
                                {(forecast.confidence * 100).toFixed(0)}%
                              </TableCell>
                              <TableCell className="py-4">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize
                                  ${getImpactStyles(forecast.impact)}`}>
                                  {forecast.impact}
                                </span>-0
                              </TableCell>
                            </TableRow>
                            {expandedForecast === forecast.id && (
                              <TableRow>
                                <TableCell colSpan={7} className="bg-gray-50 dark:bg-gray-700/50">
                                  <div className="p-6">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">AI Analysis</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                      {forecast.aiReasoning}
                                    </p>
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Recommended Action</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                      {forecast.recommendedAction}
                                    </p>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Approved Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Approved Actions</h2>
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {salesForecasts
                  .filter(forecast => approvedActions.includes(forecast.id))
                  .map((forecast) => (
                    <div
                      key={forecast.id}
                      className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700"
                    >
                      <div className="font-medium text-lg text-gray-900 dark:text-gray-100">{forecast.product}</div>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize
                          ${getCategoryStyles(forecast.category)}`}>
                          {forecast.category}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize
                          ${getImpactStyles(forecast.impact)}`}>
                          {forecast.impact} impact
                        </span>
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 mt-3">
                        Predicted Sales: {forecast.predictedSales.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                        {forecast.recommendedAction}
                      </div>
                    </div>
                  ))}
                {approvedActions.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    No approved actions yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 