"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import RegisterForm from "@/components/register-form";

export default function LoginPage() {

  const [loggedIn, setLoggedIn] = useState(true);

  // move to right side function
  const moveToRight = () => {
    setLoggedIn(true);
    console.log("Moved to right side");

    // 1s then set it false
    // setTimeout(() => {
    //   setLoggedIn(false);
    // }, 1000)
  };

  const moveToLeft = () => {
    setLoggedIn(false);
    console.log("Moved to left side");

    // 1s then set it false
    // setTimeout(() => {
    //   setLoggedIn(true);
    // }, 1000)
  };

  return (

    <motion.div className="w-[200vw] h-screen grid grid-cols-2 gap-4 p-8 justify-center items-center content-center relative"
      // animate moving to right when state = loggedin = true
      transition={{ duration: 0.8, ease: "easeInOut" }}
      animate={{ x: loggedIn ? "-100vw" : "0vw" }}
    >

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center ml-[50vw] w-[100vw] h-screen absolute -z-10"
      >
        <Image
          src="/login-shape.svg"
          alt="login-shape"
          priority
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="w-[50vw] h-screen flex justify-center ">


        {/* login - left */}
        <div className="w-max h-full flex justify-center items-center">
          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl text-foreground font-black dark:text-white mb-2">
                WELCOME BACK TO COMMAND
              </h2>
            </motion.div>

            <LoginForm onSuccess={moveToRight} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-6"
            >
              <p className="text-sm text-zinc-800">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-white font-semibold text-primary font-black dark:text-white"
                >
                  Create an account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

      </div>

      <div className="w-[50vw] ml-[50vw] h-screen flex justify-center right-0 justify-self-right">


        {/* Signup - left */}
        <div className="w-max h-full flex justify-center items-center ">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
              <h2 className="text-2xl text-foreground font-black dark:text-white mb-2">
                WELCOME TO COMMAND
              </h2>
              </motion.div>

              <RegisterForm onSuccess={moveToLeft} />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-6"
              >
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-white font-semibold hover:text-gray-200"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>
        </div>

      </div>


    </motion.div>
  );
}
