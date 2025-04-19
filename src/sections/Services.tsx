"use client";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Snowflake Data Warehouse",
    description:
      "A powerful cloud data platform that enables seamless integration of multiple data sources, real-time analytics, and scalable data processing for comprehensive business insights.",
    link: "#",
  },
  {
    title: "Time Series & Deep Learning Models",
    description:
      "Advanced forecasting models that combine time series analysis with deep learning techniques for accurate business predictions, trend analysis, and anomaly detection.",
    link: "#",
  },
  {
    title: "AI RAG Chatbot",
    description:
      "An intelligent assistant powered by Retrieval-Augmented Generation that provides natural language insights, answers complex business queries, and offers data-driven recommendations.",
    link: "#",
  },
  {
    title: "Large Recommendation Engine",
    description:
      "A sophisticated recommendation system that provides personalized business suggestions, predictive insights, and trend-based recommendations tailored to specific business needs.",
    link: "#",
  },
  {
    title: "Test Time Compute",
    description:
      "Lightning-fast processing that transforms raw data into actionable insights in real-time. Empowering instant decisions and a proactive response to evolving business needs.",
    link: "#",
  },
  {
    title: "Data Integration Hub",
    description:
      "Seamless integration of market data, internal metrics, and external factors for comprehensive business analysis and unified data management.",
    link: "#",
  },
];

import { cn } from "@/lib/utils/cn"
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center content-center items-center my-auto py-10 h-screen",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-destructive block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-primary border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-slate-800 dark:text-slate-700 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-slate-300 dark:text-slate-500 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};


