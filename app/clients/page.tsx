"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreVertical,
  Globe,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  FileText,
  Edit,
  Trash2,
  Users,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { AddClientModal } from "@/components/add-client-modal"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { storage, type Client, type SEOAudit } from "@/lib/storage"

export default function ClientsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [audits, setAudits] = useState<SEOAudit[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "domain" | "recent">("recent")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    setClients(storage.getClients())
    setAudits(storage.getSEOAudits())
  }, [])

  const filteredClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "domain":
          return a.domain.localeCompare(b.domain)
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const handleClientAdded = () => {
    setClients(storage.getClients())
    setIsAddModalOpen(false)
  }

  const handleDeleteClient = (clientId: string) => {
    const updatedClients = clients.filter((client) => client.id !== clientId)
    storage.setClients(updatedClients)
    setClients(updatedClients)

    // Also remove related audits and reports
    const updatedAudits = audits.filter((audit) => audit.clientId !== clientId)
    storage.setSEOAudits(updatedAudits)
    setAudits(updatedAudits)

    const reports = storage.getReports()
    const updatedReports = reports.filter((report) => report.clientId !== clientId)
    storage.setReports(updatedReports)
  }

  const getClientAuditScore = (clientId: string) => {
    const clientAudits = audits.filter((audit) => audit.clientId === clientId)
    if (clientAudits.length === 0) return null
    const latestAudit = clientAudits[clientAudits.length - 1]
    return latestAudit.score
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-80"}`}>
          <main className="pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
                      <span className="gradient-text">Client Management</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Manage your clients and track their performance across all campaigns.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="group">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Client
                        </Button>
                      </DialogTrigger>
                      <AddClientModal onClientAdded={handleClientAdded} />
                    </Dialog>
                  </div>
                </div>
              </motion.div>

              {/* Search and Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-8"
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search clients by name, domain, or email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-11"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={sortBy === "recent" ? "default" : "outline"}
                          onClick={() => setSortBy("recent")}
                          size="sm"
                        >
                          Recent
                        </Button>
                        <Button
                          variant={sortBy === "name" ? "default" : "outline"}
                          onClick={() => setSortBy("name")}
                          size="sm"
                        >
                          Name
                        </Button>
                        <Button
                          variant={sortBy === "domain" ? "default" : "outline"}
                          onClick={() => setSortBy("domain")}
                          size="sm"
                        >
                          Domain
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Clients Grid */}
              {filteredClients.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredClients.map((client, index) => {
                    const auditScore = getClientAuditScore(client.id)
                    return (
                      <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                  <span className="font-bold text-primary text-lg">
                                    {client.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <CardTitle className="text-lg font-montserrat font-bold">{client.name}</CardTitle>
                                  <CardDescription className="flex items-center mt-1">
                                    <Globe className="w-3 h-3 mr-1" />
                                    {client.domain}
                                  </CardDescription>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/clients/${client.id}`}>
                                      <Edit className="w-4 h-4 mr-2" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteClient(client.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Client
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            {/* Contact Info */}
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 mr-2" />
                                {client.email}
                              </div>
                              {client.phone && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {client.phone}
                                </div>
                              )}
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2" />
                                Added {formatDate(client.createdAt)}
                              </div>
                            </div>

                            {/* SEO Score */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Latest SEO Score:</span>
                              {auditScore !== null ? (
                                <Badge
                                  variant={
                                    auditScore >= 80 ? "default" : auditScore >= 60 ? "secondary" : "destructive"
                                  }
                                >
                                  {auditScore}/100
                                </Badge>
                              ) : (
                                <Badge variant="outline">No audit</Badge>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                              <Link href={`/clients/${client.id}`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full bg-transparent">
                                  <BarChart3 className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </Link>
                              <Link href={`/clients/${client.id}#audit`} className="flex-1">
                                <Button size="sm" className="w-full">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Run Audit
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="text-center py-16">
                      {searchTerm ? (
                        <>
                          <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">No clients found</h3>
                          <p className="text-muted-foreground mb-6">
                            No clients match your search criteria. Try adjusting your search terms.
                          </p>
                          <Button variant="outline" onClick={() => setSearchTerm("")}>
                            Clear Search
                          </Button>
                        </>
                      ) : (
                        <>
                          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">No clients yet</h3>
                          <p className="text-muted-foreground mb-6">
                            Add your first client to get started with MTS Marketing Suite.
                          </p>
                          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                              <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add First Client
                              </Button>
                            </DialogTrigger>
                            <AddClientModal onClientAdded={handleClientAdded} />
                          </Dialog>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
