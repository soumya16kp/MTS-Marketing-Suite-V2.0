"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  BarChart3,
  Smartphone,
  Shield,
  Zap,
  Eye,
  FileText,
  TrendingUp,
} from "lucide-react"
import { storage, type Client } from "@/lib/storage"
import { generateSEOAudit, getCategoryColor, getSeverityColor, type SEOAuditResult } from "@/lib/seo-audit"

interface SEOAuditToolProps {
  client: Client
  onAuditCompleted: () => void
}

const auditSteps = [
  "Analyzing page structure and HTML...",
  "Checking meta tags and content...",
  "Evaluating page speed and performance...",
  "Scanning for broken links and errors...",
  "Reviewing mobile usability...",
  "Analyzing security and best practices...",
  "Generating comprehensive report...",
]

export function SEOAuditTool({ client, onAuditCompleted }: SEOAuditToolProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null)
  const [domain, setDomain] = useState(client.domain)

  const runAudit = async () => {
    setIsRunning(true)
    setProgress(0)
    setAuditResult(null)

    // Simulate audit progress with steps
    for (let i = 0; i < auditSteps.length; i++) {
      setCurrentStep(auditSteps[i])
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(((i + 1) / auditSteps.length) * 100)
    }

    // Generate audit result
    const result = await generateSEOAudit(domain, client.id)

    // Save audit to storage
    const existingAudits = storage.getSEOAudits()
    const newAudit = {
      id: result.id,
      clientId: result.clientId,
      score: result.score,
      issues: result.issues.map((issue) => ({
        id: issue.id,
        title: issue.title,
        severity: issue.severity,
        suggestion: issue.suggestion,
      })),
      performedAt: result.performedAt,
    }

    storage.setSEOAudits([...existingAudits, newAudit])

    setAuditResult(result)
    setIsRunning(false)
    setCurrentStep("")
    onAuditCompleted()
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "pageSpeed":
        return <Zap className="w-4 h-4" />
      case "mobileUsability":
        return <Smartphone className="w-4 h-4" />
      case "seoOptimization":
        return <Search className="w-4 h-4" />
      case "accessibility":
        return <Eye className="w-4 h-4" />
      case "bestPractices":
        return <Shield className="w-4 h-4" />
      default:
        return <BarChart3 className="w-4 h-4" />
    }
  }

  const getMetricName = (metric: string) => {
    switch (metric) {
      case "pageSpeed":
        return "Page Speed"
      case "mobileUsability":
        return "Mobile Usability"
      case "seoOptimization":
        return "SEO Optimization"
      case "accessibility":
        return "Accessibility"
      case "bestPractices":
        return "Best Practices"
      default:
        return metric
    }
  }

  return (
    <div className="space-y-6">
      {/* Audit Tool Header */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-montserrat font-bold flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Advanced SEO Audit Tool
          </CardTitle>
          <CardDescription>
            Run a comprehensive SEO audit for {client.name} to identify optimization opportunities and track performance
            metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain to audit"
                  className="pl-10 h-11"
                  disabled={isRunning}
                />
              </div>
            </div>
            <Button onClick={runAudit} disabled={isRunning || !domain.trim()} size="lg">
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Audit...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Run SEO Audit
                </>
              )}
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Audit Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Results */}
      {auditResult && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-montserrat font-bold">Audit Results</CardTitle>
                  <CardDescription>
                    Completed on {new Date(auditResult.performedAt).toLocaleDateString()} for {auditResult.domain}
                  </CardDescription>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(auditResult.score)}`}>{auditResult.score}</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Alert>
                <TrendingUp className="w-4 h-4" />
                <AlertDescription>
                  {auditResult.score >= 80
                    ? "Excellent! Your website has strong SEO fundamentals with minimal issues to address."
                    : auditResult.score >= 60
                      ? "Good foundation with some areas for improvement. Address the issues below to boost your rankings."
                      : "Significant SEO issues detected. Prioritize fixing high-severity issues for better search performance."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Tabs defaultValue="metrics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="issues">Issues ({auditResult.issues.length})</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="report">Generate Report</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
                  <CardDescription>Detailed breakdown of your website's SEO performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(auditResult.metrics).map(([key, value]) => (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getMetricIcon(key)}
                            <span className="font-medium">{getMetricName(key)}</span>
                          </div>
                          <Badge variant={value >= 80 ? "default" : value >= 60 ? "secondary" : "destructive"}>
                            {value}/100
                          </Badge>
                        </div>
                        <Progress value={value} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {value >= 80
                            ? "Excellent performance"
                            : value >= 60
                              ? "Good, room for improvement"
                              : "Needs attention"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issues">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Issues Found ({auditResult.issues.length})</CardTitle>
                  <CardDescription>Prioritized list of SEO issues to address</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditResult.issues
                      .sort((a, b) => {
                        const severityOrder = { high: 3, medium: 2, low: 1 }
                        return severityOrder[b.severity] - severityOrder[a.severity]
                      })
                      .map((issue) => (
                        <Card key={issue.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground mb-1">{issue.title}</h4>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                                    {issue.severity} priority
                                  </Badge>
                                  <Badge variant="outline" className={getCategoryColor(issue.category)}>
                                    {issue.category}
                                  </Badge>
                                </div>
                              </div>
                              {issue.severity === "high" ? (
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              ) : issue.severity === "medium" ? (
                                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                              )}
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                <strong>Recommendation:</strong> {issue.suggestion}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Impact:</strong> {issue.impact}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Action Recommendations</CardTitle>
                  <CardDescription>Strategic recommendations to improve your SEO performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditResult.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{recommendation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 border-2 border-dashed border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Next Steps</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>1. Address high-priority issues first</li>
                      <li>2. Implement technical improvements</li>
                      <li>3. Monitor performance changes</li>
                      <li>4. Schedule regular audits</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="report">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Generate White-Label Report</CardTitle>
                  <CardDescription>Create a professional PDF report for your client</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Professional SEO Report</h3>
                    <p className="text-muted-foreground mb-6">
                      Generate a comprehensive white-label PDF report with your branding that you can deliver to{" "}
                      {client.name}.
                    </p>
                    <Button size="lg">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate PDF Report
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Report Includes:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Executive summary</li>
                        <li>• Overall SEO score</li>
                        <li>• Detailed issue breakdown</li>
                        <li>• Performance metrics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Professional Features:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Your agency branding</li>
                        <li>• Client-specific recommendations</li>
                        <li>• Visual charts and graphs</li>
                        <li>• Action plan timeline</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button onClick={runAudit} variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Run New Audit
                </Button>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Track Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
