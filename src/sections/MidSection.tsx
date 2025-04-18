"use client";

import React from 'react';
import { Lightbulb, BadgeDollarSign, Home, Lightbulb as LightbulbIcon, Brain, Mail, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Midsection() {
  return (
    <div className="bg-gray-50 pt-20 pb-16 px-4 relative overflow-hidden min-h-screen flex justify-center items-center">
      <div className="max-w-[90vw] mx-auto w-full">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800">The 3-step process</h2>
          <p className="text-gray-600 mt-3 max-w-lg mx-auto">
            The business cerrent account that is your accounting software. A simple way to run your bussiness.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left column */}
          <motion.div className="w-full md:w-1/4" variants={containerVariants}>
            <motion.div className="mb-12 text-center md:text-left" variants={itemVariants}>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center flex-shrink-0 hover:bg-tertiary-light hover:text-white">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="lg:text-xl font-bold text-gray-800">Market analysis</h3>
              </div>
              <p className="text-gray-500 text-sm">
                The business cerrent account that is your accounting
              </p>
            </motion.div>

            <motion.div className="mb-12 text-center md:text-left" variants={itemVariants}>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center flex-shrink-0 hover:bg-tertiary-light hover:text-white">
                  <BadgeDollarSign className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="lg:text-xl font-bold text-gray-800">Financial advice</h3>
              </div>
              <p className="text-gray-500 text-sm">
                The business cerrent account that is your accounting
              </p>
            </motion.div>

            <motion.div className="text-center md:text-left" variants={itemVariants}>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center flex-shrink-0 hover:bg-tertiary-light hover:text-white">
                  <Home className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="lg:text-xl font-bold text-gray-800">Innovative solutions</h3>
              </div>
              <p className="text-gray-500 text-sm">
                The business cerrent account that is your accounting
              </p>
            </motion.div>
          </motion.div>

          {/* Center column with phones */}
          <motion.div 
            className="w-full md:w-2/4 my-8 md:my-0 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative h-96">
              {/* First phone (left) */}
              <motion.div 
                className="absolute left-0 top-6 w-56 shadow-xl rounded-3xl bg-white transform -rotate-6"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="p-2">
                  <div className="h-6 w-16 mx-auto bg-gray-200 rounded-full mb-3"></div>
                  <div className="bg-gray-100 rounded-xl p-3">
                    <div className="flex justify-between mb-3">
                      <div className="w-16 h-6 bg-blue-500 rounded-lg"></div>
                      <div className="w-8 h-6 bg-blue-300 rounded-lg"></div>
                    </div>
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Second phone (right) */}
              <motion.div 
                className="absolute right-0 top-0 w-56 shadow-xl rounded-3xl bg-white transform rotate-6 z-10"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="p-2">
                  <div className="h-6 w-16 mx-auto bg-gray-200 rounded-full mb-3"></div>
                  <div className="h-10 flex items-center px-4 bg-gray-100">
                    <div className="text-xs font-bold text-gray-700">Billing</div>
                  </div>
                  <div className="p-3">
                    <div className="h-12 bg-blue-500 rounded-lg mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                    <div className="h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div className="w-full md:w-1/4" variants={containerVariants}>
            <motion.div className="mb-12 text-center md:text-left" variants={itemVariants}>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center flex-shrink-0 hover:bg-tertiary-light hover:text-white">
                  <Brain className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="lg:text-xl font-bold text-gray-800">Optimal choice</h3>
              </div>
              <p className="text-gray-500 text-sm">
                The business cerrent account that is your accounting
              </p>
            </motion.div>

            <motion.div className="mb-12 text-center md:text-left" variants={itemVariants}>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center flex-shrink-0 hover:bg-tertiary-light hover:text-white">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="lg:text-xl font-bold text-gray-800">Business strategy</h3>
              </div>
              <p className="text-gray-500 text-sm">
                The business cerrent account that is your accounting
              </p>
            </motion.div>

            <motion.div className="text-center md:text-left" variants={itemVariants}>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-blue-100 flex items-center justify-center flex-shrink-0 hover:bg-tertiary-light hover:text-white">
                  <Heart className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="lg:text-xl font-bold text-gray-800">Marketing outline</h3>
              </div>
              <p className="text-gray-500 text-sm">
                The business cerrent account that is your accounting
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
    </div>
  );
}