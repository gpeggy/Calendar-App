import { Search, Settings, Menu } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
const Header = () => {
  // Set isLoaded to true by default; adjust logic as needed
  const isLoaded = true;

  return (
    <header
        className={`relative z-20 flex items-center justify-between px-8 py-6 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white drop-shadow-lg" />
          <span className="text-2xl font-semibold text-white drop-shadow-lg">Calendar</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Search events..."
              className="rounded-full bg-white/20 backdrop-blur-md pl-10 pr-4 py-2 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              aria-label="Search calendar events"
            />
          </div>
          <Settings className="h-6 w-6 text-white drop-shadow-lg cursor-pointer hover:text-white/80 transition-colors" />
          <SignedIn>
          <UserButton/>
          </SignedIn>
          <SignedOut>
          <Link href={"/sign-in"} className="text-white hover:text-white/80 transition-colors rounded-2xl border border-white/30 px-4 py-2">
            Sign in
          </Link>
          </SignedOut>
        </div>
      </header>
  )
}

export default Header
