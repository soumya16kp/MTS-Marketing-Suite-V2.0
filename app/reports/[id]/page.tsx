"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { PDFGenerator } from "@/components/pdf-generator"
import { getReports, getClients } from "@/lib/storage"
import { ArrowLeft, FileText, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ReportDetailPage() {
  const params = useParams()
  const [report, setReport] = useState<any>(null)
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReport = () => {
      const reports = getReports()
      const clients = getClients()

      const foundReport = reports.find((r) => r.id === params.id)
      if (foundReport) {
        const foundClient = clients.find((c) => c.id === foundReport.clientId)
        setReport(foundReport)
        setClient(foundClient)
      }
      setLoading(false)
    }

    loadReport()
  }, [params.id])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!report || !client) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 p-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Report Not Found</h1>
            <p className="text-gray-600 mb-6">The report you're looking for doesn't exist.</p>
            <Link href="/reports">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reports
              </Button>
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link href="/reports">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reports
              </Button>
            </Link>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{report.title}</h1>
                <p className="text-gray-600">Generated on {new Date(report.generatedDate).toLocaleDateString()}</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">{report.type.replace("-", " ").toUpperCase()}</Badge>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Summary</CardTitle>
                      <CardDescription>Key performance indicators and overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-2">{report.metrics.score}</div>
                          <div className="text-sm text-gray-500">Overall Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 mb-2">+{report.metrics.improvement}%</div>
                          <div className="text-sm text-gray-500">Improvement</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600 mb-2">{report.metrics.issues}</div>
                          <div className="text-sm text-gray-500">Issues Found</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Company:</span>
                          <p className="text-gray-600">{client.name}</p>
                        </div>
                        <div>
                          <span className="font-medium">Website:</span>
                          <p className="text-gray-600">{client.domain}</p>
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>
                          <p className="text-gray-600">{client.email}</p>
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>
                          <p className="text-gray-600">{client.phone || "N/A"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { label: "Page Speed Score", value: 85, color: "bg-green-500" },
                          { label: "SEO Optimization", value: report.metrics.score, color: "bg-purple-500" },
                          { label: "Mobile Friendliness", value: 92, color: "bg-blue-500" },
                          { label: "Accessibility", value: 78, color: "bg-orange-500" },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{metric.label}</span>
                              <span className="text-gray-600">{metric.value}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${metric.color}`}
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="issues" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Issues Found
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            severity: "high",
                            title: "Slow page load speed",
                            description: "Pages are loading slower than recommended",
                          },
                          {
                            severity: "medium",
                            title: "Missing meta descriptions",
                            description: "Several pages lack meta descriptions",
                          },
                          {
                            severity: "low",
                            title: "Image alt text missing",
                            description: "Some images need alt text for accessibility",
                          },
                        ].map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                            <div
                              className={`w-3 h-3 rounded-full mt-1 ${
                                issue.severity === "high"
                                  ? "bg-red-500"
                                  : issue.severity === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <h4 className="font-medium">{issue.title}</h4>
                              <p className="text-sm text-gray-600">{issue.description}</p>
                              <Badge variant="outline" className="mt-2">
                                {issue.severity.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          "Optimize images and enable compression to improve loading speeds",
                          "Add compelling meta descriptions to all pages",
                          "Implement structured data markup for better search visibility",
                          "Improve mobile responsiveness and touch targets",
                          "Enhance internal linking structure",
                        ].map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <p className="text-gray-700">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <PDFGenerator reportData={report} />

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Client Profile
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Run New Audit
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Schedule Follow-up
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
