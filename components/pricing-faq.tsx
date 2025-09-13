"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What happens during the free trial?",
    answer:
      "You get full access to all features of your chosen plan for 14 days. No credit card required to start, and you can cancel anytime during the trial.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us within 30 days for a full refund.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fees, ever. The price you see is the price you pay. We believe in transparent, straightforward pricing.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period.",
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer:
      "Yes, we offer custom solutions for enterprise clients with specific requirements. Contact our sales team to discuss your needs.",
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-montserrat font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-muted-foreground text-lg">Everything you need to know about our pricing and plans</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-0">
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
