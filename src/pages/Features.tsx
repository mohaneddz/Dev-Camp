"use client"

import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Sample data for feature importance
const featureData = {
  labels: ['Engagement Rate', 'Post Frequency', 'Content Type', 'Time of Day', 'Hashtag Usage', 'Caption Length', 'Media Quality'],
  datasets: [{
    label: 'Feature Importance Score',
    data: [0.85, 0.72, 0.68, 0.65, 0.58, 0.45, 0.42],
    backgroundColor: [
      '#3B82F6', // blue-500
      '#10B981', // emerald-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#F59E0B', // amber-500
      '#6366F1', // indigo-500
      '#14B8A6', // teal-500
    ],
    borderWidth: 0,
    borderRadius: 6,
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Feature Importance Analysis',
      font: {
        size: 16,
        weight: 'bold' as const,
      },
      color: 'rgb(17, 24, 39)', // gray-900
      padding: {
        top: 20,
        bottom: 20
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: 'rgb(17, 24, 39)',
      bodyColor: 'rgb(75, 85, 99)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      boxPadding: 4,
      usePointStyle: true,
      callbacks: {
        label: (context: any) => {
          return `${context.parsed.y.toFixed(2)} importance score`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1,
      title: {
        display: true,
        text: 'Importance Score',
        color: 'rgb(75, 85, 99)', // gray-600
        font: {
          size: 12,
          weight: '500'
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
      },
      ticks: {
        color: 'rgb(107, 114, 128)', // gray-500
        font: {
          size: 12
        }
      }
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'rgb(107, 114, 128)', // gray-500
        font: {
          size: 12
        }
      }
    },
  },
}

// Sample recommendations
const recommendations = [
  {
    title: "Increase Post Frequency",
    description: "Posting 3-4 times per week shows optimal engagement",
    impact: "High",
    priority: 1,
    icon: "📅",
  },
  {
    title: "Optimize Posting Times",
    description: "Best engagement between 2-4 PM on weekdays",
    impact: "Medium",
    priority: 2,
    icon: "⏰",
  },
  {
    title: "Diversify Content Types",
    description: "Mix of images, videos, and carousels performs best",
    impact: "High",
    priority: 1,
    icon: "🎨",
  },
]

export default function Features() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="h-full overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feature Analysis & Recommendations</h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                AI-powered insights to optimize your social media strategy
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Generate New Analysis</span>
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" 
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature Importance Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Feature Importance Analysis</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Higher score = More important</span>
                </div>
              </div>
              <div className="h-[400px]">
                <Bar data={featureData} options={chartOptions} />
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Recommendations</h2>
                <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                  {recommendations.length} suggestions
                </span>
              </div>
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center text-xl">
                        {rec.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{rec.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            rec.impact === 'High' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {rec.impact} Impact
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Chat Button */}
          <button
            className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 ${
              isChatOpen 
                ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
            onClick={() => setIsChatOpen(!isChatOpen)}
            aria-label={isChatOpen ? "Close chat" : "Open chat"}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isChatOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              )}
            </svg>
          </button>

          {/* Chat Window */}
          {isChatOpen && (
            <div className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about your features</p>
                  </div>
                </div>
              </div>
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {/* Welcome Message */}
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        Hello! I'm your AI assistant. I can help you understand your feature analysis and provide recommendations. What would you like to know?
                      </p>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                        Explain chart
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                        Show recommendations
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Message Example */}
                <div className="flex items-start justify-end space-x-2">
                  <div className="flex-1 max-w-[80%]">
                    <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-3">
                      <p className="text-sm text-white">
                        Can you explain the engagement rate feature?
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                      2:30 PM
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* AI Response Example */}
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        The engagement rate feature measures how actively your audience interacts with your content. It's calculated based on likes, comments, shares, and saves. A higher engagement rate indicates more meaningful connections with your audience.
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      2:31 PM
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}