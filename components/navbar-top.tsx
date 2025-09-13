"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

export function NavbarTop() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

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
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        background: "linear-gradient(135deg, #7c3aed, #16a34a)",
      }}
    >
      <div className="py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex-1 overflow-hidden">
            <div className="ticker-animation whitespace-nowrap font-medium text-white">
              🔥 Get 20% OFF on First Project • Limited Time Offer • Professional SEO Audits Available
            </div>
          </div>

          <div className="hidden md:block flex-1 text-center font-medium text-white">
            Your All-in-One Digital Marketing Partner
          </div>

          <div className="flex-1 flex justify-end">
            <a
              href="tel:+8801XXXXXXXXX"
              className="flex items-center gap-2 transition-colors text-white hover:text-white/80"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">+880 1XXX-XXXXX</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
