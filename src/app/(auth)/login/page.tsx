"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import RegisterForm from "@/components/register-form";

export default function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // move to right side function
  const moveToRight = () => {
    setLoggedIn(true);
    console.log("Moved to right side");
  };

  const moveToLeft = () => {
    setLoggedIn(false);
    console.log("Moved to left side");
  };

  return (
    <motion.div
      className={`w-full md:w-[200vw] ${isMobile ? 'h-[200vh]' : 'h-screen'} md:h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 md:p-8 justify-center items-center content-center relative px-4 sm:px-8 md:px-16 overflow-hidden`}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      animate={{
        x: isMobile ? "0vw" : (loggedIn ? "-100vw" : "0vw"),
        y: isMobile ? (loggedIn ? "-100vh" : "0vh") : "0vh"
      }}
    >
      {/* Top image for mobile */}
      {isMobile && (
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden -z-10">
          <div className="relative w-full h-full -top-[70vh]">
            <Image
              src="/mobile-login-shape.svg"
              alt="login-shape-top"
              priority
              fill
              className="object-cover object-bottom"
            />
          </div>
        </div>
      )}

      {/* Bottom image for mobile */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden -z-10">
          <div className="relative w-full h-full  -bottom-[75vh]">
            <Image
              src="/mobile-login-shape.svg"
              alt="login-shape-bottom"
              priority
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* Desktop image */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center flex absolute z-0 w-full h-[120vh] lg:h-[150vh] left-0"
        >
          <Image
            src="/small-login-shape.svg"
            alt="login-shape"
            priority
            fill
            className="object-contain"
          />
        </motion.div>
      )}

      <div className="w-full md:w-[50vw] h-screen flex justify-center">
        {/* login - left */}
        <div className="w-max h-full flex justify-center items-center">
          <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-3 sm:px-4 backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-lg p-6  ${isMobile ? "mt-32" : ""} `}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                x: loggedIn ? (isMobile ? "0vw" : "-100vw") : "0vw",
                y: loggedIn ? (isMobile ? "-100vh" : "0vh") : "0vh"
              }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4 md:mb-6 lg:mb-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground font-black dark:text-white mb-2">
                WELCOME BACK TO COMMAND
              </h2>
            </motion.div>

            <LoginForm onSuccess={moveToRight} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-4 md:mt-6"
            >
              <p className="text-xs sm:text-sm md:text-base text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={moveToRight}
                  className="text-pink font-semibold text-primary font-black hover:underline"
                >
                  Create an account
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[50vw] md:ml-[50vw] h-screen flex justify-center md:justify-self-right">
        {/* Signup - Right */}
        <div className={`w-max h-full flex ${isMobile ? 'items-end' : 'items-center'} justify-center`}>
          <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-3 sm:px-4 backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-lg p-6  ${isMobile ? "mb-32" : ""} `}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                x: loggedIn ? (isMobile ? "0vw" : "0vh") : "0vw",
                y: loggedIn ? (isMobile ? "0vh" : "0vh") : "100vh"
              }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4 md:mb-6 lg:mb-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground font-black dark:text-white mb-8">
                WELCOME TO COMMAND
              </h2>
            </motion.div>

            <RegisterForm onSuccess={moveToLeft} />

          </div>
        </div>
      </div>
    </motion.div>
  );
}