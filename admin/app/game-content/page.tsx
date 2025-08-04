import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { GameContentManagement } from "@/components/game-content/game-content-management"

export default function GameContentPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <GameContentManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
