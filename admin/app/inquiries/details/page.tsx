import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { InquiryDetails } from "@/components/inquiries/inquiry-details"

export default function InquiryDetailsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <InquiryDetails />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
