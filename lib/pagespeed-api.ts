// Google PageSpeed Insights API integration
export interface PageSpeedMetrics {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  pwa: number
}

export interface CoreWebVitals {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
}

export interface PageSpeedAudit {
  id: string
  title: string
  description: string
  score: number | null
  scoreDisplayMode: string
  displayValue?: string
}

export interface PageSpeedResult {
  id: string
  domain: string
  url: string
  timestamp: number
  screenshot: string // base64 string
  metrics: PageSpeedMetrics
  coreWebVitals: CoreWebVitals
  audits: PageSpeedAudit[]
  overallScore: number
}

export class PageSpeedAPI {
  private apiKey: string
  private baseUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async analyzeUrl(url: string, strategy: "mobile" | "desktop" = "mobile"): Promise<PageSpeedResult> {
    try {
      // Ensure URL has protocol
      const fullUrl = url.startsWith("http") ? url : `https://${url}`

      const params = new URLSearchParams({
        url: fullUrl,
        key: this.apiKey,
        strategy,
        category: "performance,accessibility,best-practices,seo,pwa",
      })

      const response = await fetch(`${this.baseUrl}?${params}`)

      if (!response.ok) {
        throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      return this.parsePageSpeedResponse(data, url)
    } catch (error) {
      console.error("PageSpeed API error:", error)
      throw error
    }
  }

  private parsePageSpeedResponse(data: any, originalUrl: string): PageSpeedResult {
    const lighthouseResult = data.lighthouseResult
    const categories = lighthouseResult.categories
    const audits = lighthouseResult.audits

    // Extract Lighthouse category scores
    const metrics: PageSpeedMetrics = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      pwa: Math.round((categories.pwa?.score || 0) * 100),
    }

    // Extract Core Web Vitals
    const coreWebVitals: CoreWebVitals = {
      lcp: audits["largest-contentful-paint"]?.numericValue || 0,
      fid: audits["max-potential-fid"]?.numericValue || 0,
      cls: audits["cumulative-layout-shift"]?.numericValue || 0,
    }

    // Extract screenshot
    const screenshot = lighthouseResult.audits["final-screenshot"]?.details?.data || ""

    // Extract important audits for issues list
    const importantAudits: PageSpeedAudit[] = []
    const auditKeys = [
      "first-contentful-paint",
      "largest-contentful-paint",
      "speed-index",
      "cumulative-layout-shift",
      "total-blocking-time",
      "server-response-time",
      "render-blocking-resources",
      "unused-css-rules",
      "unused-javascript",
      "modern-image-formats",
      "efficiently-encode-images",
      "offscreen-images",
      "unminified-css",
      "unminified-javascript",
      "font-display",
      "meta-description",
      "document-title",
      "link-text",
      "image-alt",
      "heading-order",
      "color-contrast",
    ]

    auditKeys.forEach((key) => {
      const audit = audits[key]
      if (audit) {
        importantAudits.push({
          id: key,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          scoreDisplayMode: audit.scoreDisplayMode,
          displayValue: audit.displayValue,
        })
      }
    })

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      (metrics.performance * 0.3 + metrics.accessibility * 0.2 + metrics.bestPractices * 0.2 + metrics.seo * 0.3) / 1,
    )

    return {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      domain: this.extractDomain(originalUrl),
      url: originalUrl,
      timestamp: Date.now(),
      screenshot,
      metrics,
      coreWebVitals,
      audits: importantAudits,
      overallScore,
    }
  }

  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)
      return urlObj.hostname.replace("www.", "")
    } catch {
      return url
        .replace(/^https?:\/\//, "")
        .replace("www.", "")
        .split("/")[0]
    }
  }
}

// Storage utilities for PageSpeed results
export const pageSpeedStorage = {
  getAudits(): PageSpeedResult[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("seoAudits")
    return stored ? JSON.parse(stored) : []
  },

  saveAudit(audit: PageSpeedResult): void {
    if (typeof window === "undefined") return
    const audits = this.getAudits()
    audits.push(audit)
    localStorage.setItem("seoAudits", JSON.stringify(audits))
  },

  getAuditsByDomain(domain: string): PageSpeedResult[] {
    return this.getAudits().filter((audit) => audit.domain === domain)
  },

  deleteAudit(id: string): void {
    if (typeof window === "undefined") return
    const audits = this.getAudits().filter((audit) => audit.id !== id)
    localStorage.setItem("seoAudits", JSON.stringify(audits))
  },
}
