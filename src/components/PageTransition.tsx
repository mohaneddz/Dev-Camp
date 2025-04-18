"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const initialLoadRef = useRef(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }
    
    // Start animation
    setIsAnimating(true);
    
    // Schedule the content swap when the screen is fully black
    // This happens at the midpoint of the animation sequence
    const swapTimeout = setTimeout(() => {
      setDisplayedChildren(children);
    }, 400); // Midpoint of our total animation duration
    
    // End animation after all transitions complete
    const endTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Total animation duration (exit + enter)
    
    return () => {
      clearTimeout(swapTimeout);
      clearTimeout(endTimeout);
    };
  }, [pathname, children]);

  // Animation variants
  const expand = {
    initial: {
      top: 0
    },
    enter: (i: number) => ({    
      top: "100vh",
      transition: {
        duration: 0.4,
        delay: 0.05 * i + 0.4, // Delay starts after exit completes
        ease: [0.215, 0.61, 0.355, 1],
      },
      transitionEnd: { height: "0", top: "0" }
    }),
    exit: (i: number) => ({
      height: "100vh",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const opacity = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: 0.4, // Start after exit completes
        ease: [0.215, 0.61, 0.355, 1]
      }
    },
    exit: {
      opacity: 0.5,
      transition: {
        duration: 0.2,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  // Helper function for animation props
  const anim = (variants: any, custom: number | null = null) => {
    return {
      initial: "initial",
      animate: isAnimating ? "exit" : "enter",
      custom,
      variants
    };
  };

  const nbOfColumns = 5;

  return (
    <>
      <div className="page stairs">
        {/* Render the current page content */}
        {displayedChildren}
        
        {/* Animation overlay */}
        <motion.div {...anim(opacity)} className="transition-background" />
        <div className="transition-container">
          {[...Array(nbOfColumns)].map((_, i) => (
            <motion.div key={i} {...anim(expand, nbOfColumns - i)} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .stairs {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .stairs .transition-container {
          position: fixed;
          width: 100vw;
          height: 100vh;
          display: flex;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 999;
        }
        
        .stairs .transition-container div {
          position: relative;
          height: 100%;
          width: 100%;
          background-color: black;
        }
        
        .stairs .transition-background {
          position: fixed;
          width: 100%;
          height: 100vh;
          background-color: black;
          z-index: 998;
          pointer-events: none;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  );
};

export default PageTransition;