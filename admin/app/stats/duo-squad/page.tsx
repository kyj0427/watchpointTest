import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DuoSquadStats } from "@/components/statistics/duo-squad-stats"

export default function DuoSquadStatsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DuoSquadStats />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
