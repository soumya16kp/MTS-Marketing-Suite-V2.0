"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { ServicesDropdown } from "@/components/services-dropdown"
import { getCurrentUser } from "@/lib/auth"
import Image from "next/image"

export function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [topLayerVisible, setTopLayerVisible] = useState(true)
  const [user, setUser] = useState(getCurrentUser())
  const pathname = usePathname()

  useEffect(() => {
    let lastScrollY = 0

    const handleScroll = () => {
      const scrollY = window.scrollY

      setIsScrolled(scrollY > 10)

      // Track top layer visibility
      if (scrollY > lastScrollY && scrollY > 100) {
        setTopLayerVisible(false)
      } else {
        setTopLayerVisible(true)
      }

      lastScrollY = scrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setUser(getCurrentUser())
  }, [pathname])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    ...(user
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Clients", href: "/clients" },
          { name: "SEO Audit", href: "/seo-audit" },
          { name: "Reports", href: "/reports" },
        ]
      : []),
  ]

  const handleUserLogout = () => {
    setUser(null)
  }

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        topLayerVisible ? "top-10" : "top-0"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`relative transition-all duration-300 ${isScrolled ? "w-8 h-8" : "w-10 h-10"}`}>
              <Image
                src="/mts-logo.png"
                alt="MTS Logo"
                width={isScrolled ? 32 : 40}
                height={isScrolled ? 32 : 40}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-montserrat font-bold gradient-text transition-all duration-300 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
              >
                MTS Marketing Suite
              </span>
              <span
                className={`text-xs text-muted-foreground font-medium transition-all duration-300 ${
                  isScrolled ? "opacity-0 h-0" : "opacity-100"
                }`}
              >
                All-in-One Digital Marketing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown && item.name === "Services" ? (
                  <ServicesDropdown pathname={pathname} />
                ) : (
                  <Link
                    href={item.href}
                    className={`relative font-medium transition-all duration-300 hover:text-primary flex items-center gap-1 ${
                      pathname === item.href
                        ? "text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-green-600 after:rounded-full"
                        : "text-foreground hover:scale-105"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+8801XXXXXXXXX"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Phone className="w-5 h-5" />
            </a>
            {user ? (
              <UserMenu user={user} onLogout={handleUserLogout} />
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-green-600 hover:from-purple-700 hover:via-purple-800 hover:to-green-700 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 group"
                >
                  <span className="relative z-10 font-medium text-white">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`w-6 h-6 absolute transition-all duration-300 text-foreground ${isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
              />
              <X
                className={`w-6 h-6 absolute transition-all duration-300 text-foreground ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t pt-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 ${
                    pathname === item.href ? "text-primary" : "text-foreground"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t">
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-foreground">Call Support</span>
                </a>
                {user ? (
                  <UserMenu user={user} onLogout={handleUserLogout} />
                ) : (
                  <Link href="/login">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-green-600 text-white">
                      <span className="text-white">Login</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
