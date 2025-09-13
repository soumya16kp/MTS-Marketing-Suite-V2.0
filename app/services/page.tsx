"use client"

import { motion } from "framer-motion"
import { NavbarMain } from "@/components/navbar-main"
import { NavbarTopLayer } from "@/components/navbar-top-layer"
import { FloatingSocialBar } from "@/components/floating-social-bar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  BarChart3,
  Globe,
  Users,
  TrendingUp,
  FileText,
  Zap,
  Shield,
  Target,
  Smartphone,
  Mail,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Comprehensive search engine optimization to improve your website's visibility and rankings.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building"],
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/seo-audit",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Advanced website performance monitoring and detailed analytics reporting.",
      features: ["PageSpeed Analysis", "Core Web Vitals", "Performance Monitoring", "Custom Reports"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/dashboard",
    },
    {
      icon: Globe,
      title: "Website Audits",
      description: "Complete website analysis covering performance, SEO, accessibility, and best practices.",
      features: ["Technical Audits", "Accessibility Testing", "Security Analysis", "Mobile Optimization"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/seo-audit",
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Streamlined client onboarding and project management for digital marketing agencies.",
      features: ["Client Dashboard", "Project Tracking", "Team Collaboration", "White-label Reports"],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/clients",
    },
    {
      icon: TrendingUp,
      title: "Growth Marketing",
      description: "Data-driven marketing strategies to accelerate your business growth and conversions.",
      features: ["Conversion Optimization", "A/B Testing", "Growth Hacking", "Marketing Automation"],
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/contact",
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Professional, branded reports that you can share with clients and stakeholders.",
      features: ["White-label Branding", "PDF Export", "Automated Reports", "Custom Metrics"],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      href: "/reports",
    },
  ]

  const additionalServices = [
    {
      icon: Zap,
      title: "Speed Optimization",
      description: "Make your website lightning fast with our performance optimization services.",
    },
    {
      icon: Shield,
      title: "Security Audits",
      description: "Comprehensive security analysis to protect your website from vulnerabilities.",
    },
    {
      icon: Target,
      title: "Conversion Optimization",
      description: "Increase your conversion rates with data-driven optimization strategies.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Ensure your website performs perfectly on all mobile devices.",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Effective email campaigns that engage your audience and drive results.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NavbarTopLayer />
      <NavbarMain />
      <FloatingSocialBar />

      <main className="pt-26 pb-20">
        {/* Hero Section */}
        <section className="px-4 py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto max-w-7xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Comprehensive digital marketing solutions designed to help your business grow, optimize performance, and
                achieve measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-green-600">
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="bg-transparent">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Services */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Core Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to succeed in digital marketing, from SEO optimization to performance analytics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div
                          className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}
                        >
                          <Icon className={`w-6 h-6 ${service.color}`} />
                        </div>
                        <CardTitle className="text-xl font-montserrat">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Link href={service.href}>
                          <Button variant="outline" className="w-full bg-transparent group">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="px-4 py-20 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Additional Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized services to complement your digital marketing strategy and maximize your online presence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Ready to <span className="gradient-text">Transform</span> Your Digital Presence?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how our services can help you achieve your business goals and drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-green-600">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/seo-audit">
                  <Button size="lg" variant="outline" className="bg-transparent">
                    Free Website Audit
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
