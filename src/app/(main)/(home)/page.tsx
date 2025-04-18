import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/utils/supabase/server"
import Image from 'next/image';

import Hero from '@/sections/Hero';
import MidSection from '@/sections/MidSection';
import MacbookScroll from '@/sections/Laptop'
import DashboardCTA from '@/sections/DashboardCTA'
import Globe from '@/sections/Globe'

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
      <Globe 
        globeConfig={{
          globeColor: "#1d072e",
          atmosphereColor: "#ffffff",
        }}
        data={[
          {
            order: 1,
            startLat: 40.7128,
            startLng: -74.0060,
            endLat: 51.5074,
            endLng: -0.1278,
            arcAlt: 0.3,
            color: "#ff0000"
          }
        ]}
      />
      <DashboardCTA />

    </div>
  );
}