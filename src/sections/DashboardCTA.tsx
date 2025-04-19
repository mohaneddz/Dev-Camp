import React from 'react';
import Link from 'next/link';

export default function DashboardCTA() {
  return (
    <div className="min-h-[50vh] dark:bg-gray-900">
      <div className="bg-primary-dark-1 dark:bg-primary-dark-2 w-[70vw] mx-auto rounded-lg overflow-hidden p-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff8b8f] dark:bg-[#ff6b6f] rounded-bl-lg"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#ff8b8f] dark:bg-[#ff6b6f] rounded-tr-lg"></div>
        <div className="absolute bottom-16 left-16 w-24 h-24 bg-[#f1f5f9] dark:bg-[#1e293b] rounded-full opacity-80"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-[#f1f5f9] dark:bg-[#1e293b] rounded-full opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-3xl font-bold leading-relaxed text-white dark:text-white">Access Your Dashboard</h2>

          <p className="text-[#c8eef1] dark:text-[#e0f2fe] mb-8 max-w-lg leading-relaxed">
            Get real-time insights, track your performance, and manage all your
            settings in one convenient location.
          </p>

          <div className="flex items-center justify-center w-full max-w-lg">
            <Link
              href="/dashboard"
              className="hover:cursor-pointer w-max bg-[#a143fd] dark:bg-[#9333ea] hover:bg-[#b167fd] dark:hover:bg-[#a855f7] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}