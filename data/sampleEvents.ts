import type { CalendarEvent, Calendar } from "@/types/calendar"

// Sample calendar events - all scheduled before 4 PM for better work-life balance
export const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Team Meeting",
    startTime: "09:00",
    endTime: "10:00",
    color: "bg-blue-500",
    day: 1,
    description: "Weekly team sync-up",
    location: "Conference Room A",
    attendees: ["John Doe", "Jane Smith", "Bob Johnson"],
    organizer: "Alice Brown",
  },
  {
    id: 2,
    title: "Lunch with Sarah",
    startTime: "12:30",
    endTime: "13:30",
    color: "bg-green-500",
    day: 1,
    description: "Discuss project timeline",
    location: "Cafe Nero",
    attendees: ["Sarah Lee"],
    organizer: "You",
  },
  {
    id: 3,
    title: "Project Review",
    startTime: "14:00",
    endTime: "15:30",
    color: "bg-purple-500",
    day: 3,
    description: "Q2 project progress review",
    location: "Meeting Room 3",
    attendees: ["Team Alpha", "Stakeholders"],
    organizer: "Project Manager",
  },
  {
    id: 4,
    title: "Client Call",
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-yellow-500",
    day: 2,
    description: "Quarterly review with major client",
    location: "Zoom Meeting",
    attendees: ["Client Team", "Sales Team"],
    organizer: "Account Manager",
  },
  // Add more events as needed...
]

export const myCalendars: Calendar[] = [
  { name: "My Calendar", color: "bg-blue-500" },
  { name: "Work", color: "bg-green-500" },
  { name: "Personal", color: "bg-purple-500" },
  { name: "Family", color: "bg-orange-500" },
]
