import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const benefits = [
    "Free SEO audit included",
    "30-day money-back guarantee",
    "24/7 expert support",
    "White-label reporting",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-12 lg:p-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <img src="/mts-logo.png" alt="MTS Logo" className="w-8 h-8" />
                    <span className="font-montserrat font-bold text-lg">MTS</span>
                  </div>

                  <h2 className="text-4xl font-montserrat font-bold text-gray-900 leading-tight">
                    Ready to Transform Your Digital Marketing?
                  </h2>

                  <p className="text-xl text-gray-600 leading-relaxed">
                    Join hundreds of successful businesses using our all-in-one marketing platform to drive growth and
                    maximize ROI.
                  </p>

                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    >
                      <Link href="/login">
                        Start Free Trial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/contact">Schedule Demo</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className="p-12 lg:p-16 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #16a34a)",
                }}
              >
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold text-white">30</div>
                  <div className="text-xl font-semibold text-white">Day Free Trial</div>
                  <p className="text-purple-100">No credit card required. Cancel anytime.</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                    <div className="text-2xl font-bold mb-2 text-white">$0</div>
                    <div className="text-sm text-white">Setup Fee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
