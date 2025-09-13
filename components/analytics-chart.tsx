"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const visitsData = [
  { name: "Jan", visits: 4000, leads: 240, conversions: 120 },
  { name: "Feb", visits: 3000, leads: 198, conversions: 98 },
  { name: "Mar", visits: 5000, leads: 300, conversions: 150 },
  { name: "Apr", visits: 4500, leads: 270, conversions: 135 },
  { name: "May", visits: 6000, leads: 360, conversions: 180 },
  { name: "Jun", visits: 5500, leads: 330, conversions: 165 },
  { name: "Jul", visits: 7000, leads: 420, conversions: 210 },
]

const leadsData = [
  { name: "Mon", leads: 45, conversions: 12 },
  { name: "Tue", leads: 52, conversions: 15 },
  { name: "Wed", leads: 38, conversions: 8 },
  { name: "Thu", leads: 61, leads: 18 },
  { name: "Fri", leads: 55, conversions: 16 },
  { name: "Sat", leads: 28, conversions: 7 },
  { name: "Sun", leads: 33, conversions: 9 },
]

export function AnalyticsChart() {
  const [activeChart, setActiveChart] = useState<"visits" | "leads">("visits")

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-montserrat font-bold">Analytics Overview</CardTitle>
            <CardDescription>
              {activeChart === "visits"
                ? "Monthly website traffic and conversions"
                : "Weekly leads and conversion performance"}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={activeChart === "visits" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChart("visits")}
            >
              Monthly
            </Button>
            <Button
              variant={activeChart === "leads" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChart("leads")}
            >
              Weekly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === "visits" ? (
              <LineChart data={visitsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  name="Visits"
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                  name="Leads"
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                  name="Conversions"
                />
              </LineChart>
            ) : (
              <BarChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Leads" />
                <Bar dataKey="conversions" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Conversions" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
