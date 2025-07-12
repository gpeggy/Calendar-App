import { sampleEvents } from "@/data/sampleEvents"
import React, { useState } from "react"
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Example: Generate weekDates as the current week's dates (1-31)
const today = new Date();
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay());
const weekDates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(startOfWeek);
  d.setDate(startOfWeek.getDate() + i);
  return d.getDate();
});

// Define timeSlots as an array of hours (e.g., 8 AM to 7 PM)
const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8);

/**
 * Calculates the style for an event based on its start and end time.
 * Assumes time format is "HH:MM" in 24-hour format.
 */
function calculateEventStyle(startTime: string, endTime: string) {
  // Parse hours and minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Time slots start at 8 AM
  const slotStartHour = 8;
  const slotHeight = 80; // px, matches h-20 (tailwind = 5rem = 80px)

  // Calculate top position
  const startTotalMinutes = (startHour - slotStartHour) * 60 + startMinute;
  const top = (startTotalMinutes / 60) * slotHeight;

  // Calculate event duration in minutes
  const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  const height = (durationMinutes / 60) * slotHeight;

  return {
    top: `${top}px`,
    height: `${height}px`,
  };
}

// Define the type for an event object
type Event = {
  title: string;
  startTime: string;
  endTime: string;
  day: number;
  color: string;
};

const Dashboard = () => {
 const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Handle event click
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
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

                {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 m-h-screen"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl p-6 min-w-[300px] shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="font-bold text-lg mb-2">{selectedEvent.title}</div>
            <div className="mb-1">
              <span className="font-medium">Time:</span> {selectedEvent.startTime} - {selectedEvent.endTime}
            </div>
            <div className="mb-1">
              <span className="font-medium">Day:</span> {weekDays[selectedEvent.day - 1]}
            </div>
            {/* Add more event details here if needed */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
