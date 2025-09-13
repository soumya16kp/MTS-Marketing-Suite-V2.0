import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "MTS Marketing Suite - All-in-One Digital Marketing & SEO Agency",
  description:
    "Professional B2B digital marketing platform for agencies to manage clients, run SEO audits, view analytics, and generate white-label reports.",
  generator: "MTS Marketing Suite",
  keywords: ["digital marketing", "SEO", "analytics", "B2B", "agency", "reports"],
  authors: [{ name: "Mehedi Pathan", url: "https://mehedipathan.online" }],
  openGraph: {
    title: "MTS Marketing Suite - All-in-One Digital Marketing & SEO Agency",
    description: "Professional B2B digital marketing platform for agencies",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
