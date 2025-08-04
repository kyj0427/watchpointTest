import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AICoachingManagement } from "@/components/ai-coaching/ai-coaching-management"

export default function AICoachingPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AICoachingManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
