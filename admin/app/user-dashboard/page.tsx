import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserDashboardManagement } from "@/components/user-dashboard/user-dashboard-management"

export default function UserDashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <UserDashboardManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
