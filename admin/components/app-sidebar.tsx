"use client"

import {
  Users,
  UserCheck,
  UserX,
  Flag,
  Shield,
  MessageSquare,
  MessageCircle,
  Megaphone,
  BarChart3,
  TrendingUp,
  DollarSign,
  GamepadIcon,
  Star,
  Brain,
  Home,
  Settings,
  ChevronDown,
  ChevronRight,
  Map,
  Heart,
  CreditCard,
  Search,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  }, 
  {
    title: "AI Coaching",
    url: "/ai-coaching",
    icon: Brain,
  },
  {
    title: "Game Content",
    url: "/game-content",
    icon: Map,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: CreditCard,
  },
  {
    title: "Member Management",
    icon: Users,
    items: [
      { title: "Member List", url: "/members", icon: Users },
      { title: "Member Details", url: "/members/details", icon: UserCheck },
      { title: "Game Statistics", url: "/members/game-stats", icon: GamepadIcon },
      { title: "Sanctions", url: "/members/sanctions", icon: UserX },
    ],
  },
  {
    title: "Report Management",
    icon: Flag,
    items: [
      { title: "Report History", url: "/reports", icon: Flag },
      { title: "Blocked Users", url: "/reports/blocked", icon: Shield },
    ],
  },
  {
    title: "Member Inquiries",
    icon: MessageSquare,
    items: [
      { title: "Inquiry List", url: "/inquiries", icon: MessageSquare },
      { title: "Inquiry Details", url: "/inquiries/details", icon: MessageCircle },
      { title: "Reply Management", url: "/inquiries/replies", icon: MessageCircle },
    ],
  },
  {
    title: "Chat Room Management",
    url: "/chat-rooms",
    icon: MessageCircle,
  },
  {
    title: "Announcements",
    url: "/announcements",
    icon: Megaphone,
  },
  {
    title: "Statistics",
    icon: BarChart3,
    items: [
      { title: "Platform Statistics", url: "/stats/platform", icon: TrendingUp },
      { title: "Member Statistics", url: "/stats/members", icon: Users },
      { title: "Revenue Statistics", url: "/stats/revenue", icon: DollarSign },
      { title: "Duo/Squad Statistics", url: "/stats/duo-squad", icon: GamepadIcon },
      { title: "Coaching Satisfaction", url: "/stats/coaching", icon: Star },
      { title: "AI Prediction Accuracy", url: "/stats/ai-predictions", icon: Brain },
    ],
  },
  {
    title: "Community(ready)",
    url: "/community",
    icon: Heart,
  }
]

export function AppSidebar() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">WatchPoint Admin</span>
                  <span className="truncate text-xs">Overwatch Coaching Platform</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          {openItems.includes(item.title) ? (
                            <ChevronDown className="ml-auto size-4" />
                          ) : (
                            <ChevronRight className="ml-auto size-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <subItem.icon className="size-4" />
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/system-settings">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
