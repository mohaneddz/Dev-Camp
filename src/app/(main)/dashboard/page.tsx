"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { usePageContext } from "./layout";
import { IconLoader } from "@tabler/icons-react";

const Map = dynamic(() => import("@/pages/Map"));
const Posts = dynamic(() => import("@/pages/Posts"));
const MediaPlan = dynamic(() => import("@/pages/MediaPlan"));
const Settings = dynamic(() => import("@/pages/Settings"));
const Sales = dynamic(() => import("@/pages/Sales"));
const Features = dynamic(() => import("@/pages/Features"));

export default function Page() {

    const { page }: any = usePageContext();

    const pages: any = {

        map: Map,
        
        dashboard: Posts,
        mediaplan: MediaPlan,
        settings: Settings,
        sales: Sales,
        features: Features,
    };

    const PageComponent: React.ComponentType = pages[page] || Posts;

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
