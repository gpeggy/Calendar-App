import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

type ViewType = "day" | "week" | "month";

const Topbar = () => {
  const [currentView, setCurrentView] = useState<ViewType>("month");
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
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
  )
}

export default Topbar
