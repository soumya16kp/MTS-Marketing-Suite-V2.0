"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, BarChart3, Globe, Users, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

interface ServicesDropdownProps {
  pathname: string
}

export function ServicesDropdown({ pathname }: ServicesDropdownProps) {
  const services = [
    {
      icon: Search,
      name: "SEO Optimization",
      description: "Improve search rankings",
      href: "/seo-audit",
    },
    {
      icon: BarChart3,
      name: "Performance Analytics",
      description: "Website performance monitoring",
      href: "/dashboard",
    },
    {
      icon: Globe,
      name: "Website Audits",
      description: "Complete website analysis",
      href: "/seo-audit",
    },
    {
      icon: Users,
      name: "Client Management",
      description: "Streamlined client onboarding",
      href: "/clients",
    },
    {
      icon: TrendingUp,
      name: "Growth Marketing",
      description: "Data-driven growth strategies",
      href: "/contact",
    },
    {
      icon: FileText,
      name: "Custom Reports",
      description: "Professional branded reports",
      href: "/reports",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`relative font-medium transition-all duration-300 hover:text-primary flex items-center gap-1 ${
            pathname === "/services"
              ? "text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-green-600 after:rounded-full"
              : "text-foreground hover:scale-105"
          }`}
        >
          Services
          <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        <DropdownMenuLabel>Our Services</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {services.map((service) => {
          const Icon = service.icon
          return (
            <DropdownMenuItem key={service.name} asChild>
              <Link href={service.href} className="flex items-start gap-3 p-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{service.name}</div>
                  <div className="text-xs text-muted-foreground">{service.description}</div>
                </div>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/services" className="flex items-center justify-center p-2 font-medium text-primary">
            View All Services
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
