"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { PageSpeedResult } from "@/lib/pagespeed-api"

interface PageSpeedScoreCardProps {
  audit: PageSpeedResult
  showDetails?: boolean
}

export function PageSpeedScoreCard({ audit, showDetails = false }: PageSpeedScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const metrics = [
    { name: "Performance", score: audit.metrics.performance, key: "performance" },
    { name: "Accessibility", score: audit.metrics.accessibility, key: "accessibility" },
    { name: "Best Practices", score: audit.metrics.bestPractices, key: "bestPractices" },
    { name: "SEO", score: audit.metrics.seo, key: "seo" },
    { name: "PWA", score: audit.metrics.pwa, key: "pwa" },
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-montserrat">{audit.domain}</CardTitle>
            <CardDescription>Analyzed {new Date(audit.timestamp).toLocaleDateString()}</CardDescription>
          </div>
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${getScoreBg(audit.overallScore)}`}
            >
              {audit.overallScore}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Overall</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showDetails ? (
          <div className="space-y-4">
            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 gap-3">
              {metrics.map((metric) => (
                <div key={metric.key} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20">
                      <Progress
                        value={metric.score}
                        className="h-2"
                        style={{
                          background: `linear-gradient(to right, ${getProgressColor(metric.score)} 0%, ${getProgressColor(metric.score)} ${metric.score}%, #e5e7eb ${metric.score}%, #e5e7eb 100%)`,
                        }}
                      />
                    </div>
                    <span className={`text-sm font-semibold w-8 ${getScoreColor(metric.score)}`}>{metric.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Web Vitals */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3">Core Web Vitals</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-muted-foreground">LCP</p>
                  <p className="font-semibold">{(audit.coreWebVitals.lcp / 1000).toFixed(1)}s</p>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-muted-foreground">FID</p>
                  <p className="font-semibold">{audit.coreWebVitals.fid.toFixed(0)}ms</p>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-muted-foreground">CLS</p>
                  <p className="font-semibold">{audit.coreWebVitals.cls.toFixed(3)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Compact View */
          <div className="flex justify-between items-center">
            {metrics.slice(0, 4).map((metric) => (
              <div key={metric.key} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${getScoreBg(metric.score)}`}
                >
                  {metric.score}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.name.slice(0, 4)}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
