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
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import { format, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  title: string
  type: 'post' | 'story' | 'in-person'
  likes: number
  expectedLikes: number
  aiReasoning: string
  validatedDate?: Date
  plannedDate: Date
}

const LOCAL_STORAGE_KEY = 'validatedPosts'

const defaultPosts: Post[] = [
  {
    id: "POST001",
    title: "Behind-the-scenes of product creation",
    type: "story",
    likes: 320,
    expectedLikes: 15000,
    aiReasoning: "Stories showing behind-the-scenes content typically see 30% higher engagement. The casual, authentic nature of stories makes them perfect for showcasing product development, and scheduling this on a Thursday increases visibility by 25%.",
    plannedDate: new Date(2025, 3, 23), // April 23, 2025
    validatedDate: new Date(2025, 3, 23),
  },
  {
    id: "POST002",
    title: "Customer testimonial carousel",
    type: "post",
    likes: 0,
    expectedLikes: 25000,
    aiReasoning: "Carousel posts with customer testimonials have shown 45% higher engagement rates. The interactive nature combined with social proof typically drives 2x more saves and shares. Posting this on a weekend morning maximizes reach.",
    plannedDate: new Date(2025, 3, 24), // April 24, 2025
  }
]

export default function MediaPlan() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [validatedPosts, setValidatedPosts] = useState<Post[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [instagramPosts, setInstagramPosts] = useState<Post[]>(defaultPosts)

  // Load validated posts from local storage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts, (key, value) => {
          // Convert date strings back to Date objects
          if (key === 'plannedDate' || key === 'validatedDate') {
            return new Date(value)
          }
          return value
        })
        setValidatedPosts(parsedPosts)
      } catch (error) {
        console.error('Error loading validated posts:', error)
        // If there's an error parsing, start with default validated posts
        setValidatedPosts([defaultPosts[0]])
      }
    } else {
      // If no saved posts, start with first post validated by default
      setValidatedPosts([defaultPosts[0]])
    }
  }, [])

  // Save to local storage whenever validated posts change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validatedPosts))
    } catch (error) {
      console.error('Error saving validated posts:', error)
    }
  }, [validatedPosts])

  const validatedDates = validatedPosts.map(post => post.plannedDate)

  const isValidatedDate = (date: Date) => {
    return validatedDates.some(validatedDate => 
      validatedDate.getDate() === date.getDate() &&
      validatedDate.getMonth() === date.getMonth() &&
      validatedDate.getFullYear() === date.getFullYear()
    )
  }

  const toggleValidation = (post: Post) => {
    if (validatedPosts.some(p => p.id === post.id)) {
      setValidatedPosts(validatedPosts.filter(p => p.id !== post.id))
    } else {
      const updatedPost = { ...post, validatedDate: new Date() }
      setValidatedPosts([...validatedPosts, updatedPost])
    }
  }

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="h-full overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Generated Media Plan</h1>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Generate New Plan
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" aria-label="Menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1.2fr,0.8fr] gap-8">
            <div className="min-[888px]:row-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 h-full">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Content Calendar</h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="w-[80px] px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Validate</th>
                        <th className="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Platform</th>
                        <th className="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Content Type</th>
                        <th className="w-auto px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                        <th className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {instagramPosts.map((post, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="w-[80px] px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleValidation(post)}
                              className={`p-2 rounded-full ${
                                validatedPosts.some(p => p.id === post.id)
                                  ? 'bg-primary text-primary-dark-3 dark:bg-primary-dark-1 dark:text-primary-light-3'
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                              }`}
                              aria-label={validatedPosts.some(p => p.id === post.id) ? "Unvalidate post" : "Validate post"}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          </td>
                          <td className="w-[120px] px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {format(post.plannedDate, 'MMM dd, yyyy')}
                          </td>
                          <td className="w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {post.type}
                          </td>
                          <td className="w-[150px] px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {post.title}
                          </td>
                          <td className="w-auto px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {post.aiReasoning}
                          </td>
                          <td className="w-[100px] px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              validatedPosts.some(p => p.id === post.id)
                                ? 'bg-primary-light-1 text-primary-dark-3 dark:bg-primary-dark-1 dark:text-primary-light-3'
                                : 'bg-secondary-light-1 text-secondary-dark-2 dark:bg-secondary-dark-3 dark:text-secondary'
                            }`}>
                              {validatedPosts.some(p => p.id === post.id) ? 'Validated' : 'Scheduled'}
                </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Calendar View</h2>
                <div className="flex flex-row gap-12 justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    numberOfMonths={2}
                    className="border rounded-lg p-4 dark:border-gray-700"
                    classNames={{
                      months: "flex flex-row gap-12",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium text-gray-900 dark:text-white",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-8 w-8 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center justify-center",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-gray-500 dark:text-gray-400 rounded-md w-12 font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-100 dark:[&:has([aria-selected])]:bg-gray-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-12 w-12 p-0 font-normal text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-center",
                      day_selected: "bg-primary text-primary-dark-3 hover:bg-primary-light-2 hover:text-primary-dark-3 focus:bg-primary-light-1 focus:text-primary-dark-3 dark:bg-primary-dark-1 dark:text-primary-light-3 dark:hover:bg-primary-dark-2",
                      day_today: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold",
                      day_outside: "text-gray-400 dark:text-gray-500",
                      day_disabled: "text-gray-400 dark:text-gray-500",
                      day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:aria-selected:bg-gray-700 dark:aria-selected:text-white",
                      day_hidden: "invisible",
                    }}
                    modifiers={{
                      validated: validatedDates,
                    }}
                    modifiersStyles={{
                      validated: { backgroundColor: 'var(--chart-1)', color: 'white' },
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Validated Posts</h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {validatedPosts.map((post, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-light-1 dark:bg-primary-dark-1 flex items-center justify-center">
                            <svg className="h-6 w-6 text-primary-dark-3 dark:text-primary-dark-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{post.title}</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{post.aiReasoning}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format(post.plannedDate, 'PPP')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
