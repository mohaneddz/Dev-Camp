"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "./_components/login-form";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">
            WELCOME BACK TO COMMAND
          </h2>
        </motion.div>

        <LoginForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="text-white font-semibold hover:text-gray-200"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
