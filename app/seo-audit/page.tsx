"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { NavbarMain } from "@/components/navbar-main"
import { NavbarTopLayer } from "@/components/navbar-top-layer"
import { FloatingSocialBar } from "@/components/floating-social-bar"
import { ProtectedRoute } from "@/components/protected-route"
import { PageSpeedAnalyzer } from "@/components/pagespeed-analyzer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type PageSpeedResult, pageSpeedStorage } from "@/lib/pagespeed-api"
import { Search, Clock, Trash2, Eye, Download } from "lucide-react"

export default function SEOAuditPage() {
  const [audits, setAudits] = useState<PageSpeedResult[]>([])
  const [selectedAudit, setSelectedAudit] = useState<PageSpeedResult | null>(null)

  useEffect(() => {
    setAudits(pageSpeedStorage.getAudits())
  }, [])

  const handleAnalysisComplete = (result: PageSpeedResult) => {
    setAudits(pageSpeedStorage.getAudits())
    setSelectedAudit(result)
  }

  const handleDeleteAudit = (id: string) => {
    pageSpeedStorage.deleteAudit(id)
    setAudits(pageSpeedStorage.getAudits())
    if (selectedAudit?.id === id) {
      setSelectedAudit(null)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <NavbarTopLayer />
        <NavbarMain />
        <FloatingSocialBar />

        <main className="pt-26 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-montserrat font-bold">
                    SEO <span className="gradient-text">Audit Center</span>
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Analyze website performance with Google PageSpeed Insights
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Analyzer */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <PageSpeedAnalyzer onAnalysisComplete={handleAnalysisComplete} />
              </motion.div>

              {/* Audit History */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Audits</CardTitle>
                    <CardDescription>
                      {audits.length} audit{audits.length !== 1 ? "s" : ""} performed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {audits.length > 0 ? (
                      <div className="space-y-3">
                        {audits
                          .slice(-10)
                          .reverse()
                          .map((audit) => (
                            <div
                              key={audit.id}
                              className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => setSelectedAudit(audit)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm truncate">{audit.domain}</h4>
                                <Badge className={getScoreColor(audit.overallScore)}>{audit.overallScore}</Badge>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(audit.timestamp).toLocaleDateString()}
                                </span>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedAudit(audit)
                                    }}
                                  >
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteAudit(audit.id)
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No audits yet</p>
                        <p className="text-sm text-muted-foreground">Run your first audit to get started</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Selected Audit Details */}
            {selectedAudit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Detailed Analysis: {selectedAudit.domain}</CardTitle>
                        <CardDescription>
                          Analyzed on {new Date(selectedAudit.timestamp).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Export Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Performance Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className="text-center p-4 border rounded-lg">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
                            selectedAudit.metrics.performance >= 90
                              ? "bg-green-500"
                              : selectedAudit.metrics.performance >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {selectedAudit.metrics.performance}
                        </div>
                        <p className="text-sm font-medium mt-2">Performance</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
                            selectedAudit.metrics.accessibility >= 90
                              ? "bg-green-500"
                              : selectedAudit.metrics.accessibility >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {selectedAudit.metrics.accessibility}
                        </div>
                        <p className="text-sm font-medium mt-2">Accessibility</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
                            selectedAudit.metrics.bestPractices >= 90
                              ? "bg-green-500"
                              : selectedAudit.metrics.bestPractices >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {selectedAudit.metrics.bestPractices}
                        </div>
                        <p className="text-sm font-medium mt-2">Best Practices</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
                            selectedAudit.metrics.seo >= 90
                              ? "bg-green-500"
                              : selectedAudit.metrics.seo >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {selectedAudit.metrics.seo}
                        </div>
                        <p className="text-sm font-medium mt-2">SEO</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
                            selectedAudit.metrics.pwa >= 90
                              ? "bg-green-500"
                              : selectedAudit.metrics.pwa >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {selectedAudit.metrics.pwa}
                        </div>
                        <p className="text-sm font-medium mt-2">PWA</p>
                      </div>
                    </div>

                    {/* Core Web Vitals */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Core Web Vitals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Largest Contentful Paint</p>
                          <p className="text-2xl font-bold">{(selectedAudit.coreWebVitals.lcp / 1000).toFixed(2)}s</p>
                          <p className="text-xs text-muted-foreground">Good: ≤ 2.5s</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">First Input Delay</p>
                          <p className="text-2xl font-bold">{selectedAudit.coreWebVitals.fid.toFixed(0)}ms</p>
                          <p className="text-xs text-muted-foreground">Good: ≤ 100ms</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Cumulative Layout Shift</p>
                          <p className="text-2xl font-bold">{selectedAudit.coreWebVitals.cls.toFixed(3)}</p>
                          <p className="text-xs text-muted-foreground">Good: ≤ 0.1</p>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot */}
                    {selectedAudit.screenshot && (
                      <div>
                        <h3 className="font-semibold mb-3">Website Screenshot</h3>
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <img
                            src={selectedAudit.screenshot || "/placeholder.svg"}
                            alt={`Screenshot of ${selectedAudit.domain}`}
                            className="w-full max-w-md mx-auto border rounded shadow-sm"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
