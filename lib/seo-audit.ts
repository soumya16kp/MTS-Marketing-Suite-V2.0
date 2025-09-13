export interface SEOIssue {
  id: string
  title: string
  severity: "low" | "medium" | "high"
  suggestion: string
  category: "technical" | "content" | "performance" | "mobile" | "security"
  impact: string
}

export interface SEOAuditResult {
  id: string
  clientId: string
  domain: string
  score: number
  issues: SEOIssue[]
  performedAt: string
  metrics: {
    pageSpeed: number
    mobileUsability: number
    seoOptimization: number
    accessibility: number
    bestPractices: number
  }
  recommendations: string[]
}

const issueDatabase: Omit<SEOIssue, "id">[] = [
  {
    title: "Missing meta description",
    severity: "medium",
    category: "content",
    suggestion:
      "Add a compelling 120-160 character meta description to improve click-through rates from search results.",
    impact: "Affects search result appearance and click-through rates",
  },
  {
    title: "Slow page load speed",
    severity: "high",
    category: "performance",
    suggestion: "Optimize images, enable compression, and leverage browser caching to improve Core Web Vitals.",
    impact: "Directly affects user experience and search rankings",
  },
  {
    title: "Missing alt text on images",
    severity: "low",
    category: "accessibility",
    suggestion: "Add descriptive alt text to all images for better accessibility and SEO value.",
    impact: "Improves accessibility and helps search engines understand image content",
  },
  {
    title: "Broken internal links",
    severity: "medium",
    category: "technical",
    suggestion: "Fix broken internal links to improve user experience and help search engines crawl your site.",
    impact: "Affects user experience and search engine crawling efficiency",
  },
  {
    title: "Missing structured data",
    severity: "low",
    category: "technical",
    suggestion: "Implement JSON-LD structured data to help search engines better understand your content.",
    impact: "Enhances search result appearance with rich snippets",
  },
  {
    title: "Duplicate title tags",
    severity: "high",
    category: "content",
    suggestion: "Create unique, descriptive title tags for each page to avoid confusion and improve rankings.",
    impact: "Critical for search engine understanding and ranking",
  },
  {
    title: "Poor mobile usability",
    severity: "medium",
    category: "mobile",
    suggestion: "Improve mobile responsiveness and touch target sizes for better mobile user experience.",
    impact: "Essential for mobile-first indexing and user experience",
  },
  {
    title: "Missing SSL certificate",
    severity: "high",
    category: "security",
    suggestion: "Install an SSL certificate to secure your website and improve search rankings.",
    impact: "Required for security and search engine trust",
  },
  {
    title: "Large image file sizes",
    severity: "medium",
    category: "performance",
    suggestion: "Compress and optimize images to reduce page load times and improve performance.",
    impact: "Significantly affects page speed and user experience",
  },
  {
    title: "Missing H1 tags",
    severity: "medium",
    category: "content",
    suggestion: "Add unique H1 tags to each page to improve content structure and SEO.",
    impact: "Important for content hierarchy and search engine understanding",
  },
  {
    title: "Excessive redirects",
    severity: "low",
    category: "technical",
    suggestion: "Minimize redirect chains to improve page load speed and user experience.",
    impact: "Can slow down page loading and affect crawling efficiency",
  },
  {
    title: "Missing robots.txt",
    severity: "low",
    category: "technical",
    suggestion: "Create a robots.txt file to guide search engine crawlers effectively.",
    impact: "Helps control search engine crawling behavior",
  },
]

export const generateSEOAudit = async (domain: string, clientId: string): Promise<SEOAuditResult> => {
  // Simulate audit delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Generate random issues (2-6 issues)
  const numIssues = Math.floor(Math.random() * 5) + 2
  const selectedIssues = issueDatabase
    .sort(() => 0.5 - Math.random())
    .slice(0, numIssues)
    .map((issue, index) => ({
      id: `issue_${Date.now()}_${index}`,
      ...issue,
    }))

  // Calculate metrics
  const baseScore = 85
  const severityWeights = { high: 15, medium: 8, low: 3 }
  const totalDeduction = selectedIssues.reduce((sum, issue) => sum + severityWeights[issue.severity], 0)
  const overallScore = Math.max(baseScore - totalDeduction, 25)

  // Generate individual metric scores
  const metrics = {
    pageSpeed: Math.max(90 - selectedIssues.filter((i) => i.category === "performance").length * 10, 30),
    mobileUsability: Math.max(95 - selectedIssues.filter((i) => i.category === "mobile").length * 15, 40),
    seoOptimization: Math.max(88 - selectedIssues.filter((i) => i.category === "content").length * 12, 35),
    accessibility: Math.max(92 - selectedIssues.filter((i) => i.category === "accessibility").length * 10, 45),
    bestPractices: Math.max(90 - selectedIssues.filter((i) => i.category === "technical").length * 8, 50),
  }

  // Generate recommendations
  const recommendations = [
    "Focus on fixing high-severity issues first for maximum impact",
    "Implement a regular SEO monitoring schedule",
    "Consider professional SEO consultation for complex issues",
    "Monitor Core Web Vitals regularly for performance optimization",
  ]

  if (overallScore < 60) {
    recommendations.unshift("Prioritize technical SEO improvements for better foundation")
  }

  if (selectedIssues.some((i) => i.category === "performance")) {
    recommendations.push("Optimize website performance for better user experience")
  }

  return {
    id: `audit_${Date.now()}`,
    clientId,
    domain,
    score: overallScore,
    issues: selectedIssues,
    performedAt: new Date().toISOString(),
    metrics,
    recommendations: recommendations.slice(0, 4),
  }
}

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "technical":
      return "text-blue-600 bg-blue-50"
    case "content":
      return "text-green-600 bg-green-50"
    case "performance":
      return "text-red-600 bg-red-50"
    case "mobile":
      return "text-purple-600 bg-purple-50"
    case "security":
      return "text-orange-600 bg-orange-50"
    case "accessibility":
      return "text-teal-600 bg-teal-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "text-red-600 bg-red-50 border-red-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "low":
      return "text-blue-600 bg-blue-50 border-blue-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}
