"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Users, TrendingUp, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "audit",
    title: "SEO Audit completed for Noor Clinic",
    description: "Score: 78/100 with 2 critical issues found",
    time: "2 hours ago",
    icon: Search,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "report",
    title: "White-label report generated",
    description: "TechStart Solutions monthly performance report",
    time: "4 hours ago",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    type: "client",
    title: "New client added",
    description: "Digital Marketing Pro joined your agency",
    time: "1 day ago",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    type: "performance",
    title: "Traffic spike detected",
    description: "Noor Clinic website traffic increased by 25%",
    time: "2 days ago",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: 5,
    type: "audit",
    title: "Scheduled audit reminder",
    description: "Monthly audit due for 3 clients this week",
    time: "3 days ago",
    icon: Clock,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-montserrat font-bold">Recent Activity</CardTitle>
        <CardDescription>Latest updates and notifications from your campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm leading-tight">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
