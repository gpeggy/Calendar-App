"use client"

import { useState, useEffect } from "react"
import { Sparkles, X, Pause } from "lucide-react"

interface AIAssistantProps {
  isVisible: boolean
  onClose: () => void
}

export default function AIAssistant({ isVisible, onClose }: AIAssistantProps) {
  const [typedText, setTypedText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  const aiMessage =
    "Looks like you don't have that many meetings today. Shall I play some Hans Zimmer essentials to help you get into your Flow State?"

  // Typing animation effect
  useEffect(() => {
    if (!isVisible) return

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < aiMessage.length) {
        setTypedText((prev) => prev + aiMessage.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [isVisible, aiMessage])

  const handlePlayMusic = () => {
    setIsPlaying(!isPlaying)
    // In a real app, you would integrate with a music service here
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-20">
      <div className="w-[450px] relative bg-gradient-to-br from-blue-400/30 via-blue-500/30 to-blue-600/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-blue-300/30 text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close AI assistant"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Sparkles className="h-5 w-5 text-blue-300" />
          </div>
          <div className="min-h-[80px]">
            <p className="text-base font-light">{typedText}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handlePlayMusic}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
          >
            Yes, play music
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
          >
            No thanks
          </button>
        </div>

        {isPlaying && (
          <div className="mt-4 flex items-center justify-between">
            <button
              className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-white text-sm hover:bg-white/20 transition-colors"
              onClick={handlePlayMusic}
            >
              <Pause className="h-4 w-4" />
              <span>Pause Hans Zimmer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
