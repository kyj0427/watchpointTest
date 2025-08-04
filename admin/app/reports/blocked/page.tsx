import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { BlockedUsersManagement } from "@/components/reports/blocked-users-management"

export default function BlockedUsersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <BlockedUsersManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
