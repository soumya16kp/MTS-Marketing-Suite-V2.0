"use client"

import { motion } from "framer-motion"
import { Search, BarChart3, FileText, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Search,
    title: "SEO Audits",
    description:
      "Comprehensive website analysis with actionable insights and recommendations for improved search rankings.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time performance tracking with detailed metrics, conversion rates, and ROI calculations.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: FileText,
    title: "White-label Reports",
    description: "Professional PDF reports with your branding that you can deliver directly to your clients.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "Ads Management",
    description: "Streamlined campaign management with performance optimization and automated bid adjustments.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Everything You Need to <span className="gradient-text">Scale Your Agency</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Powerful tools designed specifically for digital marketing agencies to deliver exceptional results for their
            clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-montserrat font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
