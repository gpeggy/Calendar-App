"use client"

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import  Dashboard from "@/components/Dashboard";

import { useState, useEffect } from "react"
import Image from "next/image"

// Import our custom components and types
import AIAssistant from "@/components/AIAssistant"
import EventModal from "@/components/EventModal"
import type { CalendarEvent } from "@/types/calendar"

export default function CalendarApp() {
  // State management with proper TypeScript types
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [showAIPopup, setShowAIPopup] = useState<boolean>(false)
  const [currentMonth] = useState<string>("March 2025")
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
 

  const handleCloseEventModal = () => {
    setSelectedEvent(null)
  }

  const handleCloseAI = () => {
    setShowAIPopup(false)
  }


  // Calendar configuration
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const weekDates = [3, 4, 5, 6, 7, 8, 9]
 

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
          <Topbar />

          {/* Week View - FIXED: Better contrast and visibility */}
          <Dashboard />
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
