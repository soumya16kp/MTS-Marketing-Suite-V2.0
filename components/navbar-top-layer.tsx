"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

export function NavbarTopLayer() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide top layer when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-green-600 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 text-sm">
          {/* Left side - Contact info */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-white/80 transition-colors text-white">
              <Phone className="w-3 h-3 text-white" />
              <span className="text-white">+880 1XXXXXXXXX</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-white/80 transition-colors text-white">
              <Mail className="w-3 h-3 text-white" />
              <span className="text-white">info@mtsmarketing.com</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-white/80 transition-colors text-white">
              <MapPin className="w-3 h-3 text-white" />
              <span className="text-white">Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Right side - Announcement */}
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <span className="text-xs font-medium text-white">🎉 New: AI-Powered Analytics Dashboard - Try Free!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
