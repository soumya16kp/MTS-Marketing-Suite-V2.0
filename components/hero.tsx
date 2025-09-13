"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative pt-24 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,.03)_25px,rgba(255,255,255,.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,.03)_75px,rgba(255,255,255,.03)_76px,transparent_77px),linear-gradient(rgba(255,255,255,.03)_24px,transparent_25px,transparent_26px,rgba(255,255,255,.03)_27px,rgba(255,255,255,.03)_74px,transparent_75px,transparent_76px,rgba(255,255,255,.03)_77px)] bg-[length:100px_100px]" />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full bg-primary/30 border border-primary/50 text-primary-foreground text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ backgroundColor: "hsl(var(--primary) / 0.9)", color: "hsl(var(--primary-foreground))" }}
          >
            🚀 Professional B2B Marketing Platform
          </div>

          {/* Main Headline */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-montserrat font-black mb-6 text-balance text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            All-in-One <span className="gradient-text animate-pulse">Digital Marketing</span> & SEO Agency
          </h1>

          <p
            className={`text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto text-pretty transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Manage clients, run comprehensive SEO audits, track analytics, and generate professional white-label reports
            - all from one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/login">
              <Button
                size="lg"
                className="group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="group bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                See Pricing
              </Button>
            </Link>
          </div>

          <div
            className={`mt-12 text-sm text-foreground/70 transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="mb-4 font-medium">Trusted by 500+ marketing agencies worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="w-20 h-8 bg-muted/80 rounded flex items-center justify-center text-xs font-medium text-foreground/60 hover:opacity-90 transition-opacity">
                Agency 1
              </div>
              <div className="w-20 h-8 bg-muted/80 rounded flex items-center justify-center text-xs font-medium text-foreground/60 hover:opacity-90 transition-opacity">
                Agency 2
              </div>
              <div className="w-20 h-8 bg-muted/80 rounded flex items-center justify-center text-xs font-medium text-foreground/60 hover:opacity-90 transition-opacity">
                Agency 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
