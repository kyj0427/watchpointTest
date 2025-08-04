import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MemberSanctions } from "@/components/member-management/member-sanctions"

export default function MemberSanctionsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <MemberSanctions />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
