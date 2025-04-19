"use client"

import * as React from 'react';
import { TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Sector,
} from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Custom color scheme
const COLORS = {
  primary: "var(--color-primary)",
  primaryLight: "var(--color-primary-light-1)",
  primaryDark: "var(--color-primary-dark-1)",
  secondary: "var(--color-secondary)",
  secondaryLight: "var(--color-secondary-light-1)",
  secondaryDark: "var(--color-secondary-dark-1)",
  tertiary: "var(--color-tertiary)",
  tertiaryLight: "var(--color-tertiary-light-1)",
  tertiaryDark: "var(--color-tertiary-dark-1)",
}

// Dark mode styles for tooltips
const tooltipStyle = {
  backgroundColor: "var(--color-tertiary)",
  border: "1px solid var(--color-tertiary-light-1)",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  color: "var(--color-primary-light-1)",
}

// Sample data for metrics and charts
const metricsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  sales: [1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400, 2550, 2700, 2850],
  forecast: [null, null, null, null, null, null, null, null, 2400, 2600, 2800, 3000],
  customerAcquisition: [150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 420],
  averageOrderValue: [85, 88, 90, 92, 95, 98, 100, 102, 105, 108, 110, 112],
  conversionRate: [2.5, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7],
  returnRate: [8.5, 8.2, 8.0, 7.8, 7.5, 7.3, 7.0, 6.8, 6.5, 6.3, 6.0, 5.8],
  dailySales: [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1500 },
    { day: "Wed", sales: 1800 },
    { day: "Thu", sales: 1400 },
    { day: "Fri", sales: 2000 },
    { day: "Sat", sales: 2500 },
    { day: "Sun", sales: 2200 },
  ],
  revenueDistribution: [
    { name: "Product A", value: 35 },
    { name: "Product B", value: 25 },
    { name: "Product C", value: 20 },
    { name: "Product D", value: 15 },
    { name: "Product E", value: 5 },
  ],
  performanceMetrics: [
    { metric: "Sales", value: 85 },
    { metric: "Marketing", value: 75 },
    { metric: "Customer Service", value: 90 },
    { metric: "Operations", value: 80 },
    { metric: "Finance", value: 70 },
  ],
  customerSatisfaction: [
    { name: "Satisfied", value: 75 },
    { name: "Neutral", value: 15 },
    { name: "Dissatisfied", value: 10 },
  ],
}

const revenueData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const revenueConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Sales() {
  const [activeMonth, setActiveMonth] = React.useState(revenueData[0].month)
  const activeIndex = React.useMemo(
    () => revenueData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => revenueData.map((item) => item.month), [])

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="h-full overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
            ].map((metric, index) => (
              <Card key={index} className="p-6 bg-card/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <span className={`ml-2 text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Sales Trend Chart */}
          <Card className="p-6 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle>Sales Trend & Forecast</CardTitle>
              <CardDescription>Monthly sales performance and future projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metricsData.labels.map((label, i) => ({
                    month: label,
                    actual: metricsData.sales[i],
                    forecast: metricsData.forecast[i],
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-tertiary-light-1)" />
                    <XAxis dataKey="month" stroke="var(--color-primary-light-1)" />
                    <YAxis stroke="var(--color-primary-light-1)" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke={COLORS.primary}
                      strokeWidth={2}
                      dot={{ r: 4, fill: COLORS.primary }}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke={COLORS.secondary}
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={{ r: 4, fill: COLORS.secondary }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Return Rate Chart - Negative Bar */}
          <Card className="p-6 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle>Return Rate Analysis</CardTitle>
              <CardDescription>Monthly return rates with negative values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricsData.labels.map((label, i) => ({
                    month: label,
                    returnRate: -metricsData.returnRate[i],
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-tertiary-light-1)" />
                    <XAxis dataKey="month" stroke="var(--color-primary-light-1)" />
                    <YAxis stroke="var(--color-primary-light-1)" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="returnRate">
                      {metricsData.returnRate.map((rate, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={rate > 7 ? COLORS.secondary : COLORS.primary}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Daily Sales - Horizontal Bar */}
          <Card className="p-6 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle>Daily Sales Performance</CardTitle>
              <CardDescription>Average sales by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metricsData.dailySales}
                    layout="vertical"
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-tertiary-light-1)" />
                    <XAxis type="number" stroke="var(--color-primary-light-1)" />
                    <YAxis dataKey="day" type="category" stroke="var(--color-primary-light-1)" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="sales" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Distribution - Interactive Pie Chart */}
          <Card data-chart="revenue-pie" className="flex flex-col p-6 bg-card/50">
            <ChartStyle id="revenue-pie" config={revenueConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-4">
              <div className="grid gap-1">
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </div>
              <Select value={activeMonth} onValueChange={setActiveMonth}>
                <SelectTrigger
                  className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                  aria-label="Select a month"
                >
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-xl">
                  {months.map((key) => {
                    const config = revenueConfig[key as keyof typeof revenueConfig]
                    if (!config) return null
                    return (
                      <SelectItem
                        key={key}
                        value={key}
                        className="rounded-lg [&_span]:flex"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className="flex h-3 w-3 shrink-0 rounded-sm"
                            style={{
                              backgroundColor: `var(--color-${key})`,
                            }}
                          />
                          {config?.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center">
              <ChartContainer
                id="revenue-pie"
                config={revenueConfig}
                className="mx-auto aspect-square w-full max-w-[300px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={revenueData}
                    dataKey="desktop"
                    nameKey="month"
                    innerRadius={60}
                    strokeWidth={5}
                    activeIndex={activeIndex}
                    activeShape={({
                      outerRadius = 0,
                      ...props
                    }: PieSectorDataItem) => (
                      <g>
                        <Sector {...props} outerRadius={outerRadius + 10} />
                        <Sector
                          {...props}
                          outerRadius={outerRadius + 25}
                          innerRadius={outerRadius + 12}
                        />
                      </g>
                    )}
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                                style={{ fill: "var(--color-primary-light-1)" }}
                              >
                                {revenueData[activeIndex].desktop.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                                style={{ fill: "var(--color-primary-light-2)" }}
                              >
                                Visitors
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics - Radar Chart */}
          <Card className="p-6 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Department performance across key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={metricsData.performanceMetrics}>
                    <PolarGrid stroke="var(--color-tertiary-light-1)" />
                    <PolarAngleAxis dataKey="metric" stroke="var(--color-primary-light-1)" />
                    <PolarRadiusAxis stroke="var(--color-primary-light-1)" />
                    <Radar
                      name="Performance"
                      dataKey="value"
                      stroke={COLORS.primary}
                      fill={COLORS.primary}
                      fillOpacity={0.6}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Customer Satisfaction - Radial Chart */}
          <Card className="p-6 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle>Customer Satisfaction</CardTitle>
              <CardDescription>Customer satisfaction distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={metricsData.customerSatisfaction}
                    innerRadius="10%"
                    outerRadius="80%"
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      label={{ position: 'insideStart', fill: 'var(--color-primary-light-1)' }}
                      background
                      dataKey="value"
                    >
                      {metricsData.customerSatisfaction.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            COLORS.primary,
                            COLORS.secondary,
                            COLORS.tertiaryLight,
                          ][index % 3]}
                        />
                      ))}
                    </RadialBar>
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 