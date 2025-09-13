"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Search,
  FileText,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SEOAuditTool } from "@/components/seo-audit-tool"
import { ROICalculator } from "@/components/roi-calculator"
import { storage, type Client, type SEOAudit, type Report } from "@/lib/storage"

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [client, setClient] = useState<Client | null>(null)
  const [audits, setAudits] = useState<SEOAudit[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    domain: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const clients = storage.getClients()
    const foundClient = clients.find((c) => c.id === clientId)

    if (!foundClient) {
      router.push("/clients")
      return
    }

    setClient(foundClient)
    setEditForm({
      name: foundClient.name,
      domain: foundClient.domain,
      email: foundClient.email,
      phone: foundClient.phone || "",
    })

    // Load related data
    const allAudits = storage.getSEOAudits()
    const clientAudits = allAudits.filter((audit) => audit.clientId === clientId)
    setAudits(clientAudits)

    const allReports = storage.getReports()
    const clientReports = allReports.filter((report) => report.clientId === clientId)
    setReports(clientReports)
  }, [clientId, router])

  const handleSaveEdit = () => {
    if (!client) return

    const updatedClient: Client = {
      ...client,
      name: editForm.name.trim(),
      domain: editForm.domain.trim(),
      email: editForm.email.trim(),
      phone: editForm.phone.trim() || undefined,
    }

    const clients = storage.getClients()
    const updatedClients = clients.map((c) => (c.id === clientId ? updatedClient : c))
    storage.setClients(updatedClients)

    setClient(updatedClient)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    if (!client) return

    setEditForm({
      name: client.name,
      domain: client.domain,
      email: client.email,
      phone: client.phone || "",
    })
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getLatestAudit = () => {
    return audits.length > 0 ? audits[audits.length - 1] : null
  }

  const handleAuditCompleted = () => {
    // Refresh audits after new audit is completed
    const allAudits = storage.getSEOAudits()
    const clientAudits = allAudits.filter((audit) => audit.clientId === clientId)
    setAudits(clientAudits)
  }

  if (!client) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex">
          <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div
            className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-80"} flex items-center justify-center`}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Client not found</h2>
              <p className="text-muted-foreground mb-4">The client you're looking for doesn't exist.</p>
              <Link href="/clients">
                <Button>Back to Clients</Button>
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const latestAudit = getLatestAudit()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-80"}`}>
          <main className="pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
              {/* Back Navigation */}
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <Link
                  href="/clients"
                  className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Clients
                </Link>
              </motion.div>

              {/* Client Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <span className="font-bold text-primary text-2xl">{client.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          {isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="text-2xl font-montserrat font-bold h-auto p-2"
                              />
                              <Input
                                value={editForm.domain}
                                onChange={(e) => setEditForm({ ...editForm, domain: e.target.value })}
                                className="text-muted-foreground h-auto p-2"
                              />
                            </div>
                          ) : (
                            <>
                              <h1 className="text-2xl md:text-3xl font-montserrat font-bold">{client.name}</h1>
                              <div className="flex items-center text-muted-foreground mt-1">
                                <Globe className="w-4 h-4 mr-2" />
                                {client.domain}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                        {latestAudit && (
                          <Badge
                            variant={
                              latestAudit.score >= 80
                                ? "default"
                                : latestAudit.score >= 60
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-sm px-3 py-1"
                          >
                            SEO Score: {latestAudit.score}/100
                          </Badge>
                        )}

                        {isEditing ? (
                          <div className="flex space-x-2">
                            <Button onClick={handleSaveEdit} size="sm">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={handleCancelEdit} variant="outline" size="sm">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="h-8"
                          />
                        ) : (
                          <span className="text-sm">{client.email}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            placeholder="Phone number"
                            className="h-8"
                          />
                        ) : (
                          <span className="text-sm">{client.phone || "No phone number"}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Added {formatDate(client.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main Content Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="audit">SEO Audit</TabsTrigger>
                    <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Performance Overview */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Total Audits</p>
                              <p className="text-2xl font-bold">{audits.length}</p>
                            </div>
                            <Search className="w-8 h-8 text-blue-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Reports Generated</p>
                              <p className="text-2xl font-bold">{reports.length}</p>
                            </div>
                            <FileText className="w-8 h-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Latest Score</p>
                              <p className="text-2xl font-bold">{latestAudit ? `${latestAudit.score}/100` : "N/A"}</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-purple-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Audits */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl font-montserrat font-bold">Recent SEO Audits</CardTitle>
                        <CardDescription>Latest audit results and recommendations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {audits.length > 0 ? (
                          <div className="space-y-4">
                            {audits
                              .slice(-3)
                              .reverse()
                              .map((audit) => (
                                <div key={audit.id} className="p-4 border rounded-lg">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                      <Badge
                                        variant={
                                          audit.score >= 80
                                            ? "default"
                                            : audit.score >= 60
                                              ? "secondary"
                                              : "destructive"
                                        }
                                      >
                                        {audit.score}/100
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        {formatDate(audit.performedAt)}
                                      </span>
                                    </div>
                                    {audit.score >= 80 ? (
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : audit.score >= 60 ? (
                                      <Clock className="w-5 h-5 text-yellow-600" />
                                    ) : (
                                      <AlertCircle className="w-5 h-5 text-red-600" />
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <h4 className="font-medium">Issues Found ({audit.issues.length})</h4>
                                    {audit.issues.slice(0, 2).map((issue) => (
                                      <div key={issue.id} className="text-sm">
                                        <span
                                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                            issue.severity === "high"
                                              ? "bg-red-500"
                                              : issue.severity === "medium"
                                                ? "bg-yellow-500"
                                                : "bg-blue-500"
                                          }`}
                                        />
                                        {issue.title}
                                      </div>
                                    ))}
                                    {audit.issues.length > 2 && (
                                      <p className="text-sm text-muted-foreground">
                                        +{audit.issues.length - 2} more issues
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">No audits yet</h3>
                            <p className="text-muted-foreground mb-4">
                              Run your first SEO audit to get insights about this client's website.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="audit">
                    <SEOAuditTool client={client} onAuditCompleted={handleAuditCompleted} />
                  </TabsContent>

                  <TabsContent value="roi">
                    <ROICalculator />
                  </TabsContent>

                  <TabsContent value="reports">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl font-montserrat font-bold">Generated Reports</CardTitle>
                        <CardDescription>White-label reports for this client</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {reports.length > 0 ? (
                          <div className="space-y-4">
                            {reports.map((report) => (
                              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-8 h-8 text-primary" />
                                  <div>
                                    <h4 className="font-medium">{report.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Generated {formatDate(report.createdAt)}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Download PDF
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">No reports generated</h3>
                            <p className="text-muted-foreground mb-4">
                              Generate your first white-label report for this client.
                            </p>
                            <Button>Generate Report</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
