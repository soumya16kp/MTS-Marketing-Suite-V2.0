"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Search,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Target,
  Globe,
  Mail,
  Calendar,
  Zap,
  TrendingUp,
  Shield,
  CreditCard,
  Menu,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import Image from "next/image"

interface SidebarItem {
  title: string
  href: string
  icon: any
  badge?: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
    badge: "3",
  },
  {
    title: "SEO Tools",
    href: "/seo-audit",
    icon: Search,
    children: [
      { title: "Site Audit", href: "/seo-audit", icon: Search },
      { title: "Keyword Research", href: "/keywords", icon: Target },
      { title: "Competitor Analysis", href: "/competitors", icon: TrendingUp },
    ],
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: Target,
    children: [
      { title: "Campaigns", href: "/campaigns", icon: Zap },
      { title: "Email Marketing", href: "/email", icon: Mail },
      { title: "Social Media", href: "/social", icon: Globe },
      { title: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    children: [
      { title: "Account", href: "/settings/account", icon: Shield },
      { title: "Billing", href: "/settings/billing", icon: CreditCard },
      { title: "Integrations", href: "/settings/integrations", icon: Zap },
    ],
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
]

interface DashboardSidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export function DashboardSidebar({ isCollapsed = false, onToggle }: DashboardSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const user = getCurrentUser()

  const toggleExpanded = (title: string) => {
    if (isCollapsed) return // Don't expand items when sidebar is collapsed
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
  }

  const isParentActive = (item: SidebarItem) => {
    if (isActive(item.href)) return true
    return item.children?.some((child) => isActive(child.href)) || false
  }

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: isCollapsed ? 80 : 320,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border shadow-xl z-40 overflow-y-auto ${
        isCollapsed ? "w-20" : "w-80"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`p-6 border-b border-sidebar-border ${isCollapsed ? "p-4" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/mts-logo.png"
                  alt="MTS Marketing Suite"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle} className="p-2 hover:bg-muted/50">
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          </div>

          {/* User Profile */}
          {!isCollapsed && (
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
              </div>
            </div>
          )}

          {/* Collapsed User Avatar */}
          {isCollapsed && (
            <div className="flex justify-center">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-2 ${isCollapsed ? "p-2" : "p-4"}`}>
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.children && !isCollapsed ? (
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(item.title)}
                    className={`w-full justify-between h-11 px-3 sidebar-item-hover ${
                      isParentActive(item) ? "sidebar-item-active" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </Button>

                  <AnimatePresence>
                    {expandedItems.includes(item.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href}>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start h-9 px-3 sidebar-item-hover ${
                                  isActive(child.href) ? "sidebar-item-active" : ""
                                }`}
                              >
                                <child.icon className="w-4 h-4 mr-3" />
                                <span className="text-sm">{child.title}</span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full h-11 sidebar-item-hover ${
                      isActive(item.href) ? "sidebar-item-active" : ""
                    } ${isCollapsed ? "justify-center px-2" : "justify-start px-3"}`}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`w-5 h-5 ${!isCollapsed ? "mr-3" : ""}`} />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="p-3 rounded-lg bg-gradient-primary-secondary text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Upgrade to Pro</span>
              </div>
              <p className="text-xs opacity-90 mb-3">Unlock advanced features and unlimited clients</p>
              <Button size="sm" variant="secondary" className="w-full">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
