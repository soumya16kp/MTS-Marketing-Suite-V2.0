// PDF Export functionality for PageSpeed audit reports
import type { PageSpeedResult } from "./pagespeed-api"

export interface ReportConfig {
  companyName: string
  companyLogo?: string
  brandColor: string
  includeScreenshot: boolean
  includeRecommendations: boolean
  includeExecutiveSummary: boolean
}

export class PDFReportGenerator {
  private config: ReportConfig

  constructor(config: ReportConfig) {
    this.config = config
  }

  async generateReport(audit: PageSpeedResult): Promise<Blob> {
    // Create HTML content for the PDF
    const htmlContent = this.generateHTMLReport(audit)

    // Convert HTML to PDF using browser's print functionality
    return this.htmlToPDF(htmlContent)
  }

  private generateHTMLReport(audit: PageSpeedResult): string {
    const reportDate = new Date(audit.timestamp).toLocaleDateString()
    const reportTime = new Date(audit.timestamp).toLocaleTimeString()

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>PageSpeed Audit Report - ${audit.domain}</title>
          <style>
            ${this.getReportStyles()}
          </style>
        </head>
        <body>
          ${this.generateHeader(audit)}
          ${this.config.includeExecutiveSummary ? this.generateExecutiveSummary(audit) : ""}
          ${this.generateScoreOverview(audit)}
          ${this.generateMetricsBreakdown(audit)}
          ${this.generateCoreWebVitals(audit)}
          ${this.config.includeRecommendations ? this.generateRecommendations(audit) : ""}
          ${this.config.includeScreenshot && audit.screenshot ? this.generateScreenshot(audit) : ""}
          ${this.generateFooter(reportDate, reportTime)}
        </body>
      </html>
    `
  }

  private getReportStyles(): string {
    return `
      @page {
        margin: 20mm;
        size: A4;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background: white;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 3px solid ${this.config.brandColor};
        margin-bottom: 30px;
      }
      
      .logo-section {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .company-name {
        font-size: 24px;
        font-weight: bold;
        color: ${this.config.brandColor};
      }
      
      .report-info {
        text-align: right;
        color: #666;
      }
      
      .report-title {
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        margin: 30px 0;
        color: #333;
      }
      
      .domain-info {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 4px solid ${this.config.brandColor};
      }
      
      .score-overview {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin: 30px 0;
      }
      
      .score-card {
        background: white;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .score-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px;
        font-size: 24px;
        font-weight: bold;
        color: white;
      }
      
      .score-excellent { background: #28a745; }
      .score-good { background: #ffc107; }
      .score-poor { background: #dc3545; }
      
      .score-label {
        font-weight: 600;
        color: #333;
      }
      
      .metrics-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .metrics-table th,
      .metrics-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      
      .metrics-table th {
        background: ${this.config.brandColor};
        color: white;
        font-weight: 600;
      }
      
      .metrics-table tr:nth-child(even) {
        background: #f8f9fa;
      }
      
      .section-title {
        font-size: 20px;
        font-weight: bold;
        margin: 30px 0 15px 0;
        color: #333;
        border-bottom: 2px solid ${this.config.brandColor};
        padding-bottom: 5px;
      }
      
      .recommendation-item {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 6px;
        padding: 15px;
        margin: 10px 0;
      }
      
      .recommendation-title {
        font-weight: 600;
        color: #856404;
        margin-bottom: 5px;
      }
      
      .recommendation-text {
        color: #856404;
        font-size: 14px;
      }
      
      .screenshot-section {
        text-align: center;
        margin: 30px 0;
      }
      
      .screenshot-img {
        max-width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      
      .footer {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        text-align: center;
        color: #666;
        font-size: 12px;
      }
      
      .executive-summary {
        background: #e3f2fd;
        border: 1px solid #bbdefb;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }
      
      .summary-score {
        font-size: 48px;
        font-weight: bold;
        text-align: center;
        margin: 10px 0;
      }
      
      .cwv-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 20px 0;
      }
      
      .cwv-item {
        text-align: center;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 6px;
      }
      
      .cwv-value {
        font-size: 24px;
        font-weight: bold;
        color: ${this.config.brandColor};
      }
      
      .cwv-label {
        font-size: 12px;
        color: #666;
        margin-top: 5px;
      }
      
      @media print {
        .page-break {
          page-break-before: always;
        }
      }
    `
  }

  private generateHeader(audit: PageSpeedResult): string {
    return `
      <div class="header">
        <div class="logo-section">
          ${this.config.companyLogo ? `<img src="${this.config.companyLogo}" alt="Logo" style="height: 40px;">` : ""}
          <div class="company-name">${this.config.companyName}</div>
        </div>
        <div class="report-info">
          <div><strong>PageSpeed Audit Report</strong></div>
          <div>Generated: ${new Date(audit.timestamp).toLocaleDateString()}</div>
        </div>
      </div>
      
      <h1 class="report-title">Website Performance Analysis</h1>
      
      <div class="domain-info">
        <h2 style="margin-bottom: 10px;">Website: ${audit.domain}</h2>
        <p><strong>URL:</strong> ${audit.url}</p>
        <p><strong>Analysis Date:</strong> ${new Date(audit.timestamp).toLocaleString()}</p>
        <p><strong>Overall Score:</strong> <span style="font-size: 24px; font-weight: bold; color: ${this.getScoreColor(audit.overallScore)};">${audit.overallScore}/100</span></p>
      </div>
    `
  }

  private generateExecutiveSummary(audit: PageSpeedResult): string {
    const performance = audit.metrics.performance
    const seo = audit.metrics.seo
    const accessibility = audit.metrics.accessibility

    let summaryText = ""
    if (audit.overallScore >= 90) {
      summaryText = "Excellent performance! Your website is well-optimized and provides a great user experience."
    } else if (audit.overallScore >= 70) {
      summaryText =
        "Good performance with room for improvement. Focus on the recommendations below to enhance user experience."
    } else if (audit.overallScore >= 50) {
      summaryText =
        "Moderate performance. Several optimization opportunities exist to improve loading speed and user experience."
    } else {
      summaryText =
        "Performance needs significant improvement. Implementing the recommendations will greatly enhance user experience and search rankings."
    }

    return `
      <div class="executive-summary">
        <h2 class="section-title">Executive Summary</h2>
        <div class="summary-score" style="color: ${this.getScoreColor(audit.overallScore)};">${audit.overallScore}/100</div>
        <p style="text-align: center; margin-bottom: 15px;"><strong>Overall Performance Score</strong></p>
        <p>${summaryText}</p>
        
        <div style="margin-top: 20px;">
          <h3>Key Findings:</h3>
          <ul style="margin-left: 20px; margin-top: 10px;">
            <li><strong>Performance:</strong> ${performance}/100 - ${this.getScoreDescription(performance)}</li>
            <li><strong>SEO:</strong> ${seo}/100 - ${this.getScoreDescription(seo)}</li>
            <li><strong>Accessibility:</strong> ${accessibility}/100 - ${this.getScoreDescription(accessibility)}</li>
            <li><strong>Issues Found:</strong> ${audit.audits.filter((a) => a.score !== null && a.score < 0.9).length} items need attention</li>
          </ul>
        </div>
      </div>
    `
  }

  private generateScoreOverview(audit: PageSpeedResult): string {
    const metrics = [
      { name: "Performance", score: audit.metrics.performance },
      { name: "Accessibility", score: audit.metrics.accessibility },
      { name: "Best Practices", score: audit.metrics.bestPractices },
      { name: "SEO", score: audit.metrics.seo },
      { name: "PWA", score: audit.metrics.pwa },
    ]

    const scoreCards = metrics
      .map(
        (metric) => `
      <div class="score-card">
        <div class="score-circle ${this.getScoreClass(metric.score)}">
          ${metric.score}
        </div>
        <div class="score-label">${metric.name}</div>
      </div>
    `,
      )
      .join("")

    return `
      <h2 class="section-title">Lighthouse Scores</h2>
      <div class="score-overview">
        ${scoreCards}
      </div>
    `
  }

  private generateMetricsBreakdown(audit: PageSpeedResult): string {
    const metrics = [
      { name: "Performance", score: audit.metrics.performance, description: "Loading speed and runtime performance" },
      {
        name: "Accessibility",
        score: audit.metrics.accessibility,
        description: "How accessible the page is to users with disabilities",
      },
      {
        name: "Best Practices",
        score: audit.metrics.bestPractices,
        description: "General web development best practices",
      },
      { name: "SEO", score: audit.metrics.seo, description: "Search engine optimization factors" },
      { name: "PWA", score: audit.metrics.pwa, description: "Progressive Web App capabilities" },
    ]

    const tableRows = metrics
      .map(
        (metric) => `
      <tr>
        <td><strong>${metric.name}</strong></td>
        <td style="color: ${this.getScoreColor(metric.score)}; font-weight: bold;">${metric.score}/100</td>
        <td>${this.getScoreDescription(metric.score)}</td>
        <td>${metric.description}</td>
      </tr>
    `,
      )
      .join("")

    return `
      <h2 class="section-title">Detailed Metrics Breakdown</h2>
      <table class="metrics-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Score</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `
  }

  private generateCoreWebVitals(audit: PageSpeedResult): string {
    return `
      <h2 class="section-title">Core Web Vitals</h2>
      <div class="cwv-grid">
        <div class="cwv-item">
          <div class="cwv-value">${(audit.coreWebVitals.lcp / 1000).toFixed(2)}s</div>
          <div class="cwv-label">Largest Contentful Paint (LCP)</div>
          <div style="font-size: 12px; color: #666; margin-top: 5px;">Good: ≤ 2.5s</div>
        </div>
        <div class="cwv-item">
          <div class="cwv-value">${audit.coreWebVitals.fid.toFixed(0)}ms</div>
          <div class="cwv-label">First Input Delay (FID)</div>
          <div style="font-size: 12px; color: #666; margin-top: 5px;">Good: ≤ 100ms</div>
        </div>
        <div class="cwv-item">
          <div class="cwv-value">${audit.coreWebVitals.cls.toFixed(3)}</div>
          <div class="cwv-label">Cumulative Layout Shift (CLS)</div>
          <div style="font-size: 12px; color: #666; margin-top: 5px;">Good: ≤ 0.1</div>
        </div>
      </div>
    `
  }

  private generateRecommendations(audit: PageSpeedResult): string {
    const issues = audit.audits.filter((item) => item.score !== null && item.score < 0.9)

    if (issues.length === 0) {
      return `
        <div class="page-break"></div>
        <h2 class="section-title">Recommendations</h2>
        <div style="text-align: center; padding: 40px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px;">
          <h3 style="color: #155724;">Excellent Work!</h3>
          <p style="color: #155724;">No critical issues found. Your website is performing well across all metrics.</p>
        </div>
      `
    }

    const recommendationItems = issues
      .slice(0, 10)
      .map(
        (item) => `
      <div class="recommendation-item">
        <div class="recommendation-title">${item.title}</div>
        <div class="recommendation-text">${item.description}</div>
        ${item.displayValue ? `<div style="font-size: 12px; margin-top: 5px;"><strong>Current:</strong> ${item.displayValue}</div>` : ""}
      </div>
    `,
      )
      .join("")

    return `
      <div class="page-break"></div>
      <h2 class="section-title">Recommendations for Improvement</h2>
      <p style="margin-bottom: 20px;">The following items were identified as opportunities to improve your website's performance:</p>
      ${recommendationItems}
      ${issues.length > 10 ? `<p style="margin-top: 20px; font-style: italic;">And ${issues.length - 10} more items... Run a detailed audit for complete analysis.</p>` : ""}
    `
  }

  private generateScreenshot(audit: PageSpeedResult): string {
    if (!audit.screenshot) return ""

    return `
      <div class="page-break"></div>
      <div class="screenshot-section">
        <h2 class="section-title">Website Screenshot</h2>
        <p style="margin-bottom: 20px;">Screenshot captured during the audit:</p>
        <img src="${audit.screenshot}" alt="Website Screenshot" class="screenshot-img">
      </div>
    `
  }

  private generateFooter(reportDate: string, reportTime: string): string {
    return `
      <div class="footer">
        <p><strong>${this.config.companyName}</strong> - PageSpeed Audit Report</p>
        <p>Generated on ${reportDate} at ${reportTime}</p>
        <p>This report was created using Google PageSpeed Insights API</p>
        <p style="margin-top: 10px; font-size: 10px;">
          For questions about this report, please contact your digital marketing team.
        </p>
      </div>
    `
  }

  private getScoreColor(score: number): string {
    if (score >= 90) return "#28a745"
    if (score >= 50) return "#ffc107"
    return "#dc3545"
  }

  private getScoreClass(score: number): string {
    if (score >= 90) return "score-excellent"
    if (score >= 50) return "score-good"
    return "score-poor"
  }

  private getScoreDescription(score: number): string {
    if (score >= 90) return "Excellent"
    if (score >= 70) return "Good"
    if (score >= 50) return "Needs Improvement"
    return "Poor"
  }

  private async htmlToPDF(htmlContent: string): Promise<Blob> {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      throw new Error("Unable to open print window. Please allow popups.")
    }

    return new Promise((resolve, reject) => {
      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // Wait for content to load
      printWindow.onload = () => {
        setTimeout(() => {
          try {
            printWindow.print()
            printWindow.close()

            // Create a blob with the HTML content for download
            const blob = new Blob([htmlContent], { type: "text/html" })
            resolve(blob)
          } catch (error) {
            reject(error)
          }
        }, 500)
      }
    })
  }

  // Alternative method using jsPDF (would require adding jsPDF library)
  async generatePDFWithLibrary(audit: PageSpeedResult): Promise<Blob> {
    // This would use a PDF library like jsPDF or Puppeteer
    // For now, we'll use the browser's print functionality
    return this.generateReport(audit)
  }
}

// Export utility functions
export const exportToPDF = async (audit: PageSpeedResult, config?: Partial<ReportConfig>): Promise<void> => {
  const defaultConfig: ReportConfig = {
    companyName: "MTS Marketing Suite",
    brandColor: "#7c3aed",
    includeScreenshot: true,
    includeRecommendations: true,
    includeExecutiveSummary: true,
  }

  const finalConfig = { ...defaultConfig, ...config }
  const generator = new PDFReportGenerator(finalConfig)

  try {
    const blob = await generator.generateReport(audit)

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pagespeed-report-${audit.domain}-${new Date(audit.timestamp).toISOString().split("T")[0]}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("PDF export failed:", error)
    throw error
  }
}
