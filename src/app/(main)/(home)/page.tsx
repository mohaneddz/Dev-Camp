import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/utils/supabase/server"
import Image from 'next/image';

import Hero from '@/sections/Hero';
import MidSection from '@/sections/MidSection';
import MacbookScroll from '@/sections/Laptop'
import DashboardCTA from '@/sections/DashboardCTA'

// This is a Server Component. It fetches the user data on the server and renders the entire page.
export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    // Consider handling the error more gracefully, e.g., display an error message
  }

  return (
    <div className="w-full overflow-x-hidden">

      <Hero />
      <MidSection />
      <MacbookScroll />
      <DashboardCTA />

    </div>
  );
}