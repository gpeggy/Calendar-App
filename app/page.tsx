"use client"

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Import our custom components and types
import AIAssistant from "@/components/AIAssistant"
import EventModal from "@/components/EventModal"
import { sampleEvents } from "@/data/sampleEvents"
import type { CalendarEvent, ViewType } from "@/types/calendar"

export default function CalendarApp() {
  // State management with proper TypeScript types
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [showAIPopup, setShowAIPopup] = useState<boolean>(false)
  const [currentView, setCurrentView] = useState<ViewType>("week")
  const [currentMonth] = useState<string>("March 2025")
  const currentDate = "March 5"
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Animation and AI popup timing
  useEffect(() => {
    setIsLoaded(true)

    // Show AI assistant after 3 seconds
    const popupTimer = setTimeout(() => {
      setShowAIPopup(true)
    }, 3000)

    return () => clearTimeout(popupTimer)
  }, [])

  // Event handlers
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  const handleCloseEventModal = () => {
    setSelectedEvent(null)
  }

  const handleCloseAI = () => {
    setShowAIPopup(false)
  }


  // Calendar configuration
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const weekDates = [3, 4, 5, 6, 7, 8, 9]
  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8)

  // Helper function to calculate event position and height
  const calculateEventStyle = (startTime: string, endTime: string) => {
    const start = Number.parseInt(startTime.split(":")[0]) + Number.parseInt(startTime.split(":")[1]) / 60
    const end = Number.parseInt(endTime.split(":")[0]) + Number.parseInt(endTime.split(":")[1]) / 60
    const top = (start - 8) * 80
    const height = (end - start) * 80
    return { top: `${top}px`, height: `${height}px` }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image - FIXED: Added proper z-index */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
          alt="Beautiful mountain landscape background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation Header */}
        <Header />

      <main className="relative z-10 h-[calc(100vh-88px)] w-full flex">
      {/* Sidebar */}
        <Sidebar />

        {/* Calendar View - FIXED: Better positioning and visibility */}
        <div
          className={`flex-1 flex flex-col transition-all duration-700 delay-200 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          {/* Calendar Controls - FIXED: Better backdrop */}
          <div className="flex items-center justify-between p-4 border-b border-white/30 bg-white/10 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-white bg-blue-500/90 rounded-lg hover:bg-blue-600/90 transition-colors font-medium shadow-lg border border-blue-400/30">
                Today
              </button>
              <div className="flex border border-white/30 rounded-lg overflow-hidden">
                <button className="p-2 text-white hover:bg-white/20 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="p-2 text-white hover:bg-white/20 transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-white drop-shadow-lg">{currentDate}</h2>
            </div>

            <div className="flex items-center gap-1 rounded-lg p-1 bg-white/15 backdrop-blur-sm border border-white/30">
              {(["day", "week", "month"] as ViewType[]).map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-2 rounded-md capitalize transition-all duration-200 font-medium ${
                    currentView === view
                      ? "bg-white/30 text-white shadow-md"
                      : "hover:bg-white/20 text-white/80 hover:text-white"
                  } text-sm`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Week View - FIXED: Better contrast and visibility */}
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl h-full">
              {/* Week Header */}
              <div className="grid grid-cols-8 border-b border-white/30">
                <div className="p-3 text-center text-white/60 text-xs font-medium"></div>
                {weekDays.map((day, i) => (
                  <div key={i} className="p-3 text-center border-l border-white/30">
                    <div className="text-xs text-white/80 font-semibold">{day}</div>
                    <div
                      className={`text-lg font-bold mt-2 text-white transition-all duration-200 ${
                        weekDates[i] === 5
                          ? "bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mx-auto shadow-lg"
                          : "hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto"
                      }`}
                    >
                      {weekDates[i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="grid grid-cols-8">
                {/* Time Labels */}
                <div className="text-white/80">
                  {timeSlots.map((time, i) => (
                    <div
                      key={i}
                      className="h-20 border-b border-white/20 pr-3 text-right text-xs flex items-start pt-2 font-medium"
                    >
                      {time > 12 ? `${time - 12} PM` : `${time} AM`}
                    </div>
                  ))}
                </div>

                {/* Days Columns */}
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="border-l border-white/30 relative">
                    {timeSlots.map((_, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="h-20 border-b border-white/20 hover:bg-white/5 transition-colors"
                      ></div>
                    ))}

                    {/* Events */}
                    {sampleEvents
                      .filter((event) => event.day === dayIndex + 1)
                      .map((event, i) => {
                        const eventStyle = calculateEventStyle(event.startTime, event.endTime)
                        return (
                          <div
                            key={i}
                            className={`absolute ${event.color} rounded-lg p-3 text-white text-xs shadow-xl cursor-pointer transition-all duration-300 ease-out hover:translate-y-[-3px] hover:shadow-2xl hover:scale-105 border border-white/20`}
                            style={{
                              ...eventStyle,
                              left: "6px",
                              right: "6px",
                            }}
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="font-semibold truncate">{event.title}</div>
                            <div className="opacity-90 text-[11px] mt-1 font-medium">{`${event.startTime} - ${event.endTime}`}</div>
                          </div>
                        )
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Component */}
      <AIAssistant isVisible={showAIPopup} onClose={handleCloseAI} />

      {/* Event Modal Component */}
      <EventModal
        event={selectedEvent}
        onClose={handleCloseEventModal}
        weekDays={weekDays}
        weekDates={weekDates}
        currentMonth={currentMonth}
      />
    </div>
  )
}
