"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search, Globe, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { PageSpeedAPI, type PageSpeedResult, pageSpeedStorage } from "@/lib/pagespeed-api"

interface PageSpeedAnalyzerProps {
  onAnalysisComplete?: (result: PageSpeedResult) => void
}

export function PageSpeedAnalyzer({ onAnalysisComplete }: PageSpeedAnalyzerProps) {
  const [domain, setDomain] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<PageSpeedResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain name")
      return
    }

    if (!apiKey.trim()) {
      setError("Please enter your Google PageSpeed Insights API key")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const api = new PageSpeedAPI(apiKey)
      const analysisResult = await api.analyzeUrl(domain)

      // Save to localStorage
      pageSpeedStorage.saveAudit(analysisResult)

      setResult(analysisResult)
      onAnalysisComplete?.(analysisResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze website")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 50) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4" />
    if (score >= 50) return <Clock className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            PageSpeed Insights Analyzer
          </CardTitle>
          <CardDescription>
            Enter a domain name and your Google PageSpeed Insights API key to analyze website performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="domain" className="text-sm font-medium">
              Domain Name
            </label>
            <Input
              id="domain"
              placeholder="e.g., noorclinic.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              Google PageSpeed Insights API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your free API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isAnalyzing}
            />
            <p className="text-xs text-muted-foreground">
              Get your free API key from{" "}
              <a
                href="https://developers.google.com/speed/docs/insights/v5/get-started"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleAnalyze} disabled={isAnalyzing || !domain.trim() || !apiKey.trim()} className="w-full">
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Website
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results for {result.domain}</CardTitle>
            <CardDescription>Analyzed on {new Date(result.timestamp).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getScoreColor(result.overallScore)}`}
              >
                {getScoreIcon(result.overallScore)}
                <span className="text-2xl font-bold">{result.overallScore}</span>
                <span className="text-sm font-medium">Overall Score</span>
              </div>
            </div>

            {/* Lighthouse Scores */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${getScoreColor(result.metrics.performance)}`}
                >
                  <span className="font-bold">{result.metrics.performance}</span>
                </div>
                <p className="text-sm font-medium mt-2">Performance</p>
              </div>
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${getScoreColor(result.metrics.accessibility)}`}
                >
                  <span className="font-bold">{result.metrics.accessibility}</span>
                </div>
                <p className="text-sm font-medium mt-2">Accessibility</p>
              </div>
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${getScoreColor(result.metrics.bestPractices)}`}
                >
                  <span className="font-bold">{result.metrics.bestPractices}</span>
                </div>
                <p className="text-sm font-medium mt-2">Best Practices</p>
              </div>
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${getScoreColor(result.metrics.seo)}`}
                >
                  <span className="font-bold">{result.metrics.seo}</span>
                </div>
                <p className="text-sm font-medium mt-2">SEO</p>
              </div>
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${getScoreColor(result.metrics.pwa)}`}
                >
                  <span className="font-bold">{result.metrics.pwa}</span>
                </div>
                <p className="text-sm font-medium mt-2">PWA</p>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div>
              <h3 className="font-semibold mb-3">Core Web Vitals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Largest Contentful Paint</p>
                  <p className="text-lg font-semibold">{(result.coreWebVitals.lcp / 1000).toFixed(2)}s</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">First Input Delay</p>
                  <p className="text-lg font-semibold">{result.coreWebVitals.fid.toFixed(0)}ms</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Cumulative Layout Shift</p>
                  <p className="text-lg font-semibold">{result.coreWebVitals.cls.toFixed(3)}</p>
                </div>
              </div>
            </div>

            {/* Screenshot */}
            {result.screenshot && (
              <div>
                <h3 className="font-semibold mb-3">Website Screenshot</h3>
                <img
                  src={result.screenshot || "/placeholder.svg"}
                  alt={`Screenshot of ${result.domain}`}
                  className="w-full max-w-md mx-auto border rounded-lg shadow-sm"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
