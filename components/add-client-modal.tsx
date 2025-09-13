"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { storage, type Client } from "@/lib/storage"

interface AddClientModalProps {
  onClientAdded: () => void
}

export function AddClientModal({ onClientAdded }: AddClientModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    email: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.domain.trim() || !formData.email.trim()) {
        setError("Name, domain, and email are required")
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address")
        return
      }

      // Check if client already exists
      const existingClients = storage.getClients()
      if (existingClients.some((client) => client.domain === formData.domain)) {
        setError("A client with this domain already exists")
        return
      }

      // Create new client
      const newClient: Client = {
        id: `c_${Date.now()}`,
        name: formData.name.trim(),
        domain: formData.domain
          .trim()
          .replace(/^https?:\/\//, "")
          .replace(/\/$/, ""),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        createdAt: new Date().toISOString(),
      }

      // Save to storage
      const updatedClients = [...existingClients, newClient]
      storage.setClients(updatedClients)

      // Reset form and close modal
      setFormData({ name: "", domain: "", email: "", phone: "" })
      onClientAdded()
    } catch (err) {
      setError("Failed to add client. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError("")
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-montserrat font-bold">Add New Client</DialogTitle>
        <DialogDescription>
          Add a new client to your agency. You can run SEO audits and generate reports for them.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Client Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="e.g., Acme Corporation"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Website Domain *</Label>
          <Input
            id="domain"
            name="domain"
            type="text"
            placeholder="e.g., acmecorp.com"
            value={formData.domain}
            onChange={handleInputChange}
            required
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">Enter the domain without http:// or https://</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Contact Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="e.g., contact@acmecorp.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g., +1 (555) 123-4567"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-11"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 h-11" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Client"
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
