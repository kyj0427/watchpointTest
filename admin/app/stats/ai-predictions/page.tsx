import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AIPredictionStats } from "@/components/statistics/ai-prediction-stats"

export default function AIPredictionStatsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AIPredictionStats />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
