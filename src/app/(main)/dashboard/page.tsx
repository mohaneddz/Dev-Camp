"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { usePageContext } from "./layout";
import { IconLoader } from "@tabler/icons-react";

const Home = dynamic(() => import("@/pages/Posts"));
const Logs = dynamic(() => import("@/pages/MediaPlan"));
const Settings = dynamic(() => import("@/pages/Settings"));
const Power = dynamic(() => import("@/pages/Sales"));
const Server = dynamic(() => import("@/pages/Features"));

export default function Page() {

    const { page }: any = usePageContext();

    const pages: any = {
        dashboard: Home,
        
        logs: Logs,
        settings: Settings,
        map: Map,
        power: Power,
        server: Server,
    };

    const PageComponent: React.ComponentType = pages[page] || Home;

    return (

        <div className="w-full h-full ">
            <Suspense fallback={
                // loading animation
                <div className="flex items-center justify-center w-full h-full">
                    <IconLoader className="animate-spin" size={30} color="#64748b" />
                </div>
            }>
                <PageComponent />
            </Suspense>
        </div>

    );
}
