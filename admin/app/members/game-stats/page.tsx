import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MemberGameStats } from "@/components/member-management/member-game-stats"

export default function MemberGameStatsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <MemberGameStats />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
