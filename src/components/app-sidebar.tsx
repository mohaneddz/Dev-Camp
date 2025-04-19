import * as React from "react"
import {
  IconEyeFilled,
  IconEye,
  IconDashboard,
  IconBrandAppleArcade,
  IconInnerShadowTop,
  IconReport,
  IconIkosaedr,
  IconSettings,
  IconMap,
  IconCloudFilled,
  IconBoltFilled,
  IconCloudComputingFilled,
  IconShieldHalfFilled,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link';

const data = {
  user: {
    name: "Lara Croft",
    email: "Command@gmail.com",
    avatar: "/profile.png",
    link: "/profile",
  },
  navMain: [
    {
      title: "Map",
      url: "#",
      icon: IconMap,
      id: "map",
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      id: "settings",
      icon: IconSettings,
    },
  ],
  documents: [
    {
      name: "Posts",
      url: "#",
      icon: IconDashboard,
      id: "posts",
    },

    {
      name: "Media Plan",
      url: "#",
      icon: IconReport,
      id: "mediaplan",
    },

    {
      name: "Sales",
      url: "#",
      icon: IconBoltFilled,
      id: "sales",
    },

    {
      name: "Features",
      url: "#",
      icon: IconCloudComputingFilled,
      id: "features",
    },
    {
      name: "Market Exchange",
      url: "#",
      icon: IconCloudComputingFilled,
      id: "market",
    },
  ],
}

export function AppSidebar({ page, changePage, ...props }: React.ComponentProps<typeof Sidebar> & { page: string, changePage: (page: string) => void }) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-background dark:bg-background-dark">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 text-foreground dark:text-foreground-dark"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Return To Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background dark:bg-background-dark">
        <NavMain items={data.navMain} changePage={changePage} page={page} />
        <NavDocuments items={data.documents} changePage={changePage} page={page} />
        <NavSecondary items={data.navSecondary} className="mt-auto" changePage={changePage} />
      </SidebarContent>
      <SidebarFooter className="bg-background dark:bg-background-dark">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
