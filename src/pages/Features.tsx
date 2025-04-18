"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Server as ServerIcon, Cpu, Thermometer, Zap } from 'lucide-react';

// Define CSS variables for styling, including color schemes for both light and dark modes
const cardStyle = "p-3 border-0 shadow-lg relative before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-[#ffffff10] before:via-[#ffffff05] before:to-transparent before:rounded-lg before:-z-10 before:pointer-events-none backdrop-blur-sm transition-colors duration-300";

// Define chart theme colors
const chartTheme = {
  axisColor: "var(--axis-color)",
  textColor: "var(--text-color)",
  gridColor: "var(--grid-color)",
};

// Type definitions
interface RequestData {
  date: string;
  requests: number;
  errors: number;
}

interface TemperatureData {
  hour: string;
  cpu: number;
  gpu: number;
  ambient: number;
}

interface WeeklyData {
  day: string;
  requests: number;
  power: number;
  temperature: number;
}

interface PerformanceData {
  metric: string;
  value: number;
}

interface ResourceData {
  resource: string;
  usage: number;
  fill: string;
}

// Generate server request data
const generateRequestData = (): RequestData[] => {
  const data: RequestData[] = [];
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      requests: Math.floor(1000 + Math.random() * 2000),
      errors: Math.floor(10 + Math.random() * 50)
    });
  }
  return data;
};

// Generate server temperature data
const generateTemperatureData = (): TemperatureData[] => {
  const data: TemperatureData[] = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      cpu: 45 + Math.random() * 20,
      gpu: 50 + Math.random() * 25,
      ambient: 22 + Math.random() * 5
    });
  }
  return data;
};

// Generate weekly comparison data
const generateWeeklyData = (): WeeklyData[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    requests: Math.floor(5000 + Math.random() * 5000),
    power: Math.floor(1000 + Math.random() * 1000),
    temperature: Math.floor(40 + Math.random() * 20)
  }));
};

// Generate server performance data for radar chart
const generatePerformanceData = (): PerformanceData[] => {
  return [
    { metric: 'CPU Usage', value: 75 },
    { metric: 'Memory', value: 60 },
    { metric: 'Storage', value: 45 },
    { metric: 'Network', value: 80 },
    { metric: 'I/O', value: 65 },
    { metric: 'Cache', value: 70 }
  ];
};

// Generate server resource distribution data
const generateResourceData = (): ResourceData[] => {
  return [
    { resource: 'CPU', usage: 75, fill: 'rgb(47, 185, 108)' },
    { resource: 'Memory', usage: 60, fill: 'rgba(47, 185, 108, 0.8)' },
    { resource: 'Storage', usage: 45, fill: 'rgba(47, 185, 108, 0.6)' },
    { resource: 'Network', usage: 80, fill: 'rgba(47, 185, 108, 0.4)' },
    { resource: 'Cache', usage: 70, fill: 'rgba(47, 185, 108, 0.3)' }
  ];
};

// Add new data generation functions
const generateCPULoadData = (): Array<{ time: string; load: number; threads: number }> => {
  const data: Array<{ time: string; load: number; threads: number }> = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      load: 45 + Math.random() * 40,
      threads: Math.floor(8 + Math.random() * 16)
    });
  }
  return data;
};

const generateMemoryData = (): Array<{ time: string; used: number; cached: number; available: number }> => {
  const data: Array<{ time: string; used: number; cached: number; available: number }> = [];
  for (let i = 0; i < 24; i++) {
    const total = 32; // 32GB total memory
    const used = 10 + Math.random() * 15;
    const cached = 2 + Math.random() * 4;
    const available = total - used - cached;
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      used,
      cached,
      available
    });
  }
  return data;
};

const generateNetworkData = (): Array<{ time: string; incoming: number; outgoing: number }> => {
  const data: Array<{ time: string; incoming: number; outgoing: number }> = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      incoming: Math.floor(50 + Math.random() * 150),
      outgoing: Math.floor(30 + Math.random() * 100)
    });
  }
  return data;
};

const requestData = generateRequestData();
const temperatureData = generateTemperatureData();
const weeklyData = generateWeeklyData();
const performanceData = generatePerformanceData();
const resourceData = generateResourceData();
const cpuLoadData = generateCPULoadData();
const memoryData = generateMemoryData();
const networkData = generateNetworkData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background dark:bg-[var(--purple-dark-1)] border border-border dark:border-[var(--purple-dark-2)] shadow-xl px-3 py-2 rounded-lg">
        <p className="text-foreground dark:text-[var(--text-light)] text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[var(--orange)] text-sm font-bold">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Server() {
  const [activeMetric, setActiveMetric] = useState('requests');

  const totalRequests = useMemo(() =>
    requestData.reduce((acc, curr) => acc + curr.requests, 0),
    [requestData]
  );

  const totalErrors = useMemo(() =>
    requestData.reduce((acc, curr) => acc + curr.errors, 0),
    [requestData]
  );

  return (
    <div className="flex flex-1 flex-col p-4 gap-4"
      style={{
        '--card-gradient-from': 'var(--card-gradient-from)',
        '--card-gradient-via': 'var(--card-gradient-via)',
        '--card-gradient-to': 'var(--card-gradient-to)',
        '--card-bg-from': 'var(--card-bg-from)',
        '--card-bg-to': 'var(--card-bg-to)',
        '--text-color': 'var(--text-color)',
        '--axis-color': 'var(--axis-color)',
        '--grid-color': 'var(--grid-color)',
      } as React.CSSProperties}>
      <style jsx global>{`
        :root {
          --card-gradient-from: #ffffff10;
          --card-gradient-via: #ffffff05;
          --card-gradient-to: transparent;
          --card-bg-from: var(--orange)20;
          --card-bg-to: var(--purple-dark-1)00;
          --text-color: var(--foreground);
          --axis-color: var(--foreground);
          --grid-color: var(--purple-dark-2);
        }

        .dark {
          --card-gradient-from: #ffffff05;
          --card-gradient-via: #ffffff02;
          --card-gradient-to: transparent;
          --card-bg-from: var(--orange)10;
          --card-bg-to: var(--purple-dark-1)00;
          --text-color: var(--text-light);
          --axis-color: var(--text-light);
          --grid-color: var(--purple-dark-2);
        }
      `}</style>
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ServerIcon className="text-[var(--orange)]" />
              <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider">Total Requests</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground dark:text-[var(--text-light)]">{totalRequests.toLocaleString()}</span>
              <span className="text-sm font-medium text-[var(--orange)]">
                <TrendingUp className="inline-block mr-1" />
                +12.5%
              </span>
            </div>
            <p className="text-muted-foreground dark:text-[var(--text-muted)] text-sm">Last 90 days</p>
          </div>
        </Card>

        <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Thermometer className="text-[var(--orange)]" />
              <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider">Temperature</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground dark:text-[var(--text-light)]">45°C</span>
              <span className="text-sm font-medium text-[var(--orange)]">
                <TrendingDown className="inline-block mr-1" />
                -2.1%
              </span>
            </div>
            <p className="text-muted-foreground dark:text-[var(--text-muted)] text-sm">CPU temperature</p>
          </div>
        </Card>

        <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Zap className="text-[var(--orange)]" />
              <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider">Power Draw</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground dark:text-[var(--text-light)]">1.2kW</span>
              <span className="text-sm font-medium text-[var(--orange)]">
                <TrendingDown className="inline-block mr-1" />
                -3.5%
              </span>
            </div>
            <p className="text-muted-foreground dark:text-[var(--text-muted)] text-sm">Current consumption</p>
          </div>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-4">
        {/* First Row - Three Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Performance Metrics */}




          {/* Resource Distribution */}

        </div>



        {/* Third Row - Three Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Memory Usage */}


          <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Zap className="text-[var(--orange)]" />
                <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider">
                  AI-Powered Suggestion
                </h3>
              </div>
              <div className="text-lg font-bold text-foreground dark:text-[var(--text-light)]">
                "Upgrade to Pro for 2x Speed"
              </div>
              <p className="text-sm text-muted-foreground dark:text-[var(--text-muted)]">
                Recommended based on your recent usage trends.
              </p>
              <button className="text-[var(--orange)] underline text-sm mt-1 hover:text-[var(--orange-light)] transition-colors">Learn more</button>
            </div>
          </Card>

          {/* Top Picks */}
          <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
            <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider mb-2">Top Picks</h3>
            <ul className="space-y-2">
              {["Cloud Sync", "Server Boost", "24/7 Uptime", "AI Tuner"].map((item, index) => (
                <li key={index} className="flex justify-between text-sm text-foreground dark:text-[var(--text-light)]">
                  <span>{index + 1}. {item}</span>
                  <span className="text-[var(--orange)] font-medium">{(Math.random() * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </Card>



          {/* Disk I/O */}

        </div>

        {/* Fourth Row - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Server Response Time */}

          {/* Request History */}
          <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
            <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider mb-4">Request History</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={requestData}>
                  <CartesianGrid stroke={chartTheme.gridColor} />
                  <XAxis dataKey="date" stroke={chartTheme.axisColor} fontSize={11} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis stroke={chartTheme.axisColor} fontSize={11} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="requests" fill="var(--orange)" name="Requests" />
                  <Bar dataKey="errors" fill="var(--bad)" name="Errors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          {/* Weekly Comparison */}
          <Card className={`${cardStyle} bg-gradient-to-br from-background to-background/80 dark:from-[var(--purple-dark-1)] dark:to-[var(--purple-dark-2)]`}>
            <h3 className="text-xs font-medium text-foreground/70 dark:text-[var(--text-muted)] uppercase tracking-wider mb-4">Weekly Comparison</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid stroke={chartTheme.gridColor} />
                  <XAxis dataKey="day" stroke={chartTheme.axisColor} fontSize={11} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis stroke={chartTheme.axisColor} fontSize={11} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="requests" fill="var(--orange)" name="Requests" />
                  <Bar dataKey="power" fill="var(--purple-light-1)" name="Power" />
                  <Bar dataKey="temperature" fill="var(--bad)" name="Temperature" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
