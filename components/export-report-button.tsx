"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Loader2, FileText, Settings } from "lucide-react"
import type { PageSpeedResult } from "@/lib/pagespeed-api"
import { exportToPDF, type ReportConfig } from "@/lib/pdf-export"

interface ExportReportButtonProps {
  audit: PageSpeedResult
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function ExportReportButton({ audit, variant = "outline", size = "sm", className }: ExportReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [config, setConfig] = useState<Partial<ReportConfig>>({
    companyName: "MTS Marketing Suite",
    brandColor: "#7c3aed",
    includeScreenshot: true,
    includeRecommendations: true,
    includeExecutiveSummary: true,
  })

  const handleExport = async () => {
    setIsExporting(true)
    setError(null)

    try {
      await exportToPDF(audit, config)
      setIsOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed")
    } finally {
      setIsExporting(false)
    }
  }

  const handleQuickExport = async () => {
    setIsExporting(true)
    setError(null)

    try {
      await exportToPDF(audit)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-1">
        {/* Quick Export Button */}
        <Button variant={variant} size={size} className={className} onClick={handleQuickExport} disabled={isExporting}>
          {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
          Export PDF
        </Button>

        {/* Settings Button */}
        <DialogTrigger asChild>
          <Button variant="outline" size={size} className="px-2 bg-transparent">
            <Settings className="w-4 h-4" />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Export Report Settings
          </DialogTitle>
          <DialogDescription>Customize your PDF report for {audit.domain}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={config.companyName || ""}
              onChange={(e) => setConfig((prev) => ({ ...prev, companyName: e.target.value }))}
              placeholder="Your Company Name"
            />
          </div>

          {/* Brand Color */}
          <div className="space-y-2">
            <Label htmlFor="brandColor">Brand Color</Label>
            <div className="flex gap-2">
              <Input
                id="brandColor"
                type="color"
                value={config.brandColor || "#7c3aed"}
                onChange={(e) => setConfig((prev) => ({ ...prev, brandColor: e.target.value }))}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={config.brandColor || "#7c3aed"}
                onChange={(e) => setConfig((prev) => ({ ...prev, brandColor: e.target.value }))}
                placeholder="#7c3aed"
                className="flex-1"
              />
            </div>
          </div>

          {/* Report Options */}
          <div className="space-y-3">
            <Label>Report Sections</Label>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="executiveSummary"
                checked={config.includeExecutiveSummary}
                onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, includeExecutiveSummary: !!checked }))}
              />
              <Label htmlFor="executiveSummary" className="text-sm font-normal">
                Include Executive Summary
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="recommendations"
                checked={config.includeRecommendations}
                onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, includeRecommendations: !!checked }))}
              />
              <Label htmlFor="recommendations" className="text-sm font-normal">
                Include Recommendations
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="screenshot"
                checked={config.includeScreenshot}
                onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, includeScreenshot: !!checked }))}
              />
              <Label htmlFor="screenshot" className="text-sm font-normal">
                Include Website Screenshot
              </Label>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleExport} disabled={isExporting} className="flex-1">
              {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Generate Custom Report
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
