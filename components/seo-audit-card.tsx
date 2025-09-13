"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PageSpeedResult } from "@/lib/pagespeed-api"
import { Clock, Eye, Download, Trash2 } from "lucide-react"

interface SEOAuditCardProps {
  audit: PageSpeedResult
  onView?: (audit: PageSpeedResult) => void
  onDelete?: (id: string) => void
  onExport?: (audit: PageSpeedResult) => void
}

export function SEOAuditCard({ audit, onView, onDelete, onExport }: SEOAuditCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{audit.domain}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(audit.timestamp).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={getScoreColor(audit.overallScore)}>{audit.overallScore}/100</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mini Score Circles */}
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${getScoreBgColor(audit.metrics.performance)}`}
            >
              {audit.metrics.performance}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Perf</p>
          </div>
          <div className="text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${getScoreBgColor(audit.metrics.accessibility)}`}
            >
              {audit.metrics.accessibility}
            </div>
            <p className="text-xs text-muted-foreground mt-1">A11y</p>
          </div>
          <div className="text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${getScoreBgColor(audit.metrics.bestPractices)}`}
            >
              {audit.metrics.bestPractices}
            </div>
            <p className="text-xs text-muted-foreground mt-1">BP</p>
          </div>
          <div className="text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${getScoreBgColor(audit.metrics.seo)}`}
            >
              {audit.metrics.seo}
            </div>
            <p className="text-xs text-muted-foreground mt-1">SEO</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => onView?.(audit)}>
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" onClick={() => onExport?.(audit)}>
            <Download className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:text-red-700 bg-transparent"
            onClick={() => onDelete?.(audit.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
