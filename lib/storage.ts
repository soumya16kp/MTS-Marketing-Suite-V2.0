export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: "admin" | "user"
  createdAt: string
}

export interface Client {
  id: string
  name: string
  domain: string
  email: string
  phone?: string
  logoUrl?: string
  createdAt: string
}

export interface SEOAudit {
  id: string
  clientId: string
  score: number
  issues: Array<{
    id: string
    title: string
    severity: "low" | "medium" | "high"
    suggestion: string
  }>
  performedAt: string
}

export interface Report {
  id: string
  clientId: string
  clientName: string
  type: "seo-audit" | "performance" | "roi-analysis" | "monthly-summary"
  title: string
  generatedDate: string
  status: "completed"
  metrics: {
    score: number
    improvement: number
    issues: number
  }
}

export interface Session {
  email: string
  name: string
  token: string
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  company: string
  email: string
  message: string
  createdAt: string
}

// Storage keys
const STORAGE_KEYS = {
  USERS: "mts_users",
  SESSION: "mts_session",
  CLIENTS: "mts_clients",
  SEO_AUDITS: "mts_seo_audits",
  REPORTS: "mts_reports",
  MESSAGES: "mts_messages",
} as const

// Utility functions
export const storage = {
  // Users
  getUsers: (): User[] => {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(STORAGE_KEYS.USERS)
    return users ? JSON.parse(users) : []
  },

  setUsers: (users: User[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  },

  // Session
  getSession: (): Session | null => {
    if (typeof window === "undefined") return null
    const session = localStorage.getItem(STORAGE_KEYS.SESSION)
    return session ? JSON.parse(session) : null
  },

  setSession: (session: Session | null) => {
    if (typeof window === "undefined") return
    if (session) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
      document.cookie = "mts_session=true; path=/; max-age=86400"
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION)
      document.cookie = "mts_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  },

  // Clients
  getClients: (): Client[] => {
    if (typeof window === "undefined") return []
    const clients = localStorage.getItem(STORAGE_KEYS.CLIENTS)
    return clients ? JSON.parse(clients) : []
  },

  setClients: (clients: Client[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients))
  },

  // SEO Audits
  getSEOAudits: (): SEOAudit[] => {
    if (typeof window === "undefined") return []
    const audits = localStorage.getItem(STORAGE_KEYS.SEO_AUDITS)
    return audits ? JSON.parse(audits) : []
  },

  setSEOAudits: (audits: SEOAudit[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.SEO_AUDITS, JSON.stringify(audits))
  },

  // Reports
  getReports: (): Report[] => {
    if (typeof window === "undefined") return []
    const reports = localStorage.getItem(STORAGE_KEYS.REPORTS)
    return reports ? JSON.parse(reports) : []
  },

  setReports: (reports: Report[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports))
  },

  // Messages
  getMessages: (): ContactMessage[] => {
    if (typeof window === "undefined") return []
    const messages = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return messages ? JSON.parse(messages) : []
  },

  setMessages: (messages: ContactMessage[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
  },
}

// Convenience functions for easier access
export const getUsers = () => storage.getUsers()
export const setUsers = (users: User[]) => storage.setUsers(users)
export const getSession = () => storage.getSession()
export const setSession = (session: Session | null) => storage.setSession(session)
export const getClients = () => storage.getClients()
export const setClients = (clients: Client[]) => storage.setClients(clients)
export const getSEOAudits = () => storage.getSEOAudits()
export const setSEOAudits = (audits: SEOAudit[]) => storage.setSEOAudits(audits)
export const getReports = () => storage.getReports()
export const setReports = (reports: Report[]) => storage.setReports(reports)
export const getMessages = () => storage.getMessages()
export const setMessages = (messages: ContactMessage[]) => storage.setMessages(messages)

export const generateReport = (
  clientId: string,
  clientName: string,
  type: "seo-audit" | "performance" | "roi-analysis" | "monthly-summary",
) => {
  const reportId = `r_${Date.now()}`
  const typeNames = {
    "seo-audit": "SEO Audit Report",
    performance: "Performance Report",
    "roi-analysis": "ROI Analysis Report",
    "monthly-summary": "Monthly Summary Report",
  }

  const report = {
    id: reportId,
    clientId,
    clientName,
    type,
    title: `${clientName} ${typeNames[type]}`,
    generatedDate: new Date().toISOString(),
    status: "completed" as const,
    metrics: {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      improvement: Math.floor(Math.random() * 25) + 5, // 5-30%
      issues: Math.floor(Math.random() * 8) + 2, // 2-10 issues
    },
  }

  const reports = getReports()
  const updatedReports = [report, ...reports]
  setReports(updatedReports)

  return report
}

export const deleteReport = (reportId: string) => {
  const reports = getReports()
  const updatedReports = reports.filter((r) => r.id !== reportId)
  setReports(updatedReports)
}

export const getReportsByClient = (clientId: string) => {
  const reports = getReports()
  return reports.filter((r) => r.clientId === clientId)
}

export const getAnalyticsData = () => {
  const clients = getClients()
  const reports = getReports()
  const audits = getSEOAudits()

  // Generate monthly data for charts
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date()
    month.setMonth(month.getMonth() - (11 - i))
    return {
      month: month.toLocaleDateString("en-US", { month: "short" }),
      visits: Math.floor(Math.random() * 5000) + 2000,
      conversions: Math.floor(Math.random() * 200) + 50,
      revenue: Math.floor(Math.random() * 10000) + 5000,
    }
  })

  // Generate weekly data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const day = new Date()
    day.setDate(day.getDate() - (6 - i))
    return {
      day: day.toLocaleDateString("en-US", { weekday: "short" }),
      visits: Math.floor(Math.random() * 800) + 200,
      conversions: Math.floor(Math.random() * 40) + 10,
    }
  })

  return {
    totalClients: clients.length,
    monthlyVisits: monthlyData.reduce((sum, d) => sum + d.visits, 0),
    conversionRate: (
      (monthlyData.reduce((sum, d) => sum + d.conversions, 0) / monthlyData.reduce((sum, d) => sum + d.visits, 0)) *
      100
    ).toFixed(1),
    totalRevenue: monthlyData.reduce((sum, d) => sum + d.revenue, 0),
    monthlyData,
    weeklyData,
    recentActivity: [
      { type: "audit", client: "Noor Clinic", action: "SEO audit completed", time: "2 hours ago" },
      { type: "report", client: "TechStart Solutions", action: "Monthly report generated", time: "4 hours ago" },
      { type: "client", client: "Digital Marketing Pro", action: "New client added", time: "1 day ago" },
      { type: "audit", client: "Noor Clinic", action: "Performance audit started", time: "2 days ago" },
    ],
  }
}

// Initialize demo data
export const initializeDemoData = () => {
  if (typeof window === "undefined") return

  // Check if data already exists
  if (storage.getClients().length > 0) return

  // Demo clients
  const demoClients: Client[] = [
    {
      id: "c_1",
      name: "Noor Clinic",
      domain: "noorclinic.com",
      email: "owner@noorclinic.com",
      phone: "+880171234567",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    {
      id: "c_2",
      name: "TechStart Solutions",
      domain: "techstart.io",
      email: "hello@techstart.io",
      phone: "+880181234567",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    },
    {
      id: "c_3",
      name: "Digital Marketing Pro",
      domain: "digitalmarketingpro.com",
      email: "info@digitalmarketingpro.com",
      phone: "+880191234567",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
  ]

  // Demo SEO audits
  const demoAudits: SEOAudit[] = [
    {
      id: "a_1",
      clientId: "c_1",
      score: 78,
      issues: [
        {
          id: "i1",
          title: "Missing meta description",
          severity: "medium",
          suggestion: "Add a compelling 120-160 character meta description to improve click-through rates.",
        },
        {
          id: "i2",
          title: "Slow page load speed",
          severity: "high",
          suggestion: "Optimize images and enable compression to improve Core Web Vitals.",
        },
        {
          id: "i3",
          title: "Missing alt text on images",
          severity: "low",
          suggestion: "Add descriptive alt text to all images for better accessibility and SEO.",
        },
      ],
      performedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: "a_2",
      clientId: "c_2",
      score: 85,
      issues: [
        {
          id: "i4",
          title: "Missing structured data",
          severity: "medium",
          suggestion: "Implement JSON-LD structured data for better search engine understanding.",
        },
        {
          id: "i5",
          title: "Broken internal links",
          severity: "low",
          suggestion: "Fix 3 broken internal links found during the audit.",
        },
      ],
      performedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "a_3",
      clientId: "c_3",
      score: 92,
      issues: [
        {
          id: "i6",
          title: "Minor mobile usability issues",
          severity: "low",
          suggestion: "Adjust button sizes for better mobile touch targets.",
        },
      ],
      performedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
  ]

  // Demo reports
  const demoReports: Report[] = [
    {
      id: "r_1",
      clientId: "c_1",
      clientName: "Noor Clinic",
      type: "seo-audit",
      title: "Noor Clinic SEO Audit Report",
      generatedDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      status: "completed" as const,
      metrics: {
        score: 88,
        improvement: 15,
        issues: 5,
      },
    },
    {
      id: "r_2",
      clientId: "c_2",
      clientName: "TechStart Solutions",
      type: "monthly-summary",
      title: "TechStart Solutions Monthly Report",
      generatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      status: "completed" as const,
      metrics: {
        score: 95,
        improvement: 20,
        issues: 3,
      },
    },
    {
      id: "r_3",
      clientId: "c_3",
      clientName: "Digital Marketing Pro",
      type: "performance",
      title: "Digital Marketing Pro Performance Report",
      generatedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      status: "completed" as const,
      metrics: {
        score: 82,
        improvement: 10,
        issues: 7,
      },
    },
  ]

  // Set demo data
  storage.setClients(demoClients)
  storage.setSEOAudits(demoAudits)
  storage.setReports(demoReports)
}

// Initialize demo user
export const initializeDemoUser = () => {
  const users = storage.getUsers()

  // Check if demo user already exists
  if (users.find((u) => u.email === "demo@mts.com")) {
    return
  }

  // Create demo user with pre-hashed password
  const demoUser: User = {
    id: "demo_user",
    name: "Demo User",
    email: "demo@mts.com",
    passwordHash: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f", // SHA-256 of "demo123"
    role: "admin",
    createdAt: new Date().toISOString(),
  }

  users.push(demoUser)
  storage.setUsers(users)
}
