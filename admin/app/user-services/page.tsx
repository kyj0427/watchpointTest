import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserServicesManagement } from "@/components/user-services/user-services-management"

export default function UserServicesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <UserServicesManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
