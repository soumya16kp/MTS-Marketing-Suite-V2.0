"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { PageSpeedAudit, PageSpeedResult } from "@/lib/pagespeed-api"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  Search,
  Accessibility,
  Smartphone,
} from "lucide-react"

interface AuditIssuesListProps {
  audit: PageSpeedResult
  showOnlyIssues?: boolean
}

export function AuditIssuesList({ audit, showOnlyIssues = false }: AuditIssuesListProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getScoreIcon = (score: number | null) => {
    if (score === null) return <Clock className="w-4 h-4 text-gray-500" />
    if (score >= 0.9) return <CheckCircle className="w-4 h-4 text-green-600" />
    if (score >= 0.5) return <Clock className="w-4 h-4 text-yellow-600" />
    return <AlertTriangle className="w-4 h-4 text-red-600" />
  }

  const getScoreBadge = (score: number | null) => {
    if (score === null) return "bg-gray-100 text-gray-800"
    if (score >= 0.9) return "bg-green-100 text-green-800"
    if (score >= 0.5) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getScoreText = (score: number | null) => {
    if (score === null) return "N/A"
    return Math.round(score * 100).toString()
  }

  const getCategoryIcon = (auditId: string) => {
    if (
      auditId.includes("performance") ||
      auditId.includes("paint") ||
      auditId.includes("speed") ||
      auditId.includes("blocking") ||
      auditId.includes("unused") ||
      auditId.includes("minified")
    ) {
      return <Zap className="w-4 h-4 text-orange-600" />
    }
    if (
      auditId.includes("accessibility") ||
      auditId.includes("color-contrast") ||
      auditId.includes("alt") ||
      auditId.includes("heading")
    ) {
      return <Accessibility className="w-4 h-4 text-blue-600" />
    }
    if (
      auditId.includes("seo") ||
      auditId.includes("meta") ||
      auditId.includes("title") ||
      auditId.includes("link-text")
    ) {
      return <Search className="w-4 h-4 text-green-600" />
    }
    if (auditId.includes("best-practices") || auditId.includes("https") || auditId.includes("security")) {
      return <Shield className="w-4 h-4 text-purple-600" />
    }
    return <Smartphone className="w-4 h-4 text-gray-600" />
  }

  const getRecommendation = (auditId: string, displayValue?: string) => {
    const recommendations: Record<string, string> = {
      "first-contentful-paint":
        "Optimize images, minimize CSS/JS, use a CDN, and enable compression to improve loading speed.",
      "largest-contentful-paint":
        "Optimize your largest image or text block. Consider lazy loading, image optimization, and server response times.",
      "speed-index":
        "Prioritize visible content loading. Minimize render-blocking resources and optimize critical rendering path.",
      "cumulative-layout-shift":
        "Set explicit dimensions for images and ads. Avoid inserting content above existing content.",
      "total-blocking-time": "Reduce JavaScript execution time. Split large tasks and defer non-critical JavaScript.",
      "server-response-time":
        "Optimize server performance, use caching, CDN, and consider upgrading hosting infrastructure.",
      "render-blocking-resources":
        "Inline critical CSS, defer non-critical CSS, and minimize render-blocking JavaScript.",
      "unused-css-rules": "Remove unused CSS to reduce file size and improve loading performance.",
      "unused-javascript": "Remove or defer unused JavaScript code to reduce bundle size and improve performance.",
      "modern-image-formats":
        "Use WebP or AVIF formats for better compression. Implement responsive images with srcset.",
      "efficiently-encode-images":
        "Compress images without losing quality. Use tools like ImageOptim or online compressors.",
      "offscreen-images": "Implement lazy loading for images below the fold to improve initial page load time.",
      "unminified-css": "Minify CSS files to reduce file size and improve loading speed.",
      "unminified-javascript": "Minify JavaScript files to reduce bundle size and improve performance.",
      "font-display": "Use font-display: swap to prevent invisible text during font load.",
      "meta-description": "Add a compelling meta description (150-160 characters) to improve search engine visibility.",
      "document-title": "Ensure each page has a unique, descriptive title tag for better SEO.",
      "link-text": "Use descriptive link text that clearly indicates the destination or purpose.",
      "image-alt": "Add descriptive alt text to all images for better accessibility and SEO.",
      "heading-order": "Use heading tags (h1-h6) in logical order to improve content structure and accessibility.",
      "color-contrast": "Ensure sufficient color contrast (4.5:1 for normal text) for better accessibility.",
    }

    return recommendations[auditId] || "Review this item and implement best practices to improve your score."
  }

  const getPriorityLevel = (score: number | null) => {
    if (score === null) return "info"
    if (score < 0.5) return "high"
    if (score < 0.9) return "medium"
    return "low"
  }

  // Filter audits based on showOnlyIssues flag
  const filteredAudits = showOnlyIssues
    ? audit.audits.filter((item) => item.score !== null && item.score < 0.9)
    : audit.audits

  // Group audits by category
  const groupedAudits = filteredAudits.reduce(
    (groups, item) => {
      let category = "Other"
      if (
        item.id.includes("paint") ||
        item.id.includes("speed") ||
        item.id.includes("blocking") ||
        item.id.includes("unused") ||
        item.id.includes("minified") ||
        item.id.includes("font")
      ) {
        category = "Performance"
      } else if (
        item.id.includes("accessibility") ||
        item.id.includes("color-contrast") ||
        item.id.includes("alt") ||
        item.id.includes("heading")
      ) {
        category = "Accessibility"
      } else if (item.id.includes("meta") || item.id.includes("title") || item.id.includes("link-text")) {
        category = "SEO"
      } else if (item.id.includes("https") || item.id.includes("security")) {
        category = "Security"
      }

      if (!groups[category]) groups[category] = []
      groups[category].push(item)
      return groups
    },
    {} as Record<string, PageSpeedAudit[]>,
  )

  const categoryColors = {
    Performance: "border-l-orange-500",
    Accessibility: "border-l-blue-500",
    SEO: "border-l-green-500",
    Security: "border-l-purple-500",
    Other: "border-l-gray-500",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          {showOnlyIssues ? "Issues & Recommendations" : "Audit Results"}
        </CardTitle>
        <CardDescription>
          {showOnlyIssues
            ? `${filteredAudits.length} items need attention`
            : `${filteredAudits.length} audit items analyzed`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedAudits).map(([category, items]) => (
          <div key={category} className="mb-6 last:mb-0">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              {category === "Performance" && <Zap className="w-5 h-5 text-orange-600" />}
              {category === "Accessibility" && <Accessibility className="w-5 h-5 text-blue-600" />}
              {category === "SEO" && <Search className="w-5 h-5 text-green-600" />}
              {category === "Security" && <Shield className="w-5 h-5 text-purple-600" />}
              {category === "Other" && <Smartphone className="w-5 h-5 text-gray-600" />}
              {category}
              <Badge variant="outline" className="ml-auto">
                {items.length} items
              </Badge>
            </h3>

            <div className="space-y-3">
              {items.map((item) => {
                const isExpanded = expandedItems.has(item.id)
                const priority = getPriorityLevel(item.score)

                return (
                  <Collapsible key={item.id}>
                    <div className={`border-l-4 ${categoryColors[category]} bg-card rounded-lg border border-border`}>
                      <CollapsibleTrigger
                        className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                        onClick={() => toggleExpanded(item.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getScoreIcon(item.score)}
                            <div>
                              <h4 className="font-medium text-foreground">{item.title}</h4>
                              {item.displayValue && (
                                <p className="text-sm text-muted-foreground">{item.displayValue}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getScoreBadge(item.score)}>{getScoreText(item.score)}</Badge>
                            {priority === "high" && (
                              <Badge variant="destructive" className="text-xs">
                                High Priority
                              </Badge>
                            )}
                            {priority === "medium" && (
                              <Badge variant="secondary" className="text-xs">
                                Medium Priority
                              </Badge>
                            )}
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="px-4 pb-4 border-t bg-muted/20">
                          <div className="pt-3 space-y-3">
                            <div>
                              <h5 className="font-medium text-sm text-foreground mb-1">Description</h5>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>

                            <div>
                              <h5 className="font-medium text-sm text-foreground mb-1">Recommendation</h5>
                              <p className="text-sm text-muted-foreground">
                                {getRecommendation(item.id, item.displayValue)}
                              </p>
                            </div>

                            {item.score !== null && item.score < 0.9 && (
                              <div className="flex items-center gap-2 pt-2">
                                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                  Learn More
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                  Mark as Fixed
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                )
              })}
            </div>
          </div>
        ))}

        {filteredAudits.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              {showOnlyIssues ? "No Issues Found!" : "No Audit Data"}
            </h3>
            <p className="text-muted-foreground">
              {showOnlyIssues
                ? "Great job! Your website is performing well across all metrics."
                : "Run an audit to see detailed performance analysis."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
