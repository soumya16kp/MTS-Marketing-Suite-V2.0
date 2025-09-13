"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageSpeedScoreCard } from "@/components/pagespeed-score-card"
import { AuditIssuesList } from "@/components/audit-issues-list"
import { type PageSpeedResult, pageSpeedStorage } from "@/lib/pagespeed-api"
import { Globe, TrendingUp, Download, RefreshCw, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"

interface ClientDetailViewProps {
  clientId: string
  clientName: string
  clientDomain: string
}

export function ClientDetailView({ clientId, clientName, clientDomain }: ClientDetailViewProps) {
  const [audits, setAudits] = useState<PageSpeedResult[]>([])
  const [selectedAudit, setSelectedAudit] = useState<PageSpeedResult | null>(null)

  useEffect(() => {
    // Get audits for this client's domain
    const clientAudits = pageSpeedStorage.getAuditsByDomain(clientDomain)
    setAudits(clientAudits.sort((a, b) => b.timestamp - a.timestamp))
    if (clientAudits.length > 0) {
      setSelectedAudit(clientAudits[0]) // Select most recent audit
    }
  }, [clientDomain])

  const latestAudit = audits[0]
  const previousAudit = audits[1]

  const getScoreChange = () => {
    if (!latestAudit || !previousAudit) return null
    return latestAudit.overallScore - previousAudit.overallScore
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const scoreChange = getScoreChange()

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-montserrat">{clientName}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {clientDomain}
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <RefreshCw className="w-4 h-4 mr-2" />
                New Audit
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Overview */}
      {latestAudit && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Overall Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(latestAudit.overallScore)}`}>
                    {latestAudit.overallScore}/100
                  </p>
                  {scoreChange !== null && (
                    <div className="flex items-center mt-2">
                      <Badge variant={scoreChange >= 0 ? "default" : "destructive"} className="text-xs">
                        {scoreChange >= 0 ? "+" : ""}
                        {scoreChange}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">vs previous</span>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Performance</p>
                  <p className={`text-2xl font-bold ${getScoreColor(latestAudit.metrics.performance)}`}>
                    {latestAudit.metrics.performance}/100
                  </p>
                  <Badge
                    className="text-xs mt-2"
                    variant={latestAudit.metrics.performance >= 90 ? "default" : "secondary"}
                  >
                    {latestAudit.metrics.performance >= 90
                      ? "Excellent"
                      : latestAudit.metrics.performance >= 50
                        ? "Good"
                        : "Poor"}
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">SEO Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(latestAudit.metrics.seo)}`}>
                    {latestAudit.metrics.seo}/100
                  </p>
                  <Badge className="text-xs mt-2" variant={latestAudit.metrics.seo >= 90 ? "default" : "secondary"}>
                    {latestAudit.metrics.seo >= 90 ? "Optimized" : "Needs Work"}
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Issues Found</p>
                  <p className="text-2xl font-bold text-foreground">
                    {latestAudit.audits.filter((a) => a.score !== null && a.score < 0.9).length}
                  </p>
                  <Badge className="text-xs mt-2" variant="secondary">
                    Action Items
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Analysis */}
      {audits.length > 0 ? (
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Analysis</TabsTrigger>
            <TabsTrigger value="issues">Issues & Fixes</TabsTrigger>
            <TabsTrigger value="history">Audit History</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {selectedAudit && (
              <div className="grid lg:grid-cols-2 gap-6">
                <PageSpeedScoreCard audit={selectedAudit} showDetails={true} />
                <div className="space-y-4">
                  {selectedAudit.screenshot && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Website Screenshot</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={selectedAudit.screenshot || "/placeholder.svg"}
                          alt={`Screenshot of ${selectedAudit.domain}`}
                          className="w-full border rounded-lg shadow-sm"
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            {selectedAudit && <AuditIssuesList audit={selectedAudit} showOnlyIssues={true} />}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {audits.map((audit) => (
                <div
                  key={audit.id}
                  className={`cursor-pointer transition-all ${
                    selectedAudit?.id === audit.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedAudit(audit)}
                >
                  <PageSpeedScoreCard audit={audit} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Track improvements over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Performance trends chart will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Run multiple audits to see performance trends over time
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Audits Yet</h3>
            <p className="text-muted-foreground mb-6">
              Run your first PageSpeed audit for {clientName} to see detailed performance analysis.
            </p>
            <Button size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run First Audit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
