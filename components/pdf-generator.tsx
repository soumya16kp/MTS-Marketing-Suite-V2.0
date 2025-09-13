"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Loader2 } from "lucide-react"

interface PDFGeneratorProps {
  reportData: {
    id: string
    clientName: string
    type: string
    title: string
    generatedDate: string
    metrics: {
      score: number
      improvement: number
      issues: number
    }
  }
}

export function PDFGenerator({ reportData }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create a simple PDF-like content
    const pdfContent = `
MTS Marketing Suite - ${reportData.title}
Generated: ${new Date(reportData.generatedDate).toLocaleDateString()}

CLIENT OVERVIEW
Client: ${reportData.clientName}
Report Type: ${reportData.type.replace("-", " ").toUpperCase()}

PERFORMANCE METRICS
Overall Score: ${reportData.metrics.score}/100
Improvement: +${reportData.metrics.improvement}%
Issues Found: ${reportData.metrics.issues}

EXECUTIVE SUMMARY
This comprehensive ${reportData.type.replace("-", " ")} report provides detailed insights into your digital marketing performance. Our analysis reveals significant opportunities for growth and optimization.

KEY FINDINGS
• Website performance shows strong potential for improvement
• SEO optimization opportunities identified
• Conversion rate optimization recommendations available
• Mobile responsiveness enhancements suggested

RECOMMENDATIONS
1. Implement technical SEO improvements
2. Optimize page loading speeds
3. Enhance mobile user experience
4. Improve content strategy
5. Strengthen social media presence

NEXT STEPS
Our team recommends implementing these changes over the next 30-60 days for optimal results. We'll continue monitoring progress and provide ongoing support.

Contact: MTS Marketing Suite
Email: support@mtsmarketing.com
Phone: +1 (555) 123-4567
    `

    // Create and download the file
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportData.clientName.replace(/\s+/g, "-").toLowerCase()}-${reportData.type}-report.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsGenerating(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          PDF Report Generator
        </CardTitle>
        <CardDescription>Generate and download a comprehensive PDF report</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Client:</span>
            <p className="text-gray-600">{reportData.clientName}</p>
          </div>
          <div>
            <span className="font-medium">Type:</span>
            <Badge variant="outline" className="ml-2">
              {reportData.type.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
          <div>
            <span className="font-medium">Score:</span>
            <p className="text-purple-600 font-semibold">{reportData.metrics.score}/100</p>
          </div>
          <div>
            <span className="font-medium">Generated:</span>
            <p className="text-gray-600">{new Date(reportData.generatedDate).toLocaleDateString()}</p>
          </div>
        </div>

        <Button onClick={generatePDF} disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
