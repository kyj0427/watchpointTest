import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ChatRoomManagement } from "@/components/chat-rooms/chat-room-management"

export default function ChatRoomsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ChatRoomManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
