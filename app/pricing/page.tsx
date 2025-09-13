"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Star, Zap, Shield, Clock, Users } from "lucide-react"
import { NavbarMain } from "@/components/navbar-main"
import { NavbarTopLayer } from "@/components/navbar-top-layer"
import { FloatingSocialBar } from "@/components/floating-social-bar"
import { Footer } from "@/components/footer"
import { PricingFAQ } from "@/components/pricing-faq"
import { PricingTestimonials } from "@/components/pricing-testimonials"

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small agencies getting started",
    features: [
      "Up to 10 clients",
      "Basic SEO audits",
      "Standard reports",
      "Email support",
      "5GB storage",
      "Basic analytics",
    ],
    popular: false,
    color: "border-gray-200",
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "Most popular for growing agencies",
    features: [
      "Up to 50 clients",
      "Advanced SEO audits",
      "White-label reports",
      "Priority support",
      "Analytics dashboard",
      "50GB storage",
      "API access",
      "Custom branding",
    ],
    popular: true,
    color: "border-primary ring-2 ring-primary/20",
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large agencies and teams",
    features: [
      "Unlimited clients",
      "Custom audits",
      "Advanced API access",
      "Dedicated support",
      "Custom integrations",
      "Unlimited storage",
      "Team collaboration",
      "Advanced analytics",
      "Custom reporting",
    ],
    popular: false,
    color: "border-gray-200",
  },
]

const comparisonFeatures = [
  { feature: "Client Management", starter: "10 clients", pro: "50 clients", enterprise: "Unlimited" },
  { feature: "SEO Audits", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
  { feature: "Reports", starter: "Standard", pro: "White-label", enterprise: "Custom branded" },
  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
  { feature: "Storage", starter: "5GB", pro: "50GB", enterprise: "Unlimited" },
  { feature: "API Access", starter: "❌", pro: "✅", enterprise: "Advanced" },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarTopLayer />
      <NavbarMain />
      <FloatingSocialBar />

      <main className="pt-26 pb-20 px-4">
        <div className="container mx-auto">
          {/* Back Navigation */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-black mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Choose the perfect plan for your agency. All plans include our core features with no hidden fees. Start
              with a 14-day free trial.
            </p>
          </motion.div>

          {/* Trust Indicators Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground text-sm">Enterprise-grade security with 99.9% uptime guarantee</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quick Setup</h3>
              <p className="text-muted-foreground text-sm">Get started in minutes with our guided onboarding</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground text-sm">24/7 support from marketing automation experts</p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${plan.color}`}
                >
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-montserrat font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground text-lg">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/login" className="block">
                      <Button
                        className={`w-full h-12 text-base ${plan.popular ? "" : "variant-outline"}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.popular && <Zap className="mr-2 w-4 h-4" />}
                        Start Free Trial
                      </Button>
                    </Link>

                    <p className="text-center text-sm text-muted-foreground">
                      14-day free trial • No credit card required
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
              Compare <span className="gradient-text">All Features</span>
            </h2>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-6 font-semibold">Features</th>
                      <th className="text-center p-6 font-semibold">Starter</th>
                      <th className="text-center p-6 font-semibold bg-primary/5">Pro</th>
                      <th className="text-center p-6 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="p-6 font-medium">{row.feature}</td>
                        <td className="p-6 text-center text-muted-foreground">{row.starter}</td>
                        <td className="p-6 text-center bg-primary/5 font-medium">{row.pro}</td>
                        <td className="p-6 text-center text-muted-foreground">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Testimonials Section */}
          <div className="mb-20">
            <PricingTestimonials />
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <PricingFAQ />
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-secondary/5 p-12">
              <h3 className="text-2xl font-montserrat font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                For enterprise clients with specific requirements, we offer custom solutions tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
