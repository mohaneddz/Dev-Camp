"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("team");

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Lead Developer",
      bio: "Specializes in creating smooth animations and transitions. Alex architected the core page transition system and ensures visual coherence across the platform.",
      skills: ["React", "Framer Motion", "Next.js"]
    },
    {
      name: "Jamie Taylor",
      role: "UI/UX Designer",
      bio: "Creates intuitive interfaces with a focus on motion design principles. Jamie ensures our animations enhance rather than distract from the user experience.",
      skills: ["UI Design", "Animation", "Prototyping"]
    },
    {
      name: "Sam Rodriguez",
      role: "Full-Stack Developer",
      bio: "Bridges front-end animations with backend performance. Sam optimizes transitions to work smoothly across different devices and connection speeds.",
      skills: ["TypeScript", "Optimization", "Performance"]
    },
    {
      name: "Morgan Lee",
      role: "Product Manager",
      bio: "Oversees project direction and implementation priorities. Morgan ensures our animation system aligns with broader product goals and user needs.",
      skills: ["Strategy", "User Research", "Roadmapping"]
    }
  ];

  // Project features
  const features = [
    {
      title: "Stair Transition Effect",
      description: "A columnar transition that creates a staggered stair-like effect between page changes, providing visual continuity and depth."
    },
    {
      title: "3D Page Swap Animation",
      description: "Simulates pages exchanging positions in 3D space, with customizable perspective and rotation parameters."
    },
    {
      title: "Customizable Timing Controls",
      description: "Fine-grained control over animation timing, with sequential transitions and optimized content swapping."
    },
    {
      title: "Direction-Aware Transitions",
      description: "Transitions adapt based on navigation direction, creating a coherent spatial model throughout the application."
    },
    {
      title: "Zero-Flicker Page Changes",
      description: "Content changes occur only when transitions reach full opacity, eliminating visual artifacts and content flashes."
    },
    {
      title: "Responsive Animation Scaling",
      description: "All transitions are fully responsive and maintain visual quality across different screen sizes and devices."
    }
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Header Section */}
      <header className="py-16 px-8 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Smooth Transitions
        </motion.h1>
        <motion.p 
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Creating seamless, engaging page transitions for next-generation web experiences
        </motion.p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-12 border-b" style={{ borderColor: "var(--bg-accent)" }}>
        <button 
          className={`px-6 py-4 text-lg transition-all ${activeTab === 'team' ? 'border-b-2 font-medium' : 'opacity-70'}`}
          style={{ borderColor: activeTab === 'team' ? "var(--bg-highlight)" : "transparent" }}
          onClick={() => setActiveTab('team')}
        >
          Our Team
        </button>
        <button 
          className={`px-6 py-4 text-lg transition-all ${activeTab === 'project' ? 'border-b-2 font-medium' : 'opacity-70'}`}
          style={{ borderColor: activeTab === 'project' ? "var(--bg-highlight)" : "transparent" }}
          onClick={() => setActiveTab('project')}
        >
          Project
        </button>
        <button 
          className={`px-6 py-4 text-lg transition-all ${activeTab === 'features' ? 'border-b-2 font-medium' : 'opacity-70'}`}
          style={{ borderColor: activeTab === 'features' ? "var(--bg-highlight)" : "transparent" }}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
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
                Our project focuses on revolutionizing the way users navigate between pages by implementing fluid, 
                visually stunning transitions that maintain context and enhance the overall user experience.
              </p>
              <p className="mb-4">
                Traditional page navigation involves abrupt content changes that can disorient users and make applications 
                feel disconnected. Our transition system creates a seamless flow between pages, reinforcing navigation 
                direction and providing visual continuity.
              </p>
              <p>
                Built with performance in mind, our transitions are optimized to run at 60fps even on mobile devices, 
                with careful attention to timing, visual hierarchy, and accessibility considerations.
              </p>
            </div>

            <div className="rounded-lg p-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
              <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                  <h3 className="text-xl font-bold mb-2">User-Centered</h3>
                  <p>
                    Transitions are designed to enhance navigation understanding, not just for visual appeal.
                    Every animation serves a purpose in the user journey.
                  </p>
                </div>
                <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                  <h3 className="text-xl font-bold mb-2">Performance-First</h3>
                  <p>
                    All animations are optimized for minimal CPU/GPU usage, with fallbacks for less capable devices.
                  </p>
                </div>
                <div className="p-4 rounded" style={{ backgroundColor: "var(--bg-primary)" }}>
                  <h3 className="text-xl font-bold mb-2">Customizable</h3>
                  <p>
                    Our transition system is highly configurable, allowing for different effects based on content type and context.
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
            
            <motion.div
              custom={features.length}
              variants={fadeIn}
              className="md:col-span-2 rounded-lg p-6 mt-6"
              style={{ backgroundColor: "var(--bg-accent)" }}
            >
              <h3 className="text-xl font-bold mb-2">Technical Implementation</h3>
              <p className="mb-4">
                Our transition system is built using Framer Motion for animation orchestration, with careful 
                optimization of React component lifecycles. We've implemented custom hooks to manage animation 
                state and synchronize page content swapping at precise moments.
              </p>
              <pre className="p-4 rounded overflow-x-auto text-sm" style={{ backgroundColor: "var(--bg-primary)" }}>
                <code>{`const PageTransition = ({ children }) => {
  // Animation state management
  const [displayedChildren, setDisplayedChildren] = useState(children);
  
  // Swap content at the animation midpoint
  useEffect(() => {
    const swapTimeout = setTimeout(() => {
      setDisplayedChildren(children);
    }, 400); // Mid-animation point
    
    return () => clearTimeout(swapTimeout);
  }, [pathname]);
  
  // ... animation definitions
}`}</code>
              </pre>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <p className="opacity-70">© 2025 Smooth Transitions Team. All transitions reserved.</p>
      </footer>
    </div>
  );
}