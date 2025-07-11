import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { myCalendars } from "@/data/sampleEvents"
import React, { useState } from "react"

const Sidebar = () => {
  const [currentMonth, setCurrentMonth] = useState("June 2025")
  const isLoaded = true 

 // Month navigation handlers
  const handlePreviousMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const currentIndex = months.findIndex((month) => currentMonth.includes(month))
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : 11
    setCurrentMonth(`${months[previousIndex]} 2025`)
  }

   const handleNextMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const currentIndex = months.findIndex((month) => currentMonth.includes(month))
    const nextIndex = currentIndex < 11 ? currentIndex + 1 : 0
    setCurrentMonth(`${months[nextIndex]} 2025`)
  }

  // Mini calendar configuration
  const daysInMonth = 31
  const firstDayOffset = 5
  const miniCalendarDays = Array.from({ length: daysInMonth + firstDayOffset }, (_, i) =>
    i < firstDayOffset ? null : i - firstDayOffset + 1,
  )

return (
    <div
          className={`w-64 h-full bg-white/15 backdrop-blur-xl p-4 shadow-2xl border-r border-white/30 rounded-tr-3xl flex flex-col justify-between transition-all duration-700 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        >
          <div>
            <button className="mb-6 flex items-center justify-center gap-2 rounded-full bg-blue-500/90 backdrop-blur-sm px-4 py-3 text-white w-full hover:bg-blue-600/90 transition-all duration-200 shadow-lg border border-blue-400/30">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Create Event</span>
            </button>

            {/* Mini Calendar - FIXED: Better contrast */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg drop-shadow-md">{currentMonth}</h3>
                <div className="flex gap-1">
                  <button
                    className="p-2 rounded-full hover:bg-white/20 transition-colors border border-white/20"
                    onClick={handlePreviousMonth}
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-white/20 transition-colors border border-white/20"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-xs text-white/80 font-semibold py-2">
                    {day}
                  </div>
                ))}

                {miniCalendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`text-sm rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-200 font-medium ${
                      day === 5
                        ? "bg-blue-500 text-white shadow-lg scale-110"
                        : "text-white hover:bg-white/20 hover:scale-105"
                    } ${!day ? "invisible" : ""}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* My Calendars - FIXED: Better visibility */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg drop-shadow-md">My calendars</h3>
              <div className="space-y-3">
                {myCalendars.map((cal, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer hover:bg-white/15 rounded-lg p-2 transition-all duration-200 border border-transparent hover:border-white/20"
                  >
                    <div className={`w-4 h-4 rounded-sm ${cal.color} shadow-sm`}></div>
                    <span className="text-white text-sm font-medium drop-shadow-sm">{cal.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  )
}

export default Sidebar
