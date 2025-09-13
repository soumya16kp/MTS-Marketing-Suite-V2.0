"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  Plus,
  Search,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ProtectedRoute } from "@/components/protected-route"
import { AnalyticsChart } from "@/components/analytics-chart"
import { RecentActivity } from "@/components/recent-activity"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { getCurrentUser, initializeDemoUser } from "@/lib/auth"
import { storage, initializeDemoData } from "@/lib/storage"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState(getCurrentUser())
  const [clients, setClients] = useState(storage.getClients())
  const [audits, setAudits] = useState(storage.getSEOAudits())
  const [reports, setReports] = useState(storage.getReports())

  useEffect(() => {
    // Initialize demo data and user
    initializeDemoUser()
    initializeDemoData()

    // Refresh data
    setClients(storage.getClients())
    setAudits(storage.getSEOAudits())
    setReports(storage.getReports())
  }, [])

  // Calculate KPIs
  const totalClients = clients.length
  const totalAudits = audits.length
  const averageScore =
    audits.length > 0 ? Math.round(audits.reduce((sum, audit) => sum + audit.score, 0) / audits.length) : 0
  const totalReports = reports.length

  // Mock data for additional KPIs
  const mockKPIs = {
    monthlyVisits: 24567,
    conversionRate: 3.2,
    adSpend: 12450,
    leads: 89,
  }

  const kpiCards = [
    {
      title: "Total Clients",
      value: totalClients.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Monthly Visits",
      value: mockKPIs.monthlyVisits.toLocaleString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Conversion Rate",
      value: `${mockKPIs.conversionRate}%`,
      change: "+0.5%",
      changeType: "positive" as const,
      icon: BarChart3,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Ad Spend",
      value: `$${mockKPIs.adSpend.toLocaleString()}`,
      change: "-5.1%",
      changeType: "negative" as const,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const quickActions = [
    {
      title: "Add New Client",
      description: "Onboard a new client to your agency",
      icon: Plus,
      href: "/clients",
      color: "bg-primary text-white",
    },
    {
      title: "Run SEO Audit",
      description: "Perform comprehensive website analysis",
      icon: Search,
      href: "/seo-audit",
      color: "bg-secondary text-white",
    },
    {
      title: "Generate Report",
      description: "Create white-label client reports",
      icon: FileText,
      href: "/reports",
      color: "bg-orange-500 text-white",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-80"}`}>
          <main className="pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
                      Welcome back, <span className="gradient-text">{user?.name}</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Here's what's happening with your marketing campaigns today.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <Link href="/seo-audit">
                      <Button size="lg" variant="outline" className="group bg-transparent">
                        <Search className="w-4 h-4 mr-2" />
                        Run Audit
                      </Button>
                    </Link>
                    <Link href="/clients">
                      <Button size="lg" className="group">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Client
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* KPI Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                {kpiCards.map((kpi, index) => {
                  const Icon = kpi.icon
                  return (
                    <motion.div
                      key={kpi.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</p>
                              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                              <div className="flex items-center mt-2">
                                <Badge
                                  variant={kpi.changeType === "positive" ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {kpi.change}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                              </div>
                            </div>
                            <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${kpi.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* PageSpeed Metrics Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="mb-8"
              >
                <DashboardMetrics />
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Analytics Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <AnalyticsChart />
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-montserrat font-bold">Quick Actions</CardTitle>
                      <CardDescription>Common tasks to manage your agency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {quickActions.map((action, index) => {
                        const Icon = action.icon
                        return (
                          <Link key={action.title} href={action.href}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="p-4 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer group"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {action.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{action.description}</p>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        )
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <RecentActivity />
                </motion.div>

                {/* Client Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-montserrat font-bold">Client Overview</CardTitle>
                      <CardDescription>Recent client performance and status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {clients.length > 0 ? (
                        <div className="space-y-4">
                          {clients.slice(0, 3).map((client) => {
                            const clientAudits = audits.filter((audit) => audit.clientId === client.id)
                            const latestAudit = clientAudits[clientAudits.length - 1]

                            return (
                              <div key={client.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                    <span className="font-semibold text-sm">{client.name.charAt(0)}</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-foreground">{client.name}</h4>
                                    <p className="text-sm text-muted-foreground">{client.domain}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {latestAudit ? (
                                    <>
                                      <Badge
                                        variant={
                                          latestAudit.score >= 80
                                            ? "default"
                                            : latestAudit.score >= 60
                                              ? "secondary"
                                              : "destructive"
                                        }
                                      >
                                        {latestAudit.score}/100
                                      </Badge>
                                      {latestAudit.score >= 80 ? (
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                      ) : latestAudit.score >= 60 ? (
                                        <Clock className="w-4 h-4 text-yellow-600" />
                                      ) : (
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                      )}
                                    </>
                                  ) : (
                                    <Badge variant="outline">No audit</Badge>
                                  )}
                                </div>
                              </div>
                            )
                          })}

                          <Link href="/clients">
                            <Button variant="outline" className="w-full mt-4 bg-transparent">
                              View All Clients
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-semibold text-foreground mb-2">No clients yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Add your first client to get started with MTS Marketing Suite.
                          </p>
                          <Link href="/clients">
                            <Button>Add First Client</Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
