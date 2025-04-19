"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Suspense } from "react";

// Add proper TypeScript types
type AnimationVariants = {
  hidden: { opacity: number; y: number };
  visible: (i: number) => {
    opacity: number;
    y: number;
    transition: {
      delay: number;
      duration: number;
      ease: number[];
    };
  };
};

type StaggerContainerVariants = {
  hidden: { opacity: number };
  visible: {
    opacity: number;
    transition: {
      staggerChildren: number;
    };
  };
};

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("team");
  const [mounted, setMounted] = useState(false);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize animation variants
  const fadeIn: AnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const staggerContainer: StaggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Memoize tab change handler
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "MANAA Mohaned",
      role: "Full Stack AI Engineer", // More descriptive role name
      bio: "A highly versatile engineer proficient across the entire AI and Web development stack. Possesses expertise in front-end and back-end web technologies, AI model development and deployment, and a broad range of software engineering practices.  A true generalist capable of contributing to all aspects of a project.",
      skills: [
        "React", "Next.js", "Node.js", "Python", "TensorFlow", "PyTorch", "SQL", "NoSQL", "Cloud Computing (AWS/Azure/GCP)", "Software Architecture", "Robotics", "Embedded Systems", "Full-Stack Development", "UI/UX Design"
      ]
    },
    {
      name: "AMIEUR Lilya Fatima Zohra",
      role: "Backend Engineer (with Frontend Experience)",
      bio: "Specializes in building robust and scalable backend systems, with a strong focus on database design and management. Also possesses experience in front-end development, enabling a holistic understanding of application architecture and efficient data flow between the front-end and back-end.",
      skills: ["Node.js", "Python", "SQL", "NoSQL", "REST APIs", "GraphQL", "Database Design", "Data Modeling", "React", "JavaScript"]
    },
    {
      name: "LALAGUI Baraa Fatima Zohra",
      role: "AI and Robotics Engineer",
      bio: "An AI and Robotics expert with a background in electronics and backend development.  Skilled in developing AI algorithms for robotic applications, designing and implementing robotic systems, and building the backend infrastructure required to support these systems. Bridging the gap between software and hardware.",
      skills: [
        "Python", "Robotics", "AI Algorithms", "Machine Learning", "Deep Learning", "Backend Development", "Electronics Engineering", "Embedded Systems", "C/C++", "ROS (Robot Operating System)"
      ]
    },
    {
      name: "AMROUCE Faycal",
      role: "AI Engineer (Deployment Specialist)",
      bio: "An AI engineer with a strong focus on deploying machine learning models into production environments. Possesses expertise in all aspects of AI development, from model training to deployment, and is skilled in building and maintaining the infrastructure required to support AI applications.",
      skills: [
        "Python", "TensorFlow", "PyTorch", "Kubernetes", "Docker", "Cloud Computing (AWS/Azure/GCP)", "CI/CD", "API Development", "Machine Learning Deployment", "Backend Development"
      ]
    }
  ];

  // Project features
  const features = [
    {
      title: "Snowflake Data Warehouse",
      description: "A powerful cloud data platform that enables seamless integration of multiple data sources, real-time analytics, and scalable data processing for comprehensive business insights."
    },
    {
      title: "Time Series & Deep Learning Models",
      description: "Advanced forecasting models that combine time series analysis with deep learning techniques for accurate business predictions, trend analysis, and anomaly detection."
    },
    {
      title: "AI RAG Chatbot",
      description: "An intelligent assistant powered by Retrieval-Augmented Generation that provides natural language insights, answers complex business queries, and offers data-driven recommendations."
    },
    {
      title: "Large Recommendation Engine",
      description: "A sophisticated recommendation system that provides personalized business suggestions, predictive insights, and trend-based recommendations tailored to specific business needs."
    },
    {
      title: "Test Time Compute",
      description: "Lightning-fast processing that transforms raw data into actionable insights in real-time. Empowering instant decisions and a proactive response to evolving business needs."
    },
    {
      title: "Data Integration Hub",
      description: "Seamless integration of market data, internal metrics, and external factors for comprehensive business analysis and unified data management."
    }
  ];

  if (!mounted) {
    return null; // Return null on server-side to prevent hydration mismatch
  }

  return (
    <div className="min-h-screen pt-24 dark:text-white relative overflow-x-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Animated SVGs */}
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 opacity-20"
        initial={{ scale: 0.8, rotate: -15 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          rotate: [-15, 15, -15],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#c28bfd"
            d="M40.1,-63.2C52.4,-52.4,63.1,-39.9,70.7,-24.9C78.3,-9.9,82.8,7.6,79.2,23.4C75.6,39.2,63.9,53.4,49.3,62.9C34.7,72.4,17.4,77.2,0.7,76.2C-16,75.2,-32,68.4,-45.2,57.9C-58.4,47.4,-68.8,33.2,-73.5,16.8C-78.2,0.4,-77.2,-18.2,-70.8,-34.5C-64.4,-50.8,-52.6,-64.8,-38.3,-74.4C-24,-84,-12,-89.2,2.3,-92.6C16.6,-96,33.2,-97.6,40.1,-63.2Z"
            transform="#435595"
          />
        </svg>
      </motion.div>

      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 opacity-20"
        initial={{ scale: 0.8, rotate: 15 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          rotate: [15, -15, 15],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="var(--bg-primary)"
            d="M44.4,-76.1C57.3,-68.5,67.3,-55.3,75.8,-40.8C84.3,-26.3,91.3,-10.5,90.1,4.6C88.9,19.7,79.5,34.2,67.2,45.8C54.9,57.4,39.7,66.1,23.3,71.8C6.9,77.5,-10.7,80.2,-27.3,77.2C-43.9,74.2,-59.5,65.5,-70.9,52.7C-82.3,39.9,-89.5,23,-90.2,5.7C-90.9,-11.6,-85.1,-29.3,-74.5,-43.9C-63.9,-58.5,-48.5,-70,-33.5,-77.8C-18.5,-85.6,-3.9,-89.7,11.3,-86.1C26.5,-82.5,31.5,-83.7,44.4,-76.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Header Section */}
      <motion.header 
        className="py-16 px-8 text-center relative z-10" 
        style={{ backgroundColor: "var(--bg-secondary)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-9xl font-bold mb-4">
          YAW
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          YAW - Always - Wins!
        </p>
        <p className="text-[10px] mt-4 dark:text-white/70 max-w-2xl mx-auto">(yes, a recursive definition)</p>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-12 border-b" style={{ borderColor: "var(--bg-accent)" }}>
        {['team', 'project', 'features'].map((tab) => (
          <button 
            key={tab}
            className={`px-6 py-4 text-lg transition-all ${activeTab === tab ? 'border-b-2 font-medium' : 'opacity-70'}`}
            style={{ borderColor: activeTab === tab ? "var(--bg-highlight)" : "transparent" }}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {/* Team Tab */}
          {activeTab === 'team' && (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  custom={index}
                  variants={fadeIn}
                  className="rounded-lg p-6"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <div className="h-16 w-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold" 
                    style={{ backgroundColor: "var(--bg-accent)" }}>
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm mb-3 opacity-80">{member.role}</p>
                  <p className="mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 text-sm rounded-full"
                        style={{ backgroundColor: "var(--bg-primary)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Project Tab */}
          {activeTab === 'project' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <p className="mb-4 text-lg">
                  Our project is a comprehensive business intelligence platform that combines advanced AI, machine learning, 
                  and data analytics to revolutionize how businesses make decisions. We're building an end-to-end solution 
                  that integrates forecasting, recommendations, and intelligent data analysis.
                </p>
                <p className="mb-4">
                  At the core of our platform is a sophisticated data warehouse built on Snowflake, enabling seamless 
                  integration of multiple data sources and real-time analytics. This foundation supports our advanced 
                  time series and deep learning models for accurate business forecasting and trend analysis.
                </p>
                <p>
                  The platform features an AI-powered RAG (Retrieval-Augmented Generation) chatbot that provides intelligent 
                  business insights and answers complex queries about your data. Combined with our large-scale recommendation 
                  engine, businesses can receive personalized suggestions and predictions tailored to their specific needs.
                </p>
              </div>

              <div className="rounded-lg p-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
                <h2 className="text-3xl font-bold mb-6">Key Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <h3 className="text-xl font-bold mb-2">Data Infrastructure</h3>
                    <p>
                      Powered by Snowflake data warehouse, enabling real-time analytics and seamless integration of 
                      multiple data sources for comprehensive business insights.
                    </p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <h3 className="text-xl font-bold mb-2">AI Forecasting</h3>
                    <p>
                      Advanced time series analysis and deep learning models for accurate business forecasting, 
                      trend prediction, and anomaly detection.
                    </p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <h3 className="text-xl font-bold mb-2">Intelligent Assistant</h3>
                    <p>
                      AI-powered RAG chatbot that provides intelligent business insights and answers complex 
                      queries about your data in natural language.
                    </p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <h3 className="text-xl font-bold mb-2">Recommendation Engine</h3>
                    <p>
                      Large-scale recommendation system that provides personalized business suggestions and 
                      predictions based on historical data and current trends.
                    </p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <h3 className="text-xl font-bold mb-2">Data Integration</h3>
                    <p>
                      Seamless integration of market data, internal metrics, and external factors for 
                      comprehensive business analysis and decision-making.
                    </p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
                    <p>
                      Transforming complex data into clear, actionable business recommendations through 
                      intuitive visualization and reporting tools.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  custom={index}
                  variants={fadeIn}
                  className="rounded-lg p-6 flex"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-full text-lg font-bold" 
                    style={{ backgroundColor: "var(--bg-accent)" }}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <p className="opacity-70">© 2025 Smooth Transitions Team. All transitions reserved.</p>
      </footer>
    </div>
  );
}