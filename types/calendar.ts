// Define our data types for better code organization and type safety
export interface CalendarEvent {
  id: number
  title: string
  startTime: string
  endTime: string
  color: string
  day: number
  description: string
  location: string
  attendees: string[]
  organizer: string
}

export interface Calendar {
  name: string
  color: string
}

export type ViewType = "day" | "week" | "month"
