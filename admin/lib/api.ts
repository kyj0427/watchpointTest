const API_BASE_URL = "/data"
//const API_BASE_URL = "http://localhost:8080/api"; 

export const api = {

  // Dashboard 
  getDashboard: () => fetch(`${API_BASE_URL}/dashboard.json`).then((res) => res.json()),

  // Members
  getMembers: () => fetch(`${API_BASE_URL}/members.json`).then((res) => res.json()),
  getMemberDetails: () => fetch(`${API_BASE_URL}/members.json`).then((res) => res.json()),
  getMemberGameStats: () => fetch(`${API_BASE_URL}/member-game-stats.json`).then((res) => res.json()),

  // Reports
  getReports: () => fetch(`${API_BASE_URL}/reports.json`).then((res) => res.json()),
  getSanctions: () => fetch(`${API_BASE_URL}/sanctions.json`).then((res) => res.json()),

  // Inquiries
  getInquiries: () => fetch(`${API_BASE_URL}/inquiries.json`).then((res) => res.json()),

  // Chat Rooms
  getChatRooms: () => fetch(`${API_BASE_URL}/chat-rooms.json`).then((res) => res.json()),

  // Announcements
  getAnnouncements: () => fetch(`${API_BASE_URL}/announcements.json`).then((res) => res.json()),

  // Statistics
  getStatistics: () => fetch(`${API_BASE_URL}/statistics.json`).then((res) => res.json()),

  // AI Coaching
  getAICoaching: () => fetch(`${API_BASE_URL}/ai-coaching.json`).then((res) => res.json()),

  // Game Content
  getGameContent: () => fetch(`${API_BASE_URL}/game-content.json`).then((res) => res.json()),

  // Community
  getCommunity: () => fetch(`${API_BASE_URL}/community.json`).then((res) => res.json()),

  // Subscription
  getSubscription: () => fetch(`${API_BASE_URL}/subscription.json`).then((res) => res.json()),

  // Notifications
  getNotifications: () => fetch(`${API_BASE_URL}/notifications.json`).then((res) => res.json()),

  // Activity Log
  getActivityLog: () => fetch(`${API_BASE_URL}/activity-log.json`).then((res) => res.json()),

  // Admin Profile
  getAdminProfile: () => fetch(`${API_BASE_URL}/admin-profile.json`).then((res) => res.json()),

  // System Settings
  getSystemSettings: () => fetch(`${API_BASE_URL}/system-settings.json`).then((res) => res.json()),

  // User Services
  getUserServices: () => fetch(`${API_BASE_URL}/user-services.json`).then((res) => res.json()),

  // User Dashboard
  getUserDashboard: () => fetch(`${API_BASE_URL}/user-dashboard.json`).then((res) => res.json()),
}
