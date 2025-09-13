"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow Agency",
    content:
      "MTS has transformed how we manage our clients. The reporting features alone have saved us 10+ hours per week.",
    rating: 5,
    avatar: "/professional-woman-diverse.png",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "Digital Boost",
    content:
      "The white-label reports are incredible. Our clients love the professional presentation and detailed insights.",
    rating: 5,
    avatar: "/professional-man.png",
  },
  {
    name: "Emily Rodriguez",
    role: "SEO Specialist",
    company: "Growth Partners",
    content: "Best investment we've made. The SEO audit tools are comprehensive and the API integration is seamless.",
    rating: 5,
    avatar: "/hispanic-professional-woman.png",
  },
]

export function PricingTestimonials() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-montserrat font-bold mb-4">
          Trusted by <span className="gradient-text">Marketing Agencies</span>
        </h2>
        <p className="text-muted-foreground text-lg">See what our customers have to say about MTS Marketing Suite</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
