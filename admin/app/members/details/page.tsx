import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MemberDetails } from "@/components/member-management/member-details"

export default function MemberDetailsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <MemberDetails />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
