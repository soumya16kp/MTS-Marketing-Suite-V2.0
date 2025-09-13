"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { getClients, getReports, generateReport } from "@/lib/storage"
import { FileText, Download, Calendar, Search, Plus } from "lucide-react"
import { NavbarMain } from "@/components/navbar-main"
import { NavbarTop } from "@/components/navbar-top"

interface Report {
  id: string
  clientId: string
  clientName: string
  type: "seo-audit" | "performance" | "roi-analysis" | "monthly-summary"
  title: string
  generatedDate: string
  status: "completed" | "generating" | "scheduled"
  metrics: {
    score: number
    improvement: number
    issues: number
  }
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const loadData = () => {
      const clientsData = getClients()
      const reportsData = getReports()
      setClients(clientsData)
      setReports(reportsData)
    }
    loadData()
  }, [])

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || report.type === filterType
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleGenerateReport = async (clientId: string, type: string) => {
    setIsGenerating(true)
    try {
      const client = clients.find((c) => c.id === clientId)
      if (client) {
        const report = generateReport(clientId, client.name, type as any)
        setReports((prev) => [report, ...prev])
      }
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "seo-audit":
        return "bg-purple-100 text-purple-800"
      case "performance":
        return "bg-blue-100 text-blue-800"
      case "roi-analysis":
        return "bg-green-100 text-green-800"
      case "monthly-summary":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ProtectedRoute>
      <NavbarMain />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports Center</h1>
            <p className="text-gray-600">Generate, manage, and download comprehensive client reports</p>
          </motion.div>

          <Tabs defaultValue="all-reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all-reports">All Reports</TabsTrigger>
              <TabsTrigger value="generate">Generate New</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="all-reports" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search reports..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="seo-audit">SEO Audit</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="roi-analysis">ROI Analysis</SelectItem>
                        <SelectItem value="monthly-summary">Monthly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="generating">Generating</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Reports Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <Badge className={getTypeColor(report.type)}>
                              {report.type.replace("-", " ").toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                          </div>
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>{report.clientName}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-lg text-purple-600">{report.metrics.score}</div>
                              <div className="text-gray-500">Score</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-lg text-green-600">+{report.metrics.improvement}%</div>
                              <div className="text-gray-500">Improvement</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-lg text-orange-600">{report.metrics.issues}</div>
                              <div className="text-gray-500">Issues</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(report.generatedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <FileText className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredReports.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search or filters, or generate a new report.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="generate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate New Report</CardTitle>
                  <CardDescription>Create comprehensive reports for your clients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {clients.map((client) => (
                      <Card key={client.id} className="border-2 hover:border-purple-200 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <CardDescription>{client.website}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleGenerateReport(client.id, "seo-audit")}
                              disabled={isGenerating}
                            >
                              SEO Audit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGenerateReport(client.id, "performance")}
                              disabled={isGenerating}
                            >
                              Performance
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGenerateReport(client.id, "roi-analysis")}
                              disabled={isGenerating}
                            >
                              ROI Analysis
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGenerateReport(client.id, "monthly-summary")}
                              disabled={isGenerating}
                            >
                              Monthly Summary
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "SEO Audit Report",
                    description: "Comprehensive SEO analysis with recommendations",
                    features: ["Technical SEO", "Content Analysis", "Backlink Profile", "Competitor Analysis"],
                  },
                  {
                    name: "Performance Report",
                    description: "Website speed and performance metrics",
                    features: ["Page Speed", "Core Web Vitals", "Mobile Performance", "Optimization Tips"],
                  },
                  {
                    name: "ROI Analysis",
                    description: "Return on investment calculations and projections",
                    features: ["Revenue Impact", "Cost Analysis", "Conversion Tracking", "Growth Projections"],
                  },
                  {
                    name: "Monthly Summary",
                    description: "Comprehensive monthly performance overview",
                    features: ["Traffic Analysis", "Goal Tracking", "Key Metrics", "Action Items"],
                  },
                ].map((template, index) => (
                  <motion.div
                    key={template.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Includes:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {template.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Preview Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
