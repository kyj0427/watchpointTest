import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CommunityManagement } from "@/components/community/community-management"

export default function CommunityPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <CommunityManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}