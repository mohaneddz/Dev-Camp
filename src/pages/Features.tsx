"use client"

import { useState, useEffect, FormEvent, useRef } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
)

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sample data for feature importance
const featureData = {
  labels: ['Engagement Rate', 'Post Frequency', 'Content Type', 'Time of Day', 'Hashtag Usage', 'Caption Length', 'Media Quality'],
  datasets: [{
    label: 'Feature Importance Score',
    data: [0.85, 0.72, 0.68, 0.65, 0.58, 0.45, 0.42],
    // --chart-shade-1: #8fd1d8;
    // --chart-shade-2: #a143fd;
    // --chart-shade-3: #011133;
    // --chart-shade-4: #55c2cb;
    // --chart-shade-5: #c287ff;
    // --chart-shade-6: #2a3a5a;
    backgroundColor: [
      '#8fd1d8',
      '#a143fd',
      '#293770',
      '#55c2cb',
      '#c287ff',
      '#2a3a5a',
    ],
    borderWidth: 0,
    borderRadius: 6,
  }]
}

// Add interfaces
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

// Update the recommendations interface
interface Recommendation {
  title: string;
  description: string;
  impact: string;
  priority: number;
  icon: string;
}

// Update chart options type
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
      color: 'rgb(17, 24, 39)',
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
        color: 'rgb(75, 85, 99)',
        font: {
          size: 12,
          weight: 'bold' as const
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
      },
      ticks: {
        color: 'rgb(107, 114, 128)',
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
        color: 'rgb(107, 114, 128)',
        font: {
          size: 12
        }
      }
    },
  },
}

// Add interfaces for chatbot response
interface ForecastData {
  date: string;
  forecast: number;
  forecast_lower: number;
  forecast_upper: number;
}

interface ChatResponse {
  answer: string;
  forecast: ForecastData[];
  status: string;
}

// Add ChatInterface component with proper typing
const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [analysis, setAnalysis] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, analysis, forecastData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        console.log('CSV Content:', text);
      }
    };
    reader.readAsText(uploadedFile);
    setFile(uploadedFile);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage: Message = { text: message, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('question', message)
      formData.append('sku_id', '2')
      
      if (!file) {
        alert("Please upload a file first.");
        return;
      }

      if (file) {
        formData.append('file', file, file.name);
      }

      const response = await axios.post<ChatResponse>('http://127.0.0.1:5000/api/chat/ask', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      const botMessage: Message = { text: response.data.answer, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
      setForecastData(response.data.forecast)
      setAnalysis(response.data.answer)
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { text: 'Sorry, there was an error processing your request.', sender: 'bot' }
      setMessages(prev => [...prev, errorMessage])
    }
    
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-20 right-6 w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            title="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-thumb-blue-600 dark:scrollbar-track-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-wrap break-words overflow-x-hidden text-sm leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>


      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <label className="flex-1 relative group">
              <div className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {file ? file.name : 'Upload CSV file'}
                </span>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-green-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Selected
                </span>
              )}
            </label>
          </div>
          <div className="flex space-x-2">
            <input
              id="message-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              disabled={loading || !file}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              title={!file ? "Please upload a file first" : "Send message"}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

// Add interfaces for the API response
interface Idea {
  id: number;
  media: string;
  media_mode: string;
  media_type: string;
  niche_id: number;
}

interface MediaPlan {
  id: number;
  date: string;
  title: string;
  description: string;
  niche_id: number;
}

interface Peak {
  id: number;
  date: string;
  title: string;
  description: string;
  niche_id: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  number_of_sales: number | null;
  niche_id: number;
}

interface Niche {
  id: number;
  niche_name: string;
  backend_use: string;
  example_products: string;
}

interface ApiResponse {
  ideas: Idea[];
  media_plan: MediaPlan[];
  niche: Niche;
  peaks: Peak[];
  top_products: Product[];
}

export default function Features() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [topProducts, setTopProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get<ApiResponse>('http://localhost:5000/api/recommendations?niche=Personal%20Care')
        const { ideas, media_plan, niche, peaks, top_products } = response.data
        
        // Transform the API response into the expected format
        const transformedRecommendations: Recommendation[] = [
          {
            title: 'Content Ideas',
            description: `Get ${ideas.length} AI-generated content ideas tailored to your niche`,
            impact: 'High',
            priority: 1,
            icon: '💡'
          },
          {
            title: 'Media Plan',
            description: `Optimized posting schedule with ${media_plan.length} planned posts`,
            impact: 'High',
            priority: 2,
            icon: '📅'
          },
          {
            title: 'Peak Times',
            description: `Identified ${peaks.length} peak engagement periods for your niche`,
            impact: 'Medium',
            priority: 3,
            icon: '⏰'
          },
          {
            title: 'Top Products',
            description: `Analyzed ${top_products.length} top-performing products in your niche`,
            impact: 'Medium',
            priority: 4,
            icon: '📊'
          }
        ]
        
        setRecommendations(transformedRecommendations)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
        setRecommendations([])
      }
    }

    fetchRecommendations()
  }, [])

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="h-30 overflow-y-auto px-4 py-6 md:px-6">
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
              <div className="h-max">
                <Bar data={featureData}  />
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Recommendations</h2>
                  {apiData && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      For {apiData.niche.niche_name} niche
                    </p>
                  )}
                </div>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ) : (
                  <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    {recommendations.length} suggestions
                  </span>
                )}
              </div>
              
              {error ? (
                <div className="text-center py-8">
                  <p className="text-red-500 dark:text-red-400">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              ) : (
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
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white whitespace-nowrap">{rec.title}</h3>
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
              )}
            </div>
          </div>

          {/* Add Top Products Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Products</h2>
              <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                {topProducts.length} products
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center text-xl">
                      {product.category === 'Essential' ? '⭐' : '🆕'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Category: {product.category}
                      </p>
                      {product.number_of_sales !== null && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Sales: {product.number_of_sales}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Replace the existing chat button with the new ChatInterface */}
          <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
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
        </div>
      </div>
    </div>
  )
}