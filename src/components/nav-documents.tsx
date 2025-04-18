"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavDocuments({
  items, changePage, page
}: {
  items: {
    name: string
    url: string
    icon: Icon,
    id: string
  }[],
  changePage: (page: string) => void,
  page: string
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-foreground dark:text-foreground-dark">Menus</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <button 
                onClick={() => changePage(item.id)}
                className="text-foreground dark:text-foreground-dark hover:bg-background dark:hover:bg-background-dark"
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg bg-background dark:bg-background-dark"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="text-foreground dark:text-foreground-dark hover:bg-background dark:hover:bg-background-dark">
                  <IconFolder />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground dark:text-foreground-dark hover:bg-background dark:hover:bg-background-dark">
                  <IconShare3 />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-background dark:bg-background-dark" />
                <DropdownMenuItem variant="destructive" className="text-foreground dark:text-foreground-dark hover:bg-background dark:hover:bg-background-dark">
                  <IconTrash />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
