"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageSpeedScoreCard } from "@/components/pagespeed-score-card"
import { type PageSpeedResult, pageSpeedStorage } from "@/lib/pagespeed-api"
import { TrendingUp, Search, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function DashboardMetrics() {
  const [pageSpeedAudits, setPageSpeedAudits] = useState<PageSpeedResult[]>([])

  useEffect(() => {
    setPageSpeedAudits(pageSpeedStorage.getAudits())
  }, [])

  // Calculate PageSpeed metrics
  const totalAudits = pageSpeedAudits.length
  const averageScore =
    totalAudits > 0 ? Math.round(pageSpeedAudits.reduce((sum, audit) => sum + audit.overallScore, 0) / totalAudits) : 0

  const performanceAvg =
    totalAudits > 0
      ? Math.round(pageSpeedAudits.reduce((sum, audit) => sum + audit.metrics.performance, 0) / totalAudits)
      : 0

  const seoAvg =
    totalAudits > 0 ? Math.round(pageSpeedAudits.reduce((sum, audit) => sum + audit.metrics.seo, 0) / totalAudits) : 0

  const recentAudits = pageSpeedAudits.slice(-3).reverse()
  const issuesCount = pageSpeedAudits.reduce((count, audit) => {
    return count + audit.audits.filter((a) => a.score !== null && a.score < 0.9).length
  }, 0)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      {/* PageSpeed Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Audits</p>
                <p className="text-2xl font-bold text-foreground">{totalAudits}</p>
                <div className="flex items-center mt-2">
                  <Badge variant="default" className="text-xs">
                    +{Math.max(0, totalAudits - 5)} this month
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}/100</p>
                <div className="flex items-center mt-2">
                  <Badge className={getScoreBadge(averageScore)}>
                    {averageScore >= 90 ? "Excellent" : averageScore >= 50 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Performance</p>
                <p className={`text-2xl font-bold ${getScoreColor(performanceAvg)}`}>{performanceAvg}/100</p>
                <div className="flex items-center mt-2">
                  <Badge className={getScoreBadge(performanceAvg)}>Avg Performance</Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Issues Found</p>
                <p className="text-2xl font-bold text-foreground">{issuesCount}</p>
                <div className="flex items-center mt-2">
                  <Badge variant={issuesCount > 10 ? "destructive" : "secondary"} className="text-xs">
                    {issuesCount > 10 ? "High Priority" : "Manageable"}
                  </Badge>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      {recentAudits.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-montserrat font-bold">Recent PageSpeed Audits</CardTitle>
                <CardDescription>Latest website performance analysis</CardDescription>
              </div>
              <Link href="/seo-audit">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All Audits
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentAudits.map((audit) => (
                <PageSpeedScoreCard key={audit.id} audit={audit} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Audits State */}
      {totalAudits === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No PageSpeed Audits Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start analyzing your websites with Google PageSpeed Insights to track performance metrics.
            </p>
            <Link href="/seo-audit">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-green-600">
                <Search className="w-4 h-4 mr-2" />
                Run First Audit
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
