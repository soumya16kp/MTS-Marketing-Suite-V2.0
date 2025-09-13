import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { PricingPreview } from "@/components/pricing-preview"
import { Footer } from "@/components/footer"
import { NavbarMain } from "@/components/navbar-main"
import { NavbarTopLayer } from "@/components/navbar-top-layer"
import { FloatingSocialBar } from "@/components/floating-social-bar"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarTopLayer />
      <NavbarMain />
      <FloatingSocialBar />

      <main className="pt-26">
        <Hero />
        <Features />
        <StatsSection />
        <Testimonials />
        <CTASection />
        <PricingPreview />
      </main>

      <Footer />
    </div>
  )
}
